import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Автоматически импортируем все модули из папки modules
const requireModule = require.context('./modules', false, /\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
  // Имя модуля - это название файла без расширения .js
  const moduleName = fileName.replace(/(\.\/|\.js)/g, '')
  
  modules[moduleName] = {
    namespaced: true, // Добавляем namespaced: true для всех модулей
    ...requireModule(fileName).default
  }
})

export default new Vuex.Store({
  modules
})
