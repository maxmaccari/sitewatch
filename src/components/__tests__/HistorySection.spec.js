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

const createWrapper = (store = {}) => {
  return shallowMount(HistorySection, {
    mocks: {
      $store: {
        ...defaultStore,
        ...store,
      },
    },
  })
}

describe('HistorySection', () => {
  it('renders a message telling that the ping history is empty', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('No data found.')
  })

  it('renders the search input and clear button if it have pingHistory filled', () => {
    const wrapper = createWrapper()

    const searchInput = wrapper.find('[data-test-id="search-input"]')
    const clearButton = wrapper.find('[data-test-id="clear-button"]')

    expect(searchInput.exists()).toBe(true)
    expect(clearButton.exists()).toBe(true)
  })

  it('does not render the search input and clear button if it have pingHistory is empty', () => {
    const wrapper = createWrapper({
      state: {
        ...defaultStore.state,
        pingHistory: [],
      },
    })

    const searchInput = wrapper.find('[data-test-id="search-input"]')
    const clearButton = wrapper.find('[data-test-id="clear-button"]')

    expect(searchInput.exists()).toBe(false)
    expect(clearButton.exists()).toBe(false)
  })

  it("removes 'not-empty' to header control if pingHistory is empty", () => {
    const wrapper = createWrapper({
      state: {
        ...defaultStore.state,
        pingHistory: [],
      },
    })

    const header = wrapper.find('[data-test-id="header-control"]')

    expect(header.classes()).not.toContain('not-empty')
  })

  it('renders an empty search input', () => {
    const wrapper = createWrapper()

    const searchInput = wrapper.find('[data-test-id="search-input"]')

    expect(searchInput.element.value).toBe('')
  })

  it('dispatches searchHistory with element value if search is input', () => {
    const dispatch = jest.fn()
    const wrapper = createWrapper({
      dispatch,
    })

    const searchInput = wrapper.find('[data-test-id="search-input"]')
    searchInput.setValue('my search')

    expect(dispatch).toHaveBeenCalledWith('searchHistory', 'my search')
  })

  it('dispatches resetHistory if clear button is clicked', () => {
    const dispatch = jest.fn()

    const wrapper = createWrapper({
      dispatch,
    })

    const clearButton = wrapper.find('[data-test-id="clear-button"]')
    clearButton.trigger('click')

    expect(dispatch).toHaveBeenCalledWith('resetHistory')
  })

  it('renders HistorySectionTable passing a filteredHistory as param', () => {
    const filteredHistory = [1, 2, 3]
    const wrapper = createWrapper({
      getters: {
        filteredHistory,
        historyPages: 1,
      },
    })

    const historySectionTable = wrapper.findComponent(HistorySectionTable)

    expect(historySectionTable.exists()).toBe(true)
    expect(historySectionTable.props('pingHistory')).toBe(filteredHistory)
  })

  it('dispatches pingSite if ping-url event is emitted on HistorySectionTable', () => {
    const dispatch = jest.fn()
    const wrapper = createWrapper({
      dispatch,
    })

    const historySectionTable = wrapper.findComponent(HistorySectionTable)
    const url = 'http://www.example.com'
    historySectionTable.vm.$emit('ping-url', url)

    expect(dispatch).toHaveBeenCalledWith('pingSite', url)
  })

  it('renders HistorySectionPagination passing currentPage and historyPages as props', () => {
    const currentPage = 2
    const historyPages = 10
    const wrapper = createWrapper({
      state: {
        ...defaultStore.state,
        currentPage,
      },
      getters: {
        ...defaultStore.getters,
        historyPages,
      },
    })

    const historySectionPagination = wrapper.findComponent(
      HistorySectionPagination
    )

    expect(historySectionPagination.exists()).toBe(true)
    expect(historySectionPagination.props('page')).toBe(currentPage)
    expect(historySectionPagination.props('totalPages')).toBe(historyPages)
  })

  it('dispatches nextPage if next-page event is emitted on HistorySectionPagination', () => {
    const dispatch = jest.fn()
    const wrapper = createWrapper({
      dispatch,
    })

    const historySectionPagination = wrapper.findComponent(
      HistorySectionPagination
    )
    historySectionPagination.vm.$emit('next-page')

    expect(dispatch).toHaveBeenCalledWith('nextPage')
  })

  it('dispatches previousPage if previousPage event is emitted on HistorySectionPagination', () => {
    const dispatch = jest.fn()
    const wrapper = createWrapper({
      dispatch,
    })

    const historySectionPagination = wrapper.findComponent(
      HistorySectionPagination
    )
    historySectionPagination.vm.$emit('previous-page')

    expect(dispatch).toHaveBeenCalledWith('previousPage')
  })

  it('dispatches goToPage if change-page event is emitted on HistorySectionPagination', () => {
    const dispatch = jest.fn()
    const wrapper = createWrapper({
      dispatch,
    })

    const historySectionPagination = wrapper.findComponent(
      HistorySectionPagination
    )
    historySectionPagination.vm.$emit('change-page', 3)

    expect(dispatch).toHaveBeenCalledWith('goToPage', 3)
  })
})
