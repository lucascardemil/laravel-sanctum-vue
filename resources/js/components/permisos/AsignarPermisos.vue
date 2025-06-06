<template>
    <div>
        <loading-overlay :active="loading" :is-full-page="false" />
        <h2 class="h4 mb-4">Asignar Permisos a Rol</h2>

        <div class="mb-3">
            <label class="form-label">Selecciona Rol:</label>
            <select v-model="rolSeleccionado" @change="cargarPermisosRol" class="form-select">
                <option value="null" disabled selected>Seleccione un rol</option>
                <option v-for="rol in roles" :value="rol.id" :key="rol.id">{{ rol.name }}</option>
            </select>
        </div>

        <div v-if="rolSeleccionado">
            <div class="form-check" v-for="permiso in permisos" :key="permiso.id">
                <input class="form-check-input" type="checkbox" :id="'permiso-' + permiso.id" :value="permiso.name"
                    v-model="permisosAsignados" />
                <label class="form-check-label" :for="'permiso-' + permiso.id">{{ permiso.name }}</label>
            </div>
            <button class="btn btn-primary mt-3" @click="asignarPermisos">
                Guardar Cambios
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay'
export default {
    components: {
        'loading-overlay': Loading
    },
    data() {
        return {
            roles: [],
            permisos: [],
            permisosAsignados: [],
            rolSeleccionado: null,
            loading: false
        }
    },
    mounted() {
        this.cargarDatos()
    },
    methods: {
        async cargarDatos() {
            this.loading = true
            try {
                const roles = await axios.get('/api/roles')
                const permisos = await axios.get('/api/permisos')
                this.roles = roles.data
                this.permisos = permisos.data
            } finally {
                this.loading = false
            }
        },
        async cargarPermisosRol() {
            this.loading = true
            try {
                const res = await axios.get(`/api/roles/${this.rolSeleccionado}/permisos`)
                this.permisosAsignados = res.data.map(p => p.name)
            } finally {
                this.loading = false
            }
        },
        async asignarPermisos() {
            this.loading = true
            try {
                await axios.post(`/api/roles/${this.rolSeleccionado}/permisos`, {
                    permisos: this.permisosAsignados
                })
                this.$noty({ text: 'Permisos asignados correctamente!', type: 'success' })
            } finally {
                this.loading = false
            }
        }
    }
}
</script>
