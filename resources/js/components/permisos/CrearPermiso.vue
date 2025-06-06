<template>
    <div>
        <loading-overlay :active="loading" :is-full-page="false" />

        <h2 class="font-bold mb-4">Crear Permiso</h2>
        <form @submit.prevent="crearPermiso">
            <div class="form-group mb-3">
                <input v-model="nuevoPermiso" type="text" placeholder="Nombre del permiso" class="form-control me-2" />
            </div>
            <div class="d-flex justify-content-between">
                <button class="btn btn-primary" :disabled="loading">Crear</button>
                <button type="button" class="btn btn-secondary" @click="$router.push('/permisos')"><i
                        class="bi bi-arrow-left"></i> Volver</button>
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
            nuevoPermiso: '',
            loading: false
        }
    },
    methods: {
        async crearPermiso() {
            this.loading = true
            try {
                if (!this.nuevoPermiso) return
                await axios.post('/api/permisos', { name: this.nuevoPermiso })
                this.nuevoPermiso = ''
                this.$router.push('/permisos');
            } finally {
                this.loading = false
            }
        },
    }
}
</script>