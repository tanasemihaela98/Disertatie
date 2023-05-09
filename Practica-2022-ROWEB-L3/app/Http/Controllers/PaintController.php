<?php

namespace App\Http\Controllers;

use App\Models\Paint;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class PaintController extends ApiController
{
    public function index()
    {
        $paints = Paint::All();
        return $this->sendResponse($paints->toArray(), Response::HTTP_OK);
    }

    public function create()
    {
        //
    }

    public function store(Request $request): JsonResponse
    {
        $paint = new Paint();
        $paint->name = $request->get('name');
        $paint->author = $request->get('author');
        $paint->price = $request->get('price');
        $paint->bid = $request->get('bid');
        $paint->ownned = $request->get('ownned');
        $paint->painted_at = $request->get('painted_at');
        $paint->description = $request->get('description');
        $paint->save();

        return $this->sendResponse($paint->toArray(), Response::HTTP_CREATED);
    }

    public function show(Paint $paint)
    {
        //
    }

    public function edit(Paint $paint)
    {
        //
    }

    public function update(Request $request, Paint $paint)
    {
        //
    }

    public function destroy($id)
    {
        $paint = Paint::find($id);
        $paint->delete();
        return $this->sendResponse($paint->toArray(), Response::HTTP_OK);
    }

    public function findPaint($id)
    {
        $paint = Paint::find($id);
        return $this->sendResponse($paint->toArray(), Response::HTTP_OK);
    }

    public function buy($id)
    {
        $paint = Paint::find($id);
        $user = Auth::user();
        dd($user);

        return $this->sendResponse($paint->toArray(), Response::HTTP_OK);
    }
}
