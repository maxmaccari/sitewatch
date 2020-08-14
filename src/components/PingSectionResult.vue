<template>
  <div class="ping-section-result" :class="feedbackClass">
    <div class="ping-section-result__details">
      <div class="ping-section-result__site">
        <div class="ping-section-result__site-image">
          <img data-test-id="site-icon" :src="iconUrl" :alt="iconAlt" />
        </div>
        <a
          data-test-id="site-link"
          :href="fullUrl"
          target="_blank"
          class="ping-section-result__site-url"
        >
          {{ site }}
        </a>
      </div>
      <div class="ping-section-result__description">
        The latency of <b>{{ site }}</b> is {{ latencyFeedback }}.
      </div>
    </div>
    <div class="ping-section-result__milliseconds">
      <div class="ping-section-result__milliseconds-header">
        respondend in
      </div>
      <div class="ping-section-result__milliseconds-value">
        {{ latency }} <span>ms</span>
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
    feedbackClass() {
      return `ping-section-result--${this.latencyFeedback}`
    },
  },
}
</script>
