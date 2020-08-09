import { shallowMount } from '@vue/test-utils'
import PingSectionError from '../PingSectionError.vue'

describe('PingSectionError', () => {
  test('it should display connection timeout error if error is timeout', () => {
    const wrapper = shallowMount(PingSectionError, {
      propsData: {
        site: 'www.example.com',
        error: 'timeout',
      },
    })

    expect(wrapper.text()).toContain('Error: the connection timed out!')
  })

  test('it should display connection error if error is connection_error', () => {
    const wrapper = shallowMount(PingSectionError, {
      propsData: {
        site: 'www.example.com',
        error: 'connection_error',
      },
    })

    expect(wrapper.text()).toContain('Error: connection failed!')
  })

  test('it should display unknow error if error is different', () => {
    const wrapper = shallowMount(PingSectionError, {
      propsData: {
        site: 'www.example.com',
        error: 'another',
      },
    })

    expect(wrapper.text()).toContain('Error: unknown error!')
  })

  test('it should display the current url', () => {
    const wrapper = shallowMount(PingSectionError, {
      propsData: {
        site: 'www.example.com',
        error: 'another',
      },
    })

    expect(wrapper.text()).toContain('www.example.com')
  })

  test("click on try again button should emit 'try-again' event", () => {
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
