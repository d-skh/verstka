const loadState = () => {
  try {
    const serializedState = localStorage.getItem('veda-store')
    return serializedState ? JSON.parse(serializedState) : undefined
  } catch (e) {
    return undefined
  }
}

export default {
  namespaced: true,
  state: loadState() || {
    dashboardData: {
      questions: [
        { title: 'Запрос декларации соответствия на', time: '1 день назад' },
        { title: 'Запрос декларации соответствия на', time: '5 дней назад' },
        { title: 'Возможности оборудования', time: '2 недели назад' },
        { title: 'Запрос декларации соответствия на', time: '1 месяц назад' },
        { title: 'Запрос декларации соответствия на', time: '1 месяц назад' },
        { title: 'Запрос декларации соответствия на', time: '1 месяц назад' },
        { title: 'Запрос декларации соответствия на', time: '1 месяц назад' },
        { title: 'Запрос декларации соответствия на', time: '1 месяц назад' }
      ]
    }
  },
  mutations: {
    ADD_QUESTION (state, newQuestion) {
      state.dashboardData.questions.push(newQuestion)
      localStorage.setItem('veda-store', JSON.stringify(state))
    }
  },
  actions: {
    addQuestion ({ commit, dispatch }, questionData) {
      commit('ADD_QUESTION', {
        title: questionData.title,
        time: questionData.time
      })
      dispatch('timeline/addQuestionEvent', questionData.title, { root: true })
    }
  },
  getters: {
    dashboardQuestions: state => state.dashboardData.questions,
    questionsCount: state => state.dashboardData.questions.length
  }
}
