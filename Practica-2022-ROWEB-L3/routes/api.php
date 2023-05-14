<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PaintController;
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

    Route::post('/paint/{id}/buy', [PaintController::class, 'buy']);

});


Route::post('/paint/create', [PaintController::class, 'store']);
Route::delete('/paint/delete/{id}', [PaintController::class, 'destroy']);
Route::get('/paint/findall', [PaintController::class, 'index']);
Route::get('/paint/{id}', [PaintController::class, 'findPaint']);


// Get all books
Route::get('/books', [BookController::class, 'index'])->name('books.index');
// Show the form for creating a new book
Route::get('/books/create', [BookController::class, 'create'])->name('books.create');
// Store a newly created book in the database
Route::post('/books', [BookController::class, 'store'])->name('books.store');
// Display the specified book
Route::get('/books/{book}', [BookController::class, 'show'])->name('books.show');
// Show the form for editing the specified book
Route::get('/books/{book}/edit', [BookController::class, 'edit'])->name('books.edit');
// Update the specified book in the database
Route::put('/books/{book}', [BookController::class, 'update'])->name('books.update');
// Remove the specified book from the database
Route::delete('/books/{book}', [BookController::class, 'destroy'])->name('books.destroy');


// Get all ticket
Route::get('/ticket', [TicketController::class, 'index'])->name('ticket.index');
// Show the form for creating a new book
Route::get('/ticket/create', [TicketController::class, 'create'])->name('ticket.create');
// Store a newly created book in the database
Route::post('/ticket', [TicketController::class, 'store'])->name('ticket.store');
// Display the specified book
Route::get('/ticket/{ticket}', [TicketController::class, 'show'])->name('ticket.show');
// Show the form for editing the specified book
Route::get('/ticket/{ticket}/edit', [TicketController::class, 'edit'])->name('ticket.edit');
// Update the specified book in the database
Route::put('/ticket/{ticket}', [TicketController::class, 'update'])->name('ticket.update');
// Remove the specified book from the database
Route::delete('/ticket/{ticket}', [TicketController::class, 'destroy'])->name('ticket.destroy');
