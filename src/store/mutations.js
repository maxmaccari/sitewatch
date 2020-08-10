export default {
  SET_PING_RESULT(state, { id, siteUrl, latency }) {
    state.lastSiteUrl = siteUrl
    state.lastLatency = latency
    state.error = null
    state.loading = false
    state.pingHistory.unshift({
      id,
      url: siteUrl,
      latency,
    })
  },

  SET_ERROR(state, { siteUrl, error }) {
    state.lastSiteUrl = siteUrl
    state.lastLatency = null
    state.error = error
    state.loading = false
  },

  START_LOADING(state) {
    state.loading = true
  },

  RESET_PING_HISTORY(state) {
    state.pingHistory = []
    state.historySearch = ''
  },

  SET_CURRENT_PAGE(state, page) {
    if (page > 0) state.currentPage = page
  },

  SET_HISTORY_SEARCH(state, search) {
    state.historySearch = search
    state.currentPage = 1
  },
}
