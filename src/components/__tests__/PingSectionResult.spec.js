import { shallowMount } from '@vue/test-utils'
import PingSectionResult from '../PingSectionResult.vue'

describe('PingSectionResult', () => {
  test('it should display result data according with the given params', () => {
    const siteUrl = 'www.example.com'
    const latency = 214
    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        siteUrl,
        latency,
      },
    })

    expect(wrapper.text()).toContain(siteUrl)
    expect(wrapper.text()).toContain(latency)
  })

  test('the url link should point to the site with the given url', () => {
    const siteUrl = 'www.example.com'
    const latency = 214
    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        siteUrl,
        latency,
      },
    })

    const siteLink = wrapper.find('[data-test-id="site-link"]')

    expect(siteLink.element.href).toContain(siteUrl)
  })

  test('the site icon should be the favicon from the website', () => {
    const siteUrl = 'www.example.com'
    const latency = 214
    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        siteUrl,
        latency,
      },
    })

    const siteIcon = wrapper.find('[data-test-id="site-icon"]')

    const expectedSrc = `http://s2.googleusercontent.com/s2/favicons?domain_url=http://${siteUrl}`
    expect(siteIcon.element.src).toContain(expectedSrc)
    expect(siteIcon.element.alt).toContain(`${siteUrl} icon`)
  })

  test('it should display a text with the latency feedback if latency is good', () => {
    const siteUrl = 'www.example.com'
    const latency = 200

    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        siteUrl,
        latency,
      },
    })

    const expectText = `The latency of ${siteUrl} is good.`
    expect(wrapper.text()).toContain(expectText)
  })

  test("it should have 'ping-section-result--good' if the latency is good", () => {
    const siteUrl = 'www.example.com'
    const latency = 200

    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        siteUrl,
        latency,
      },
    })

    expect(wrapper.classes()).toContain('ping-section-result--good')
  })

  test('it should display a text with the latency feedback if latency is average', () => {
    const siteUrl = 'www.example.com'
    const latency = 500

    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        siteUrl,
        latency,
      },
    })

    const expectText = `The latency of ${siteUrl} is average.`
    expect(wrapper.text()).toContain(expectText)
  })

  test("it should have 'ping-section-result--good' if the latency is average", () => {
    const siteUrl = 'www.example.com'
    const latency = 500

    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        siteUrl,
        latency,
      },
    })

    expect(wrapper.classes()).toContain('ping-section-result--average')
  })

  test('it should display a text with the latency feedback if latency is bad', () => {
    const siteUrl = 'www.example.com'
    const latency = 1200

    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        siteUrl,
        latency,
      },
    })

    const expectText = `The latency of ${siteUrl} is bad.`
    expect(wrapper.text()).toContain(expectText)
  })

  test("it should have 'ping-section-result--good' if the latency is average", () => {
    const siteUrl = 'www.example.com'
    const latency = 1200

    const wrapper = shallowMount(PingSectionResult, {
      propsData: {
        siteUrl,
        latency,
      },
    })

    expect(wrapper.classes()).toContain('ping-section-result--bad')
  })
})
