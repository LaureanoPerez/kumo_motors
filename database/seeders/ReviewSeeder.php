<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $reviews = [
            ['customer_name' => 'María Fernanda Chan', 'rating' => 5, 'comment' => 'Excelente atención desde que llegué, me explicaron todo el proceso de financiamiento sin letras chiquitas. Muy contenta con mi auto.'],
            ['customer_name' => 'Jorge Luis Poot', 'rating' => 5, 'comment' => 'Compré mi Duster con ellos y el trato fue súper honesto, tal cual su lema. Lo recomiendo ampliamente.'],
            ['customer_name' => 'Ana Sofía Ek', 'rating' => 4, 'comment' => 'Buen inventario y precios justos. El trámite tardó un poco pero el resultado valió la pena.'],
            ['customer_name' => 'Roberto Cauich', 'rating' => 5, 'comment' => 'Ya es mi segunda compra con Kumo Motors, siempre transparentes con el estado de los autos.'],
            ['customer_name' => 'Daniela Uc', 'rating' => 5, 'comment' => 'Me encantó la asesoría personalizada, encontraron el auto perfecto para mi presupuesto.'],
            ['customer_name' => 'Carlos Pérez Novelo', 'rating' => 4, 'comment' => 'Buena experiencia en general, el equipo fue muy paciente respondiendo mis dudas por WhatsApp.'],
        ];

        foreach ($reviews as $review) {
            Review::create([
                ...$review,
                'vehicle_id' => Vehicle::inRandomOrder()->value('id'),
                'is_published' => true,
            ]);
        }
    }
}
