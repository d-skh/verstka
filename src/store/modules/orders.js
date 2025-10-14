// Функции для работы с localStorage
const STORAGE_KEY = 'vuex-orders'

// Функция для вычисления суммы заказа
const calculateOrderAmount = (items) => {
  if (!items || !items.length) return 0
  return items.reduce((total, item) => {
    // Используем totalWithVAT если он есть, иначе вычисляем
    if (item.totalWithVAT) {
      return total + item.totalWithVAT
    }
    // Вычисляем: цена со скидкой * количество * НДС 20%
    const discountedPrice = item.price * (1 - (item.discount || 0) / 100)
    return total + (discountedPrice * item.quantity * 1.2)
  }, 0)
}

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return null
  }
}

const saveToStorage = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

// Начальное состояние с загрузкой из localStorage
const initialState = () => {
  const stored = loadFromStorage()
  if (stored) {
    // Пересчитаем суммы для существующих заказов
    stored.orders = stored.orders.map(order => ({
      ...order,
      amount: calculateOrderAmount(order.items)
    }))
    return stored
  }
  
  // Дефолтные данные если в localStorage ничего нет
  const defaultOrders = [
    {
      id: 1,
      invoiceNumber: 'ORD-001',
      creator: 'Иван Иванов',
      company: 'ООО "Технологии"',
      date: '2024-01-15',
      paymentPercent: 100,
      shipmentPercent: 100,
      projectName: 'Проект А',
      status: 'completed',
      description: 'Заказ на поставку оборудования',
      paymentTerms: 'Предоплата 50%, остаток - после поставки',
      manager: 'Алексей Петров',
      specialConditions: 'Специальные условия: скидка 10% при полной предоплате',
      warehouseDS: false,
      createdAt: '2024-01-15T10:00:00.000Z',
      items: [
        {
          id: 1,
          article: 'ART-001',
          typicalCode: 'TC-001',
          quantity: 10,
          price: 5000,
          discount: 10,
          discountedPrice: 4500,
          totalWithVAT: 49500
        },
        {
          id: 2,
          article: 'ART-002',
          typicalCode: 'TC-002',
          quantity: 5,
          price: 8000,
          discount: 5,
          discountedPrice: 7600,
          totalWithVAT: 41800
        }
      ]
    },
    {
      id: 2,
      invoiceNumber: 'ORD-002',
      creator: 'Петр Петров',
      company: 'ИП Сидоров',
      date: '2024-01-20',
      paymentPercent: 50,
      shipmentPercent: 30,
      projectName: 'Проект Б',
      status: 'pending',
      description: 'Заказ на материалы',
      paymentTerms: '100% предоплата',
      manager: 'Мария Сидорова',
      specialConditions: 'Дополнительная скидка 5% при заказе от 100000 УЕ',
      warehouseDS: false,
      createdAt: '2024-01-20T14:30:00.000Z',
      items: [
        {
          id: 1,
          article: 'ART-003',
          typicalCode: 'TC-003',
          quantity: 15,
          price: 3000,
          discount: 0,
          discountedPrice: 3000,
          totalWithVAT: 45000
        }
      ]
    }
  ]

  // Вычисляем суммы для дефолтных заказов
  return {
    orders: defaultOrders.map(order => ({
      ...order,
      amount: calculateOrderAmount(order.items)
    }))
  }
}

const state = initialState()

const getters = {
  getAllOrders: (state) => state.orders,
  getOrderById: (state) => (id) => state.orders.find(order => order.id === parseInt(id)),
  getOrdersByStatus: (state) => (status) => state.orders.filter(order => order.status === status)
}

const mutations = {
  ADD_ORDER(state, newOrder) {
    const order = {
      id: Date.now(),
      status: 'pending',
      paymentPercent: 0,
      shipmentPercent: 0,
      items: [],
      specialConditions: '',
      warehouseDS: false,
      amount: 0,
      createdAt: new Date().toISOString(),
      ...newOrder
    }
    state.orders.push(order)
    saveToStorage(state)
  },
  
  UPDATE_ORDER(state, updatedOrder) {
    const index = state.orders.findIndex(order => order.id === updatedOrder.id)
    if (index !== -1) {
      // Вычисляем сумму при обновлении заказа
      const orderWithAmount = {
        ...updatedOrder,
        amount: calculateOrderAmount(updatedOrder.items)
      }
      state.orders.splice(index, 1, orderWithAmount)
      saveToStorage(state)
    }
  },
  
  DELETE_ORDER(state, orderId) {
    state.orders = state.orders.filter(order => order.id !== orderId)
    saveToStorage(state)
  },
  
  UPDATE_ORDER_STATUS(state, { orderId, status }) {
    const order = state.orders.find(order => order.id === orderId)
    if (order) {
      order.status = status
      saveToStorage(state)
    }
  },

  SET_ORDERS(state, orders) {
    state.orders = orders
    saveToStorage(state)
  }
}

const actions = {
  addOrder({ commit }, orderData) {
    commit('ADD_ORDER', orderData)
  },
  
  updateOrder({ commit }, updatedOrder) {
    commit('UPDATE_ORDER', updatedOrder)
  },
  
  deleteOrder({ commit }, orderId) {
    commit('DELETE_ORDER', orderId)
  },
  
  completeOrder({ commit }, orderId) {
    commit('UPDATE_ORDER_STATUS', { orderId, status: 'completed' })
  },
  
  cancelOrder({ commit }, orderId) {
    commit('UPDATE_ORDER_STATUS', { orderId, status: 'cancelled' })
  },

  fetchOrders({ commit, state }) {
    return Promise.resolve(state.orders)
  },

  deleteOrder({ commit }, orderId) {
    commit('DELETE_ORDER', orderId)
  },

  loadOrders({ commit }) {
    const stored = loadFromStorage()
    if (stored) {
      commit('SET_ORDERS', stored.orders)
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