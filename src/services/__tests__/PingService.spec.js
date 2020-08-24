import Http from '../Http'
import PingService from '../PingService'
import PingResult from '../../models/PingResult'

jest.mock('../Http')

describe('PingService', () => {
  describe('ping', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should return a PingResult from the website if request is accepted', async () => {
      Http.post.mockResolvedValue({
        data: {
          id: 'abc',
          url: 'http://www.example.com',
          latency: 100,
          status: 200,
        },
      })

      const result = await PingService.ping('http://www.example.com')

      expect(Http.post).toHaveBeenCalledTimes(1)
      expect(Http.post).toBeCalledWith('/ping', {
        url: 'http://www.example.com',
      })
      expect(result).toEqual(
        new PingResult({
          id: 'abc',
          latency: 100,
          url: 'http://www.example.com',
          status: 200,
        })
      )
    })

    it('should return error if api returns an error', async () => {
      const error = {
        response: {
          data: {
            url: 'http://www.example.com',
            code: 'ENOTFOUND',
            message: 'getaddrinfo ENOTFOUND www.example.com',
          },
        },
      }
      Http.post.mockRejectedValue(error)

      await expect(PingService.ping('http://www.example.com')).rejects.toEqual(
        error.response.data
      )
    })

    it('should return error if url is invalid', async () => {
      jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false)

      await expect(PingService.ping('invalid url')).rejects.toEqual({
        code: 'invalid_url',
        url: 'invalid url',
      })

      expect(Http.post).toHaveBeenCalledTimes(0)
    })

    it('should return error if browser is offline', async () => {
      jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false)

      await expect(PingService.ping('http://www.example.com')).rejects.toEqual({
        code: 'network_error',
        url: 'http://www.example.com',
      })

      expect(Http.post).toHaveBeenCalledTimes(0)
    })
  })
})
