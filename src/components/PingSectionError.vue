<template>
  <div class="ping-section-error">
    <div class="ping-section-error__icon">
      <svg fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
    <div class="ping-section-error__message">
      <div class="ping-section-error__title">Error: {{ title }}</div>
      <div class="ping-section-error__description">
        We were not able to connect to <b>{{ site }}</b
        >. Check if the URL is correct or if your internet is connected. Click
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

<style lang="scss" scoped>
.ping-section-error {
  max-width: $layout-6;
  margin: auto;
  background-color: $red-100;
  border: 1px solid $red-700;
  color: $red-700;
  border-radius: 5px;
  padding: $space-4;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  &__icon {
    align-self: center;
    width: $size-16;
  }

  &__title {
    font-weight: 800;
    font-size: $text-lg;
    text-align: center;
  }

  &__description {
    margin-top: $space-3;

    b {
      font-weight: 600;
    }

    a {
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        color: $red-600;
      }
    }
  }

  @media screen and (min-width: $medium-screen) {
    flex-direction: row;
    padding: $space-5 $space-6;

    &__message {
      margin-left: $space-4;
      margin-top: $space-4;
    }

    &__title {
      text-align: left;
    }

    &__icon {
      width: $size-64;
      flex-grow: 0;
    }
  }
}
</style>
