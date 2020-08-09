import { shallowMount } from '@vue/test-utils'
import PingSection from '../PingSection.vue'
import PingSectionInput from '../PingSectionInput.vue'
import PingSectionError from '../PingSectionError.vue'
import PingSectionResult from '../PingSectionResult.vue'
import VLoading from '../VLoading.vue'

const defaultStore = {
  state: {
    lastSiteUrl: null,
    lastLatency: null,
    error: null,
    loading: false,
  },
  getters: {
    lastSite: null,
  },
}

describe('PingSection', () => {
  it('should render PingSectionInput with store params', () => {
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: defaultStore,
      },
    })
    const pingSectionInput = wrapper.findComponent(PingSectionInput)

    expect(pingSectionInput.exists()).toBe(true)
    expect(pingSectionInput.props()).toEqual({
      lastSite: null,
      lastSiteUrl: null,
      loading: false,
    })
  })

  it('should dispatch pingSite action with sanitizedUrl if ping is emmitted from PingSectionInput', async () => {
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

    const pingSectionInput = wrapper.findComponent(PingSectionInput)

    const url = 'https://www.example.com'
    pingSectionInput.vm.$emit('ping', url)
    await wrapper.vm.$nextTick()

    expect(dispatch).toHaveBeenCalledWith('pingSite', url)
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

  it('should dispatch pingSite and call setUrl from PingSectionInput if try-again is emitted from PingSectionError', async () => {
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
    const pingSectionInput = wrapper.findComponent(PingSectionInput)
    pingSectionInput.vm.setUrl = jest.fn()

    wrapper.findComponent(PingSectionError).vm.$emit('try-again')
    await wrapper.vm.$nextTick

    expect(pingSectionInput.vm.setUrl).toBeCalledWith(lastSiteUrl)
    expect(dispatch).toHaveBeenCalledWith('pingSite', lastSiteUrl)
  })

  it('should show VLoading component if state is loading', () => {
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: {
            lastSiteUrl: null,
            latency: null,
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
