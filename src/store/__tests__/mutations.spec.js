import mutations from '../mutations'
import originalState from '../state'
import generateGuid from '@/utils/generateGuid'

jest.mock('@/utils/generateGuid')
generateGuid.mockImplementation(() => '')

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
        id: '',
        url: siteUrl,
        latency,
      },
    ])
  })

  it('should push new entry to pingHistory on top of the array', () => {
    const oldUrl = { id: '', url: 'http://www.oldurl.com', latency: 100 }
    const state = createState({
      pingHistory: [oldUrl],
    })

    const siteUrl = 'http://www.example.com'
    const latency = 200

    mutations.SET_PING_RESULT(state, { siteUrl, latency })

    expect(state.pingHistory).toEqual([
      { id: '', url: siteUrl, latency },
      oldUrl,
    ])
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

describe('RESET_PING_HISTORY', () => {
  it('reset the ping history and historySearch', () => {
    const state = createState({
      pingHistory: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      historySearch: 'abc',
    })

    mutations.RESET_PING_HISTORY(state)
    expect(state.pingHistory).toEqual([])
    expect(state.historySearch).toEqual('')
  })

  it('should not allow to set negative pages nor with zero', () => {
    const state = createState()

    mutations.SET_CURRENT_PAGE(state, 0)
    expect(state.currentPage).toBe(1)

    mutations.SET_CURRENT_PAGE(state, -1)
    expect(state.currentPage).toBe(1)

    mutations.SET_CURRENT_PAGE(state, -2)
    expect(state.currentPage).toBe(1)
  })
})

describe('SET_CURRENT_PAGE', () => {
  it('set current page with the given value', () => {
    const state = createState()

    mutations.SET_CURRENT_PAGE(state, 1)
    expect(state.currentPage).toBe(1)

    mutations.SET_CURRENT_PAGE(state, 2)
    expect(state.currentPage).toBe(2)
  })

  it('should not allow to set negative pages nor with zero', () => {
    const state = createState()

    mutations.SET_CURRENT_PAGE(state, 0)
    expect(state.currentPage).toBe(1)

    mutations.SET_CURRENT_PAGE(state, -1)
    expect(state.currentPage).toBe(1)

    mutations.SET_CURRENT_PAGE(state, -2)
    expect(state.currentPage).toBe(1)
  })
})

describe('SET_HISTORY_SEARCH', () => {
  it('set history search with the given value', () => {
    const state = createState()

    mutations.SET_HISTORY_SEARCH(state, 'my search')
    expect(state.historySearch).toBe('my search')
  })

  it('set currentPage to 1', () => {
    const state = createState({ currentPage: 3 })

    mutations.SET_HISTORY_SEARCH(state, 'my search')
    expect(state.currentPage).toBe(1)
  })
})
