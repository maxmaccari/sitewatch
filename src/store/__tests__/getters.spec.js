import getters from '../getters'

describe('lastSite', () => {
  it('returns the lastSiteUrl without its protocol', () => {
    expect(getters.lastSite({ lastSiteUrl: 'http://www.example.com' })).toBe(
      'www.example.com'
    )

    expect(getters.lastSite({ lastSiteUrl: 'https://www.example.com' })).toBe(
      'www.example.com'
    )

    expect(getters.lastSite({ lastSiteUrl: 'www.example.com' })).toBe(
      'www.example.com'
    )

    expect(getters.lastSite({ lastSiteUrl: null })).toBe(null)
  })
})
