// store/modules/ui.js
export default {
  namespaced: true,
  state: {
    leftDrawerOpen: true,
    miniState: false
  },
  mutations: {
    SET_LEFT_DRAWER_OPEN(state, value) {
      state.leftDrawerOpen = value
    },
    SET_MINI_STATE(state, value) {
      state.miniState = value
    },
    TOGGLE_LEFT_DRAWER(state) {
      state.leftDrawerOpen = !state.leftDrawerOpen
      state.miniState = false
    },
    TOGGLE_MINI_STATE(state) {
      state.miniState = !state.miniState
    }
  },
  actions: {
    toggleLeftDrawer({ commit }) {
      commit('TOGGLE_LEFT_DRAWER')
    },
    toggleMiniState({ commit }) {
      commit('TOGGLE_MINI_STATE')
    }
  },
  getters: {
    leftDrawerOpen: state => state.leftDrawerOpen,
    miniState: state => state.miniState
  }
}