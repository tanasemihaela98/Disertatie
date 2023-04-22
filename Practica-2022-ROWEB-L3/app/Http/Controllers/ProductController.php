<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
// use Log;

/**
 *
 */
class ProductController extends ApiController
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getAll(Request $request): JsonResponse
    {
        try {
            $products = Product::query();

            $perPage = $request->get('perPage', 20);
            $search = $request->get('search', '');

            if ($search && $search !== '') {
                $products = $products->where(function ($query) use ($search) {
                    $query->where('name', 'LIKE', '%' . $search . '%')
                        ->orWhere('description', 'LIKE', '%' . $search . '%');
                });
            }

            $categoryId = $request->get('category');

            if ($categoryId) {
                $products = $products->where('category_id', $categoryId);
            }

            $status = $request->get('status');

            if ($status) {
                $products = $products->where('status', $status);
            }

            $products = $products->orderBy('id','DESC')->paginate($perPage);

            $results = [
                'data' => $products->items(),
                'currentPage' => $products->currentPage(),
                'perPage' => $products->perPage(),
                'total' => $products->total(),
                'hasMorePages' => $products->hasMorePages()
            ];

            return $this->sendResponse($results);
        } catch (Exception $exception) {
            Log::error($exception);

            return $this->sendError('Something went wrong, please contact administrator!', [], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function add(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|max:100',
                'category_id' => 'required|exists:categories,id',
                'description' => 'required',
                'quantity' => 'required|integer|numeric|min:0',
                'price' => 'required|numeric|min:0',
                'image' => 'nullable|image',
                'status' => 'nullable|in:' . Product::INACTIVE . ',' . Product::ACTIVE
            ]);

            if ($validator->fails()) {
                return $this->sendError('Bad request!', $validator->messages()->toArray());
            }
            
            DB::beginTransaction();

            /*$image = null;

            if ($request->has('image')) {
                $file = $request->file('image');
                $filename = 'P' . time() . '.' . $file->getClientOriginalExtension();
                $path = 'products/';
                Storage::putFileAs($path, $file, $filename);

                $image = $path . $filename;
            }*/
            $filename="";
            if($request->hasFile('image'))
            {   
                $file=$request->file('image');
                $filename= $request->file('image')->getClientOriginalName();
                $path='uploads/products/';
                $file->move($path,$filename);
                //$filename=$request->file('image')->storeAs('products',$request->file('image')->getClientOriginalName());
            }
            else
            {
                $filename=null;
            }

            $product = new Product();
            $product->name = $request->get('name');
            $product->category_id = $request->get('category_id');
            $product->description = $request->get('description');
            $product->quantity = $request->get('quantity');
            $product->price = $request->get('price');
            $product->image = $filename;
            $product->status = $request->get('status', Product::INACTIVE);
            $product->save();

            DB::commit();

            return $this->sendResponse($product->toArray(), Response::HTTP_CREATED);
        } catch (Exception $exception) {
            Log::error($exception);

            return $this->sendError('Something went wrong, please contact administrator!', [], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function get($id): JsonResponse
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return $this->sendError('Product not found!', [], Response::HTTP_NOT_FOUND);
            }

            return $this->sendResponse($product->toArray());
        } catch (Exception $exception) {
            Log::error($exception);

            return $this->sendError('Something went wrong, please contact administrator!', [], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param $id
     * @param Request $request
     * @return JsonResponse
     */
    public function update($id, Request $request): JsonResponse
    {
        try {
            /** @var Product $product */
            $product = Product::find($id);

            if (!$product) {
                return $this->sendError('Product not found!', [], Response::HTTP_NOT_FOUND);
            }

            $validator = Validator::make($request->all(), [
                'category_id' => 'required|exists:categories,id',
                'name' => 'required|max:100',
                'description' => 'required',
                'quantity' => 'required|integer|numeric|min:0',
                'price' => 'required|numeric|min:0',
                'image' => 'nullable|image',
                'status' => 'nullable|in:' . Product::INACTIVE . ',' . Product::ACTIVE
            ]);

            if ($validator->fails()) {
                return $this->sendError('Bad request!', $validator->messages()->toArray());
            }

            $filename="";
            if($request->hasFile('image'))
            {
              $path='uploads/products/';
              $destination = $path.$product->image;
              //dd($destination);
               if(File::exists($destination))
               {
                  File::delete($destination);
               }
               
               $file=$request->file('image');
               $filename= $request->file('image')->getClientOriginalName();
               $file->move($path,$filename);
  
               //$filename=$request->file('image')->storeAs('products',$request->file('image')->getClientOriginalName());
                
            }
            //dd($filename);

            DB::beginTransaction();

            $product->category_id = $request->get('category_id');
            $product->name = $request->get('name');
            $product->description = $request->get('description');
            $product->quantity =$request->get('quantity');
            $product->price = $request->get('price');
            $product->image = $filename;
            $product->status = $request->get('status');
            $product->update();

            DB::commit();

            return $this->sendResponse($product->toArray());
        } catch (Exception $exception) {
            Log::error($exception);

            return $this->sendError('Something went wrong, please contact administrator!', [], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param $id
     * @param Request $request
     * @return JsonResponse
     */
    public function updateImage($id, Request $request): JsonResponse
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return $this->sendError('Product not found!', [], Response::HTTP_NOT_FOUND);
            }

            $validator = Validator::make($request->all(), [
                'image' => 'required|image'
            ]);

            if ($validator->fails()) {
                return $this->sendError('Bad request!', $validator->messages()->toArray());
            }

            $file = $request->file('image');
            $filename = 'P' . time() . '.' . $file->getClientOriginalExtension();
            $path = 'products/';
            Storage::putFileAs($path, $file, $filename);

            if ($product->image && Storage::exists($product->image)) {
                Storage::delete($product->image);
            }

            $product->image = $path . $filename;
            $product->save();

            return $this->sendResponse($product->toArray());
        } catch (Exception $exception) {
            Log::error($exception);

            return $this->sendError('Something went wrong, please contact administrator!', [], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function delete($id): JsonResponse
    {
        try {
            $product = Product::find($id);

            $path = 'uploads/products/';
            $destination = $path . $product->image;
            //dd($destination);
            if (File::exists($destination)) {
                File::delete($destination);
            }

            if ($product)
            {
              $product->delete();
              return $this->sendResponse("Delete done!");
            } 
             return $this->sendResponse("No result found!");
        } 
        catch (Exception $exception) {
            Log::error($exception);

            return $this->sendError('Something went wrong, please contact administrator!', [], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param $categoryId
     * @return JsonResponse
     */
    public function getAllProductsForCategory($categoryId): JsonResponse
    {
        try {
            $products = Product::where('category_id', $categoryId)
                ->orWhereHas('category', function ($query) use ($categoryId) {
                    $query->where('parent_id', $categoryId)
                        ->orWhereHas('parent', function ($query) use ($categoryId) {
                            $query->where('parent_id', $categoryId);
                        });
                })->get();
            return $this->sendResponse($products->toArray());
        } catch (Exception $exception) {
            Log::error($exception);

            return $this->sendError('Something went wrong, please contact administrator!', [], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getProduct($id)
    {
        $product = Product::find($id);

        if($product)
        {
            return $this->sendResponse($product->toArray()); 
        }
        else return $this->sendResponse("No product found!"); 
    }
}
