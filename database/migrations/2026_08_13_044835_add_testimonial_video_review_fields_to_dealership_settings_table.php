<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('dealership_settings', function (Blueprint $table) {
            $table->string('testimonial_video_customer_name')->nullable()->after('testimonial_video_path');
            $table->text('testimonial_video_comment')->nullable()->after('testimonial_video_customer_name');
            $table->unsignedTinyInteger('testimonial_video_rating')->nullable()->after('testimonial_video_comment');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dealership_settings', function (Blueprint $table) {
            $table->dropColumn([
                'testimonial_video_customer_name',
                'testimonial_video_comment',
                'testimonial_video_rating',
            ]);
        });
    }
};
