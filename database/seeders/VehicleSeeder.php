<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use App\Support\PlaceholderImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $vehicles = [
            [
                'brand' => 'Renault', 'model' => 'Duster Zen', 'year' => 2020,
                'price' => 289000, 'mileage' => 42000, 'transmission' => 'manual',
                'fuel_type' => 'gasolina', 'body_type' => 'SUV', 'color' => 'Rojo',
                'condition' => 'seminuevo', 'doors' => 5, 'engine' => '2.0L 4 cil.',
                'status' => 'disponible', 'is_featured' => true,
                'description' => 'Renault Duster Zen 2020 en excelente estado, único dueño, servicios de agencia al día. Ideal para ciudad y carretera.',
                'features' => "Aire acondicionado\nRines de aleación\nSensores de reversa\nControl de estabilidad",
            ],
            [
                'brand' => 'Nissan', 'model' => 'Versa Sense', 'year' => 2021,
                'price' => 245000, 'mileage' => 28000, 'transmission' => 'automatico',
                'fuel_type' => 'gasolina', 'body_type' => 'Sedán', 'color' => 'Blanco',
                'condition' => 'seminuevo', 'doors' => 4, 'engine' => '1.6L 4 cil.',
                'status' => 'disponible', 'is_featured' => true,
                'description' => 'Versa Sense automático, bajo kilometraje, aire acondicionado, pantalla táctil y cámara de reversa.',
                'features' => "Pantalla táctil con Android Auto/Apple CarPlay\nCámara de reversa\nBolsas de aire frontales y laterales\nCierre centralizado",
            ],
            [
                'brand' => 'Chevrolet', 'model' => 'Aveo LT', 'year' => 2022,
                'price' => 219000, 'mileage' => 19000, 'transmission' => 'manual',
                'fuel_type' => 'gasolina', 'body_type' => 'Sedán', 'color' => 'Gris',
                'condition' => 'seminuevo', 'doors' => 4, 'engine' => '1.5L 4 cil.',
                'status' => 'disponible', 'is_featured' => false,
                'description' => 'Aveo LT con muy poco uso, rendimiento de gasolina excelente, perfecto primer auto.',
            ],
            [
                'brand' => 'Kia', 'model' => 'Rio EX', 'year' => 2023,
                'price' => 298000, 'mileage' => 12000, 'transmission' => 'automatico',
                'fuel_type' => 'gasolina', 'body_type' => 'Hatchback', 'color' => 'Azul',
                'condition' => 'seminuevo', 'doors' => 4, 'engine' => '1.6L 4 cil.',
                'status' => 'disponible', 'is_featured' => true,
                'description' => 'Kia Rio EX prácticamente nuevo, garantía de agencia vigente, equipado con sensores de proximidad.',
            ],
            [
                'brand' => 'Volkswagen', 'model' => 'Vento Comfortline', 'year' => 2019,
                'price' => 235000, 'mileage' => 55000, 'transmission' => 'automatico',
                'fuel_type' => 'gasolina', 'body_type' => 'Sedán', 'color' => 'Negro',
                'condition' => 'seminuevo', 'doors' => 4, 'engine' => '1.6L 4 cil.',
                'status' => 'apartado', 'is_featured' => false,
                'description' => 'Vento Comfortline con quemacocos, rines de aleación y climatizador automático.',
            ],
            [
                'brand' => 'Toyota', 'model' => 'Yaris Core', 'year' => 2022,
                'price' => 268000, 'mileage' => 21000, 'transmission' => 'manual',
                'fuel_type' => 'gasolina', 'body_type' => 'Sedán', 'color' => 'Plata',
                'condition' => 'seminuevo', 'doors' => 4, 'engine' => '1.5L 4 cil.',
                'status' => 'disponible', 'is_featured' => false,
                'description' => 'Yaris Core confiable y económico, mantenimientos de agencia documentados.',
            ],
            [
                'brand' => 'Mazda', 'model' => 'CX-30 i Sport', 'year' => 2021,
                'price' => 385000, 'mileage' => 33000, 'transmission' => 'automatico',
                'fuel_type' => 'gasolina', 'body_type' => 'SUV', 'color' => 'Rojo',
                'condition' => 'seminuevo', 'doors' => 5, 'engine' => '2.0L 4 cil.',
                'status' => 'disponible', 'is_featured' => true,
                'description' => 'Mazda CX-30 totalmente equipada, interior en piel, pantalla de 8.8", cámara 360°.',
            ],
            [
                'brand' => 'Hyundai', 'model' => 'Grand i10', 'year' => 2020,
                'price' => 189000, 'mileage' => 47000, 'transmission' => 'manual',
                'fuel_type' => 'gasolina', 'body_type' => 'Hatchback', 'color' => 'Blanco',
                'condition' => 'seminuevo', 'doors' => 5, 'engine' => '1.2L 4 cil.',
                'status' => 'vendido', 'is_featured' => false,
                'description' => 'Grand i10 ágil y económico, ideal para ciudad.',
            ],
        ];

        foreach ($vehicles as $data) {
            $slug = $this->uniqueSlug($data['brand'], $data['model'], $data['year']);

            $vehicle = Vehicle::create([...$data, 'slug' => $slug]);

            foreach (range(1, 2) as $i) {
                $contents = PlaceholderImage::make([
                    $data['brand'],
                    $data['model'],
                    (string) $data['year'],
                ]);

                $path = "vehicles/{$slug}-{$i}.jpg";
                Storage::disk('public')->put($path, $contents);

                $vehicle->photos()->create([
                    'path' => $path,
                    'order' => $i - 1,
                    'is_primary' => $i === 1,
                ]);
            }
        }
    }

    private function uniqueSlug(string $brand, string $model, int $year): string
    {
        $base = Str::slug("{$brand}-{$model}-{$year}");
        $slug = $base;
        $suffix = 1;

        while (Vehicle::where('slug', $slug)->exists()) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}
