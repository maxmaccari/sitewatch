import actions from '../actions'
import BrowserPingService from '@/services/BrowserPingService'

jest.mock('@/services/BrowserPingService')

describe('pingSite', () => {
  it('should call BrowserPingService.ping with the given url', async () => {
    BrowserPingService.ping.mockResolvedValue(100)
    const commit = jest.fn()
    const siteUrl = 'http://www.example.com'

    await actions.pingSite({ commit }, siteUrl)

    expect(BrowserPingService.ping).toBeCalledTimes(1)
    expect(BrowserPingService.ping).toBeCalledWith(siteUrl)
  })

  it('should commit START_LOADING and SET_PING_RESULT with the given url and the timeout if ping is sucessfull', async () => {
    const latency = 250
    const siteUrl = 'http://www.example.com'
    const commit = jest.fn()

    BrowserPingService.ping.mockResolvedValue(latency)

    await actions.pingSite({ commit }, siteUrl)

    expect(commit).toBeCalledTimes(2)
    expect(commit).toBeCalledWith('SET_PING_RESULT', { latency, siteUrl })
    expect(commit).toBeCalledWith('START_LOADING')
  })

  it('should commit START_LOADING and SET_ERROR with the given url and the error in case of errors', async () => {
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
