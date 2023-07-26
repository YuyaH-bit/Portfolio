import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: ''
  },
  getters: {
    loggedIn: (state) => {
      return Boolean(state.userId.trim())
    }
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId
    }
  },
  actions: {}
})