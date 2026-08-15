<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\GalleryItemRequest;
use App\Models\GalleryItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Gallery/Index', [
            'items' => GalleryItem::query()->orderBy('order')->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Gallery/Create');
    }

    public function store(GalleryItemRequest $request): RedirectResponse
    {
        $data = $request->safe()->except('photo');

        if ($request->hasFile('photo')) {
            $data['path'] = $request->file('photo')->store('gallery', 'public');
        }

        GalleryItem::create($data);

        return redirect()->route('admin.gallery.index')->with('success', 'Elemento agregado a la galería.');
    }

    public function edit(GalleryItem $galleryItem): Response
    {
        return Inertia::render('Admin/Gallery/Edit', [
            'item' => $galleryItem,
        ]);
    }

    public function update(GalleryItemRequest $request, GalleryItem $galleryItem): RedirectResponse
    {
        $data = $request->safe()->except('photo');

        if ($request->hasFile('photo')) {
            if ($galleryItem->path) {
                Storage::disk('public')->delete($galleryItem->path);
            }
            $data['path'] = $request->file('photo')->store('gallery', 'public');
        }

        $galleryItem->update($data);

        return redirect()->route('admin.gallery.index')->with('success', 'Elemento actualizado.');
    }

    public function destroy(GalleryItem $galleryItem): RedirectResponse
    {
        if ($galleryItem->path) {
            Storage::disk('public')->delete($galleryItem->path);
        }

        $galleryItem->delete();

        return back()->with('success', 'Elemento eliminado.');
    }
}
