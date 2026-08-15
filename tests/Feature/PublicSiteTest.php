<?php

use App\Models\Vehicle;

it('shows the public pages', function () {
    $this->get('/')->assertOk();
    $this->get('/catalogo')->assertOk();
    $this->get('/nosotros')->assertOk();
    $this->get('/galeria')->assertOk();
    $this->get('/resenas')->assertOk();
    $this->get('/contacto')->assertOk();
});

it('shows a vehicle detail page by slug', function () {
    $vehicle = Vehicle::factory()->create(['slug' => 'auto-de-prueba']);

    $this->get('/catalogo/auto-de-prueba')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('Site/Catalog/Show')
            ->where('vehicle.id', $vehicle->id));
});

it('stores a contact lead', function () {
    $this->post('/contacto', [
        'name' => 'Juan Pérez',
        'email' => 'juan@example.com',
        'phone' => '9981234567',
        'message' => 'Quiero más información.',
    ])->assertRedirect();

    $this->assertDatabaseHas('leads', [
        'email' => 'juan@example.com',
        'source' => 'contacto',
    ]);
});
