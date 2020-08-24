import createPersistedState from 'vuex-persistedstate'
import PingResult from '@/models/PingResult'

export const PERSISTED_STATE_KEY = 'sitewatcher'

export default createPersistedState({
  key: PERSISTED_STATE_KEY,
  paths: ['pingHistory'],
  getState(key, storage) {
    const json = storage.getItem(key)

    try {
      if (!json) return undefined
      let { pingHistory } = JSON.parse(json)

      return {
        pingHistory: pingHistory.map(
          ({ _params: params }) => new PingResult(params)
        ),
      }
    } catch (err) {
      return undefined
    }
  },
})
