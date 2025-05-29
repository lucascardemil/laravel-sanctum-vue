import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/store/auth'
import '@/plugins/axios'

const store = createStore({
    plugins: [
        createPersistedState()
    ],
    modules: {
        auth
    }
})

export default store