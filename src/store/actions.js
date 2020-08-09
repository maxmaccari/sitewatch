import BrowserPingService from '@/services/BrowserPingService'

export default {
  async pingSite({ commit }, siteUrl) {
    try {
      commit('START_LOADING')
      const latency = await BrowserPingService.ping(siteUrl)
      commit('SET_PING_RESULT', {
        siteUrl,
        latency,
      })
    } catch (error) {
      commit('SET_ERROR', { siteUrl, error })
    }
  },

  goToPage({ commit }, page) {
    commit('SET_CURRENT_PAGE', page)
  },

  nextPage({ commit, state, getters }) {
    if (state.currentPage < getters.historyPages) {
      commit('SET_CURRENT_PAGE', state.currentPage + 1)
    }
  },

  previousPage({ commit, state }) {
    if (state.currentPage > 1) commit('SET_CURRENT_PAGE', state.currentPage - 1)
  },

  searchHistory({ commit }, search) {
    commit('SET_HISTORY_SEARCH', search)
  },

  resetHistory({ commit }) {
    commit('RESET_PING_HISTORY')
  },
}
