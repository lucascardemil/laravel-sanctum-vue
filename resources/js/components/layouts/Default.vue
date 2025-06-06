<template>
    <div>
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Nombre de Compañia</a>
            <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <input class="form-control form-control-dark w-100" type="text" placeholder="Buscar" aria-label="Search">
            <div class="navbar-nav">
                <div class="nav-item text-nowrap">
                    <a class="nav-link px-3" href="javascript:void(0)" @click="logout">Cerrar Sesión</a>
                </div>
            </div>
        </header>
        <div class="container-fluid">
            <div class="row">
                <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div class="position-sticky pt-3">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <router-link to="/" class="nav-link" active-class="fw-bold">
                                    Inicio
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="can('roles')">
                                <button class="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse"
                                    data-bs-target="#roles-collapse" aria-expanded="true">
                                    Roles
                                </button>
                                <div class="collapse show" id="roles-collapse" style="">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li>
                                            <router-link to="/roles" class="link-dark rounded" active-class="fw-bold">
                                                Gestión de Roles
                                            </router-link>
                                        </li>
                                        <li>
                                            <router-link to="/asignar-roles" class="link-dark rounded" active-class="fw-bold">
                                                Asignar Roles
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="nav-item" v-if="can('permisos')">
                                <button class="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse"
                                    data-bs-target="#permisos-collapse" aria-expanded="true">
                                    Permisos
                                </button>
                                <div class="collapse show" id="permisos-collapse" style="">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li>
                                            <router-link to="/permisos" class="link-dark rounded" active-class="fw-bold">
                                                Gestionar Permisos
                                            </router-link>
                                        </li>
                                        <li>
                                            <router-link to="/asignar-permisos" class="link-dark rounded" active-class="fw-bold">
                                                Asignar Permisos
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="nav-item" v-if="can('usuarios')">
                                <button class="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse"
                                    data-bs-target="#usuarios-collapse" aria-expanded="true">
                                    Usuarios
                                </button>
                                <div class="collapse show" id="usuarios-collapse" style="">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li>
                                            <router-link to="/usuarios" class="link-dark rounded" active-class="fw-bold">
                                                Gestion de Usuarios
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import { can } from '@/helpers/permisos'
import { mapActions } from 'vuex'
export default {
    name: "default-layout",
    computed: {
        can() {
            return can
        }
    },
    data() {
        return {
            user: this.$store.state.auth.user
        }
    },
    methods: {
        ...mapActions({
            signOut: "auth/logout"
        }),
        async logout() {
            await axios.post('/logout').then(({ data }) => {
                this.signOut()
                this.$router.push({ name: "login" })
            })
        }
    }
}
</script>
