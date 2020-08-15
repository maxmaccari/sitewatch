import { shallowMount } from '@vue/test-utils'
import PingSectionInput from '../PingSectionInput.vue'
import VLoading from '../VLoading.vue'

describe('PingSectionInput', () => {
  it('renders with site url input empty and ping button disabled', () => {
    const wrapper = shallowMount(PingSectionInput)

    const siteInput = wrapper.find('[data-test-id="site-input"]')
    const pingButton = wrapper.find('[data-test-id="ping-button"]')

    expect(siteInput.element.value).toBe('')
    expect(pingButton.element.disabled).toBe(true)
  })

  it('keeps the ping button disabled if the typed url is invalid', async () => {
    const wrapper = shallowMount(PingSectionInput)

    const siteInput = wrapper.find('[data-test-id="site-input"]')
    const pingButton = wrapper.find('[data-test-id="ping-button"]')

    siteInput.setValue('invalid url')
    await wrapper.vm.$nextTick()
    expect(pingButton.element.disabled).toBe(true)

    siteInput.setValue('www')
    await wrapper.vm.$nextTick()
    expect(pingButton.element.disabled).toBe(true)

    siteInput.setValue('www.')
    await wrapper.vm.$nextTick()
    expect(pingButton.element.disabled).toBe(true)

    siteInput.setValue('www.c')
    await wrapper.vm.$nextTick()
    expect(pingButton.element.disabled).toBe(true)
  })

  it('sets the site-input value with the given component value', async () => {
    const wrapper = shallowMount(PingSectionInput)

    const siteInput = wrapper.find('[data-test-id="site-input"]')

    wrapper.setProps({ value: 'www.example.com' })
    await wrapper.vm.$nextTick()
    expect(siteInput.element.value).toBe('www.example.com')

    wrapper.setProps({ value: null })
    await wrapper.vm.$nextTick()
    expect(siteInput.element.value).toBe('')
  })

  it('enables the ping button if the typed url is valid', async () => {
    const wrapper = shallowMount(PingSectionInput)

    const pingButton = wrapper.find('[data-test-id="ping-button"]')

    wrapper.setProps({ value: 'www.example.com' })
    await wrapper.vm.$nextTick()
    expect(pingButton.element.disabled).toBe(false)

    wrapper.setProps({ value: 'http://www.example.com' })
    await wrapper.vm.$nextTick()
    expect(pingButton.element.disabled).toBe(false)

    wrapper.setProps({ value: 'https://www.example.com' })
    await wrapper.vm.$nextTick()
    expect(pingButton.element.disabled).toBe(false)

    wrapper.setProps({ value: 'https://www.example.com/my/path/here' })
    await wrapper.vm.$nextTick()
    expect(pingButton.element.disabled).toBe(false)

    wrapper.setProps({ value: 'https://www.example.com/my/path/here.html' })
    await wrapper.vm.$nextTick()
    expect(pingButton.element.disabled).toBe(false)

    wrapper.setProps({
      value:
        'https://www.example.com/my/path/here.?arguments=true&other=argument',
    })
    expect(pingButton.element.disabled).toBe(false)
  })

  it("emits 'ping' event with sanitizedUrl if ping button is clicked", async () => {
    const wrapper = shallowMount(PingSectionInput)

    const pingButton = wrapper.find('[data-test-id="ping-button"]')

    wrapper.setProps({ value: 'www.example.com' })
    await wrapper.vm.$nextTick()
    pingButton.trigger('click')
    await wrapper.vm.$nextTick()

    wrapper.setProps({ value: 'https://www.example.com' })
    await wrapper.vm.$nextTick()
    pingButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('ping')[0][0]).toEqual('http://www.example.com')
    expect(wrapper.emitted('ping')[1][0]).toEqual('https://www.example.com')
  })

  it("emits 'ping' event with sanitizedUrl if enter is pressed on input", async () => {
    const wrapper = shallowMount(PingSectionInput)

    const siteInput = wrapper.find('[data-test-id="site-input"]')

    wrapper.setProps({ value: 'www.example.com' })
    await wrapper.vm.$nextTick()
    siteInput.trigger('keyup.enter')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('ping')[0][0]).toEqual('http://www.example.com')
  })

  it('changes ping button to retry if ping is done and input is equal lastUrl', async () => {
    const lastUrl = 'http://www.example.com'
    const value = ''

    const wrapper = shallowMount(PingSectionInput, {
      propsData: {
        lastUrl,
        value,
      },
    })

    const pingButton = wrapper.find('[data-test-id="ping-button"]')

    expect(pingButton.text()).toContain('Ping')

    wrapper.setProps({ lastUrl, value: 'www.example.com' })
    await wrapper.vm.$nextTick()
    expect(pingButton.text()).toContain('Retry')

    wrapper.setProps({ lastUrl, value: 'http://www.example.com' })
    await wrapper.vm.$nextTick()
    expect(pingButton.text()).toContain('Retry')
  })

  it('disables ping button and input if state is loading', () => {
    const wrapper = shallowMount(PingSectionInput, {
      propsData: {
        loading: true,
      },
    })

    const siteInput = wrapper.find('[data-test-id="site-input"]')
    const pingButton = wrapper.find('[data-test-id="ping-button"]')

    expect(siteInput.element.disabled).toBe(true)
    expect(pingButton.element.disabled).toBe(true)
  })

  it('shows VLoading component if state is loading', () => {
    const wrapper = shallowMount(PingSectionInput, {
      propsData: {
        loading: true,
      },
    })

    const vLoading = wrapper.findAllComponents(VLoading)

    expect(vLoading.exists()).toBe(true)
  })
})
