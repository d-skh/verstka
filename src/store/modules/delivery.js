export default {
  namespaced: true,

  state: {
    deliveries: []
  },

  getters: {
    getDeliveries: (state) => state.deliveries
  },

  mutations: {
    SET_DELIVERIES (state, deliveries) {
      state.deliveries = deliveries
    }
  },

  actions: {
    async loadDeliveries ({ commit }) {
      // Заглушка данных
      const mockData = [
        {
          id: 1,
          title: 'Самовывоз со склада Ридан Москва',
          type: 'pickup',
          status: 'transit',
          weight: '1 кг',
          places: '2 места',
          placesCount: 2,
          totalWeight: 1,
          dataStatus: 'Нет данных',
          carrier: 'Перевозчик',
          orderDetails: {
            number: 'V024-008201',
            invoice: '00-00039253-25',
            reference: 'order-19112'
          },
          items: [
            {
              article: 'АВА00105',
              description: 'Преобразователь частоты VF-51-B-P1K5-0004-T4-E20-B-H',
              quantity: 1
            }
          ],
          totalItems: 1
        },
        {
          id: 2,
          title: 'Доставка до клиента',
          type: 'delivery',
          status: 'transit',
          weight: '6.1 кг',
          places: '2 места',
          placesCount: 2,
          totalWeight: 6.1,
          dataStatus: 'В обработке',
          carrier: 'ПЭК',
          orderDetails: {
            number: 'V024-008202',
            invoice: '00-00039254-25',
            reference: 'order-19113'
          },
          items: [
            {
              article: 'АВА00106',
              description: 'Преобразователь частоты VF-51-B-P2K5-0004-T4-E20-B-H',
              quantity: 2
            },
            {
              article: 'АВА00107',
              description: 'Кабель питания 5м',
              quantity: 1
            }
          ],
          totalItems: 3
        }
      ]

      commit('SET_DELIVERIES', mockData)
    }
  }
}
