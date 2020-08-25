import { shallowMount } from '@vue/test-utils'
import HistorySectionTableEntry from '../HistorySectionTableEntry.vue'

describe('HistorySectionTableEntry', () => {
  it('renders the given pingResult', () => {
    const pingResult = { url: 'http://wwww.example-2.com', latency: 200 }
    const wrapper = shallowMount(HistorySectionTableEntry, {
      propsData: {
        pingResult,
      },
    })

    expect(wrapper.text()).toContain(pingResult.url)
    expect(wrapper.text()).toContain(pingResult.latency)
  })

  it('renders the icons properly', () => {
    const url = 'http://wwww.example-1.com'
    const pingResult = { url, iconUrl: 'http://www.example.com' }
    const wrapper = shallowMount(HistorySectionTableEntry, {
      propsData: {
        pingResult,
      },
    })

    const icon = wrapper.find('[data-test-id="table-site-icon"]')
    const expectedSrc = 'http://www.example.com'
    const expectedAlt = `${url} icon`

    expect(icon.exists()).toBe(true)
    expect(icon.element.src).toContain(expectedSrc)
    expect(icon.element.alt).toBe(expectedAlt)
  })

  it('renders latency indicators properly', () => {
    const pingResult = { feedback: 'any-feedback' }

    const wrapper = shallowMount(HistorySectionTableEntry, {
      propsData: {
        pingResult,
      },
    })

    const indicator = wrapper.find('[data-test-id="history-latency-indicator"]')

    expect(indicator.exists()).toBe(true)
    expect(indicator.classes()).toContain('indicator-any-feedback')
    expect(indicator.element.title).toContain('any-feedback')
  })

  it('emits an ping event with the given url if users click on ping bold', () => {
    const url = 'http://wwww.example-1.com'
    const wrapper = shallowMount(HistorySectionTableEntry, {
      propsData: {
        pingResult: { url },
      },
    })

    const icon = wrapper.find('[data-test-id="history-table-ping"]')
    icon.trigger('click')

    expect(wrapper.emitted('ping-url')).toHaveLength(1)
    expect(wrapper.emitted('ping-url')[0][0]).toBe(url)
  })
})
