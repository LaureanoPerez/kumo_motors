<?php

namespace App\Support;

class PlaceholderImage
{
    /**
     * Generate a simple branded placeholder JPEG (dark background, orange
     * diagonal accent, centered text) and return the raw image contents.
     *
     * @param  string[]  $lines
     */
    public static function make(array $lines, int $width = 800, int $height = 600): string
    {
        $image = imagecreatetruecolor($width, $height);

        $bg = imagecolorallocate($image, 17, 17, 17);
        $accent = imagecolorallocate($image, 234, 88, 12);
        $text = imagecolorallocate($image, 255, 255, 255);

        imagefilledrectangle($image, 0, 0, $width, $height, $bg);

        // Diagonal orange stripe accent, echoing the brand poster.
        imagefilledpolygon($image, [
            0, (int) ($height * 0.65),
            $width, (int) ($height * 0.35),
            $width, $height,
            0, $height,
        ], $accent);

        $font = 5;
        $lineHeight = imagefontheight($font) + 6;
        $startY = (int) ($height / 2 - (count($lines) * $lineHeight) / 2);

        foreach ($lines as $index => $line) {
            $charWidth = imagefontwidth($font);
            $x = (int) (($width - strlen($line) * $charWidth) / 2);
            $y = $startY + $index * $lineHeight;
            imagestring($image, $font, $x, $y, $line, $text);
        }

        ob_start();
        imagejpeg($image, null, 82);
        $contents = ob_get_clean();

        imagedestroy($image);

        return $contents;
    }
}
