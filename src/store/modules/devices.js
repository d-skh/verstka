const loadState = () => {
  try {
    const serializedState = localStorage.getItem('veda-devices')
    return serializedState ? JSON.parse(serializedState) : undefined
  } catch (e) {
    return undefined
  }
}

export default {
  namespaced: true,
  state: loadState() || {
    dashboardData: {
      devices: [
        { label: 'частотник 1', value: 'off' },
        { label: 'частотник 2', value: '78%' },
        { label: 'частотник 3', value: '5%' },
        { label: 'частотник 7', value: '56%' }
      ]
    }
  },
  mutations: {
    ADD_DEVICE (state, newDevice) {
      state.dashboardData.devices.push(newDevice)
      localStorage.setItem('veda-devices', JSON.stringify(state))
    }
  },
  actions: {
    addDevice ({ commit }, deviceData) {
      commit('ADD_DEVICE', {
        label: deviceData.name,
        value: deviceData.status
      })
    }
  },
  getters: {
    dashboardDevices: state => state.dashboardData.devices
  }
}
