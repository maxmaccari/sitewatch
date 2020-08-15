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

  it('enables the ping button if the typed url is valid', async () => {
    const wrapper = shallowMount(PingSectionInput)

    const siteInput = wrapper.find('[data-test-id="site-input"]')
    const pingButton = wrapper.find('[data-test-id="ping-button"]')

    siteInput.setValue('www.example.com')
    await wrapper.vm.$nextTick()
    expect(pingButton.element.disabled).toBe(false)

    siteInput.setValue('http://www.example.com')
    await wrapper.vm.$nextTick()
    expect(pingButton.element.disabled).toBe(false)

    siteInput.setValue('https://www.example.com')
    await wrapper.vm.$nextTick()
    expect(pingButton.element.disabled).toBe(false)

    siteInput.setValue('https://www.example.com/my/path/here')
    await wrapper.vm.$nextTick()
    expect(pingButton.element.disabled).toBe(false)

    siteInput.setValue('https://www.example.com/my/path/here.html')
    await wrapper.vm.$nextTick()
    expect(pingButton.element.disabled).toBe(false)

    siteInput.setValue(
      'https://www.example.com/my/path/here.?arguments=true&other=argument'
    )
    await wrapper.vm.$nextTick()
    expect(pingButton.element.disabled).toBe(false)
  })

  it("emits 'ping' event with sanitizedUrl if ping button is clicked", async () => {
    const wrapper = shallowMount(PingSectionInput)

    const siteInput = wrapper.find('[data-test-id="site-input"]')
    const pingButton = wrapper.find('[data-test-id="ping-button"]')

    siteInput.setValue('www.example.com')
    await wrapper.vm.$nextTick()
    pingButton.trigger('click')
    await wrapper.vm.$nextTick()

    siteInput.setValue('https://www.example.com')
    await wrapper.vm.$nextTick()
    pingButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('ping')[0][0]).toEqual('http://www.example.com')
    expect(wrapper.emitted('ping')[1][0]).toEqual('https://www.example.com')
  })

  it("emits 'ping' event with sanitizedUrl if enter is pressed on input", async () => {
    const wrapper = shallowMount(PingSectionInput)

    const siteInput = wrapper.find('[data-test-id="site-input"]')

    siteInput.setValue('www.example.com')
    await wrapper.vm.$nextTick()
    siteInput.trigger('keyup.enter')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('ping')[0][0]).toEqual('http://www.example.com')
  })

  it('changes input if setUrl is called with its argument', async () => {
    const wrapper = shallowMount(PingSectionInput)
    const newValue = 'http://my-new-site.com'

    wrapper.vm.setUrl('http://my-new-site.com')
    await wrapper.vm.$nextTick()

    const siteInput = wrapper.find('[data-test-id="site-input"]')

    expect(siteInput.element.value).toBe(newValue)
  })

  it('changes ping button to retry if ping is done and input is equal lastUrl or lastSite', async () => {
    const lastUrl = 'http://www.example.com'
    const lastSite = 'www.example.com'

    const wrapper = shallowMount(PingSectionInput, {
      propsData: {
        lastUrl,
        lastSite,
      },
    })

    const siteInput = wrapper.find('[data-test-id="site-input"]')
    const pingButton = wrapper.find('[data-test-id="ping-button"]')

    expect(pingButton.text()).toContain('Ping')

    siteInput.setValue(lastSite)
    await wrapper.vm.$nextTick()
    expect(pingButton.text()).toContain('Retry')

    siteInput.setValue(lastSite)
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
