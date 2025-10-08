const STORAGE_KEY = 'vuex-orders'

export default (store) => {
  // Загружаем состояние из localStorage при инициализации store
  const storedState = localStorage.getItem(STORAGE_KEY)
  if (storedState) {
    try {
      const parsedState = JSON.parse(storedState)
      console.log('🔄 Loading state from localStorage:', parsedState)
      store.replaceState(parsedState)
    } catch (error) {
      console.error('❌ Error parsing stored state:', error)
    }
  }

  // Сохраняем состояние в localStorage при каждой мутации
  store.subscribe((mutation, state) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      console.log('💾 State saved to localStorage')
    } catch (error) {
      console.error('❌ Error saving state to localStorage:', error)
    }
  })
}