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
  async updateProfileField({ commit, dispatch }, { field, value }) {
    commit('SET_LOADING', true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      commit('UPDATE_PROFILE_FIELD', { field, value })
      
      // Добавляем событие в timeline
      const fieldNames = {
        name: 'имя',
        phone: 'телефон',
        email: 'email',
        workplace: 'место работы',
        role: 'роль'
      }
      
      if (fieldNames[field]) {
        dispatch('timeline/addProfileEvent', {
          field: fieldNames[field],
          value: value
        }, { root: true })
      }
      
      return { success: true, message: 'Данные успешно обновлены' }
    } catch (error) {
      return { success: false, message: 'Ошибка при обновлении данных' }
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  async updateProfileData({ commit, dispatch }, profileData) {
    commit('SET_LOADING', true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      commit('UPDATE_PROFILE', profileData)
      
      // Добавляем событие в timeline об общем обновлении профиля
      dispatch('timeline/addEvent', {
        title: 'Обновление профиля',
        subtitle: 'Только что',
        icon: 'edit',
        description: 'Основная информация профиля была обновлена',
        category: 'profile'
      }, { root: true })
      
      return { success: true, message: 'Профиль успешно обновлен' }
    } catch (error) {
      return { success: false, message: 'Ошибка при обновлении профиля' }
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  async updatePassword({ commit, dispatch }, { currentPassword, newPassword }) {
    commit('SET_LOADING', true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (newPassword.length < 6) {
        throw new Error('Пароль должен содержать минимум 6 символов')
      }
      
      commit('UPDATE_PASSWORD')
      
      // Добавляем событие в timeline о смене пароля
      dispatch('timeline/addEvent', {
        title: 'Смена пароля',
        subtitle: 'Только что',
        icon: 'lock',
        description: 'Пароль учетной записи был успешно изменен',
        category: 'security'
      }, { root: true })
      
      return { success: true, message: 'Пароль успешно изменен' }
    } catch (error) {
      return { success: false, message: error.message || 'Ошибка при изменении пароля' }
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  async uploadAvatar({ commit, dispatch }, avatarFile) {
    commit('SET_LOADING', true)
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      
      // Здесь должна быть реальная логика загрузки аватара
      const avatarUrl = URL.createObjectURL(avatarFile)
      commit('UPDATE_PROFILE_FIELD', { field: 'avatar', value: avatarUrl })
      
      // Добавляем событие в timeline о смене аватара
      dispatch('timeline/addEvent', {
        title: 'Смена аватара',
        subtitle: 'Только что',
        icon: 'photo_camera',
        description: 'Изображение профиля было обновлено',
        category: 'profile'
      }, { root: true })
      
      return { success: true, message: 'Аватар успешно обновлен' }
    } catch (error) {
      return { success: false, message: 'Ошибка при загрузке аватара' }
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