<template>
  <table class="history-section-table" v-if="pingHistory.length">
    <thead>
      <tr>
        <th class="col-1"></th>
        <th class="col-2">Site</th>
        <th class="col-3">Latency</th>
        <th class="col-4"></th>
      </tr>
    </thead>
    <tr v-for="site in pingHistory" :key="site.id">
      <td class="col-1">
        <img
          data-test-id="table-site-icon"
          :src="
            `http://s2.googleusercontent.com/s2/favicons?domain_url=${site.url}`
          "
          :alt="`${site.url} icon`"
        />
      </td>
      <td class="col-2">
        {{ site.url }}
      </td>
      <td class="col-3">
        <div class="history-section-table__latency">
          <div
            class="history-section-table__latency-indicator"
            :class="getIndicatorClass(site.latency)"
            :title="getIndicatorTitle(site.latency)"
            data-test-id="table-latency-indicator"
          >
            <inline-svg :src="require('@/assets/svg/globe.svg')" />
          </div>
          <span>{{ site.latency }} ms</span>
        </div>
      </td>
      <td class="col-4">
        <a
          @click="$emit('ping-url', site.url)"
          data-test-id="history-table-ping"
          class="history-section-table__ping-again"
          title="ping this url"
        >
          <inline-svg :src="require('@/assets/svg/lighting-bolt.svg')" />
        </a>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    pingHistory: {
      required: true,
      type: Array,
    },
  },
  methods: {
    getIndicatorClass(latency) {
      if (latency <= 360) {
        return 'history-section-table__latency-indicator--good'
      } else if (latency <= 1000) {
        return 'history-section-table__latency-indicator--average'
      }

      return 'history-section-table__latency-indicator--bad'
    },
    getIndicatorTitle(latency) {
      if (latency <= 360) {
        return 'the latency is good'
      } else if (latency <= 1000) {
        return 'the latency is average'
      }

      return 'the latency is bad'
    },
  },
}
</script>
