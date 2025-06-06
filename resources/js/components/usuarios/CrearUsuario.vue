<template>
    <div>
        <loading-overlay :active="loading" :is-full-page="false" />

        <h2 class="font-bold mb-4">Crear Usuario</h2>
        <form @submit.prevent="crearUsuario">
            <div class="form-group mb-3">
                <input v-model="usuario.nombre" placeholder="Nombre del usuario" class="form-control" />
            </div>
            <div class="form-group mb-3">
                <input v-model="usuario.email" placeholder="Email" class="form-control" />
            </div>
            <div class="d-flex justify-content-between">
                <button class="btn btn-primary" :disabled="loading">Crear</button>
                <button type="button" class="btn btn-secondary" @click="$router.push('/usuarios')"><i class="bi bi-arrow-left"></i> Volver</button>
            </div>
        </form>
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
            usuario: {
                nombre: '',
                email: ''
            },
            loading: false
        }
    },
    methods: {
        async crearUsuario() {
            if (!this.usuario.nombre || !this.usuario.email) {
                this.$noty({ text: 'Por favor, complete el nombre y el email.', type: 'error' });
                return;
            }
            this.loading = true;

            try {
                await axios.post('/api/usuarios', { name: this.usuario.nombre, email: this.usuario.email });
                this.$noty({ text: '¡Usuario creado correctamente!', type: 'success' });
                this.usuario = { nombre: '', email: '' }; // Reset form
                this.$router.push('/usuarios');
            } catch (error) {
                if (error.response && error.response.data && error.response.data.errors) {
                    // Laravel validation errors
                    const errores = Object.values(error.response.data.errors).flat().join('<br>');
                    this.$noty({ text: errores, type: 'error' });
                } else {
                    this.$noty({ text: 'Error al crear usuario.', type: 'error' });
                }
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>