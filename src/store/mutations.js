export default {
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
}
