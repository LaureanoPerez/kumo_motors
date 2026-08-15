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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('brand');
            $table->string('model');
            $table->unsignedSmallInteger('year');
            $table->decimal('price', 10, 2);
            $table->unsignedInteger('mileage')->default(0);
            $table->enum('transmission', ['manual', 'automatico']);
            $table->enum('fuel_type', ['gasolina', 'diesel', 'hibrido', 'electrico']);
            $table->string('body_type')->nullable();
            $table->string('color')->nullable();
            $table->enum('condition', ['nuevo', 'seminuevo'])->default('seminuevo');
            $table->unsignedTinyInteger('doors')->nullable();
            $table->string('engine')->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['disponible', 'apartado', 'vendido'])->default('disponible');
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
