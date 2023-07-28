<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\User;


class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'quantity',
        'product_id',
    ];

    public function paint()
    {
        return $this->belongsTo(Paint::class, 'product_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
