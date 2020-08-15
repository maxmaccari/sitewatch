import { shallowMount } from '@vue/test-utils'
import VLoading from '../VLoading.vue'

describe('VLoading', () => {
  it('displays Loading... text if withText is true', () => {
    const wrapper = shallowMount(VLoading, {
      propsData: {
        withText: true,
      },
    })

    expect(wrapper.text()).toContain('Loading...')
  })

  it('does not display Loading... by default', () => {
    const wrapper = shallowMount(VLoading)

    expect(wrapper.text()).not.toContain('Loading...')
  })

  it('fills colors properly', () => {
    const wrapper = shallowMount(VLoading, {
      propsData: {
        color: 'white',
      },
    })

    const stop = wrapper.find('[data-test-id="loading-gradient"] stop')

    expect(stop.attributes('stop-color')).toBe('#FCFCFC')
  })
})
