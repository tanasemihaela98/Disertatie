<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends ApiController
{
    // Display a listing of the books
    public function index()
    {
        $books = Book::all();
        return view('books.index', compact('books'));
    }

    // Show the form for creating a new book
    public function create()
    {
        return view('books.create');
    }

    // Store a newly created book in the database
    public function store(Request $request)
    {
        $request->validate([
        'title' => 'required',
        'author' => 'required',
        ]);

        Book::create($request->all());

        return redirect()->route('books.index')
        ->with('success', 'Book created successfully.');
    }

    // Display the specified book
    public function show(Book $book)
    {
        return view('books.show', compact('book'));
    }

    // Show the form for editing the specified book
    public function edit(Book $book)
    {
        return view('books.edit', compact('book'));
    }

    // Update the specified book in the database
    public function update(Request $request, Book $book)
    {
        $request->validate([
        'title' => 'required',
        'author' => 'required',
        ]);

        $book->update($request->all());

        return redirect()->route('books.index')
        ->with('success', 'Book updated successfully.');
    }

    // Remove the specified book from the database
    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->route('books.index')
        ->with('success', 'Book deleted successfully.');
    }
}
