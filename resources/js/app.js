import './bootstrap';
import '../sass/app.scss'
import Router from '@/router'
import store from '@/store'
import NotyPlugin from '@/plugins/noty'
import { createApp } from 'vue/dist/vue.esm-bundler';
import 'vue-loading-overlay/dist/css/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import 'noty/lib/noty.css'

const app = createApp({})
app.use(Router)
app.use(store)
app.use(NotyPlugin)
app.mount('#app')