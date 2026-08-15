<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DealershipSetting extends Model
{
    protected $fillable = [
        'address',
        'phone',
        'whatsapp',
        'email',
        'hours_text',
        'map_embed_url',
        'facebook_url',
        'instagram_url',
        'tiktok_url',
        'hero_headline',
        'hero_subheadline',
        'testimonial_video_path',
        'testimonial_video_customer_name',
        'testimonial_video_comment',
        'testimonial_video_rating',
    ];

    protected function casts(): array
    {
        return [
            'testimonial_video_rating' => 'integer',
        ];
    }

    protected $appends = ['testimonial_video_url'];

    public static function current(): self
    {
        return static::query()->firstOrCreate([]);
    }

    public function getTestimonialVideoUrlAttribute(): ?string
    {
        return $this->testimonial_video_path ? asset('storage/'.$this->testimonial_video_path) : null;
    }
}
