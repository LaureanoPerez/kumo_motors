<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ReviewRequest;
use App\Models\Review;
use App\Models\Vehicle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Reviews/Index', [
            'reviews' => Review::query()->with('vehicle:id,brand,model')->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Reviews/Create', [
            'vehicles' => Vehicle::query()->orderBy('brand')->get(['id', 'brand', 'model', 'year']),
        ]);
    }

    public function store(ReviewRequest $request): RedirectResponse
    {
        $data = $request->safe()->except('photo');

        if ($request->hasFile('photo')) {
            $data['photo_path'] = $request->file('photo')->store('reviews', 'public');
        }

        Review::create($data);

        return redirect()->route('admin.reviews.index')->with('success', 'Reseña agregada.');
    }

    public function edit(Review $review): Response
    {
        return Inertia::render('Admin/Reviews/Edit', [
            'review' => $review,
            'vehicles' => Vehicle::query()->orderBy('brand')->get(['id', 'brand', 'model', 'year']),
        ]);
    }

    public function update(ReviewRequest $request, Review $review): RedirectResponse
    {
        $data = $request->safe()->except('photo');

        if ($request->hasFile('photo')) {
            if ($review->photo_path) {
                Storage::disk('public')->delete($review->photo_path);
            }
            $data['photo_path'] = $request->file('photo')->store('reviews', 'public');
        }

        $review->update($data);

        return redirect()->route('admin.reviews.index')->with('success', 'Reseña actualizada.');
    }

    public function destroy(Review $review): RedirectResponse
    {
        if ($review->photo_path) {
            Storage::disk('public')->delete($review->photo_path);
        }

        $review->delete();

        return back()->with('success', 'Reseña eliminada.');
    }
}
