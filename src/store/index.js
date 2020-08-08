import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lastSiteUrl: null,
    lastLatency: null,
    error: null,
  },
  mutations: {
    SET_PING_RESULT(state, { siteUrl, latency }) {
      state.lastSiteUrl = siteUrl
      state.lastLatency = latency
      state.error = null
    },

    SET_PING_ERROR(state, error) {
      state.lastSiteUrl = null
      state.lastLatency = null
      state.error = error
    },
  },
  actions: {
    pingSite({ commit }, siteUrl) {
      /* Ping Logic Here */
      const latency = Math.floor(Math.random() * 1000)

      commit('SET_PING_RESULT', {
        siteUrl,
        latency,
      })
    },
  },
  modules: {},
})
