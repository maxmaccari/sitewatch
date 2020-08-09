import axios from 'axios'

import validateUrl from '@/utils/validateUrl'

const BrowserPingService = {
  ping(url) {
    return new Promise((resolve, reject) => {
      if (!validateUrl(url)) return reject('invalid_url')
      if (!navigator.onLine) return reject('network_error')

      const calculateTime = () => {
        const endTime = new Date().getTime()
        const milliseconds = endTime - startTime
        resolve(milliseconds)
      }
      const startTime = new Date().getTime()
      axios
        .get(url)
        .then(calculateTime)
        .catch(calculateTime)
    })
  },
}

export default BrowserPingService
