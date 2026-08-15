<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Site/About', [
            'missionPhoto' => GalleryItem::query()->where('type', 'foto')->orderBy('order')->skip(1)->first(),
        ]);
    }
}
