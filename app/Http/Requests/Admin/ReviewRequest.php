<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_name' => ['required', 'string', 'max:255'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['required', 'string', 'max:2000'],
            'vehicle_id' => ['nullable', 'exists:vehicles,id'],
            'photo' => ['nullable', 'image', 'max:4096'],
            'is_published' => ['boolean'],
        ];
    }
}
