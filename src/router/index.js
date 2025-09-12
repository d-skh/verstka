import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

// ПРОСТО ЭКСПОРТИРУЙТЕ ИНСТАНС РОУТЕРА
export default new Router({
  mode: 'hash', // явно укажите mode
  routes
})