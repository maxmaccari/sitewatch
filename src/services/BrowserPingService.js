import axios from 'axios'

const urlPattern = new RegExp(
  '^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$',
  'i'
)

const BrowserPingService = {
  ping(url) {
    return new Promise((resolve, reject) => {
      if (!urlPattern.test(url)) return reject('invalid_url')
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
