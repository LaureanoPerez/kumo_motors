<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\Review;
use App\Models\Vehicle;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'vehicles' => Vehicle::count(),
                'vehiclesAvailable' => Vehicle::available()->count(),
                'newLeads' => Lead::where('status', 'nuevo')->count(),
                'pendingReviews' => Review::where('is_published', false)->count(),
            ],
            'recentLeads' => Lead::with('vehicle:id,brand,model')->latest()->take(5)->get(),
        ]);
    }
}
