<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;

class PermisoController extends Controller
{
    public function index() {
        return Permission::all();
    }

    public function store(Request $request) {
        $request->validate(['name' => 'required|string|unique:permissions']);
        return Permission::create(['name' => $request->name, 'guard_name' => 'web']);
    }

    public function delete($id)
    {
        $permiso = Permission::findOrFail($id);
        $permiso->delete();

        return response()->json(['message' => 'Permiso eliminado correctamente'], 200);
    }
}
