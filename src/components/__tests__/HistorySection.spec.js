import { shallowMount } from '@vue/test-utils'
import HistorySection from '../HistorySection.vue'
import HistorySectionTable from '../HistorySectionTable.vue'
import HistorySectionPagination from '../HistorySectionPagination.vue'

const defaultStore = {
  state: {
    currentPage: 1,
    pingHistory: [1],
  },
  getters: {
    filteredHistory: [],
    historyPages: 1,
  },
}

describe('HistorySection', () => {
  it('renders a message telling that the ping history is empty', () => {
    const wrapper = shallowMount(HistorySection, {
      mocks: {
        $store: defaultStore,
      },
    })

    expect(wrapper.text()).toContain('No data found here.')
  })

  it('renders the search input and clear button if it have pingHistory filled', () => {
    const wrapper = shallowMount(HistorySection, {
      mocks: {
        $store: defaultStore,
      },
    })

    const searchInput = wrapper.find('[data-test-id="search-input"]')
    const clearButton = wrapper.find('[data-test-id="clear-button"]')

    expect(searchInput.exists()).toBe(true)
    expect(clearButton.exists()).toBe(true)
  })

  it('does not render the search input and clear button if it have pingHistory is empty', () => {
    const wrapper = shallowMount(HistorySection, {
      mocks: {
        $store: {
          state: {
            ...defaultStore.state,
            pingHistory: [],
          },
          getters: defaultStore.getters,
        },
      },
    })

    const searchInput = wrapper.find('[data-test-id="search-input"]')
    const clearButton = wrapper.find('[data-test-id="clear-button"]')

    expect(searchInput.exists()).toBe(false)
    expect(clearButton.exists()).toBe(false)
  })

  it("add 'history-section__header--empty' to history-section__header if pingHistory is empty", () => {
    const wrapper = shallowMount(HistorySection, {
      mocks: {
        $store: {
          state: {
            ...defaultStore.state,
            pingHistory: [],
          },
          getters: defaultStore.getters,
        },
      },
    })

    const header = wrapper.find('.history-section__header')

    expect(header.classes()).toContain('history-section__header--empty')
  })

  it('renders an empty search input', () => {
    const wrapper = shallowMount(HistorySection, {
      mocks: {
        $store: defaultStore,
      },
    })

    const searchInput = wrapper.find('[data-test-id="search-input"]')

    expect(searchInput.element.value).toBe('')
  })

  it('dispatch searchHistory with element value if search is input', () => {
    const dispatch = jest.fn()

    const wrapper = shallowMount(HistorySection, {
      mocks: {
        $store: {
          ...defaultStore,
          dispatch,
        },
      },
    })

    const searchInput = wrapper.find('[data-test-id="search-input"]')
    searchInput.setValue('my search')

    expect(dispatch).toHaveBeenCalledWith('searchHistory', 'my search')
  })

  it('dispatch resetHistory if clear button is clicked', () => {
    const dispatch = jest.fn()

    const wrapper = shallowMount(HistorySection, {
      mocks: {
        $store: {
          ...defaultStore,
          dispatch,
        },
      },
    })

    const clearButton = wrapper.find('[data-test-id="clear-button"]')
    clearButton.trigger('click')

    expect(dispatch).toHaveBeenCalledWith('resetHistory')
  })

  it('renders HistorySectionTable passing a filteredHistory as param', () => {
    const filteredHistory = [1, 2, 3]
    const wrapper = shallowMount(HistorySection, {
      mocks: {
        $store: {
          state: defaultStore.state,
          getters: {
            filteredHistory,
            historyPages: 1,
          },
        },
      },
    })

    const historySectionTable = wrapper.findComponent(HistorySectionTable)

    expect(historySectionTable.exists()).toBe(true)
    expect(historySectionTable.props('pingHistory')).toBe(filteredHistory)
  })

  it('dispatch pingSite if ping-url event is emitted on HistorySectionTable', () => {
    const dispatch = jest.fn()

    const wrapper = shallowMount(HistorySection, {
      mocks: {
        $store: {
          ...defaultStore,
          dispatch,
        },
      },
    })

    const historySectionTable = wrapper.findComponent(HistorySectionTable)
    const url = 'http://www.example.com'
    historySectionTable.vm.$emit('ping-url', url)

    expect(dispatch).toHaveBeenCalledWith('pingSite', url)
  })

  it('renders HistorySectionPagination passing currentPage and historyPages as props', () => {
    const currentPage = 2
    const historyPages = 10
    const wrapper = shallowMount(HistorySection, {
      mocks: {
        $store: {
          state: {
            ...defaultStore.state,
            currentPage,
          },
          getters: {
            ...defaultStore.getters,
            historyPages,
          },
        },
      },
    })

    const historySectionPagination = wrapper.findComponent(
      HistorySectionPagination
    )

    expect(historySectionPagination.exists()).toBe(true)
    expect(historySectionPagination.props('page')).toBe(currentPage)
    expect(historySectionPagination.props('totalPages')).toBe(historyPages)
  })

  it('dispatch nextPage if next-page event is emitted on HistorySectionPagination', () => {
    const dispatch = jest.fn()

    const wrapper = shallowMount(HistorySection, {
      mocks: {
        $store: {
          ...defaultStore,
          dispatch,
        },
      },
    })

    const historySectionPagination = wrapper.findComponent(
      HistorySectionPagination
    )
    historySectionPagination.vm.$emit('next-page')

    expect(dispatch).toHaveBeenCalledWith('nextPage')
  })

  it('dispatch previousPage if previousPage event is emitted on HistorySectionPagination', () => {
    const dispatch = jest.fn()

    const wrapper = shallowMount(HistorySection, {
      mocks: {
        $store: {
          ...defaultStore,
          dispatch,
        },
      },
    })

    const historySectionPagination = wrapper.findComponent(
      HistorySectionPagination
    )
    historySectionPagination.vm.$emit('previous-page')

    expect(dispatch).toHaveBeenCalledWith('previousPage')
  })

  it('dispatch goToPage if change-page event is emitted on HistorySectionPagination', () => {
    const dispatch = jest.fn()

    const wrapper = shallowMount(HistorySection, {
      mocks: {
        $store: {
          ...defaultStore,
          dispatch,
        },
      },
    })

    const historySectionPagination = wrapper.findComponent(
      HistorySectionPagination
    )
    historySectionPagination.vm.$emit('change-page', 3)

    expect(dispatch).toHaveBeenCalledWith('goToPage', 3)
  })
})
