<template>
    <div>
        <loading-overlay :active="loading" :is-full-page="false" />

        <h2 class="font-bold mb-4">Gestión de Roles</h2>

        <form @submit.prevent="crearRol">
            <div class="form-group mb-3">
                <input v-model="nuevoRol" placeholder="Nombre del rol" class="form-control" />
            </div>
            <button class="btn btn-primary" :disabled="loading">Crear</button>
        </form>

        <table class="table mt-4">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre del Rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(rol, index) in roles" :key="rol.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ rol.name }}</td>
                    <td>
                        <button class="btn btn-danger" @click="eliminarRol(rol.id)" :disabled="loading"><i
                                class="bi bi-trash"></i></button>
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
            roles: [],
            nuevoRol: '',
            loading: false
        }
    },
    mounted() {
        this.obtenerRoles()
    },
    methods: {
        async obtenerRoles() {
            this.loading = true
            try {
                const response = await axios.get('/api/roles')
                this.roles = response.data
            } finally {
                this.loading = false
            }
        },
        async crearRol() {
            if (!this.nuevoRol) return
            this.loading = true

            try {
                await axios.post('/api/roles', { name: this.nuevoRol })
                this.nuevoRol = ''
                await this.obtenerRoles()
            } finally {
                this.loading = false
            }
        },
        async eliminarRol(rolId) {
            const confirmed = await new Promise((resolve) => {
                const noty = new Noty({
                    text: '¿Estás seguro de eliminar este rol?',
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
                await axios.delete(`/api/roles/${rolId}`);
                await this.obtenerRoles();
                this.$noty({ text: '¡El rol fue eliminado correctamente!', type: 'success' });
            } catch (error) {
                this.$noty({ text: 'Hubo un error al eliminar el rol.', type: 'error' });
            } finally {
                this.loading = false;
            }
        }


    }
}
</script>
