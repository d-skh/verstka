import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Quasar from 'quasar'
import 'quasar/dist/quasar.css'
import 'material-symbols/outlined.css'
import 'quasar-extras/material-icons'
import './quasar.variables.styl'
import colors from './colors.js'

Vue.use(Quasar, {
    config: {
        brand: colors
    }
})

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')