<template>
  <div
    class="ping-section-result m-auto max-w-md border-l-4 flex shadow-md"
    :class="$style[`border-${latencyFeedback}`]"
  >
    <div class="px-2 py-3 bg-gray-200 flex-1">
      <div class="flex items-center">
        <div class="bg-white p-1 rounded-full">
          <img data-test-id="site-icon" :src="iconUrl" :alt="iconAlt" />
        </div>
        <a
          data-test-id="site-link"
          :href="fullUrl"
          target="_blank"
          class="ml-1"
          :class="$style.link"
        >
          {{ site }}
        </a>
      </div>
      <div class="text-sm mt-4 text-gray-700">
        The latency of <b class="font-semibold">{{ site }}</b> is
        {{ latencyFeedback }}.
      </div>
    </div>
    <div
      class="text-white px-4 flex flex-col justify-center items-left"
      :class="$style[`result-${latencyFeedback}`]"
    >
      <span class="text-xs" :class="$style[`result-label-${latencyFeedback}`]"
        >respondend in</span
      >
      <div class="text-2xl font-bold">
        {{ latency }} <span class="text-sm font-normal">ms</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    latency: {
      type: Number,
      required: true,
    },
    site: {
      type: String,
      required: true,
    },
  },
  computed: {
    fullUrl() {
      return `http://${this.site}`
    },
    iconUrl() {
      return `http://s2.googleusercontent.com/s2/favicons?domain_url=http://${this.site}`
    },
    iconAlt() {
      return `${this.site} icon`
    },
    latencyFeedback() {
      if (this.latency <= 360) {
        return 'good'
      } else if (this.latency <= 1000) {
        return 'average'
      }

      return 'bad'
    },
  },
}
</script>

<style module>
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
