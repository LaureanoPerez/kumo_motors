<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Delivery;
use App\Models\Review;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Site/Reviews', [
            'reviews' => Review::query()
                ->published()
                ->with('vehicle:id,brand,model,slug')
                ->latest()
                ->get(),
            'deliveries' => Delivery::query()
                ->published()
                ->latest()
                ->get(),
        ]);
    }
}
