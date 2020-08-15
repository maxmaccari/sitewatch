import { shallowMount } from '@vue/test-utils'
import PingSectionResult from '../PingSectionResult.vue'

const createWrapper = (props = {}) => {
  return shallowMount(PingSectionResult, {
    propsData: {
      site: 'www.example.com',
      latency: 100,
      ...props,
    },
  })
}

describe('PingSectionResult', () => {
  it('displays result data according with the given params', () => {
    const site = 'www.example.com'
    const latency = 214
    const wrapper = createWrapper({ site, latency })

    expect(wrapper.text()).toContain(site)
    expect(wrapper.text()).toContain(latency)
  })

  it('points to the site with the given url', () => {
    const site = 'www.example.com'
    const wrapper = createWrapper({ site })

    const siteLink = wrapper.find('[data-test-id="site-link"]')

    expect(siteLink.element.href).toContain(site)
  })

  it('displays the favicon from the website', () => {
    const site = 'www.example.com'
    const wrapper = createWrapper({ site })

    const siteIcon = wrapper.find('[data-test-id="site-icon"]')

    const expectedSrc = `http://s2.googleusercontent.com/s2/favicons?domain_url=http://${site}`
    expect(siteIcon.element.src).toContain(expectedSrc)
    expect(siteIcon.element.alt).toContain(`${site} icon`)
  })

  it('displays a text with the latency feedback if latency is good', () => {
    const site = 'www.example.com'
    const latency = 200
    const wrapper = createWrapper({ site, latency })

    expect(wrapper.text()).toContain(`The latency of ${site} is`)
    expect(wrapper.text()).toContain(`good.`)
  })

  it("contains 'border-good', 'result-good' and 'result-label-good' classes if the latency is good", () => {
    const site = 'www.example.com'
    const latency = 200
    const wrapper = createWrapper({ site, latency })

    expect(wrapper.find('.border-good').exists()).toBe(true)
    expect(wrapper.find('.result-good').exists()).toBe(true)
    expect(wrapper.find('.result-label-good').exists()).toBe(true)
  })

  it('displays a text with the latency feedback if latency is average', () => {
    const site = 'www.example.com'
    const latency = 500
    const wrapper = createWrapper({ site, latency })

    expect(wrapper.text()).toContain(`The latency of ${site} is`)
    expect(wrapper.text()).toContain(`average.`)
  })

  it("contains 'border-average', 'result-average' and 'result-label-average' classes if the latency is average", () => {
    const site = 'www.example.com'
    const latency = 500
    const wrapper = createWrapper({ site, latency })

    expect(wrapper.find('.border-average').exists()).toBe(true)
    expect(wrapper.find('.result-average').exists()).toBe(true)
    expect(wrapper.find('.result-label-average').exists()).toBe(true)
  })

  it('displays a text with the latency feedback if latency is bad', () => {
    const site = 'www.example.com'
    const latency = 1200
    const wrapper = createWrapper({ site, latency })

    expect(wrapper.text()).toContain(`The latency of ${site} is`)
    expect(wrapper.text()).toContain(`bad.`)
  })

  it("contains 'border-bad', 'result-bad' and 'result-label-bad' classes if the latency is bad", () => {
    const site = 'www.example.com'
    const latency = 1200
    const wrapper = createWrapper({ site, latency })

    expect(wrapper.find('.border-bad').exists()).toBe(true)
    expect(wrapper.find('.result-bad').exists()).toBe(true)
    expect(wrapper.find('.result-label-bad').exists()).toBe(true)
  })
})
