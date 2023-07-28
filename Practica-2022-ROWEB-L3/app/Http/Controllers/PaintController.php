<?php

namespace App\Http\Controllers;

use App\Models\Paint;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class PaintController extends ApiController
{
    public function index()
    {
        $paints = Paint::All();
        return $this->sendResponse($paints->toArray(), Response::HTTP_OK);
    }

    public function store(Request $request): JsonResponse
    {
        $paint = new Paint();
        $paint->name = $request->get('name');
        $paint->author = $request->get('author');
        $paint->price = $request->get('price');
        $paint->bid = 0;
        $paint->ownned = "asd"; 
        $paint->painted_at = Carbon::now();
        $paint->description = "aas";

        $originalFileName = $request->file('image')->getClientOriginalName();
        $fileName = uniqid() . '_' . $originalFileName;
        $path = $request->file('image')->storeAs('public', $fileName);
        // $url = asset('storage/' . $path);
        $paint->image = $fileName;

        $paint->save();

        return $this->sendResponse($paint->toArray(), Response::HTTP_CREATED);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $paint = Paint::findOrFail($id);
    
        $paint->name = $request->get('name');
        $paint->author = $request->get('author');
        $paint->price = $request->get('price');
        // $paint->bid = $request->get('bid');
        // $paint->ownned = $request->get('ownned');
        // $paint->painted_at = Carbon::now();
        // $paint->description = $request->get('description');
    
        if ($request->hasFile('image')) {
            // Delete the previous image if needed
            Storage::delete('public/' . $paint->image);
    
            $originalFileName = $request->file('image')->getClientOriginalName();
            $fileName = uniqid() . '_' . $originalFileName;
            $path = $request->file('image')->storeAs('public', $fileName);
            $paint->image = $fileName;
        }
    
        $paint->save();
        return $this->sendResponse($request->toArray(), Response::HTTP_OK);
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

    public function buy($id, Request $request)
    {

        $user = Auth::user();

        $paint = Paint::find($id);
        if($paint->bid > 0) {
            $paint->bid = $request->price;
        }
        $paint->ownned = $user->email;
        $paint->save();

        return $this->sendResponse($paint->toArray(), Response::HTTP_OK);
    }
}
