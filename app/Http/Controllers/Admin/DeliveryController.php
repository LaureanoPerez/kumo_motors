<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\DeliveryRequest;
use App\Models\Delivery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DeliveryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Deliveries/Index', [
            'deliveries' => Delivery::query()->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Deliveries/Create');
    }

    public function store(DeliveryRequest $request): RedirectResponse
    {
        $data = $request->safe()->except('photo');
        $data['photo_path'] = $request->file('photo')->store('deliveries', 'public');

        Delivery::create($data);

        return redirect()->route('admin.deliveries.index')->with('success', 'Entrega agregada.');
    }

    public function edit(Delivery $delivery): Response
    {
        return Inertia::render('Admin/Deliveries/Edit', [
            'delivery' => $delivery,
        ]);
    }

    public function update(DeliveryRequest $request, Delivery $delivery): RedirectResponse
    {
        $data = $request->safe()->except('photo');

        if ($request->hasFile('photo')) {
            Storage::disk('public')->delete($delivery->photo_path);
            $data['photo_path'] = $request->file('photo')->store('deliveries', 'public');
        }

        $delivery->update($data);

        return redirect()->route('admin.deliveries.index')->with('success', 'Entrega actualizada.');
    }

    public function destroy(Delivery $delivery): RedirectResponse
    {
        Storage::disk('public')->delete($delivery->photo_path);
        $delivery->delete();

        return back()->with('success', 'Entrega eliminada.');
    }
}
