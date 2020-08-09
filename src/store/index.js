import Vue from 'vue'
import Vuex from 'vuex'
import BrowserPingService from '@/services/BrowserPingService'

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
    async pingSite({ commit }, siteUrl) {
      try {
        const latency = await BrowserPingService.ping(siteUrl)
        commit('SET_PING_RESULT', {
          siteUrl,
          latency,
        })
      } catch (error) {
        commit('SET_ERROR', { siteUrl, error })
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
