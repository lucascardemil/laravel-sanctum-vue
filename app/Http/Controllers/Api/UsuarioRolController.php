<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class UsuarioRolController extends Controller
{
    public function index() {
        return User::select('id', 'name', 'email')->get();
    }

    public function show(User $user) {
        return $user->roles;
    }

    public function update(Request $request, User $user) {
        $request->validate([
            'roles' => 'required|array'
        ]);
        $user->syncRoles($request->roles);
        return response()->json(['message' => 'Roles actualizados']);
    }
}

