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

  it('has v-loading--with-text class if withText is true', () => {
    const wrapper = shallowMount(VLoading, {
      propsData: {
        withText: true,
      },
    })

    expect(wrapper.classes()).toContain('v-loading--with-text')
  })

  it('does not display Loading... nor v-loading--with-text by default', () => {
    const wrapper = shallowMount(VLoading)

    expect(wrapper.text()).not.toContain('Loading...')
    expect(wrapper.classes()).not.toContain('v-loading--with-text')
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
