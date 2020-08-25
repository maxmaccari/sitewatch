<template>
  <tr>
    <td class="px-2 w-8">
      <img
        data-test-id="table-site-icon"
        class="inline"
        :src="pingResult.iconUrl"
        :alt="`${pingResult.url} icon`"
      />
    </td>
    <td class="pt-1 w-auto">
      {{ pingResult.url }}
    </td>
    <td class="w-20 sm:w-24">
      <div class="flex items-center py-1">
        <inline-svg
          class="w-5 fill-current"
          data-test-id="history-latency-indicator"
          :class="`indicator-${pingResult.feedback}`"
          :title="`the latency is ${pingResult.feedback}`"
          :src="require('@/assets/svg/globe.svg')"
        />
        <span class="ml-1 pt-px">{{ pingResult.latency }} ms</span>
      </div>
    </td>
    <td class="w-6 px-2">
      <button
        @click="$emit('ping-url', pingResult.url)"
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
</template>

<script>
export default {
  props: {
    pingResult: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
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
