<template>
    <div>
        <loading-overlay :active="loading" :is-full-page="false" />

        <h2 class="font-bold mb-4">Crear Rol</h2>
        <form @submit.prevent="crearRol">
            <div class="form-group mb-3">
                <label for="nuevoRol" class="form-label">Crear nuevo rol</label>
                <input v-model="nuevoRol" placeholder="Nombre del rol" class="form-control" />
            </div>
            <div class="d-flex justify-content-between">
                <button class="btn btn-primary" :disabled="loading">Crear</button>
                <button type="button" class="btn btn-secondary" @click="$router.push('/roles')"><i
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
            nuevoRol: '',
            loading: false
        }
    },
    methods: {
        async crearRol() {
            if (!this.nuevoRol) return
            this.loading = true

            try {
                await axios.post('/api/roles', { name: this.nuevoRol })
                this.nuevoRol = ''
                this.$router.push('/roles');
            } finally {
                this.loading = false
            }
        },
    }
}
</script>