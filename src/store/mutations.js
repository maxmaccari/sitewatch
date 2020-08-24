export default {
  SET_PING_RESULT(state, result) {
    state.lastUrl = result.url
    state.lastResult = result
    state.error = null
    state.loading = false
    state.pingHistory.unshift(result)
  },

  SET_ERROR(state, { url, error }) {
    state.lastUrl = url
    state.lastResult = null
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
