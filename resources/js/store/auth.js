import axios from 'axios'
import router from '@/router'

export default {
    namespaced: true,
    state: {
        authenticated: false,
        user: {},
        all_permissions: []
    },
    getters: {
        authenticated(state) {
            return state.authenticated
        },
        user(state) {
            return state.user
        },
        permissions(state) {
            return state.all_permissions
        },
    },
    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value
        },
        SET_USER(state, value) {
            state.user = value
        },
        SET_PERMISSIONS(state, permissions) {
            state.all_permissions = permissions
        }
    },
    actions: {
        async login({ commit }) {
            try {
                const { data } = await axios.get('/api/user')
                commit('SET_USER', data)
                commit('SET_AUTHENTICATED', true)
                commit('SET_PERMISSIONS', data.all_permissions)
                router.push({ name: 'dashboard' })
            } catch ({ response: { data: data_1 } }) {
                commit('SET_USER', {})
                commit('SET_AUTHENTICATED', false)
            }
        },
        logout({ commit }) {
            commit('SET_USER', {})
            commit('SET_AUTHENTICATED', false)
        }
    }
}