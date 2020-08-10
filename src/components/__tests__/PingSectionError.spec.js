import { shallowMount } from '@vue/test-utils'
import PingSectionError from '../PingSectionError.vue'

describe('PingSectionError', () => {
  it('displays connection timeout error if error is timeout', () => {
    const wrapper = shallowMount(PingSectionError, {
      propsData: {
        site: 'www.example.com',
        error: 'timeout',
      },
    })

    expect(wrapper.text()).toContain('Error: the connection timed out!')
  })

  it('displays connection error if error is network_error', () => {
    const wrapper = shallowMount(PingSectionError, {
      propsData: {
        site: 'www.example.com',
        error: 'network_error',
      },
    })

    expect(wrapper.text()).toContain('Error: connection failed!')
  })

  it('displays connection error if error is unresolved_url', () => {
    const wrapper = shallowMount(PingSectionError, {
      propsData: {
        site: 'www.example.com',
        error: 'unresolved_url',
      },
    })

    expect(wrapper.text()).toContain('Error: the url cannot be resolved!')
  })

  it('displays unknow error if error is different', () => {
    const wrapper = shallowMount(PingSectionError, {
      propsData: {
        site: 'www.example.com',
        error: 'another',
      },
    })

    expect(wrapper.text()).toContain('Error: unknown error!')
  })

  it('displays the current url', () => {
    const wrapper = shallowMount(PingSectionError, {
      propsData: {
        site: 'www.example.com',
        error: 'another',
      },
    })

    expect(wrapper.text()).toContain('www.example.com')
  })

  it("emits 'try-again' event when click on try again button", () => {
    const wrapper = shallowMount(PingSectionError, {
      propsData: {
        site: 'www.example.com',
        error: 'another',
      },
    })

    const tryAgainButton = wrapper.find('[data-test-id="try-again"]')
    tryAgainButton.trigger('click')

    expect(wrapper.emitted('try-again')).toHaveLength(1)
  })
})
