<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class SettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'address' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'whatsapp' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:255'],
            'hours_text' => ['nullable', 'string', 'max:255'],
            'map_embed_url' => ['nullable', 'string', 'max:5000'],
            'facebook_url' => ['nullable', 'url', 'max:255'],
            'instagram_url' => ['nullable', 'url', 'max:255'],
            'tiktok_url' => ['nullable', 'url', 'max:255'],
            'hero_headline' => ['nullable', 'string', 'max:255'],
            'hero_subheadline' => ['nullable', 'string', 'max:255'],
            'testimonial_video' => ['nullable', 'mimes:mp4,mov,webm', 'max:51200'],
            'testimonial_video_customer_name' => ['nullable', 'string', 'max:255'],
            'testimonial_video_comment' => ['nullable', 'string', 'max:1000'],
            'testimonial_video_rating' => ['nullable', 'integer', 'min:1', 'max:5'],
        ];
    }
}
