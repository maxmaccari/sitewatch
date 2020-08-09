import { shallowMount } from '@vue/test-utils'
import PingSection from '../PingSection.vue'
import PingSectionError from '../PingSectionError.vue'
import PingSectionResult from '../PingSectionResult.vue'
import VLoading from '../VLoading.vue'

const defaultStore = {
  state: {
    lastSiteUrl: null,
    lastLatency: null,
    error: null,
  },
  getters: {
    lastSite: () => null,
  },
}

describe('PingSection', () => {
  it('should render with site url input empty and ping button disabled', () => {
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

  it('should keep the ping button disabled if the typed url is invalid', async () => {
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

  it('should enable the ping button if the typed url is valid', async () => {
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

  it('should dispatch pingSite action with sanitizedUrl if ping button is clicked', async () => {
    const dispatch = jest.fn()
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: defaultStore.state,
          getters: defaultStore.getters,
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

  it('should dispatch pingSite action with sanitizedUrl if enter is pressed on input', async () => {
    const dispatch = jest.fn()
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: defaultStore.state,
          getters: defaultStore.getters,
          dispatch,
        },
      },
    })

    const siteInput = wrapper.find('[data-test-id="site-input"]')

    siteInput.setValue('www.example.com')
    await wrapper.vm.$nextTick()
    siteInput.trigger('keyup.enter')
    await wrapper.vm.$nextTick()

    expect(dispatch).toHaveBeenCalledWith('pingSite', 'http://www.example.com')
  })

  it('should not show the PingSectionResult if lastSiteUrl and lastLatency are null', () => {
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: defaultStore,
      },
    })

    expect(wrapper.findComponent(PingSectionResult).exists()).toBe(false)
  })

  it('should show the PingSectionResult with properly params if lastSiteUrl and lastLatency are filled', () => {
    const lastSiteUrl = 'http://www.example.com'
    const lastSite = 'www.example.com'
    const lastLatency = 300
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: {
            lastSiteUrl,
            lastLatency,
          },
          getters: {
            lastSite,
          },
        },
      },
    })

    const pingSectionResult = wrapper.findComponent(PingSectionResult)

    expect(pingSectionResult.exists()).toBe(true)
    expect(pingSectionResult.props('site')).toBe(lastSite)
    expect(pingSectionResult.props('latency')).toBe(lastLatency)
  })

  it('should show the PingSectionError with properly params if lastSiteUrl and error are filled', () => {
    const lastSiteUrl = 'http://www.example.com'
    const lastSite = 'www.example.com'
    const error = 'my error'
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: {
            lastSiteUrl,
            error,
          },
          getters: {
            lastSite: 'www.example.com',
          },
        },
      },
    })

    const pingSectionError = wrapper.findComponent(PingSectionError)

    expect(pingSectionError.exists()).toBe(true)
    expect(pingSectionError.props('site')).toBe(lastSite)
    expect(pingSectionError.props('error')).toBe(error)
  })

  it('should dispatch pingSite action with lastSiteUrl try-again is emitted from PingSectionError', () => {
    const dispatch = jest.fn()
    const lastSiteUrl = 'http://www.example.com'
    const lastSite = 'www.example.com'
    const error = 'my error'

    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: {
            lastSiteUrl,
            error,
          },
          getters: {
            lastSite,
          },
          dispatch,
        },
      },
    })

    const pingSectionError = wrapper.findComponent(PingSectionError)
    pingSectionError.vm.$emit('try-again')

    expect(dispatch).toHaveBeenCalledWith('pingSite', lastSiteUrl)
  })

  it('should fill page url input with lastSiteUrl if try-again is emitted from PingSectionError', async () => {
    const dispatch = jest.fn()
    const lastSiteUrl = 'http://www.example.com'
    const lastSite = 'www.example.com'
    const error = 'my error'

    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: {
            lastSiteUrl,
            error,
          },
          getters: {
            lastSite,
          },
          dispatch,
        },
      },
    })

    wrapper.findComponent(PingSectionError).vm.$emit('try-again')
    await wrapper.vm.$nextTick()

    const siteInput = wrapper.find('[data-test-id="site-input"]')

    expect(siteInput.element.value).toBe(lastSiteUrl)
  })

  it('should change ping button to retry if ping is done and input is equal lastSiteUrl or lastSite', async () => {
    const dispatch = jest.fn()
    const lastSiteUrl = 'http://www.example.com'
    const lastSite = 'www.example.com'
    const latency = 200

    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: {
            lastSiteUrl,
            latency,
          },
          getters: {
            lastSite,
          },
          dispatch,
        },
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

  it('should disable ping button and input if state is loading', () => {
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: {
            lastSiteUrl: false,
            latency: false,
            loading: true,
          },
          getters: {
            lastSite: null,
          },
        },
      },
    })

    const siteInput = wrapper.find('[data-test-id="site-input"]')
    const pingButton = wrapper.find('[data-test-id="ping-button"]')

    expect(siteInput.element.disabled).toBe(true)
    expect(pingButton.element.disabled).toBe(true)
  })

  it('should show VLoading component if state is loading', () => {
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: {
            lastSiteUrl: false,
            latency: false,
            loading: true,
          },
          getters: {
            lastSite: null,
          },
        },
      },
    })

    const vLoading = wrapper.findAllComponents(VLoading)

    expect(vLoading.exists()).toBe(true)
    expect(vLoading.length).toBe(2)
  })

  it('should not show results or errors if state is loading', () => {
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: {
            lastSiteUrl: 'https://www.example.com',
            latency: 200,
            loading: true,
            errors: 'my error',
          },
          getters: {
            lastSite: 'www.example.com',
          },
        },
      },
    })

    const pingSectionResult = wrapper.findComponent(PingSectionResult)
    const pingSectionError = wrapper.findComponent(PingSectionError)

    expect(pingSectionResult.exists()).toBe(false)
    expect(pingSectionError.exists()).toBe(false)
  })
})
