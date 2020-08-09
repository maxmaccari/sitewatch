<template>
  <div class="ping-section grid-8 grid-offset-2">
    <div class="ping-section__form-group">
      <input
        data-test-id="site-input"
        v-model="siteUrl"
        @keyup.enter="pingSite(sanitizedUrl)"
        class="input"
        type="text"
        placeholder="ex: www.mywebsite.com"
        :disabled="loading"
      />
      <button
        data-test-id="ping-button"
        @click="pingSite(sanitizedUrl)"
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

    <VLoading v-if="loading" class="space-top" :with-text="true" />

    <template v-else>
      <PingSectionResult
        v-if="lastSiteUrl && lastLatency"
        :site="lastSite"
        :latency="lastLatency"
        class="space-top"
      />

      <PingSectionError
        v-if="lastSiteUrl && error"
        @try-again="tryAgain"
        class="space-top"
        :error="error"
        :site="lastSite"
      />
    </template>
  </div>
</template>

<script>
import PingSectionError from '@/components/PingSectionError'
import PingSectionResult from '@/components/PingSectionResult'
import VLoading from '@/components/VLoading'
import { mapState, mapActions, mapGetters } from 'vuex'

const urlPattern = new RegExp(
  '^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$',
  'i'
)

export default {
  components: {
    PingSectionError,
    PingSectionResult,
    VLoading,
  },
  data() {
    return {
      siteUrl: '',
    }
  },
  computed: {
    sanitizedUrl() {
      if (
        this.siteUrl.startsWith('http://') ||
        this.siteUrl.startsWith('https://')
      ) {
        return this.siteUrl
      }

      return `http://${this.siteUrl}`
    },
    isValidUrl() {
      return urlPattern.test(this.sanitizedUrl)
    },
    pingLabel() {
      if (this.siteUrl === this.lastSite || this.siteUrl === this.lastSiteUrl) {
        return 'Retry'
      }

      return 'Ping'
    },
    ...mapState(['lastSiteUrl', 'lastLatency', 'error', 'loading']),
    ...mapGetters(['lastSite']),
  },
  methods: {
    tryAgain() {
      this.siteUrl = this.lastSiteUrl
      this.pingSite(this.lastSiteUrl)
    },
    ...mapActions(['pingSite']),
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.ping-section {
  &__form-group {
    display: flex;
    margin: auto;
    overflow: hidden;
    width: $size-full;

    .input {
      border-bottom-left-radius: 25px;
      border-top-left-radius: 25px;
      flex-grow: 1;
      margin-right: -$size-px;
      padding-left: $size-6;
    }

    .btn {
      border-bottom-right-radius: 25px;
      border-top-right-radius: 25px;
      flex-grow: 0;
      margin-left: -$size-px;
      padding-right: $size-6;
      display: flex;
      align-items: center;

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

  .v-loading {
    margin: auto;
  }

  .space-top {
    margin-top: $space-6;
  }
}
</style>
