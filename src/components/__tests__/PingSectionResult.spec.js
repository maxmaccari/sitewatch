import { shallowMount } from '@vue/test-utils'
import PingSectionResult from '../PingSectionResult.vue'

const createWrapper = (props = {}) => {
  return shallowMount(PingSectionResult, {
    propsData: {
      url: 'http://www.example.com',
      latency: 100,
      ...props,
    },
  })
}

describe('PingSectionResult', () => {
  it('displays result data according with the given params', () => {
    const url = 'http://www.example.com'
    const latency = 214
    const wrapper = createWrapper({ url, latency })

    expect(wrapper.text()).toContain(url)
    expect(wrapper.text()).toContain(latency)
  })

  it('points to the site with the given url', () => {
    const url = 'http://www.example.com'
    const wrapper = createWrapper({ url })

    const siteLink = wrapper.find('[data-test-id="site-link"]')

    expect(siteLink.element.href).toContain(url)
  })

  it('displays the favicon from the website', () => {
    const url = 'http://www.example.com'
    const wrapper = createWrapper({ url })

    const siteIcon = wrapper.find('[data-test-id="site-icon"]')

    const expectedSrc = `http://s2.googleusercontent.com/s2/favicons?domain_url=http://${url}`
    expect(siteIcon.element.src).toContain(expectedSrc)
    expect(siteIcon.element.alt).toContain(`${url} icon`)
  })

  it('displays a text with the latency feedback if latency is good', () => {
    const url = 'url'
    const latency = 200
    const wrapper = createWrapper({ url, latency })

    expect(wrapper.text()).toContain(`The latency of ${url} is`)
    expect(wrapper.text()).toContain(`good.`)
  })

  it("contains 'border-good', 'result-good' and 'result-label-good' classes if the latency is good", () => {
    const url = 'url'
    const latency = 200
    const wrapper = createWrapper({ url, latency })

    expect(wrapper.find('.border-good').exists()).toBe(true)
    expect(wrapper.find('.result-good').exists()).toBe(true)
    expect(wrapper.find('.result-label-good').exists()).toBe(true)
  })

  it('displays a text with the latency feedback if latency is average', () => {
    const url = 'http://www.example.com'
    const latency = 500
    const wrapper = createWrapper({ url, latency })

    expect(wrapper.text()).toContain(`The latency of ${url} is`)
    expect(wrapper.text()).toContain(`average.`)
  })

  it("contains 'border-average', 'result-average' and 'result-label-average' classes if the latency is average", () => {
    const url = 'http://www.example.com'
    const latency = 500
    const wrapper = createWrapper({ url, latency })

    expect(wrapper.find('.border-average').exists()).toBe(true)
    expect(wrapper.find('.result-average').exists()).toBe(true)
    expect(wrapper.find('.result-label-average').exists()).toBe(true)
  })

  it('displays a text with the latency feedback if latency is bad', () => {
    const url = 'http://www.example.com'
    const latency = 1200
    const wrapper = createWrapper({ url, latency })

    expect(wrapper.text()).toContain(`The latency of ${url} is`)
    expect(wrapper.text()).toContain(`bad.`)
  })

  it("contains 'border-bad', 'result-bad' and 'result-label-bad' classes if the latency is bad", () => {
    const url = 'http://www.example.com'
    const latency = 1200
    const wrapper = createWrapper({ url, latency })

    expect(wrapper.find('.border-bad').exists()).toBe(true)
    expect(wrapper.find('.result-bad').exists()).toBe(true)
    expect(wrapper.find('.result-label-bad').exists()).toBe(true)
  })
})
