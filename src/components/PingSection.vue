<template>
  <div class="ping-section">
    <PingSectionInput
      v-model="inputUrl"
      :loading="loading"
      :lastUrl="lastUrl"
      @ping="pingSite"
    />

    <transition name="fade" mode="out-in">
      <VLoading class="m-auto mt-6" :with-text="true" v-if="loading" />

      <template v-else>
        <PingSectionResult
          v-if="lastUrl && lastLatency"
          :site="lastSite"
          :latency="lastLatency"
          class="mt-4"
        />

        <PingSectionError
          v-if="lastUrl && error"
          @try-again="tryAgain"
          :error="error"
          :site="lastSite"
          class="mt-4"
        />
      </template>
    </transition>
  </div>
</template>

<script>
import PingSectionInput from '@/components/PingSectionInput'
import PingSectionError from '@/components/PingSectionError'
import PingSectionResult from '@/components/PingSectionResult'
import VLoading from '@/components/VLoading'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {
    PingSectionInput,
    PingSectionError,
    PingSectionResult,
    VLoading,
  },
  data() {
    return {
      inputUrl: null,
    }
  },
  computed: {
    ...mapState(['lastUrl', 'lastLatency', 'error', 'loading']),
    ...mapGetters(['lastSite']),
  },
  methods: {
    tryAgain() {
      this.inputUrl = this.lastUrl
      this.pingSite(this.lastUrl)
    },
    ...mapActions(['pingSite']),
  },
  watch: {
    lastUrl(newUrl) {
      if (!this.inputUrl && newUrl) this.inputUrl = newUrl
    },
  },
}
</script>
