<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Models\Contact;

class ContactController extends ApiController
{
    public function findAllContacts(): JsonResponse
    {
        $contacts = Contact::All();
        return $this->sendResponse($contacts->toArray(), Response::HTTP_OK);
    }

    public function createContact(Request $request): JsonResponse
    {
        $contact = new Contact();
        $contact->email = $request->get('email');
        $contact->title = $request->get('title');
        $contact->message = $request->get('message');
        $contact->save();

        return $this->sendResponse($contact->toArray(), Response::HTTP_CREATED);
    }

    public function updateContact($id): JsonResponse
    {
        $contact = Contact::find($id);
        $contact->status = "read";
        $contact->save();
        return $this->sendResponse($contact->toArray(), Response::HTTP_OK);
    }

    public function deleteContact($id): JsonResponse
    {
        $contact = Contact::find($id);
        $contact->delete();
        return $this->sendResponse($contact->toArray(), Response::HTTP_OK);
    }
}
