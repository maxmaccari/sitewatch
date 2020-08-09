import mutations from '@/store/mutations'

describe('SET_PING_RESULT', () => {
  test('should set lastSiteUrl and latency, and clear errors', () => {
    const state = {
      lastSiteUrl: null,
      lastLatency: null,
      error: {},
    }

    const siteUrl = 'http://www.example.com'
    const latency = 200

    mutations.SET_PING_RESULT(state, { siteUrl, latency })

    expect(state).toEqual({
      lastSiteUrl: siteUrl,
      lastLatency: latency,
      error: null,
    })
  })
})

describe('SET_ERROR', () => {
  test('should set lastSiteUrl and error, and clear latency', () => {
    const state = {
      lastSiteUrl: null,
      lastLatency: 1000,
      error: null,
    }

    const siteUrl = 'http://www.example.com'
    const error = 'my error'

    mutations.SET_ERROR(state, { siteUrl, error })

    expect(state).toEqual({
      lastSiteUrl: siteUrl,
      lastLatency: null,
      error,
    })
  })
})
