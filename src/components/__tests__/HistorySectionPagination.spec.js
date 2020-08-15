import { shallowMount } from '@vue/test-utils'
import HistorySectionPagination from '../HistorySectionPagination'

const createWrapper = (props = {}) => {
  return shallowMount(HistorySectionPagination, {
    propsData: {
      page: 1,
      totalPages: 1,
      ...props,
    },
  })
}

describe('HistorySectionPagination', () => {
  it('doesn not render if the totalPages is 1', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('[data-test-id="paginator"]').exists()).toBe(false)
  })

  it('renders if the totalPages is more than 1', () => {
    const wrapper = createWrapper({ totalPages: 2 })

    expect(wrapper.find('[data-test-id="paginator"]').exists()).toBe(true)
  })

  it('renders the numbers links properly', () => {
    const wrapper = createWrapper({ totalPages: 5 })

    expect(wrapper.text()).toContain('Back')
    expect(wrapper.text()).toContain('Next')

    const numbers = [1, 2, 3, 4, 5]
    numbers.forEach(number => {
      expect(wrapper.text()).toContain(number)
    })
  })

  it('emits previous-page event if back is clicked', async () => {
    const wrapper = createWrapper({ page: 2, totalPages: 3 })

    const link = wrapper.find('[data-test-id="page-back"]')
    link.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('previous-page')).toHaveLength(1)
  })

  it('emits next-page event if next is clicked', async () => {
    const wrapper = createWrapper({ page: 2, totalPages: 3 })

    const link = wrapper.find('[data-test-id="page-next"]')
    link.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('next-page')).toHaveLength(1)
  })

  it('renders the numbers links properly', () => {
    const wrapper = createWrapper({ totalPages: 5 })

    expect(wrapper.text()).toContain('Back')
    expect(wrapper.text()).toContain('Next')

    const numbers = [1, 2, 3, 4, 5]
    numbers.forEach(number => {
      expect(wrapper.text()).toContain(number)
    })
  })

  it('disables back if page is 1', () => {
    const wrapper = createWrapper({ page: 1, totalPages: 2 })

    const link = wrapper.find('[data-test-id="page-back"]')

    expect(link.element.disabled).toBe(true)
  })

  it('enables back if page is more than 1', () => {
    const wrapper = createWrapper({ page: 2, totalPages: 2 })

    const link = wrapper.find('[data-test-id="page-back"]')

    expect(link.element.disabled).toBe(false)
  })

  it('disables next if page is equal totalPages', () => {
    const wrapper = createWrapper({ page: 2, totalPages: 2 })

    const link = wrapper.find('[data-test-id="page-next"]')

    expect(link.element.disabled).toBe(true)
  })

  it('enables next if page is diferent than totalPages', () => {
    const wrapper = createWrapper({ page: 1, totalPages: 2 })

    const link = wrapper.find('[data-test-id="page-next"]')

    expect(link.element.disabled).toBe(false)
  })

  it('disables and mark the current page as active', () => {
    const wrapper = createWrapper({ page: 2, totalPages: 3 })

    const link = wrapper.find('[data-test-id="page-2"]')

    expect(link.classes()).toContain('active')
    expect(link.element.disabled).toBe(true)
  })
})
