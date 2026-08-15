<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\VehicleRequest;
use App\Models\Vehicle;
use App\Models\VehiclePhoto;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Vehicles/Index', [
            'vehicles' => Vehicle::query()
                ->with('photos')
                ->latest()
                ->paginate(15),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Vehicles/Create');
    }

    public function store(VehicleRequest $request): RedirectResponse
    {
        $data = $request->safe()->except('photos');
        $data['slug'] = $this->uniqueSlug($data['brand'], $data['model'], $data['year']);

        $vehicle = Vehicle::create($data);

        $this->storePhotos($vehicle, $request->file('photos', []));

        return redirect()->route('admin.vehicles.index')->with('success', 'Auto creado correctamente.');
    }

    public function edit(Vehicle $vehicle): Response
    {
        $vehicle->load('photos');

        return Inertia::render('Admin/Vehicles/Edit', [
            'vehicle' => $vehicle,
        ]);
    }

    public function update(VehicleRequest $request, Vehicle $vehicle): RedirectResponse
    {
        $data = $request->safe()->except('photos');

        if ($data['brand'] !== $vehicle->brand || $data['model'] !== $vehicle->model || (int) $data['year'] !== $vehicle->year) {
            $data['slug'] = $this->uniqueSlug($data['brand'], $data['model'], $data['year'], $vehicle->id);
        }

        $vehicle->update($data);

        $this->storePhotos($vehicle, $request->file('photos', []));

        return redirect()->route('admin.vehicles.index')->with('success', 'Auto actualizado correctamente.');
    }

    public function destroy(Vehicle $vehicle): RedirectResponse
    {
        foreach ($vehicle->photos as $photo) {
            Storage::disk('public')->delete($photo->path);
        }

        $vehicle->delete();

        return redirect()->route('admin.vehicles.index')->with('success', 'Auto eliminado.');
    }

    public function destroyPhoto(VehiclePhoto $photo): RedirectResponse
    {
        Storage::disk('public')->delete($photo->path);
        $photo->delete();

        return back()->with('success', 'Foto eliminada.');
    }

    public function reorderPhotos(Request $request, Vehicle $vehicle): RedirectResponse
    {
        $data = $request->validate([
            'photo_ids' => ['required', 'array'],
            'photo_ids.*' => ['integer', 'exists:vehicle_photos,id'],
        ]);

        foreach ($data['photo_ids'] as $index => $photoId) {
            $vehicle->photos()->whereKey($photoId)->update(['order' => $index]);
        }

        return back()->with('success', 'Orden de fotos actualizado.');
    }

    private function storePhotos(Vehicle $vehicle, array $photos): void
    {
        if (empty($photos)) {
            return;
        }

        $hasPrimary = $vehicle->photos()->where('is_primary', true)->exists();
        $order = $vehicle->photos()->max('order') + 1;

        foreach ($photos as $index => $photo) {
            $path = $photo->store('vehicles', 'public');

            $vehicle->photos()->create([
                'path' => $path,
                'order' => $order + $index,
                'is_primary' => ! $hasPrimary && $index === 0,
            ]);
        }
    }

    private function uniqueSlug(string $brand, string $model, int $year, ?int $ignoreId = null): string
    {
        $base = Str::slug("{$brand}-{$model}-{$year}");
        $slug = $base;
        $suffix = 1;

        while (Vehicle::where('slug', $slug)->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))->exists()) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}
