import Task from "@/domains/task"

const state = {
  list: []
}

const getters = {
  list: (state) => {
    return state.list.map(item => {
      if (item instanceof Task) {
        return item
      }
      return Task.set(item)
    })
  }
}

const actions = {
  addTask({ commit, state }, task) {
    const list = state.list.slice()
    list.push(task)
    commit('updateTasks', list)
  },
  updateTask({ commit, state }, task) {
    const list = state.list.slice()
    const index = list.findIndex(v => v.id === task.id)
    list.splice(index, 1, task)
    commit('updateTasks', list)
  },
  deleteTask({ commit, state }, id) {
    const list = state.list.slice()
    const index = list.findIndex(v => v.id === id)
    list.splice(index, 1)
    commit('updateTasks', list)
  }
}

const mutations = {
  updateTasks(state, payload) {
    state.list = payload
  }
}

export const tasks = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}