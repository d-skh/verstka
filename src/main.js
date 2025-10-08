import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Quasar, { Dark } from 'quasar'
import 'material-symbols/outlined.css'
import './css/app.scss'



Vue.use(Quasar, {
  config: {
    brand: {
      primary: '#DEE2E6',
      bg_primary: '#F5F5F5',
      bg_dark: '#DEE2E6',
      divider_light: '#DEE2E6',
      divider_dark: '#c3cad0',
      accent: '#C9060A',
      neutral: '#eef0f4',
      
      dark: '#212529',
      light: '#fff',

      main: '#212529',
      secondary: '#6C757D',
      tertiary: '#ADB5BD',
      link: '#c9060A',
      
      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037'
    }
  },
  plugins: {},
})

Dark.set(false)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#q-app')