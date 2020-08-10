import Http from './Http'
import validateUrl from '@/utils/validateUrl'

const PingService = {
  ping(url) {
    return new Promise((resolve, reject) => {
      if (!validateUrl(url)) return reject('invalid_url')
      if (!navigator.onLine) return reject('network_error')

      Http.post('/ping', { url })
        .then(response => {
          resolve(response.data)
        })
        .catch(reject)
    })
  },
}

export default PingService
