import { shallowMount } from '@vue/test-utils'
import HistorySectionTable from '../HistorySectionTable.vue'

describe('HistorySectionTable', () => {
  it('renders nothing if an empty pingHistory is given', () => {
    const wrapper = shallowMount(HistorySectionTable, {
      propsData: {
        pingHistory: [],
      },
    })

    expect(wrapper.find('table').exists()).toBe(false)
  })

  it('renders a table with the given pingHistory', () => {
    const pingHistory = [
      { url: 'http://wwww.example-1.com', latency: 100 },
      { url: 'http://wwww.example-2.com', latency: 200 },
      { url: 'http://wwww.example-3.com', latency: 300 },
      { url: 'http://wwww.example-4.com', latency: 400 },
      { url: 'http://wwww.example-5.com', latency: 500 },
      { url: 'http://wwww.example-6.com', latency: 500 },
      { url: 'http://wwww.example-7.com', latency: 700 },
      { url: 'http://wwww.example-8.com', latency: 800 },
    ]
    const wrapper = shallowMount(HistorySectionTable, {
      propsData: {
        pingHistory,
      },
    })

    expect(wrapper.find('table').exists()).toBe(true)

    pingHistory.forEach(site => {
      expect(wrapper.text()).toContain(site.url)
      expect(wrapper.text()).toContain(site.latency)
    })
  })

  it('renders the icons properly', () => {
    const url = 'http://wwww.example-1.com'
    const pingHistory = [{ url, latency: 100 }]
    const wrapper = shallowMount(HistorySectionTable, {
      propsData: {
        pingHistory,
      },
    })

    const icon = wrapper.find('[data-test-id="table-site-icon"]')
    const expectedSrc = `http://s2.googleusercontent.com/s2/favicons?domain_url=${url}`
    const expectedAlt = `${url} icon`

    expect(icon.exists()).toBe(true)
    expect(icon.element.src).toBe(expectedSrc)
    expect(icon.element.alt).toBe(expectedAlt)
  })

  it('renders latency indicators properly', () => {
    const url = 'http://wwww.example-1.com'
    const pingHistory = [
      { url, latency: 250 },
      { url, latency: 500 },
      { url, latency: 1200 },
    ]
    const wrapper = shallowMount(HistorySectionTable, {
      propsData: {
        pingHistory,
      },
    })

    const indicators = wrapper.findAll(
      '[data-test-id="history-latency-indicator"]'
    )

    expect(indicators.exists()).toBe(true)
    expect(indicators.at(0).classes()).toContain('indicator-good')
    expect(indicators.at(0).element.title).toContain('good')
    expect(indicators.at(1).classes()).toContain('indicator-average')
    expect(indicators.at(1).element.title).toContain('average')
    expect(indicators.at(2).classes()).toContain('indicator-bad')
    expect(indicators.at(2).element.title).toContain('bad')
  })

  it('emits an ping event with the given url if users click on ping bold', () => {
    const url = 'http://wwww.example-1.com'
    const wrapper = shallowMount(HistorySectionTable, {
      propsData: {
        pingHistory: [{ url, latency: 100 }],
      },
    })

    const icon = wrapper.find('[data-test-id="history-table-ping"]')
    icon.trigger('click')

    expect(wrapper.emitted('ping-url')).toHaveLength(1)
    expect(wrapper.emitted('ping-url')[0][0]).toBe(url)
  })
})
