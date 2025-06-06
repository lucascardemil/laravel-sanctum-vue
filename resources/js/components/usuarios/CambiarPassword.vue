<template>
    <div>
        <loading-overlay :active="loading" :is-full-page="false" />

        <h2 class="font-bold mb-4">Cambiar Contraseña</h2>

        <form @submit.prevent="cambiarPassword">
            <div class="form-group mb-3 position-relative">
                <input :type="mostrarPassword ? 'text' : 'password'" v-model="usuario.password" placeholder="Contraseña"
                    class="form-control" />
                <i class="bi" :class="mostrarPassword ? 'bi-eye-slash' : 'bi-eye'"
                    @click="mostrarPassword = !mostrarPassword"
                    style="position: absolute; top: 10px; right: 15px; cursor: pointer;"></i>
            </div>

            <div class="form-group mb-3 position-relative">
                <input :type="mostrarConfirmacion ? 'text' : 'password'" v-model="usuario.confirmar_password"
                    placeholder="Confirmar Contraseña" class="form-control" />
                <i class="bi" :class="mostrarConfirmacion ? 'bi-eye-slash' : 'bi-eye'"
                    @click="mostrarConfirmacion = !mostrarConfirmacion"
                    style="position: absolute; top: 10px; right: 15px; cursor: pointer;"></i>
            </div>

            <button class="btn btn-primary" :disabled="loading">Guardar</button>
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
            loading: false,
            mostrarPassword: false,
            mostrarConfirmacion: false,
            usuario: {
                password: '',
                confirmar_password: ''
            }
        };
    },
    methods: {
        async cambiarPassword() {
            const id = this.$route.params.id;

            if (!this.usuario.password || !this.usuario.confirmar_password) {
                new Noty({
                    type: 'error',
                    text: 'Debes completar ambos campos de contraseña',
                    timeout: 3000
                }).show();
                return;
            }

            if (this.usuario.password !== this.usuario.confirmar_password) {
                new Noty({
                    type: 'error',
                    text: 'Las contraseñas no coinciden',
                    timeout: 3000
                }).show();
                return;
            }

            this.loading = true;

            try {
                await axios.put(`/api/usuarios/${id}/cambiar-password`, {
                    password: this.usuario.password
                });

                new Noty({
                    type: 'success',
                    text: 'Contraseña actualizada correctamente',
                    timeout: 3000
                }).show();

                this.$router.push('/usuarios');
            } catch (error) {
                new Noty({
                    type: 'error',
                    text: 'Error al cambiar la contraseña',
                    timeout: 3000
                }).show();
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>
