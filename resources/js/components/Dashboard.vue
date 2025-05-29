<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h3>Bienvenido</h3>
                <p class="mb-0">Has iniciado sesión como <b>{{ user.email }}</b></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "dashboard",
    data() {
        return {
            user: this.$store.state.auth.user
        }
    }
}
</script>