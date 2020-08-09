import axios from 'axios'
import BrowserPingService from '../BrowserPingService'

jest.mock('axios')

describe('BrowserPingService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('ping should calculate milliseconds from a website request is accepted', async () => {
    axios.get.mockResolvedValue({})

    const timeout = await BrowserPingService.ping('http://www.example.com')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toBeCalledWith('http://www.example.com')
    expect(timeout).toBeGreaterThanOrEqual(0)
  })

  test('ping should calculate milliseconds from a website request is rejected due cors', async () => {
    axios.get.mockRejectedValue({})

    const timeout = await BrowserPingService.ping('http://www.example.com')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toBeCalledWith('http://www.example.com')
    expect(timeout).toBeGreaterThanOrEqual(0)
  })

  test('ping should calculate return error if browser is offline', async () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false)

    await expect(
      BrowserPingService.ping('http://www.example.com')
    ).rejects.toEqual('network_error')

    expect(axios.get).toHaveBeenCalledTimes(0)
  })
})
