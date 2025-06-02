<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostLikeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// Authenticated User Info
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Auth Routes
Route::controller(AuthController::class)->group(function() {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
});

// Profile Route
Route::patch("/profile/update", [UserController::class, 'update'])->middleware('auth:sanctum');

// Post Routes
Route::prefix('posts')->controller(PostController::class)->group(function() {
    Route::get('/', 'index');
    Route::get('/{slug}','show')->middleware('auth:sanctum');
    Route::post('/', 'store')->middleware('auth:sanctum');
    Route::delete('/{slug}', 'destroy')->middleware('auth:sanctum');
    Route::get('/user/{user}', 'userPosts')->middleware('auth:sanctum');

    Route::get('category/{category}', 'postsByCategory');
});

// Comment and Reply Routes
Route::prefix('comments')->controller(CommentController::class)->group(function() {
    Route::get('/{post}', 'index');
    Route::post('/', 'store')->middleware('auth:sanctum');
    Route::delete('/{comment}', 'destroy')->middleware('auth:sanctum');
    Route::patch("/{comment}", 'update')->middleware('auth:sanctum');
});

// Post interactions
Route::prefix('posts')->controller(PostLikeController::class)->group(function() {
    Route::post('/{post}/like', 'like')->middleware('auth:sanctum');
    Route::post('/{post}/unlike', 'unlike')->middleware('auth:sanctum');
});
