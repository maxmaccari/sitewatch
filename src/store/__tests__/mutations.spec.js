import mutations from '@/store/mutations'

describe('SET_PING_RESULT', () => {
  it('should set lastSiteUrl and latency, and clear errors', () => {
    const state = {
      lastSiteUrl: null,
      lastLatency: null,
      error: {},
      loading: true,
    }

    const siteUrl = 'http://www.example.com'
    const latency = 200

    mutations.SET_PING_RESULT(state, { siteUrl, latency })

    expect(state).toEqual({
      lastSiteUrl: siteUrl,
      lastLatency: latency,
      error: null,
      loading: false,
    })
  })
})

describe('SET_ERROR', () => {
  it('should set lastSiteUrl and error, and clear latency and loading', () => {
    const state = {
      lastSiteUrl: null,
      lastLatency: 1000,
      error: null,
      loading: true,
    }

    const siteUrl = 'http://www.example.com'
    const error = 'my error'

    mutations.SET_ERROR(state, { siteUrl, error })

    expect(state).toEqual({
      error,
      lastSiteUrl: siteUrl,
      lastLatency: null,
      loading: false,
    })
  })
})

describe('START_LOADING', () => {
  it('should set loading as true', () => {
    const state = {
      lastSiteUrl: null,
      lastLatency: null,
      error: null,
      loading: false,
    }

    mutations.START_LOADING(state)

    expect(state).toEqual({
      error: null,
      lastSiteUrl: null,
      lastLatency: null,
      loading: true,
    })
  })
})
