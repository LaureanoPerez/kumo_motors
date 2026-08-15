<?php

use App\Models\User;

it('redirects guests to login', function () {
    $this->get('/admin')->assertRedirect('/login');
});

it('forbids non-admin users', function () {
    $user = User::factory()->create(['is_admin' => false]);

    $this->actingAs($user)->get('/admin')->assertForbidden();
});

it('allows admin users into the dashboard', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $this->actingAs($admin)->get('/admin')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('Admin/Dashboard'));
});
