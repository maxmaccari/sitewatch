import { shallowMount } from '@vue/test-utils'
import HistorySectionTable from '../HistorySectionTable.vue'
import HistorySectionTableEntry from '../HistorySectionTableEntry.vue'

describe('HistorySectionTable', () => {
  it('renders nothing if an empty pingHistory is given', () => {
    const wrapper = shallowMount(HistorySectionTable, {
      propsData: {
        pingHistory: [],
      },
    })

    expect(wrapper.find('table').exists()).toBe(false)
  })

  it('renders a table with the given pingHistory', () => {
    const pingHistory = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    const wrapper = shallowMount(HistorySectionTable, {
      propsData: {
        pingHistory,
      },
    })

    expect(wrapper.find('table').exists()).toBe(true)

    const entries = wrapper.findAllComponents(HistorySectionTableEntry)

    expect(entries).toHaveLength(10)
    entries.wrappers.forEach((wrapper, index) => {
      expect(wrapper.props('pingResult')).toBe(pingHistory[index])
    })
  })

  it('emits an ping-url event with the given url if ping-url is emited on entry', async () => {
    const url = 'http://wwww.example-1.com'
    const wrapper = shallowMount(HistorySectionTable, {
      propsData: {
        pingHistory: [{}],
      },
    })

    const entry = wrapper.findComponent(HistorySectionTableEntry)
    entry.vm.$emit('ping-url', url)
    await entry.vm.$nextTick()

    expect(wrapper.emitted('ping-url')).toHaveLength(1)
    expect(wrapper.emitted('ping-url')[0][0]).toBe(url)
  })
})
