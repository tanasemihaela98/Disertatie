<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Cart;
use App\Models\User;
use Auth;

class CartController extends ApiController
{
    public function index(): JsonResponse
    {
        // $carts = Cart::with('paint')->where('user_id',"1")->get();
        $carts = Cart::with('paint','paint')->where('status',"cart")->get();
        return $this->sendResponse($carts->toArray());
    }

    public function orders(): JsonResponse
    {
        $carts = Cart::with('user','paint')->where('status',"ordered")->get();
        return $this->sendResponse($carts->toArray());
    }

    public function store(Request $request): JsonResponse
    {
        $cart = new Cart();
        $cart->product_id = $request->product_id;
        $cart->quantity = 1;
        $cart->user_id = 1;
        $cart->save();
        return $this->sendResponse($cart->toArray());
    }

    public function update(Request $request, User $user): JsonResponse
    {
        Cart::where('user_id',$user->id)->update(['status' => 'ordered']);
        return $this->sendResponse($user->toArray());
    }

    public function size(Request $request, Cart $cart): JsonResponse
    {
        $cart->quantity = $request->quantity;
        $cart->save();
        return $this->sendResponse($cart->toArray());
    }

    public function destroy(Cart $cart): JsonResponse
    {
        $cart->delete();
        return redirect()->route('carts.index')->with('success', 'Cart deleted successfully');
    }

    public function deliver($cart): JsonResponse
    {
        Cart::where('id', $cart)->update(['ordered' => 'delivered']);
        return $this->sendResponse($cart->toArray());
    }

}
