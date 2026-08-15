<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Site/Gallery', [
            'items' => GalleryItem::query()->orderBy('order')->latest()->get(),
        ]);
    }
}
