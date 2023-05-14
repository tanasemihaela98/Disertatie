<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends ApiController
{
    // Display a listing of the tickets
    public function index()
    {
        $tickets = Ticket::all();
        return view('tickets.index', compact('tickets'));
    }

    // Show the form for creating a new ticket
    public function create()
    {
        return view('tickets.create');
    }

    // Store a newly created ticket in the database
    public function store(Request $request)
    {
        $request->validate([
        'user_id' => 'required',
        'persons' => 'required',
        'location' => 'required',
        'schedule' => 'required',
        ]);

        Ticket::create($request->all());

        return redirect()->route('tickets.index')
        ->with('success', 'Ticket created successfully.');
    }

    // Display the specified ticket
    public function show(Ticket $ticket)
    {
        return view('tickets.show', compact('ticket'));
    }

    // Show the form for editing the specified ticket
    public function edit(Ticket $ticket)
    {
        return view('tickets.edit', compact('ticket'));
    }

    // Update the specified ticket in the database
    public function update(Request $request, Ticket $ticket)
    {
        $request->validate([
        'user_id' => 'required',
        'persons' => 'required',
        'location' => 'required',
        'schedule' => 'required',
        ]);

        $ticket->update($request->all());

        return redirect()->route('tickets.index')
        ->with('success', 'Ticket updated successfully.');
    }

    // Remove the specified ticket from the database
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return redirect()->route('tickets.index')
        ->with('success', 'Ticket deleted successfully.');
    }
}
