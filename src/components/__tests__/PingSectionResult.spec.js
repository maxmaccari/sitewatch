import { shallowMount } from '@vue/test-utils'
import PingSectionResult from '../PingSectionResult.vue'

describe('PingSectionResult', () => {
  it('displays result data according with the given params', () => {
    const site = 'www.example.com'
    const latency = 214
    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        site,
        latency,
      },
    })

    expect(wrapper.text()).toContain(site)
    expect(wrapper.text()).toContain(latency)
  })

  it('points to the site with the given url', () => {
    const site = 'www.example.com'
    const latency = 214
    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        site,
        latency,
      },
    })

    const siteLink = wrapper.find('[data-test-id="site-link"]')

    expect(siteLink.element.href).toContain(site)
  })

  it('displays the favicon from the website', () => {
    const site = 'www.example.com'
    const latency = 214
    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        site,
        latency,
      },
    })

    const siteIcon = wrapper.find('[data-test-id="site-icon"]')

    const expectedSrc = `http://s2.googleusercontent.com/s2/favicons?domain_url=http://${site}`
    expect(siteIcon.element.src).toContain(expectedSrc)
    expect(siteIcon.element.alt).toContain(`${site} icon`)
  })

  it('displays a text with the latency feedback if latency is good', () => {
    const site = 'www.example.com'
    const latency = 200

    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        site,
        latency,
      },
    })

    const expectText = `The latency of ${site} is good.`
    expect(wrapper.text()).toContain(expectText)
  })

  it("has 'ping-section-result--good' class if the latency is good", () => {
    const site = 'www.example.com'
    const latency = 200

    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        site,
        latency,
      },
    })

    expect(wrapper.classes()).toContain('ping-section-result--good')
  })

  it('displays a text with the latency feedback if latency is average', () => {
    const site = 'www.example.com'
    const latency = 500

    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        site,
        latency,
      },
    })

    const expectText = `The latency of ${site} is average.`
    expect(wrapper.text()).toContain(expectText)
  })

  it("has 'ping-section-result--good' class if the latency is average", () => {
    const site = 'www.example.com'
    const latency = 500

    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        site,
        latency,
      },
    })

    expect(wrapper.classes()).toContain('ping-section-result--average')
  })

  it('displays a text with the latency feedback if latency is bad', () => {
    const site = 'www.example.com'
    const latency = 1200

    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        site,
        latency,
      },
    })

    const expectText = `The latency of ${site} is bad.`
    expect(wrapper.text()).toContain(expectText)
  })

  it("has 'ping-section-result--good' class if the latency is average", () => {
    const site = 'www.example.com'
    const latency = 1200

    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        site,
        latency,
      },
    })

    expect(wrapper.classes()).toContain('ping-section-result--bad')
  })
})
