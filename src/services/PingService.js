import Http from './Http'
import validateUrl from '@/utils/validateUrl'
import PingResult from '@/models/PingResult'

const PingService = {
  ping(url) {
    return new Promise((resolve, reject) => {
      if (!validateUrl(url)) return reject({ code: 'invalid_url', url })
      if (!navigator.onLine) return reject({ code: 'network_error', url })

      Http.post('/ping', { url })
        .then(response => {
          resolve(new PingResult(response.data))
        })
        .catch(error =>
          reject(
            (error.response && error.response.data) || {
              code: error.name,
              message: error.message,
              url: error.url,
            }
          )
        )
    })
  },
}

export default PingService
