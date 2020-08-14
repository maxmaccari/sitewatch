<template>
  <div class="ping-section-error">
    <div class="ping-section-error__icon">
      <inline-svg :src="require('@/assets/svg/exclamation-circle.svg')" />
    </div>
    <div class="ping-section-error__message">
      <div class="ping-section-error__title">Error: {{ title }}</div>
      <div class="ping-section-error__description">
        We were not able to connect to <b>{{ site }}</b
        >. Check if the URL is correct or if it exists. Click
        <a data-test-id="try-again" @click="$emit('try-again')">here</a> to try
        again.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      required: true,
    },
    site: {
      type: String,
      required: true,
    },
  },
  computed: {
    title() {
      if (this.error === 'timeout') {
        return 'the connection timed out!'
      } else if (this.error === 'network_error') {
        return 'connection failed!'
      } else if (this.error === 'unresolved_url') {
        return 'the url cannot be resolved!'
      }

      return 'unknown error!'
    },
  },
}
</script>
