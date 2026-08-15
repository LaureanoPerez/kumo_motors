<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VehicleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'brand' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'year' => ['required', 'integer', 'min:1980', 'max:'.(date('Y') + 1)],
            'price' => ['required', 'numeric', 'min:0'],
            'mileage' => ['required', 'integer', 'min:0'],
            'transmission' => ['required', Rule::in(['manual', 'automatico'])],
            'fuel_type' => ['required', Rule::in(['gasolina', 'diesel', 'hibrido', 'electrico'])],
            'body_type' => ['nullable', 'string', 'max:255'],
            'color' => ['nullable', 'string', 'max:255'],
            'condition' => ['required', Rule::in(['nuevo', 'seminuevo'])],
            'doors' => ['nullable', 'integer', 'min:1', 'max:6'],
            'engine' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'features' => ['nullable', 'string', 'max:3000'],
            'status' => ['required', Rule::in(['disponible', 'apartado', 'vendido'])],
            'is_featured' => ['boolean'],
            'photos' => ['nullable', 'array'],
            'photos.*' => ['image', 'max:4096'],
        ];
    }
}
