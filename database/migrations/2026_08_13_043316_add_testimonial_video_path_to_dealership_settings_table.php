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
            $table->string('testimonial_video_path')->nullable()->after('hero_subheadline');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dealership_settings', function (Blueprint $table) {
            $table->dropColumn('testimonial_video_path');
        });
    }
};
