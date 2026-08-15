<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DeliveryController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\LeadController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\VehicleController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('vehicles', VehicleController::class)->except('show');
    Route::delete('vehicles/photos/{photo}', [VehicleController::class, 'destroyPhoto'])->name('vehicles.photos.destroy');
    Route::patch('vehicles/{vehicle}/photos/reorder', [VehicleController::class, 'reorderPhotos'])->name('vehicles.photos.reorder');

    Route::resource('gallery', GalleryController::class)->except('show')->parameters(['gallery' => 'galleryItem']);

    Route::resource('reviews', ReviewController::class)->except('show');

    Route::resource('deliveries', DeliveryController::class)->except('show');

    Route::get('leads', [LeadController::class, 'index'])->name('leads.index');
    Route::patch('leads/{lead}', [LeadController::class, 'update'])->name('leads.update');
    Route::delete('leads/{lead}', [LeadController::class, 'destroy'])->name('leads.destroy');

    Route::get('settings', [SettingController::class, 'edit'])->name('settings.edit');
    Route::patch('settings', [SettingController::class, 'update'])->name('settings.update');
});
