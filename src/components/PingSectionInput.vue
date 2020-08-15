<template>
  <div class="ping-section-input w-full m-auto max-w-3xl flex">
    <input
      data-test-id="site-input"
      v-model="url"
      @keyup.enter="$emit('ping', sanitizedUrl)"
      class="input rounded-l-full"
      type="text"
      placeholder="ex: www.mywebsite.com"
      :disabled="loading"
    />
    <button
      data-test-id="ping-button"
      @click="$emit('ping', sanitizedUrl)"
      class="btn btn-primary rounded-r-full pr-5 -ml-px"
      :disabled="!isValidUrl || loading"
    >
      {{ pingLabel }}

      <transition name="fade" mode="out-in">
        <VLoading color="white" class="ml-2 w-4" v-if="loading" />
        <inline-svg
          v-else
          class="ml-1 w-5"
          :src="require('@/assets/svg/lighting-bolt.svg')"
        />
      </transition>
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
    lastUrl: {
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
      url: '',
    }
  },
  computed: {
    isValidUrl() {
      return validateUrl(this.sanitizedUrl)
    },
    sanitizedUrl() {
      if (this.url.startsWith('http://') || this.url.startsWith('https://')) {
        return this.url
      }

      return `http://${this.url}`
    },
    pingLabel() {
      if (this.url === this.lastSite || this.url === this.lastUrl) {
        return 'Retry'
      }

      return 'Ping'
    },
  },
  methods: {
    setUrl(newUrl) {
      this.url = newUrl
    },
  },
}
</script>
