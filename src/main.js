import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Quasar from 'quasar' // ← Только Quasar, без *
import 'quasar/dist/quasar.css'
import 'material-symbols/outlined.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/mdi-v5/mdi-v5.css' // ← Material Design Icons
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css' // ← Font Awesome
import './css/app.scss' // ← ДОБАВЬТЕ ЭТУ СТРОКУ


Vue.use(Quasar, {
  config: {
    brand: {
    }
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#q-app')