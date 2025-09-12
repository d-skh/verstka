export default {
  namespaced: true,
  state: {
    user: {
      name: 'Константин Константинопольский',
      email: '',
      notificationsCount: '5'
    }
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    currentUser: state => state.user,
    currentUserName: state => state.user.name,
    currentUserNotifications: state => state.user.notificationsCount
  }
}
