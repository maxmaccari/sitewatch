import getters from '../getters'

const dummyHistory = quantity => {
  return [...new Array(quantity)].map(() => ({
    url: '',
  }))
}

describe('filteredHistory', () => {
  it('returns the history filtered by its currentPage paged by 10', () => {
    const pingHistory = dummyHistory(25)
    const { filteredHistory } = getters

    expect(filteredHistory({ pingHistory: [], currentPage: 1 })).toHaveLength(0)
    expect(filteredHistory({ pingHistory, currentPage: 1 })).toHaveLength(10)
    expect(filteredHistory({ pingHistory, currentPage: 2 })).toHaveLength(10)
    expect(filteredHistory({ pingHistory, currentPage: 3 })).toHaveLength(5)
    expect(filteredHistory({ pingHistory, currentPage: 4 })).toHaveLength(0)
  })

  it('returns the history filtered by its historySearch filtering by its url', () => {
    const pingHistory = [
      { url: 'http://www.example1.com' },
      { url: 'https://www.example1.com' },
      { url: 'https://www.example1.com/path' },
      { url: 'https://www.example2.com' },
    ]
    const { filteredHistory } = getters

    expect(
      filteredHistory({ pingHistory: [], historySearch: 'example' })
    ).toHaveLength(0)

    expect(
      filteredHistory({ pingHistory, historySearch: 'example' })
    ).toHaveLength(4)

    expect(
      filteredHistory({ pingHistory, historySearch: 'example1' })
    ).toHaveLength(3)

    expect(
      filteredHistory({ pingHistory, historySearch: 'example2' })
    ).toHaveLength(1)

    expect(
      filteredHistory({ pingHistory, historySearch: 'https example1' })
    ).toHaveLength(2)
  })
})

describe('historyPages', () => {
  it('returns the number of pages that the pageHistory contains by 10', () => {
    const { historyPages } = getters

    expect(historyPages({ pingHistory: [] })).toBe(0)
    expect(historyPages({ pingHistory: dummyHistory(5) })).toBe(1)
    expect(historyPages({ pingHistory: dummyHistory(10) })).toBe(1)
    expect(historyPages({ pingHistory: dummyHistory(15) })).toBe(2)
    expect(historyPages({ pingHistory: dummyHistory(25) })).toBe(3)
  })

  it('returns the number of filted pages by historySearch that the pageHistory contains by 10', () => {
    const pingHistory = [
      { url: 'http://www.example1.com' },
      { url: 'http://www.example2.com' },
      { url: 'http://www.example2.com' },
      { url: 'http://www.example2.com' },
      { url: 'http://www.example2.com' },
      { url: 'http://www.example2.com' },
      { url: 'http://www.example2.com' },
      { url: 'http://www.example2.com' },
      { url: 'http://www.example2.com' },
      { url: 'http://www.example2.com' },
      { url: 'http://www.example2.com' },
    ]

    const { historyPages } = getters

    expect(historyPages({ pingHistory, historySearch: 'example1' })).toBe(1)
  })
})
