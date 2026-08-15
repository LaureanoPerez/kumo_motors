<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SettingRequest;
use App\Models\DealershipSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/Settings/Edit', [
            'settings' => DealershipSetting::current(),
        ]);
    }

    public function update(SettingRequest $request): RedirectResponse
    {
        $settings = DealershipSetting::current();
        $data = $request->safe()->except('testimonial_video');

        if ($request->hasFile('testimonial_video')) {
            if ($settings->testimonial_video_path) {
                Storage::disk('public')->delete($settings->testimonial_video_path);
            }
            $data['testimonial_video_path'] = $request->file('testimonial_video')->store('videos', 'public');
        }

        $settings->update($data);

        return back()->with('success', 'Ajustes actualizados.');
    }
}
