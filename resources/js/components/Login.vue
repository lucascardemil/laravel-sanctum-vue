<template>
    <div class="container h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12 col-md-6 offset-md-3">
                <form class="form-signin">
                    <img class="mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
                    <h1 class="h3 mb-3 fw-normal">Iniciar Sesión</h1>

                    <div class="form-floating">
                        <input type="email" v-model="auth.email" class="form-control" id="floatingInput"
                            placeholder="name@example.com">
                        <label for="floatingInput">Email</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" v-model="auth.password" class="form-control" id="floatingPassword"
                            placeholder="Password">
                        <label for="floatingPassword">Contraseña</label>
                    </div>

                    <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                        <div class="alert alert-danger">
                            <ul class="mb-0">
                                <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                            </ul>
                        </div>
                    </div>

                    <!-- <div class="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"> Remember me
                        </label>
                    </div> -->
                    <button class="w-100 btn btn-lg btn-primary" type="submit" :disabled="processing" @click="login">{{
                        processing ? "Please wait" : "Entrar" }}</button>
                    <!-- <div class="col-12 text-center">
                        <label>Don't have an account? <router-link :to="{ name: 'register' }">Register
                                Now!</router-link></label>
                    </div> -->
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "login",
    data() {
        return {
            auth: {
                email: "",
                password: ""
            },
            validationErrors: {},
            processing: false
        }
    },
    methods: {
        ...mapActions({
            signIn: 'auth/login'
        }),
        async login() {
            this.processing = true
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/login', this.auth).then(({ data }) => {
                this.signIn()
            }).catch(({ response }) => {
                if (response.status === 422) {
                    this.validationErrors = response.data.errors
                } else {
                    this.validationErrors = {}
                    alert(response.data.message)
                }
            }).finally(() => {
                this.processing = false
            })
        },
    }
}
</script>