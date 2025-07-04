import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Quasar from 'quasar'
import 'quasar/dist/quasar.css'
import 'material-symbols/outlined.css'
import 'quasar-extras/material-icons'

Vue.use(Quasar, {
    config: {
        brand: {
            primary: '#1976D2',
            secondary: '#26A69A',
            accent: '#9C27B0',
            dark: '#1D1D1D',
            darkPage: '#121212',
            positive: '#21BA45',
            negative: '#C10015',
            info: '#31CCEC',
            warning: '#F2C037'
        }
    }
})

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')