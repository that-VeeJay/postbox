<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
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
    Route::get('/{post}','show');
    Route::post('/', 'store')->middleware('auth:sanctum');
    Route::delete('/{post}', 'destroy')->middleware('auth:sanctum');
    Route::get('/user/{user}', 'getUserPosts')->middleware('auth:sanctum');
});

// Comment and Reply Routes
Route::prefix('comments')->controller(CommentController::class)->group(function() {
    Route::get('/post/{post}', 'index');
    Route::post('/', 'store')->middleware('auth:sanctum');
    Route::delete('/{comment}', 'destroy')->middleware('auth:sanctum');
    Route::patch("/{comment}", 'update')->middleware('auth:sanctum');

    Route::post('/reply', 'storeReply')->middleware('auth:sanctum');
    Route::get('/reply/{reply}', 'showReply');
    Route::get('/reply/{reply}/has-replies', 'checkRepliesExist');
});
