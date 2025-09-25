// store/modules/profile.js

const state = {
  userProfile: {
    name: 'Константин Константинопольский',
    role: 'Пользователь',
    phone: '+7 (900) 123-45-67',
    email: 'egor.eremin@example.com',
    danfors: 'Активен',
    workplace: 'ООО "Технологии"',
    veda: 'Версия 2.1.4',
    avatar: 'https://cdn.quasar.dev/img/avatar.png'
  },
  isLoading: false
}

const getters = {
  getUserProfile: (state) => state.userProfile,
  getProfileField: (state) => (field) => state.userProfile[field],
  isLoading: (state) => state.isLoading
}

const mutations = {
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading
  },
  
  UPDATE_PROFILE_FIELD(state, { field, value }) {
    if (state.userProfile.hasOwnProperty(field)) {
      state.userProfile[field] = value
    }
  },
  
  UPDATE_PROFILE(state, updatedProfile) {
    state.userProfile = { ...state.userProfile, ...updatedProfile }
  },
  
  UPDATE_PASSWORD(state) {
    // Логика обновления пароля
  }
}

const actions = {
  async updateProfileField({ commit }, { field, value }) {
    commit('SET_LOADING', true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      commit('UPDATE_PROFILE_FIELD', { field, value })
      return { success: true, message: 'Данные успешно обновлены' }
    } catch (error) {
      return { success: false, message: 'Ошибка при обновлении данных' }
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  async updateProfileData({ commit }, profileData) {
    commit('SET_LOADING', true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      commit('UPDATE_PROFILE', profileData)
      return { success: true, message: 'Профиль успешно обновлен' }
    } catch (error) {
      return { success: false, message: 'Ошибка при обновлении профиля' }
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  async updatePassword({ commit }, { currentPassword, newPassword }) {
    commit('SET_LOADING', true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (newPassword.length < 6) {
        throw new Error('Пароль должен содержать минимум 6 символов')
      }
      
      commit('UPDATE_PASSWORD')
      return { success: true, message: 'Пароль успешно изменен' }
    } catch (error) {
      return { success: false, message: error.message || 'Ошибка при изменении пароля' }
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}