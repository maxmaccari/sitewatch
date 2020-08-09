import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './actions'

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
  getters,
  modules: {},
})
