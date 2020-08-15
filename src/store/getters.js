const HISTORY_PAGINATION = 10

const urlSearchFilter = state => ({ url }) => {
  if (!state.historySearch) return true

  return state.historySearch
    .split(' ')
    .every(predicate => url.includes(predicate))
}

export default {
  lastSite: state => {
    if (!state.lastUrl) return null

    const splittedUrl = state.lastUrl.split('://')

    return splittedUrl[1] || splittedUrl[0]
  },

  historyPages: state => {
    const filteredHistory = state.pingHistory.filter(urlSearchFilter(state))

    return Math.ceil(filteredHistory.length / HISTORY_PAGINATION)
  },

  filteredHistory: state => {
    const page = state.currentPage || 1
    const fromPage = (page - 1) * HISTORY_PAGINATION
    const toPage = page * HISTORY_PAGINATION

    return state.pingHistory
      .filter(urlSearchFilter(state))
      .slice(fromPage, toPage)
  },
}
