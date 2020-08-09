<template>
  <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
  <div class="v-loading" :class="{ 'v-loading--with-text': withText }">
    <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient
          x1="8.042%"
          y1="0%"
          x2="65.682%"
          y2="23.865%"
          :id="color"
          data-test-id="loading-gradient"
        >
          <stop :stop-color="hexColor" stop-opacity="0" offset="0%" />
          <stop :stop-color="hexColor" stop-opacity=".631" offset="63.146%" />
          <stop :stop-color="hexColor" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            :stroke="`url(#${color})`"
            stroke-width="2"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill="#fff" cx="36" cy="18" r="1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>

    <div class="v-loading__text" v-if="withText">
      Loading...
    </div>
  </div>
</template>

<script>
export default {
  props: {
    withText: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: () => 'primary',
    },
  },

  computed: {
    hexColor() {
      const colors = {
        primary: '#5D55FA',
        secondary: '#27AB83',
        gray: '#627D98',
        blue: '#2BB0ED',
        yellow: '#F0B429',
        red: '#E12D39',
        black: '#0E0E0E',
        white: '#FCFCFC',
      }

      return colors[this.color] || colors['primary']
    },
  },
}
</script>

<style lang="scss" scoped>
.v-loading {
  justify-content: center;
  align-items: center;

  &--with-text {
    display: flex;
    flex-direction: column;
    width: $size-10;
  }

  &__text {
    font-size: $text-xl;
    margin-top: $space-4;
    font-weight: 600;
    color: $primary-900;
  }

  svg {
    color: $primary-500;
  }
}
</style>
