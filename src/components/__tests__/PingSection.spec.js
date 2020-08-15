import { shallowMount } from '@vue/test-utils'
import PingSection from '../PingSection.vue'
import PingSectionInput from '../PingSectionInput.vue'
import PingSectionError from '../PingSectionError.vue'
import PingSectionResult from '../PingSectionResult.vue'
import VLoading from '../VLoading.vue'

const defaultStore = {
  state: {
    lastUrl: null,
    lastLatency: null,
    error: null,
    loading: false,
  },
  getters: {
    lastSite: null,
  },
}

describe('PingSection', () => {
  it('renders PingSectionInput with store params', () => {
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: defaultStore,
      },
    })
    const pingSectionInput = wrapper.findComponent(PingSectionInput)

    expect(pingSectionInput.exists()).toBe(true)
    expect(pingSectionInput.props()).toEqual({
      value: null,
      lastUrl: null,
      loading: false,
    })
  })

  it('dispatches pingSite action with sanitizedUrl if ping is emmitted from PingSectionInput', async () => {
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

  it('does not show the PingSectionResult if lastUrl and lastLatency are null', () => {
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: defaultStore,
      },
    })
    expect(wrapper.findComponent(PingSectionResult).exists()).toBe(false)
  })
  it('shows the PingSectionResult with properly params if lastUrl and lastLatency are filled', () => {
    const lastUrl = 'http://www.example.com'
    const lastSite = 'www.example.com'
    const lastLatency = 300
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: {
            lastUrl,
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

  it('shows the PingSectionError with properly params if lastUrl and error are filled', () => {
    const lastUrl = 'http://www.example.com'
    const lastSite = 'www.example.com'
    const error = 'my error'
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: {
            lastUrl,
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

  it('changes the value of PingSectionInput to the lastUrl if try-again is emitted from PingSectionError', async () => {
    const dispatch = jest.fn()
    const lastUrl = 'http://www.example.com'
    const lastSite = 'www.example.com'
    const error = 'my error'
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: {
            lastUrl,
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
    const pingSectionError = wrapper.findComponent(PingSectionError)

    pingSectionError.vm.$emit('try-again')
    await wrapper.vm.$nextTick

    expect(pingSectionInput.props('value')).toBe(lastUrl)
  })

  it('shows VLoading component if state is loading', () => {
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: {
            lastUrl: null,
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

  it('does not show results or errors if state is loading', () => {
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: {
            lastUrl: 'https://www.example.com',
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
