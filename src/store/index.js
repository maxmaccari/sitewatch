import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lastSiteUrl: null,
    lastLatency: null,
    error: null,
    loading: false,
  },
  mutations,
  actions,
  getters: {
    lastSite: state => {
      if (!state.lastSiteUrl) return null

      const splittedUrl = state.lastSiteUrl.split('://')

      return splittedUrl[1] || null
    },
  },
  modules: {},
})
