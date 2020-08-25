<template>
  <div
    class="ping-section-result m-auto max-w-md border-l-4 flex shadow-md"
    :class="`border-${result.feedback}`"
  >
    <div class="px-2 py-3 bg-gray-200 flex-1">
      <div class="flex items-center">
        <div class="bg-white p-1 rounded-full">
          <img
            data-test-id="site-icon"
            :src="result.iconUrl"
            :alt="`${result.url} icon`"
          />
        </div>
        <a
          data-test-id="site-link"
          :href="result.url"
          target="_blank"
          class="link ml-1"
        >
          {{ result.url }}
        </a>
      </div>
      <div class="text-sm mt-4 text-gray-700">
        The latency of <b class="font-semibold">{{ result.url }}</b> is
        {{ result.feedback }}.
      </div>
    </div>
    <div
      class="text-white px-4 py-3 flex flex-col justify-between items-left"
      :class="`result-${result.feedback}`"
    >
      <span class="text-xs mt-2" :class="`result-label-${result.feedback}`">
        respondend in
      </span>
      <div class="text-2xl font-bold">
        {{ result.latency }} <span class="text-sm font-normal">ms</span>
      </div>
    </div>
  </div>
</template>

<script>
import PingResult from '@/models/PingResult'

export default {
  props: {
    result: {
      type: Object,
      required: true,
      validator(value) {
        return value instanceof PingResult
      },
    },
  },
}
</script>

<style scoped>
.border-good {
  @apply border-green-600;
}

.border-average {
  @apply border-yellow-600;
}

.border-bad {
  @apply border-red-600;
}

.result-good {
  @apply bg-green-600;
}

.result-average {
  @apply bg-yellow-600;
}

.result-bad {
  @apply bg-red-600;
}

.result-label-good {
  @apply text-green-100;
}

.result-label-average {
  @apply text-yellow-100;
}

.result-label-bad {
  @apply text-red-100;
}

.link {
  @apply text-primary-900 underline font-semibold text-lg;

  &:hover,
  &:active,
  &:visited {
    @apply text-primary-700;
  }
}
</style>
