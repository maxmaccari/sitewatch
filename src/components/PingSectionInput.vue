<template>
  <div class="ping-section-input">
    <input
      data-test-id="site-input"
      v-model="siteUrl"
      @keyup.enter="$emit('ping', sanitizedUrl)"
      class="input"
      type="text"
      placeholder="ex: www.mywebsite.com"
      :disabled="loading"
    />
    <button
      data-test-id="ping-button"
      @click="$emit('ping', sanitizedUrl)"
      class="btn btn-primary btn-icon"
      :disabled="!isValidUrl || loading"
    >
      {{ pingLabel }}

      <VLoading v-if="loading" color="white" class="btn__v-loading" />
      <svg fill="currentColor" viewBox="0 0 20 20" v-else>
        <path
          fill-rule="evenodd"
          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script>
import VLoading from '@/components/VLoading'

const urlPattern = new RegExp(
  '^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$',
  'i'
)

export default {
  components: {
    VLoading,
  },
  props: {
    lastSiteUrl: {
      type: String,
    },
    lastSite: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      siteUrl: '',
    }
  },
  computed: {
    isValidUrl() {
      return urlPattern.test(this.sanitizedUrl)
    },
    sanitizedUrl() {
      if (
        this.siteUrl.startsWith('http://') ||
        this.siteUrl.startsWith('https://')
      ) {
        return this.siteUrl
      }

      return `http://${this.siteUrl}`
    },
    pingLabel() {
      if (this.siteUrl === this.lastSite || this.siteUrl === this.lastSiteUrl) {
        return 'Retry'
      }

      return 'Ping'
    },
  },
  methods: {
    setUrl(newUrl) {
      this.siteUrl = newUrl
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.ping-section-input {
  display: flex;
  margin: auto;
  overflow: hidden;
  width: $size-full;

  .input {
    border-radius: 0;
    border-bottom-left-radius: 25px;
    border-top-left-radius: 25px;
    flex-grow: 1;
    margin-right: -$size-px;
    padding-left: $size-6;
    font-size: $text-sm;
  }

  .btn {
    border-radius: 0;
    border-bottom-right-radius: 25px;
    border-top-right-radius: 25px;
    flex-grow: 0;
    margin-left: -$size-px;
    padding-right: $size-6;
    display: flex;
    align-items: center;
    font-size: $text-base;

    svg {
      margin-left: $space-2;
    }
  }

  .v-loading.btn__v-loading {
    margin-left: $space-2;
    width: 20px;
    height: 20px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &--shadowed {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
}
</style>
