export default {
  namespaced: true,
  state: {
    app: {
      externalLinks: [
        { title: 'Интернет магазин VEDA Drives', url: 'https://drives.ru/' },
        { title: 'Ридан - основной портал', url: 'https://ridan.ru' },
        { title: 'Ридан Теплообменники', url: 'https://ridan.ru/pr/teplovaya-avtomatika' },
        { title: 'Ридан Форум Комьюнити', url: 'https://community.ridan.ru' },
        { title: 'Ридан Обучающая платформа', url: 'https://univer.ridan.ru/' }
      ],
      privacyPolicyUrl: 'https://ваш-сайт.ru/privacy-policy'
    },
    dashboardData: {
      orders: [
        { label: 'На складе', value: '407' },
        { label: 'Отгружено', value: '10 854' },
        { label: 'Оплачено', value: '0' },
        { label: 'Всего', value: '11 410' }
      ],
      contracts: [
        { label: 'Действующие', value: '407' },
        { label: 'На согласование', value: '10 854' },
        { label: 'Всего', value: '469' }
      ]
    }
  },
  mutations: {
    UPDATE_DASHBOARD_DATA (state, payload) {
      state.dashboardData = { ...state.dashboardData, ...payload }
    }
  },
  actions: {
    fetchDashboardData ({ commit }) {
      // Здесь может быть API запрос
      const data = {
        // те же данные, что и в state
      }
      commit('UPDATE_DASHBOARD_DATA', data)
    }
  },
  getters: {
    isLoggedIn: state => state.user.isLoggedIn,
    currentUser: state => state.user,
    currentUserName: state => state.user.name,
    currentUserNotifications: state => state.user.notificationsCount,
    currentTheme: state => state.ui.theme,
    currentLanguage: state => state.ui.language,
    dashboardOrders: state => state.dashboardData.orders,
    dashboardContracts: state => state.dashboardData.contracts,
    appLinks: state => state.app.externalLinks,
    appPrivacyPolicyUrls: state => state.app.privacyPolicyUrl
  }
}
