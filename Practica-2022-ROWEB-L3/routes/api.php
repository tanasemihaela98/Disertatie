<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);

Route::post('/verify-email', [UserController::class, 'verifyEmail']);
Route::post('/resend-verify-email', [UserController::class, 'resendVerifyEmail']);
Route::post('/forgot-password', [UserController::class, 'forgotPassword']);
Route::post('/change-password', [UserController::class, 'changePassword']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user/{id}', [UserController::class, 'getUser']);
    Route::post('/user', [UserController::class, 'updateProfile']);
    
    Route::post('/logout', [UserController::class, 'logout']);

    Route::get('/categories', [CategoryController::class, 'getAll']);
    Route::post('/category', [CategoryController::class, 'add']);
    Route::get('/category/{id}', [CategoryController::class, 'get']);
    Route::put('/category/{id}', [CategoryController::class, 'update']);
    Route::delete('/category/{id}', [CategoryController::class, 'delete']);
    Route::get('categories-tree', [CategoryController::class, 'tree']);

    Route::get('/product/{id}', [ProductController::class, 'get']);
    
    Route::get('/products', [ProductController::class, 'getAll']);
    Route::get('/products/{categoryId}', [ProductController::class, 'getAllProductsForCategory']);
    Route::post('/createproducts', [ProductController::class, 'add']);
    Route::post('/updateproducts/{id}', [ProductController::class, 'update']);
    Route::post('/product/{id}/image', [ProductController::class, 'updateImage']);
    Route::delete('/deleteproducts/{id}', [ProductController::class, 'delete']);
    Route::get('/get-product/{id}', [ProductController::class, 'getProduct']);
});
