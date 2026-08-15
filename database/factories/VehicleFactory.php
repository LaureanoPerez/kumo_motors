<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class VehicleFactory extends Factory
{
    public function definition(): array
    {
        $brand = fake()->randomElement(['Renault', 'Nissan', 'Toyota', 'Kia']);
        $model = fake()->word();
        $year = fake()->numberBetween(2018, now()->year);

        return [
            'slug' => Str::slug("{$brand}-{$model}-{$year}-".fake()->unique()->numberBetween(1, 100000)),
            'brand' => $brand,
            'model' => $model,
            'year' => $year,
            'price' => fake()->numberBetween(150000, 450000),
            'mileage' => fake()->numberBetween(0, 80000),
            'transmission' => fake()->randomElement(['manual', 'automatico']),
            'fuel_type' => fake()->randomElement(['gasolina', 'diesel', 'hibrido', 'electrico']),
            'body_type' => fake()->randomElement(['Sedán', 'SUV', 'Hatchback']),
            'color' => fake()->safeColorName(),
            'condition' => fake()->randomElement(['nuevo', 'seminuevo']),
            'doors' => fake()->randomElement([2, 4, 5]),
            'engine' => '1.6L 4 cil.',
            'description' => fake()->sentence(),
            'status' => 'disponible',
            'is_featured' => false,
        ];
    }
}
