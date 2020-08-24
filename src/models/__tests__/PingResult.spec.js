import PingResult from '../PingResult'

describe('PingResult', () => {
  it('can instantiate with valid params', () => {
    const params = {
      id: 'abc',
      url: 'http://www.example.com',
      latency: 200,
    }
    const object = new PingResult(params)

    expect(object.id).toBe(params.id)
    expect(object.url).toBe(params.url)
    expect(object.latency).toBe(params.latency)
  })

  it('instances are imutable', () => {
    const params = {
      id: 'abc',
      url: 'http://www.example.com',
      latency: 200,
    }
    const object = new PingResult(params)

    expect(() => {
      object.id = 'abc'
    }).toThrowError(TypeError)

    expect(() => {
      object.url = 'abc'
    }).toThrowError(TypeError)

    expect(() => {
      object.latency = 100
    }).toThrowError(TypeError)
  })

  it('cannot instantiate with invalid params', () => {
    expect(() => new PingResult({})).toThrow('id, url and latency are required')
    expect(
      () =>
        new PingResult({
          id: 'abc',
          url: 'abc',
          latency: 'abc',
        })
    ).toThrow('latency must be a number')
  })

  it('gets the correct feedback based on the latency', () => {
    const params = { id: 'abc', url: 'abc' }
    expect(new PingResult({ ...params, latency: 360 }).feedback).toBe('good')
    expect(new PingResult({ ...params, latency: 1000 }).feedback).toBe(
      'average'
    )
    expect(new PingResult({ ...params, latency: 1001 }).feedback).toBe('bad')
  })

  it('gets the correct iconUrl based on the url', () => {
    const url = 'http://www.example.com'
    const object = new PingResult({ id: 'abc', url, latency: 100 })

    const expectedIconUrl = `http://s2.googleusercontent.com/s2/favicons?domain_url=${url}`
    expect(object.iconUrl).toBe(expectedIconUrl)
  })

  it('gets the correct hostName based on the url', () => {
    const params = { id: 'abc', latency: 100 }

    expect(
      new PingResult({ ...params, url: 'http://www.example.com' }).hostName
    ).toBe('www.example.com')

    expect(
      new PingResult({ ...params, url: 'https://www.example.com' }).hostName
    ).toBe('www.example.com')

    expect(
      new PingResult({ ...params, url: 'https://www.example.com/' }).hostName
    ).toBe('www.example.com')

    expect(
      new PingResult({ ...params, url: 'https://www.example.com/path' })
        .hostName
    ).toBe('www.example.com')
  })
})
