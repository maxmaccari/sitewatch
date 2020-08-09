import actions from '../actions'
import BrowserPingService from '@/services/BrowserPingService'

jest.mock('@/services/BrowserPingService')

describe('pingSite', () => {
  it('calls BrowserPingService.ping with the given url', async () => {
    BrowserPingService.ping.mockResolvedValue(100)
    const commit = jest.fn()
    const siteUrl = 'http://www.example.com'

    await actions.pingSite({ commit }, siteUrl)

    expect(BrowserPingService.ping).toBeCalledTimes(1)
    expect(BrowserPingService.ping).toBeCalledWith(siteUrl)
  })

  it('commits START_LOADING and SET_PING_RESULT with the given url and the timeout if ping is sucessfull', async () => {
    const latency = 250
    const siteUrl = 'http://www.example.com'
    const commit = jest.fn()

    BrowserPingService.ping.mockResolvedValue(latency)

    await actions.pingSite({ commit }, siteUrl)

    expect(commit).toBeCalledTimes(2)
    expect(commit).toBeCalledWith('SET_PING_RESULT', { latency, siteUrl })
    expect(commit).toBeCalledWith('START_LOADING')
  })

  it('commits START_LOADING and SET_ERROR with the given url and the error in case of errors', async () => {
    const error = 'my error'
    const siteUrl = 'http://www.example.com'
    const commit = jest.fn()

    BrowserPingService.ping.mockRejectedValue(error)

    await actions.pingSite({ commit }, siteUrl)

    expect(commit).toBeCalledTimes(2)
    expect(commit).toBeCalledWith('SET_ERROR', { error, siteUrl })
    expect(commit).toBeCalledWith('START_LOADING')
  })
})

describe('goToPage', () => {
  it('commits SET_CURRENT_PAGE with the given page', () => {
    const commit = jest.fn()
    const page = 342

    actions.goToPage({ commit }, page)

    expect(commit).toBeCalledTimes(1)
    expect(commit).toBeCalledWith('SET_CURRENT_PAGE', page)
  })
})

describe('nextPage', () => {
  it('commits SET_CURRENT_PAGE with next page if exists', () => {
    const commit = jest.fn()
    const state = { currentPage: 1 }
    const getters = { historyPages: 2 }

    actions.nextPage({ commit, state, getters })

    expect(commit).toBeCalledTimes(1)
    expect(commit).toBeCalledWith('SET_CURRENT_PAGE', 2)
  })

  it('should not commit SET_CURRENT_PAGE with next page if it not exists', () => {
    const commit = jest.fn()
    const state = { currentPage: 1 }
    const getters = { historyPages: 1 }

    actions.nextPage({ commit, state, getters })

    expect(commit).toBeCalledTimes(0)
  })
})

describe('previousPage', () => {
  it('commits SET_CURRENT_PAGE with previous page if exists', () => {
    const commit = jest.fn()
    const state = { currentPage: 2 }

    actions.previousPage({ commit, state })

    expect(commit).toBeCalledTimes(1)
    expect(commit).toBeCalledWith('SET_CURRENT_PAGE', 1)
  })

  it('should not commit SET_CURRENT_PAGE with previous page if it not exists', () => {
    const commit = jest.fn()
    const state = { currentPage: 1 }

    actions.previousPage({ commit, state })

    expect(commit).toBeCalledTimes(0)
  })
})

describe('searchHistory', () => {
  it('commits SET_HISTORY_SEARCH with the given search', () => {
    const commit = jest.fn()
    const search = 'my search'

    actions.searchHistory({ commit }, search)

    expect(commit).toBeCalledTimes(1)
    expect(commit).toBeCalledWith('SET_HISTORY_SEARCH', search)
  })
})

describe('resetHistory', () => {
  it('commits RESET_PING_HISTORY', () => {
    const commit = jest.fn()

    actions.resetHistory({ commit })

    expect(commit).toBeCalledTimes(1)
    expect(commit).toBeCalledWith('RESET_PING_HISTORY')
  })
})
