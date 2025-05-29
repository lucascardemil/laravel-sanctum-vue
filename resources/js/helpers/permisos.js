import store from '@/store'
export function can(permission) {
    return store.state.auth.all_permissions.includes(permission)
}