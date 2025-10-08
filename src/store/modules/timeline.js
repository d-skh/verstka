const loadState = () => {
  try {
    const serializedState = localStorage.getItem('veda-timeline')
    return serializedState ? JSON.parse(serializedState) : undefined
  } catch (e) {
    return undefined
  }
}

export default {
  namespaced: true,
  state: loadState() || {
    events: [
      {
        id: 1,
        title: 'Новый вопрос',
        subtitle: '2 часа назад',
        icon: 'help',
        description: 'Создан новый вопрос в категории "Технические проблемы"',
        timestamp: '2024-01-15T14:30:00.000Z', // 15 января 2024, 17:30 по МСК
        category: 'question'
      },
      {
        id: 2,
        title: 'Обновление профиля',
        subtitle: '5 дней назад',
        icon: 'edit',
        description: 'Изменена контактная информация',
        timestamp: '2024-01-10T09:15:00.000Z', // 10 января 2024, 12:15 по МСК
        category: 'profile'
      },
      {
        id: 3,
        title: 'Вход в систему',
        subtitle: '1 неделю назад',
        icon: 'login',
        description: 'Успешный вход с нового устройства',
        timestamp: '2024-01-08T16:45:00.000Z', // 8 января 2024, 19:45 по МСК
        category: 'auth'
      }
    ]
  },
  mutations: {
    ADD_EVENT(state, newEvent) {
      state.events.unshift({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...newEvent
      })
      localStorage.setItem('veda-timeline', JSON.stringify(state))
    },
    DELETE_EVENT(state, eventId) {
      state.events = state.events.filter(event => event.id !== eventId)
      localStorage.setItem('veda-timeline', JSON.stringify(state))
    }
  },
  actions: {
    addEvent({ commit }, eventData) {
      commit('ADD_EVENT', eventData)
    },
    deleteEvent({ commit }, eventId) {
      commit('DELETE_EVENT', eventId)
    },
    // Автоматическое добавление события при создании вопроса
    addQuestionEvent({ commit }, questionTitle) {
      commit('ADD_EVENT', {
        title: 'Новый вопрос',
        subtitle: 'Только что',
        icon: 'help',
        description: `Создан новый вопрос: "${questionTitle}"`,
        category: 'question'
      })
    },
    // Автоматическое добавление события при добавлении устройства
    addDeviceEvent({ commit }, deviceName) {
      commit('ADD_EVENT', {
        title: 'Новое устройство',
        subtitle: 'Только что',
        icon: 'devices',
        description: `Добавлено новое устройство: "${deviceName}"`,
        category: 'device'
      })
    },

     addProfileEvent({ commit }, { field, value }) {
    commit('ADD_EVENT', {
      title: 'Обновление профиля',
      subtitle: 'Только что',
      icon: 'edit',
      description: `Изменено поле "${field}" на "${value}"`,
      category: 'profile'
    })
  }
  

  },
  getters: {
    timelineEvents: state => state.events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
    eventsByCategory: state => category => state.events.filter(event => event.category === category)
  }
}