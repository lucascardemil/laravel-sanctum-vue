<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Crear usuario administrador
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Administrador',
                'password' => Hash::make('password'),
            ]
        );

        // Crear rol con guard "web"
        $role = Role::firstOrCreate(['name' => 'Administrador', 'guard_name' => 'web']);

        // Crear permisos con guard "web"
        $permissions = ['roles', 'permisos', 'usuarios'];
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // Asignar permisos al rol
        $role->syncPermissions($permissions);

        // Asignar rol al usuario
        $admin->assignRole($role);

        $this->command->info('Administrador creado con correo admin@example.com y contraseña "password"');
    }
}
