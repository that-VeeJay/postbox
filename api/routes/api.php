<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::patch("/profile/update", [UserController::class, 'update'])->middleware('auth:sanctum');

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);

Route::delete('/posts/{post}', [PostController::class, 'destroy'])->middleware('auth:sanctum');
Route::post('/posts', [PostController::class, 'store'])->middleware('auth:sanctum');

Route::get('/users/{id}/posts', [PostController::class, 'getPosts'])->middleware('auth:sanctum');

Route::get('/posts/{post}/comments', [CommentController::class, 'index']);
Route::post('/posts/comments', [CommentController::class, 'store'])->middleware('auth:sanctum');
Route::post('/posts/replies', [CommentController::class, 'store_reply'])->middleware('auth:sanctum');
Route::get('/posts/replies/{reply}', [CommentController::class, 'show_reply']);

Route::get('/posts/comments/{reply}/has-replies', [CommentController::class, 'check_replies_exist']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
