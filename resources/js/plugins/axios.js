// src/plugins/axios.js
import axios from 'axios'
import router from '@/router'
import store from '@/store'

// Interceptor global para respuestas
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            store.dispatch('auth/logout')  // Llama a tu acción logout
            router.push({ name: 'login' }) // Redirige al login
        }
        return Promise.reject(error)
    }
)

export default axios
