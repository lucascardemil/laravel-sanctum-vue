<template>
    <div>
        <loading-overlay :active="loading" :is-full-page="false" />

        <h2 class="font-bold mb-4">Gestión de Usuarios</h2>
        <div class="row mb-3">
            <div class="col-12 d-flex justify-content-end">
            <router-link to="/usuarios/crear-usuario" class="btn btn-primary">
                <i class="bi bi-plus"></i> Crear Usuario
            </router-link>
            </div>
        </div>

        <table class="table mt-4">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre del Usuario</th>
                    <th>Rol</th>
                    <th>Permisos</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(usuario, index) in usuarios" :key="usuario.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ usuario.name }}</td>
                    <td>
                        <span v-if="usuario.roles && usuario.roles.length" class="badge bg-secondary">{{
                            usuario.roles[0].name }}</span>
                        <span v-else class="text-muted">Sin rol</span>
                    </td>
                    <td>
                        <span
                            v-if="usuario.roles && usuario.roles.length && usuario.roles[0].permissions && usuario.roles[0].permissions.length">
                            <span v-for="(permiso, i) in usuario.roles[0].permissions" :key="permiso.id"
                                class="badge bg-secondary me-1">
                                {{ permiso.name }}
                            </span>
                        </span>
                        <span v-else class="text-muted">Sin permisos</span>
                    </td>
                    <td>
                        <div class="dropdown">
                            <a class="btn" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="bi bi-three-dots"></i>
                            </a>

                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li>
                                    <a class="dropdown-item" @click="eliminarUsuario(usuario.id)" href="javascript:void(0)">
                                        <i class="bi bi-trash"></i>
                                        Eliminar
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/asignar-permisos">
                                        <i class="bi bi-person-check"></i>
                                        Asignar Permisos
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/asignar-roles">
                                        <i class="bi bi-person-badge-fill"></i>
                                        Asignar Rol
                                    </a>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'cambiar-password', params: { id: usuario.id } }"
                                        class="dropdown-item">
                                        <i class="bi bi-lock-fill"></i>
                                        Cambiar Contraseña
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                        <!-- <button class="btn btn-danger" @click="eliminarUsuario(usuario.id)" :disabled="loading"><i
                                class="bi bi-trash"></i></button> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import Noty from 'noty'

export default {
    components: {
        'loading-overlay': Loading
    },
    data() {
        return {
            usuarios: [],
            usuario: {
                nombre: '',
                email: ''
            },
            loading: false
        }
    },
    mounted() {
        this.obtenerUsuarios()
    },
    methods: {
        async obtenerUsuarios() {
            this.loading = true
            try {
                const response = await axios.get('/api/usuarios')
                this.usuarios = response.data
            } finally {
                this.loading = false
            }
        },
        async eliminarUsuario(usuarioId) {
            const confirmed = await new Promise((resolve) => {
                const noty = new Noty({
                    text: '¿Estás seguro de eliminar este usuario?',
                    layout: 'center',
                    theme: 'bootstrap-v4',
                    modal: true,
                    killer: true,
                    buttons: [
                        Noty.button('Sí', 'btn btn-danger me-2', () => {
                            noty.close();
                            resolve(true);
                        }),
                        Noty.button('Cancelar', 'btn btn-secondary', () => {
                            noty.close();
                            resolve(false);
                        })
                    ]
                }).show();
            });

            if (!confirmed) return;

            this.loading = true;
            try {
                await axios.delete(`/api/usuarios/${usuarioId}`);
                await this.obtenerUsuarios();
                this.$noty({ text: '¡El usuario fue eliminado correctamente!', type: 'success' });
            } catch (error) {
                this.$noty({ text: 'Hubo un error al eliminar el usuario.', type: 'error' });
            } finally {
                this.loading = false;
            }
        }


    }
}
</script>
