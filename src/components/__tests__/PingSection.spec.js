import { shallowMount, createLocalVue } from '@vue/test-utils'
import store from '@/store'
import PingSection from '../PingSection.vue'
import PingSectionInput from '../PingSectionInput.vue'
import PingSectionError from '../PingSectionError.vue'
import PingSectionResult from '../PingSectionResult.vue'
import VLoading from '../VLoading.vue'
import PingResult from '@/models/PingResult'

const defaultStore = {
  state: {
    lastResult: null,
    error: null,
    loading: false,
  },
}

const createWrapper = (store = {}) => {
  return shallowMount(PingSection, {
    mocks: {
      $store: {
        ...defaultStore,
        ...store,
      },
    },
  })
}

describe('PingSection', () => {
  it('renders PingSectionInput with store params', () => {
    const wrapper = createWrapper()
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
    const wrapper = createWrapper({ dispatch })

    const pingSectionInput = wrapper.findComponent(PingSectionInput)

    const url = 'https://www.example.com'
    pingSectionInput.vm.$emit('ping', url)
    await wrapper.vm.$nextTick()

    expect(dispatch).toHaveBeenCalledWith('pingSite', url)
  })

  it('does not show the PingSectionResult if lastResult is null', () => {
    const wrapper = createWrapper()

    expect(wrapper.findComponent(PingSectionResult).exists()).toBe(false)
  })

  it('shows the PingSectionResult with properly params if lastResult is filled', () => {
    const lastResult = new PingResult({
      url: 'http://www.example.com',
      latency: 300,
      id: 'abc',
    })
    const wrapper = createWrapper({
      state: {
        lastResult,
      },
    })

    const pingSectionResult = wrapper.findComponent(PingSectionResult)

    expect(pingSectionResult.exists()).toBe(true)
    expect(pingSectionResult.props('result')).toBe(lastResult)
  })

  it('shows the PingSectionError with properly params if error is filled', () => {
    const error = {}
    const wrapper = createWrapper({
      state: {
        error,
      },
    })

    const pingSectionError = wrapper.findComponent(PingSectionError)

    expect(pingSectionError.exists()).toBe(true)
    expect(pingSectionError.props('error')).toBe(error)
  })

  it('changes the value of PingSectionInput with the error url if try-again is emitted from PingSectionError', async () => {
    const dispatch = jest.fn()
    const error = {
      url: 'http://www.example.com',
    }
    const wrapper = shallowMount(PingSection, {
      mocks: {
        $store: {
          state: {
            error,
          },
          dispatch,
        },
      },
    })
    const pingSectionInput = wrapper.findComponent(PingSectionInput)
    const pingSectionError = wrapper.findComponent(PingSectionError)

    pingSectionError.vm.$emit('try-again')
    await wrapper.vm.$nextTick

    expect(pingSectionInput.props('value')).toBe(error.url)
  })

  it('shows VLoading component if state is loading', () => {
    const wrapper = createWrapper({
      state: {
        lastResult: null,
        latency: null,
        loading: true,
      },
    })

    const vLoading = wrapper.findAllComponents(VLoading)

    expect(vLoading.exists()).toBe(true)
  })

  it('does not show results or errors if state is loading', () => {
    const wrapper = createWrapper({
      state: {
        lastResult: {},
        latency: 200,
        loading: true,
        error: {},
      },
    })

    const pingSectionResult = wrapper.findComponent(PingSectionResult)
    const pingSectionError = wrapper.findComponent(PingSectionError)

    expect(pingSectionResult.exists()).toBe(false)
    expect(pingSectionError.exists()).toBe(false)
  })

  it('changes the value of PingSectionInput if lastResult is changed and the value is empty', async () => {
    const localVue = createLocalVue()
    localVue.use(store)
    const wrapper = shallowMount(PingSection, { store, localVue })

    const pingSectionInput = wrapper.findComponent(PingSectionInput)

    wrapper.vm.$store.replaceState({
      lastResult: new PingResult({
        url: 'http://www.example.com',
        latency: 100,
        id: 'abc',
      }),
    })

    await wrapper.vm.$nextTick()

    expect(pingSectionInput.props('value')).toBe('http://www.example.com')
  })
})
