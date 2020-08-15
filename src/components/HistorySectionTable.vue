<template>
  <table class="history-section-table table-auto" v-if="pingHistory.length">
    <thead>
      <tr>
        <th></th>
        <th>Site</th>
        <th>Latency</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="site in pingHistory" :key="site.id">
        <td class="px-2 w-8">
          <img
            data-test-id="table-site-icon"
            class="inline"
            :src="
              `http://s2.googleusercontent.com/s2/favicons?domain_url=${site.url}`
            "
            :alt="`${site.url} icon`"
          />
        </td>
        <td class="pt-1 w-auto">
          {{ site.url }}
        </td>
        <td class="w-20 sm:w-24">
          <div class="flex items-center py-1">
            <inline-svg
              class="w-5 fill-current"
              data-test-id="history-latency-indicator"
              :class="getIndicatorClass(site.latency)"
              :title="getIndicatorTitle(site.latency)"
              :src="require('@/assets/svg/globe.svg')"
            />
            <span class="ml-1 pt-px">{{ site.latency }} ms</span>
          </div>
        </td>
        <td class="w-6 px-2">
          <button
            @click="$emit('ping-url', site.url)"
            data-test-id="history-table-ping"
            class="ping-again flex items-center"
            title="ping this url"
          >
            <inline-svg
              class="w-6"
              :src="require('@/assets/svg/lighting-bolt.svg')"
            />
          </button>
        </td>
      </tr>
    </tbody>
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
        return 'indicator-good'
      } else if (latency <= 1000) {
        return 'indicator-average'
      }

      return 'indicator-bad'
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

<style scoped>
.history-section-table {
  @apply text-gray-900 border-collapse w-full border border-gray-300;

  & thead {
    @apply bg-white;
  }

  & th {
    @apply py-1;
  }

  & th,
  & td {
    @apply text-left text-sm;
  }

  & tbody tr:nth-child(even) {
    @apply bg-white;
  }

  & tbody tr:nth-child(odd) {
    @apply bg-gray-200;
  }
}

.indicator-good {
  @apply text-green-600;
}

.indicator-average {
  @apply text-yellow-600;
}

.indicator-bad {
  @apply text-red-600;
}

.ping-again {
  @apply cursor-pointer transition-colors duration-500;

  &:hover,
  &:active {
    @apply text-gray-700;
  }
}
</style>
