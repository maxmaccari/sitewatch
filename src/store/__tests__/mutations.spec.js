import mutations from '../mutations'
import originalState from '../state'

const createState = (replacement = {}) => {
  return {
    ...originalState,
    pingHistory: [],
    ...replacement,
  }
}

describe('SET_PING_RESULT', () => {
  it('should set lastSiteUrl and latency', () => {
    const state = createState()

    const siteUrl = 'http://www.example.com'
    const latency = 200

    mutations.SET_PING_RESULT(state, { siteUrl, latency })

    expect(state.lastSiteUrl).toBe(siteUrl)
    expect(state.lastLatency).toBe(latency)
  })

  it('should reset error and loading', () => {
    const state = createState({
      error: {},
      loading: true,
    })

    const siteUrl = 'http://www.example.com'
    const latency = 200

    mutations.SET_PING_RESULT(state, { siteUrl, latency })

    expect(state.error).toBe(null)
    expect(state.loading).toBe(false)
  })

  it('should add the new url to pingHistory', () => {
    const state = createState()

    const siteUrl = 'http://www.example.com'
    const latency = 200

    mutations.SET_PING_RESULT(state, { siteUrl, latency })

    expect(state.pingHistory).toEqual([
      {
        url: siteUrl,
        latency,
      },
    ])
  })

  it('should push new entry to pingHistory on top of the array', () => {
    const oldUrl = { url: 'http://www.oldurl.com', latency: 100 }
    const state = createState({
      pingHistory: [oldUrl],
    })

    const siteUrl = 'http://www.example.com'
    const latency = 200

    mutations.SET_PING_RESULT(state, { siteUrl, latency })

    expect(state.pingHistory).toEqual([{ url: siteUrl, latency }, oldUrl])
  })
})

describe('SET_ERROR', () => {
  it('should set lastSiteUrl and error', () => {
    const state = createState()

    const siteUrl = 'http://www.example.com'
    const error = 'my error'

    mutations.SET_ERROR(state, { siteUrl, error })

    expect(state.lastSiteUrl).toBe(siteUrl)
    expect(state.error).toBe(error)
  })

  it('should clear latency and loading', () => {
    const state = createState({
      lastSiteUrl: null,
      lastLatency: 1000,
      error: null,
      loading: true,
    })

    const siteUrl = 'http://www.example.com'
    const error = 'my error'

    mutations.SET_ERROR(state, { siteUrl, error })

    expect(state.loading).toBe(false)
    expect(state.lastLatency).toBe(null)
  })
})

describe('START_LOADING', () => {
  it('should set loading as true', () => {
    const state = createState()

    mutations.START_LOADING(state)

    expect(state.loading).toBe(true)
  })
})
