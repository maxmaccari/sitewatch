import BrowserPingService from '@/services/BrowserPingService'

export default {
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
}
