<template>
  <div class="ping-section grid-8 grid-offset-2">
    <div class="ping-section__form-group">
      <input
        data-test-id="site-input"
        v-model="siteUrl"
        class="input"
        type="text"
        placeholder="ex: www.google.com"
      />
      <button
        data-test-id="ping-button"
        @click="pingSite(sanitizedUrl)"
        class="btn btn-primary"
        :disabled="!isValidUrl"
      >
        Ping
      </button>
    </div>

    <PingSectionResult
      v-if="lastSiteUrl && lastLatency"
      :siteUrl="lastSiteUrl"
      :latency="lastLatency"
      class="ping-section-result"
    />
  </div>
</template>

<script>
import PingSectionResult from '@/components/PingSectionResult'
import { mapState, mapActions } from 'vuex'

var urlPattern = new RegExp(
  '^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$',
  'i'
)

export default {
  components: {
    PingSectionResult,
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
    ...mapState(['lastSiteUrl', 'lastLatency']),
  },
  methods: mapActions(['pingSite']),
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
    }

    &--shadowed {
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
  }

  .ping-section-result {
    margin-top: $space-6;
  }
}
</style>
