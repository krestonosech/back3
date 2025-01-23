import { createStore } from 'vuex'

export default createStore({
  state: {
    selected: []
  },
  getters: {
  },
  mutations: {
    setSelected(state, items) {
      state.selected = items;
    }
  },
  actions: {
  },
  modules: {
  }
})
