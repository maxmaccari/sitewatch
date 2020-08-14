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
      <inline-svg :src="require('@/assets/svg/lighting-bolt.svg')" v-else />
    </button>
  </div>
</template>

<script>
import VLoading from '@/components/VLoading'
import validateUrl from '@/utils/validateUrl'

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
      return validateUrl(this.sanitizedUrl)
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
