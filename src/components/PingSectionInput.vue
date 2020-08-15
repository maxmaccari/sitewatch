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
    value: {
      type: String,
      default: '',
    },
    lastUrl: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    url: {
      get() {
        return this.value || ''
      },

      set(newValue) {
        this.$emit('input', newValue)
      },
    },
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
      if (this.sanitizedUrl === this.lastUrl) {
        return 'Retry'
      }

      return 'Ping'
    },
  },
}
</script>
