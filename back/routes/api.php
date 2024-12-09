<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\KategorijaOglasaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\KompanijaController;
use App\Http\Controllers\OglasController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PrijavaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {


    Route::get('kompanije/',[KompanijaController::class,'index']);
    Route::put('kompanije/{id}',[KompanijaController::class,'update']);

    Route::get('oglasi/',[OglasController::class,'index']);
    Route::get('oglasi/{id}',[OglasController::class,'show']);
    Route::post('oglasi',[OglasController::class,'store']);
    Route::delete('oglasi/{id}',[OglasController::class,'destroy']);


    Route::put('prijave/{id}',[PrijavaController::class,'update']);
    Route::post('prijave/',[PrijavaController::class,'store']);

    Route::get('users/studenti',[UserController::class,'vratiStudente']);
    Route::delete('users/{id}',[UserController::class,'destroy']);
    Route::get('kompanije/oglasi',[UserController::class,'oglasi']);

    Route::get('users/moje-prijave',[UserController::class,'prijave']);


    Route::get('postovi',[PostController::class,'index']);
    Route::post('postovi',[PostController::class,'store']);
    Route::get('postovi/{id}',[PostController::class,'show']);
    Route::delete('postovi/{id}',[PostController::class,'destroy']);

    Route::get('kategorije',[KategorijaOglasaController::class,'index']);
    Route::post('kategorije',[KategorijaOglasaController::class,'store']);
    Route::delete('kategorije/{id}',[KategorijaOglasaController::class,'destroy']);

});