<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Site\AboutController;
use App\Http\Controllers\Site\ContactController;
use App\Http\Controllers\Site\GalleryController;
use App\Http\Controllers\Site\HomeController;
use App\Http\Controllers\Site\ReviewController;
use App\Http\Controllers\Site\VehicleController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/catalogo', [VehicleController::class, 'index'])->name('catalog.index');
Route::get('/catalogo/{vehicle:slug}', [VehicleController::class, 'show'])->name('catalog.show');
Route::post('/catalogo/{vehicle:slug}/interes', [VehicleController::class, 'storeInquiry'])->name('catalog.inquiry');

Route::get('/nosotros', [AboutController::class, 'index'])->name('about');
Route::get('/galeria', [GalleryController::class, 'index'])->name('gallery.index');
Route::get('/resenas', [ReviewController::class, 'index'])->name('reviews.index');

Route::get('/contacto', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contacto', [ContactController::class, 'store'])->name('contact.store');

Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
