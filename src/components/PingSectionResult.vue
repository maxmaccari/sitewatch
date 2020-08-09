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

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.ping-section-result {
  border-left: $size-1 solid $gray-500;
  display: flex;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  &__details {
    background-color: $gray-100;
    padding: $space-3;
    flex-grow: 1;
  }

  &__site {
    display: flex;
    align-items: center;
  }

  &__site-url {
    margin-left: $space-1;
    font-size: $text-lg;
    font-weight: 600;
    color: $primary-800;

    &:hover {
      color: $primary-700;
    }
  }

  &__site-image {
    padding: $space-1;
    background: white;
    border: 1px solid $gray-300;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 0;

    img {
      margin: auto;
      width: $size-4;
      height: $size-4;
    }
  }

  &__description {
    margin-top: $space-3;
    font-size: $text-sm;
    color: $gray-400;

    b {
      font-weight: 600;
    }
  }

  &__milliseconds {
    background-color: $gray-500;
    padding: $space-4;
    padding-top: $space-5;
    width: $size-32;
  }

  &__milliseconds-header {
    font-size: $text-xs;
    color: $gray-100;
  }

  &__milliseconds-value {
    margin-top: $space-4;
    font-size: $text-2xl;
    font-weight: 800;
    color: $white;

    span {
      font-weight: 500;
      font-size: $text-sm;
    }
  }

  &--good {
    border-left-color: $secondary-500;

    .ping-section-result__milliseconds {
      background-color: $secondary-600;
    }

    .ping-section-result__milliseconds-header {
      color: $secondary-100;
    }
  }

  &--average {
    border-left-color: $yellow-500;

    .ping-section-result__milliseconds {
      background-color: $yellow-600;
    }

    .ping-section-result__milliseconds-header {
      color: $yellow-100;
    }
  }

  &--bad {
    border-left-color: $red-500;

    .ping-section-result__milliseconds {
      background-color: $red-600;
    }

    .ping-section-result__milliseconds-header {
      color: $red-100;
    }
  }

  @media screen and (min-width: $medium-screen) {
    &__details {
      padding: $space-4;
    }

    &__description {
      margin-top: $space-4;
    }

    &__milliseconds {
      padding: $space-5;
      min-width: $size-32;
    }

    &__milliseconds-value {
      margin-top: $space-2;
      font-size: $text-3xl;
      font-weight: 800;
      color: $white;

      span {
        font-weight: 500;
        font-size: $text-sm;
      }
    }
  }
}
</style>
