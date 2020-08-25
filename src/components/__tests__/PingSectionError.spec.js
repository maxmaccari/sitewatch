import { shallowMount } from '@vue/test-utils'
import PingSectionError from '../PingSectionError.vue'

const createWrapper = (props = {}) => {
  return shallowMount(PingSectionError, {
    propsData: {
      error: {
        code: 'network_error',
        url: 'http://www.example.com',
        ...props,
      },
    },
  })
}

describe('PingSectionError', () => {
  it('displays connection timeout error if error is timeout', () => {
    const wrapper = createWrapper({ code: 'timeout' })

    expect(wrapper.text()).toContain('Error: the connection timed out!')
  })

  it('displays connection error if error is network_error', () => {
    const wrapper = createWrapper({ code: 'network_error' })

    expect(wrapper.text()).toContain('Error: connection failed!')
  })

  it('displays connection error if error is unresolved_url', () => {
    const wrapper = createWrapper({ code: 'ENOTFOUND' })

    expect(wrapper.text()).toContain('Error: the url cannot be resolved!')
  })

  it('displays unknow error if error is different', () => {
    const wrapper = createWrapper({ code: 'another' })

    expect(wrapper.text()).toContain('Error: unknown error!')
  })

  it('displays the current url', () => {
    const wrapper = createWrapper({ url: 'http://www.example.com' })

    expect(wrapper.text()).toContain('http://www.example.com')
  })

  it("emits 'try-again' event when click on try again button", () => {
    const wrapper = createWrapper()

    const tryAgainButton = wrapper.find('[data-test-id="try-again"]')
    tryAgainButton.trigger('click')

    expect(wrapper.emitted('try-again')).toHaveLength(1)
  })
})
