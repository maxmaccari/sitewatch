import { shallowMount } from '@vue/test-utils'
import HistorySection from '../HistorySection.vue'
import HistorySectionTable from '../HistorySectionTable.vue'
import HistorySectionPagination from '../HistorySectionPagination.vue'

const defaultStore = {
  state: {
    currentPage: 1,
  },
  getters: {
    filteredHistory: [],
    historyPages: 1,
  },
}

describe('HistorySection', () => {
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

  it('renders HistorySectionPagination passing currentPage and historyPages as props', () => {
    const currentPage = 2
    const historyPages = 10
    const wrapper = shallowMount(HistorySection, {
      mocks: {
        $store: {
          state: {
            ...defaultStore.getters,
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
