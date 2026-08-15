<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GalleryItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => ['required', Rule::in(['foto', 'video'])],
            'title' => ['required', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:255'],
            'photo' => ['required_if:type,foto', 'nullable', 'image', 'max:4096'],
            'video_url' => ['required_if:type,video', 'nullable', 'url', 'max:255'],
            'order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
