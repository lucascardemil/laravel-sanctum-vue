<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RolesController;
use App\Http\Controllers\Api\PermisoController;
use App\Http\Controllers\Api\RolPermisoController;
use App\Http\Controllers\Api\UsuarioRolController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UsuariosController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'user']);

Route::middleware(['auth:sanctum', 'role:Administrador', 'permission:roles'])->group(function () {
    Route::get('/roles', [RolesController::class, 'index']);
    Route::post('/roles', [RolesController::class, 'store']);
    Route::delete('/roles/{id}', [RolesController::class, 'delete']);

    Route::get('/usuarios', [UsuarioRolController::class, 'index']);
    Route::get('/usuarios/{user}/roles', [UsuarioRolController::class, 'show']);
    Route::post('/usuarios/{user}/roles', [UsuarioRolController::class, 'update']);
});

Route::middleware(['auth:sanctum', 'role:Administrador', 'permission:permisos'])->group(function () {

    Route::get('/permisos', [PermisoController::class, 'index']);
    Route::post('/permisos', [PermisoController::class, 'store']);
    Route::delete('/permisos/{id}', [PermisoController::class, 'delete']);

    Route::get('/roles/{role}/permisos', [RolPermisoController::class, 'show']);
    Route::post('/roles/{role}/permisos', [RolPermisoController::class, 'update']);
});

Route::middleware(['auth:sanctum', 'role:Administrador', 'permission:usuarios'])->group(function () {

    Route::get('/usuarios', [UsuariosController::class, 'index']);
    Route::post('/usuarios', [UsuariosController::class, 'store']);
    Route::delete('/usuarios/{id}', [UsuariosController::class, 'delete']);
    Route::put('/usuarios/{id}/cambiar-password', [UsuariosController::class, 'cambiarPassword']);

});
