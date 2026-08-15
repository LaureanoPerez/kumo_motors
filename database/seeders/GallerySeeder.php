<?php

namespace Database\Seeders;

use App\Models\GalleryItem;
use App\Support\PlaceholderImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $photos = [
            ['title' => 'Nuestras instalaciones', 'caption' => 'Showroom principal en Cancún'],
            ['title' => 'Área de exhibición', 'caption' => 'Autos seminuevos certificados'],
            ['title' => 'Equipo Kumo Motors', 'caption' => 'Listos para asesorarte'],
            ['title' => 'Entrega de auto', 'caption' => 'Otro cliente satisfecho'],
        ];

        foreach ($photos as $index => $photo) {
            $contents = PlaceholderImage::make(['KUMO MOTORS', $photo['title']]);
            $path = "gallery/photo-{$index}.jpg";
            Storage::disk('public')->put($path, $contents);

            GalleryItem::create([
                'type' => 'foto',
                'title' => $photo['title'],
                'caption' => $photo['caption'],
                'path' => $path,
                'order' => $index,
            ]);
        }

        // Nota: no se siembran videos de ejemplo porque requerirían enlazar a
        // un video real de YouTube/Vimeo. El admin puede agregar los suyos
        // desde /admin/gallery en cuanto tenga el material grabado.
    }
}
