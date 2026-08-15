<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Delivery;
use App\Models\GalleryItem;
use App\Models\Vehicle;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Site/Home', [
            'featuredVehicles' => Vehicle::query()
                ->available()
                ->with('photos')
                ->orderByDesc('is_featured')
                ->latest()
                ->take(6)
                ->get(),
            'deliveries' => Delivery::query()
                ->published()
                ->latest()
                ->take(3)
                ->get(),
            'heroPhoto' => GalleryItem::query()->where('type', 'foto')->orderBy('order')->first(),
        ]);
    }
}
