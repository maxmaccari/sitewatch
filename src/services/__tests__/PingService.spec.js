import Http from '../Http'
import PingService from '../PingService'

jest.mock('../Http')

describe('PingService', () => {
  describe('ping', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should calculate milliseconds from a website request is accepted', async () => {
      Http.post.mockResolvedValue({
        data: {
          id: 'abc',
          url: 'http://www.example.com',
          latency: 100,
          status: 200,
        },
      })

      const response = await PingService.ping('http://www.example.com')

      expect(Http.post).toHaveBeenCalledTimes(1)
      expect(Http.post).toBeCalledWith('/ping', {
        url: 'http://www.example.com',
      })
      expect(response.id).toBe('abc')
      expect(response.latency).toBe(100)
    })

    it('should return error if browser is offline', async () => {
      jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false)

      await expect(PingService.ping('http://www.example.com')).rejects.toEqual(
        'network_error'
      )

      expect(Http.post).toHaveBeenCalledTimes(0)
    })
  })
})
