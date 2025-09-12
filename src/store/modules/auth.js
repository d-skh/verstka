const loadState = () => {
  try {
    const serializedState = localStorage.getItem('veda-store')
    return serializedState ? JSON.parse(serializedState) : undefined
  } catch (e) {
    return undefined
  }
}

export default {
  namespaced: true,
  state: loadState() || {
    user: {
      isLoggedIn: false
    },
    ui: {
      theme: 'light',
      language: 'ru'
    }
  },
  mutations: {
    SET_USER (state, user) {
      state.user = { ...state.user, ...user }
    },
    SET_THEME (state, theme) {
      state.ui.theme = theme
    },
    SET_LANGUAGE (state, language) {
      state.ui.language = language
    },
    LOGIN (state) {
      state.user.isLoggedIn = true
    },
    LOGOUT (state) {
      state.user.isLoggedIn = false
      state.user.name = ''
      state.user.email = ''
    }
  },
  actions: {
    login ({ commit }, userData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('SET_USER', userData)
          commit('LOGIN')
          resolve()
        }, 1000)
      })
    },
    logout ({ commit }) {
      commit('LOGOUT')
    },
    changeTheme ({ commit }, theme) {
      commit('SET_THEME', theme)
    },
    changeLanguage ({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  },
  getters: {
    isLoggedIn: state => state.user.isLoggedIn,
    currentTheme: state => state.ui.theme,
    currentLanguage: state => state.ui.language
  }
}
