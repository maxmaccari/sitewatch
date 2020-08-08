import { shallowMount } from '@vue/test-utils'
import PingSection from '../PingSection.vue'
import PingSectionResult from '../PingSectionResult.vue'

const defaultStore = {
  state: {
    lastSiteUrl: null,
    lastLatency: null,
    error: null,
  },
}

describe('PingSection', () => {
  test('it renders with site url input empty and ping button disabled', () => {
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: defaultStore,
      },
    })

    const siteInput = wrapper.find('[data-test-id="site-input"]')
    const pingButton = wrapper.find('[data-test-id="ping-button"]')

    expect(siteInput.element.value).toBe('')
    expect(pingButton.element.disabled).toBe(true)
  })

  test('it should keep the ping button disabled if the typed url is invalid', async () => {
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: defaultStore,
      },
    })

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

  test('it should enable the ping button if the typed url is valid', async () => {
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: defaultStore,
      },
    })

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

  test('it should dispatch pingSite action with sanitizedUrl if ping button is clicked', async () => {
    const dispatch = jest.fn()
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: defaultStore.state,
          dispatch,
        },
      },
    })

    const siteInput = wrapper.find('[data-test-id="site-input"]')
    const pingButton = wrapper.find('[data-test-id="ping-button"]')

    siteInput.setValue('www.example.com')
    await wrapper.vm.$nextTick()
    pingButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(dispatch).toHaveBeenCalledWith('pingSite', 'http://www.example.com')

    siteInput.setValue('https://www.example.com')
    await wrapper.vm.$nextTick()
    pingButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(dispatch).toHaveBeenCalledWith('pingSite', 'https://www.example.com')
  })

  test('it does not show the PingSectionResult if lastSiteUrl and lastLatency are null', () => {
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: defaultStore,
      },
    })

    expect(wrapper.findComponent(PingSectionResult).exists()).toBe(false)
  })

  test('it show the PingSectionResult with properly params if lastSiteUrl and lastLatency are filled', () => {
    const lastSiteUrl = 'http://www.example.com'
    const lastLatency = 300
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: {
            lastSiteUrl,
            lastLatency,
          },
        },
      },
    })

    const pingSectionResult = wrapper.findComponent(PingSectionResult)

    expect(pingSectionResult.exists()).toBe(true)
    expect(pingSectionResult.props('siteUrl')).toBe(lastSiteUrl)
    expect(pingSectionResult.props('latency')).toBe(lastLatency)
  })
})
