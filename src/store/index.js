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

    SET_ERROR(state, { siteUrl, error }) {
      state.lastSiteUrl = siteUrl
      state.lastLatency = null
      state.error = error
    },
  },
  actions: {
    pingSite({ commit }, siteUrl) {
      /* Ping Logic Here */
      const latency = Math.floor(Math.random() * 2000)

      if (latency < 1500) {
        commit('SET_PING_RESULT', {
          siteUrl,
          latency,
        })
      } else {
        commit('SET_ERROR', { siteUrl, error: 'timeout' })
      }
    },
  },
  getters: {
    lastSite: state => {
      if (!state.lastSiteUrl) return null

      const splittedUrl = state.lastSiteUrl.split('://')

      return splittedUrl[1] || null
    },
  },
  modules: {},
})
