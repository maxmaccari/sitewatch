export default class PingResult {
  _params = null

  constructor(params) {
    if (!params.id || !params.url || !params.latency)
      throw 'id, url and latency are required'
    if (typeof params.latency !== 'number') throw 'latency must be a number'

    this._params = params
  }

  get id() {
    return this._params.id
  }

  get url() {
    return this._params.url
  }

  get latency() {
    return this._params.latency
  }

  get feedback() {
    if (this.latency <= 360) return 'good'
    if (this.latency <= 1000) return 'average'

    return 'bad'
  }

  get iconUrl() {
    return `http://s2.googleusercontent.com/s2/favicons?domain_url=${this.url}`
  }

  get hostName() {
    return this.url.split('://')[1].split('/')[0]
  }
}
