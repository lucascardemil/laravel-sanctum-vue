<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UsuariosController extends Controller
{
    public function index()
    {
        // Devuelve todos los usuarios con sus roles y permisos
        return User::with(['roles.permissions'])->get();
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
        ]);

        $user = User::create([
            'name' => $request->name, 
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
        return response()->json($user, 201);
    }
    
    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Rol eliminado correctamente'], 200);
    }

    public function cambiarPassword(Request $request, $id)
    {
        $request->validate([
            'password' => 'required|min:6'
        ]);

        $usuario = User::findOrFail($id);
        $usuario->password = bcrypt($request->password);
        $usuario->save();

        return response()->json(['message' => 'Contraseña actualizada']);
    }

}
