<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;


class DashboardController extends ApiController
{
    public function statistics(Request $request): JsonResponse
    {
        $startDate = now()->subMonth()->startOfMonth()->addDays(14)->format('Y-m-d');
        $endDate = now();


        $orders_last_30_days = DB::table('carts')
        ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(quantity) as count'))
        ->whereBetween(DB::raw('DATE(created_at)'), [$startDate, $endDate])
        ->groupBy(DB::raw('DATE(created_at)'))
        ->orderBy(DB::raw('DATE(created_at)'))
        ->get();


        $money_last_30_days = DB::table('paints')
        ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(price) as count'))
        ->whereBetween(DB::raw('DATE(created_at)'), [$startDate, $endDate])
        ->groupBy(DB::raw('DATE(created_at)'))
        ->orderBy(DB::raw('DATE(created_at)'))
        ->get();


        $users_last_30_days = DB::table('users')
        ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'))
        ->whereBetween(DB::raw('DATE(created_at)'), [$startDate, $endDate])
        ->groupBy(DB::raw('DATE(created_at)'))
        ->orderBy(DB::raw('DATE(created_at)'))
        ->get();

    

        return $this->sendResponse( 
            [
                $orders_last_30_days->toArray(),
                $money_last_30_days->toArray(),
                $users_last_30_days->toArray(), 
            ], Response::HTTP_OK);

    }

}
