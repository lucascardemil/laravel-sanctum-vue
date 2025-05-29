<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;

class RolPermisoController extends Controller
{
    public function show(Role $role) {
        return $role->permissions;
    }

    public function update(Request $request, Role $role) {
        $role->syncPermissions($request->permisos);
        return response()->json(['message' => 'Permisos actualizados']);
    }
}

