<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\Vehicle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'brand', 'body_type', 'transmission', 'fuel_type', 'condition', 'min_price', 'max_price']);

        $vehicles = Vehicle::query()
            ->available()
            ->with('photos')
            ->when($filters['search'] ?? null, fn ($q, $term) => $q->where(fn ($q2) => $q2
                ->where('brand', 'like', "%{$term}%")
                ->orWhere('model', 'like', "%{$term}%")))
            ->when($filters['brand'] ?? null, fn ($q, $brand) => $q->where('brand', $brand))
            ->when($filters['body_type'] ?? null, fn ($q, $v) => $q->where('body_type', $v))
            ->when($filters['transmission'] ?? null, fn ($q, $v) => $q->where('transmission', $v))
            ->when($filters['fuel_type'] ?? null, fn ($q, $v) => $q->where('fuel_type', $v))
            ->when($filters['condition'] ?? null, fn ($q, $v) => $q->where('condition', $v))
            ->when($filters['min_price'] ?? null, fn ($q, $v) => $q->where('price', '>=', $v))
            ->when($filters['max_price'] ?? null, fn ($q, $v) => $q->where('price', '<=', $v))
            ->orderByDesc('is_featured')
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Site/Catalog/Index', [
            'vehicles' => $vehicles,
            'filters' => $filters,
            'brands' => Vehicle::query()->available()->distinct()->orderBy('brand')->pluck('brand'),
            'bodyTypes' => Vehicle::query()->available()->whereNotNull('body_type')->distinct()->orderBy('body_type')->pluck('body_type'),
        ]);
    }

    public function show(Vehicle $vehicle): Response
    {
        $vehicle->load('photos');

        return Inertia::render('Site/Catalog/Show', [
            'vehicle' => $vehicle,
            'similarVehicles' => Vehicle::query()
                ->available()
                ->where('id', '!=', $vehicle->id)
                ->with('photos')
                ->orderByRaw('brand = ? desc', [$vehicle->brand])
                ->latest()
                ->take(6)
                ->get(),
        ]);
    }

    public function storeInquiry(Request $request, Vehicle $vehicle): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        Lead::create([
            ...$data,
            'vehicle_id' => $vehicle->id,
            'source' => 'vehiculo',
        ]);

        return back()->with('success', 'Gracias por tu interés, un asesor te contactará pronto.');
    }
}
