<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
//use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\Auth\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/refresh', [AuthController::class, 'refreshToken']);

Route::controller(UserController::class)->group(function () {
    Route::get('users/users-paginate', [UserController::class, 'searchPaginate']);
    Route::resource('users', UserController::class)->middleware('auth:api');
});
