<template>
    <div>
        <loading-overlay :active="loading" :is-full-page="false" />

        <h2 class="font-bold mb-4">Asignar Roles a Usuario</h2>

        <div class="mb-4">
            <label for="usuario" class="form-label">Selecciona un usuario:</label>
            <select class="form-select" v-model="usuarioSeleccionado" @change="cargarRolesUsuario">
                <option disabled selected value="null">Selecciona un usuario</option>
                <option v-for="usuario in usuarios" :value="usuario.id" :key="usuario.id">
                    {{ usuario.name }}
                </option>
            </select>
        </div>

        <div v-if="usuarioSeleccionado">
            <h3 class="font-semibold mb-2">Roles disponibles</h3>
            <div class="form-check" v-for="rol in roles" :key="rol.id">
                <input class="form-check-input" type="checkbox" :id="'rol-' + rol.id" :value="rol.name"
                    v-model="rolesAsignados" />
                <label class="form-check-label" :for="'rol-' + rol.id">{{ rol.name }}</label>
            </div>

            <button type="button" class="btn btn-primary mt-3" @click="asignarRoles">
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
            usuarios: [],
            roles: [],
            rolesAsignados: [],
            usuarioSeleccionado: null,
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
                const resUsuarios = await axios.get('/api/usuarios')
                const resRoles = await axios.get('/api/roles')
                this.usuarios = resUsuarios.data
                this.roles = resRoles.data
            } finally {
                this.loading = false
            }
        },
        async cargarRolesUsuario() {
            this.loading = true
            try {
                const res = await axios.get(`/api/usuarios/${this.usuarioSeleccionado}/roles`)
                this.rolesAsignados = res.data.map(rol => rol.name)
            } finally {
                this.loading = false
            }
        },
        async asignarRoles() {
            this.loading = true
            try {
                await axios.post(`/api/usuarios/${this.usuarioSeleccionado}/roles`, {
                    roles: this.rolesAsignados
                })
                this.$noty({ text: 'Roles asignados correctamente!', type: 'success' })
            } finally {
                this.loading = false
            }
        }
    }
}
</script>
