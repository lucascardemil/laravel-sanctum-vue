import { createWebHistory, createRouter } from 'vue-router'
import store from '@/store'

/* Guest Component */
const Login = () => import('@/components/Login.vue')
const Register = () => import('@/components/Register.vue')
/* Guest Component */

/* Layouts */
const DahboardLayout = () => import('@/components/layouts/Default.vue')
/* Layouts */

/* Authenticated Component */
const Dashboard = () => import('@/components/Dashboard.vue')
/* Authenticated Component */

/* Roles and Permissions */
const RolesIndex = () => import('@/components/roles/RolesIndex.vue')
const AsignarRoles = () => import('@/components/roles/AsignarRoles.vue')
const PermisosIndex = () => import('@/components/permisos/PermisosIndex.vue')
const AsignarPermisos = () => import('@/components/permisos/AsignarPermisos.vue')

/* Usuarios */
const UsuariosIndex = () => import('@/components/usuarios/UsuariosIndex.vue')
const CambiarPassword = () => import('@/components/usuarios/CambiarPassword.vue')
const CrearUsuario = () => import('@/components/usuarios/CrearUsuario.vue')
const CrearRol = () => import('@/components/roles/CrearRol.vue')
const CrearPermiso = () => import('@/components/permisos/CrearPermiso.vue')


const routes = [
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: `Iniciar Sesión`
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            middleware: "guest",
            title: `Register`
        }
    },
    {
        path: "/",
        component: DahboardLayout,
        meta: {
            middleware: "auth"
        },
        children: [
            {
                name: "dashboard",
                path: '/',
                component: Dashboard,
                meta: {
                    title: `Dashboard`
                }
            },
            {
                name: "roles",
                path: "/roles",
                component: RolesIndex,
                meta: {
                    title: "Gestión de Roles"
                }
            },
            {
                path: '/asignar-roles',
                name: 'asignar-roles',
                component: AsignarRoles,
                meta: {
                    title: 'Asignar Roles',
                }
            },
            {
                path: "/permisos",
                name: "permisos",
                component: PermisosIndex,
                meta: {
                    title: "Permisos"
                }
            },
            {
                path: "/asignar-permisos",
                name: "asignar-permisos",
                component: AsignarPermisos,
                meta: {
                    title: "Asignar Permisos"
                }
            },
            {
                path: "/usuarios",
                name: "usuarios",
                component: UsuariosIndex,
                meta: {
                    title: "Usuarios",
                }
            },
            {
                path: "/usuarios/:id/cambiar-password",
                name: "cambiar-password",
                component: CambiarPassword,
                meta: {
                    title: "Cambiar Contraseña",
                },
            },
            {
                path: "/usuarios/crear-usuario",
                name: "crear-usuario",
                component: CrearUsuario,
                meta: {
                    title: "Crear Usuario",
                }
            },
            {
                path: "/roles/crear-rol",
                name: "crear-rol",
                component: CrearRol,
                meta: {
                    title: "Crear Rol",
                }
            },
            {
                path: "/permisos/crear-permiso",
                name: "crear-permiso",
                component: CrearPermiso,
                meta: {
                    title: "Crear Permiso",
                }
            },

        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware == "guest") {
        if (store.state.auth.authenticated) {
            next({ name: "dashboard" })
        }
        next()
    } else {
        if (store.state.auth.authenticated) {
            next()
        } else {
            next({ name: "login" })
        }
    }
})

export default router