import createPersistedState from 'vuex-persistedstate'

export const PERSISTED_STATE_KEY = 'sitewatcher'

export default createPersistedState({
  key: PERSISTED_STATE_KEY,
  paths: ['pingHistory'],
})
