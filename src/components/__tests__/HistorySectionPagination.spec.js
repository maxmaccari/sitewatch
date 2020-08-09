import { shallowMount } from '@vue/test-utils'
import HistorySectionPagination from '../HistorySectionPagination.vue'

describe('HistorySectionPagination', () => {
  it('not renders if the totalPages is 1', () => {
    const wrapper = shallowMount(HistorySectionPagination, {
      propsData: {
        page: 1,
        totalPages: 1,
      },
    })

    expect(wrapper.find('[data-test-id="paginator"]').exists()).toBe(false)
  })

  it('renders if the totalPages is more than 1', () => {
    const wrapper = shallowMount(HistorySectionPagination, {
      propsData: {
        page: 1,
        totalPages: 2,
      },
    })

    expect(wrapper.find('[data-test-id="paginator"]').exists()).toBe(true)
  })

  it('renders the numbers links properly', () => {
    const wrapper = shallowMount(HistorySectionPagination, {
      propsData: {
        page: 1,
        totalPages: 5,
      },
    })

    expect(wrapper.text()).toContain('Back')
    expect(wrapper.text()).toContain('Next')

    const numbers = [1, 2, 3, 4, 5]
    numbers.forEach(number => {
      expect(wrapper.text()).toContain(number)
    })
  })

  it('emits previous-page event if back is clicked', async () => {
    const wrapper = shallowMount(HistorySectionPagination, {
      propsData: {
        page: 2,
        totalPages: 3,
      },
    })

    const link = wrapper.find('[data-test-id="page-back"]')
    link.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('previous-page')).toHaveLength(1)
  })

  it('emits next-page event if next is clicked', async () => {
    const wrapper = shallowMount(HistorySectionPagination, {
      propsData: {
        page: 2,
        totalPages: 3,
      },
    })

    const link = wrapper.find('[data-test-id="page-next"]')
    link.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('next-page')).toHaveLength(1)
  })

  it('renders the numbers links properly', () => {
    const wrapper = shallowMount(HistorySectionPagination, {
      propsData: {
        page: 1,
        totalPages: 5,
      },
    })

    expect(wrapper.text()).toContain('Back')
    expect(wrapper.text()).toContain('Next')

    const numbers = [1, 2, 3, 4, 5]
    numbers.forEach(number => {
      expect(wrapper.text()).toContain(number)
    })
  })

  it('disable back if page is 1', () => {
    const wrapper = shallowMount(HistorySectionPagination, {
      propsData: {
        page: 1,
        totalPages: 2,
      },
    })

    const link = wrapper.find('[data-test-id="page-back"]')

    expect(link.element.disabled).toBe(true)
  })

  it('enable back if page is more than 1', () => {
    const wrapper = shallowMount(HistorySectionPagination, {
      propsData: {
        page: 2,
        totalPages: 2,
      },
    })

    const link = wrapper.find('[data-test-id="page-back"]')

    expect(link.element.disabled).toBe(false)
  })

  it('disable next if page is equal totalPages', () => {
    const wrapper = shallowMount(HistorySectionPagination, {
      propsData: {
        page: 2,
        totalPages: 2,
      },
    })

    const link = wrapper.find('[data-test-id="page-next"]')

    expect(link.element.disabled).toBe(true)
  })

  it('enable next if page is diferent than totalPages', () => {
    const wrapper = shallowMount(HistorySectionPagination, {
      propsData: {
        page: 1,
        totalPages: 2,
      },
    })

    const link = wrapper.find('[data-test-id="page-next"]')

    expect(link.element.disabled).toBe(false)
  })

  it('disable and mark the current page as active', () => {
    const wrapper = shallowMount(HistorySectionPagination, {
      propsData: {
        page: 2,
        totalPages: 3,
      },
    })

    const link = wrapper.find('[data-test-id="page-2"]')

    expect(link.classes()).toContain('active')
    expect(link.element.disabled).toBe(true)
  })

  // it('renders nothing if an empty pingHistory is given', () => {

  // })
  // it('renders a table with the given pingHistory', () => {
  //   const pingHistory = [
  //     { url: 'http://wwww.example-1.com', latency: 100 },
  //     { url: 'http://wwww.example-2.com', latency: 200 },
  //     { url: 'http://wwww.example-3.com', latency: 300 },
  //     { url: 'http://wwww.example-4.com', latency: 400 },
  //     { url: 'http://wwww.example-5.com', latency: 500 },
  //     { url: 'http://wwww.example-6.com', latency: 500 },
  //     { url: 'http://wwww.example-7.com', latency: 700 },
  //     { url: 'http://wwww.example-8.com', latency: 800 },
  //   ]
  //   const wrapper = shallowMount(HistorySectionPagination, {
  //     propsData: {
  //       pingHistory,
  //     },
  //   })
  //   expect(wrapper.find('table').exists()).toBe(true)
  //   pingHistory.forEach(site => {
  //     expect(wrapper.text()).toContain(site.url)
  //     expect(wrapper.text()).toContain(site.latency)
  //   })
  // })
  // it('renders the icons properly', () => {
  //   const url = 'http://wwww.example-1.com'
  //   const pingHistory = [{ url, latency: 100 }]
  //   const wrapper = shallowMount(HistorySectionPagination, {
  //     propsData: {
  //       pingHistory,
  //     },
  //   })
  //   const icon = wrapper.find('[data-test-id="table-site-icon"]')
  //   const expectedSrc = `http://s2.googleusercontent.com/s2/favicons?domain_url=${url}`
  //   const expectedAlt = `${url} icon`
  //   expect(icon.exists()).toBe(true)
  //   expect(icon.element.src).toBe(expectedSrc)
  //   expect(icon.element.alt).toBe(expectedAlt)
  // })
})
