<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PaintController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CartController;
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
    Route::post('/user/{user}', [UserController::class, 'updateProfile']);

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

    Route::post('/paint/{id}/buy', [PaintController::class, 'buy']);
});


Route::post('/paint/create', [PaintController::class, 'store']);
Route::post('/paint/update/{id}', [PaintController::class, 'update']);
Route::delete('/paint/delete/{id}', [PaintController::class, 'destroy']);
Route::get('/paint/findall', [PaintController::class, 'index']);
Route::get('/paint/{id}', [PaintController::class, 'findPaint']);


Route::get('/books', [BookController::class, 'index'])->name('books.index');
Route::get('/books/create', [BookController::class, 'create'])->name('books.create');
Route::post('/books', [BookController::class, 'store'])->name('books.store');
Route::get('/books/{book}', [BookController::class, 'show'])->name('books.show');
Route::get('/books/{book}/edit', [BookController::class, 'edit'])->name('books.edit');
Route::put('/books/{book}', [BookController::class, 'update'])->name('books.update');
Route::delete('/books/{book}', [BookController::class, 'destroy'])->name('books.destroy');


Route::get('/ticket', [TicketController::class, 'index'])->name('ticket.index');
Route::get('/ticket/create', [TicketController::class, 'create'])->name('ticket.create');
Route::post('/ticket', [TicketController::class, 'store'])->name('ticket.store');
Route::get('/ticket/{ticket}', [TicketController::class, 'show'])->name('ticket.show');
Route::get('/ticket/{ticket}/edit', [TicketController::class, 'edit'])->name('ticket.edit');
Route::put('/ticket/{ticket}', [TicketController::class, 'update'])->name('ticket.update');
Route::delete('/ticket/{ticket}', [TicketController::class, 'destroy'])->name('ticket.destroy');


Route::get('/cart/orders', [CartController::class, 'orders']);
Route::get('/carts', [CartController::class, 'index'])->name('carts.index');
Route::post('/carts', [CartController::class, 'store'])->name('carts.store');
Route::put('/carts/{user}', [CartController::class, 'update'])->name('carts.update');
Route::put('/cart/deliver/{cart}', [CartController::class, 'deliver'])->name('carts.deliver');
Route::put('/cart/{cart}', [CartController::class, 'size'])->name('carts.size');
Route::delete('/carts/{cart}', [CartController::class, 'destroy'])->name('carts.destroy');

Route::get('/contacts', [ContactController::class, 'findAllContacts'])->name('findAllContacts');
Route::delete('/contact/{id}', [ContactController::class, 'deleteContact'])->name('deleteContact');
Route::post('/contact', [ContactController::class, 'createContact'])->name('createContact');
Route::put('/contact/{id}', [ContactController::class, 'updateContact'])->name('updateContact');