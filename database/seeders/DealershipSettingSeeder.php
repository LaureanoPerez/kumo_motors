<?php

namespace Database\Seeders;

use App\Models\DealershipSetting;
use Illuminate\Database\Seeder;

class DealershipSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = DealershipSetting::current();

        $settings->update([
            'address' => 'Av. Bonampak Mza 2, Lote 2, SM 3, 77500 Cancún, Q.R.',
            'phone' => '998 123 4567',
            'whatsapp' => '529981234567',
            'email' => 'contacto@kumomotors.com',
            'hours_text' => 'Lunes a sábado de 9:00 a 19:00 hrs',
            'map_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18753.55005971375!2d-86.82837150770904!3d21.14540851418766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4c2bbcccf5f36f%3A0x9292707424b50383!2sKumo%20Motors%20Seminuevos%20-%20Canc%C3%BAn!5e0!3m2!1ses!2smx!4v1786079525289!5m2!1ses!2smx',
            'facebook_url' => 'https://facebook.com/kumomotors',
            'instagram_url' => 'https://instagram.com/kumomotors',
            'tiktok_url' => 'https://tiktok.com/@kumomotors',
            'hero_headline' => 'La Manera más fácil de comprar el auto de tus sueños.',
            'hero_subheadline' => 'Autos seminuevos certificados, con planes de financiamiento de 12 a 60 meses.',
        ]);
    }
}
