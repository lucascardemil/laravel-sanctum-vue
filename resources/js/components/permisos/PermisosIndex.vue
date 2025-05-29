<template>
    <div>
        <loading-overlay :active="loading" :is-full-page="false" />
        <h2 class="h4 mb-4">Permisos</h2>
        <form class="mb-3 d-flex align-items-center" @submit.prevent="crearPermiso">
            <input v-model="nuevoPermiso" type="text" placeholder="Nombre del permiso" class="form-control me-2"
                style="max-width: 250px;" />
            <button type="submit" class="btn btn-success">Crear</button>
        </form>

        <table class="table table-striped mt-4">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="permiso in permisos" :key="permiso.id">
                    <td>{{ permiso.id }}</td>
                    <td>{{ permiso.name }}</td>
                    <td>
                        <button class="btn btn-danger" @click="eliminarPermiso(permiso.id)" :disabled="loading"><i
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
            permisos: [],
            nuevoPermiso: '',
            loading: false
        }
    },
    mounted() {
        this.obtenerPermisos()
    },
    methods: {
        async obtenerPermisos() {
            this.loading = true
            try {
                const res = await axios.get('/api/permisos')
                this.permisos = res.data
            } finally {
                this.loading = false
            }
        },
        async crearPermiso() {
            this.loading = true
            try {
                if (!this.nuevoPermiso) return
                await axios.post('/api/permisos', { name: this.nuevoPermiso })
                this.nuevoPermiso = ''
                this.obtenerPermisos()
            } finally {
                this.loading = false
            }
        },
        async eliminarPermiso(permisoId) {
            const confirmed = await new Promise((resolve) => {
                const noty = new Noty({
                    text: '¿Estás seguro de eliminar este permiso?',
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
                await axios.delete(`/api/permisos/${permisoId}`);
                await this.obtenerPermisos();
                this.$noty({ text: '¡El permiso fue eliminado correctamente!', type: 'success' });
            } catch (error) {
                this.$noty({ text: 'Hubo un error al eliminar el permiso.', type: 'error' });
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>
