<template>
  <div class="ping-section">
    <PingSectionInput
      :loading="loading"
      :lastSite="lastSite"
      :lastUrl="lastUrl"
      @ping="pingSite"
      ref="pingSectionInput"
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
  computed: {
    ...mapState(['lastUrl', 'lastLatency', 'error', 'loading']),
    ...mapGetters(['lastSite']),
  },
  methods: {
    tryAgain() {
      this.$refs.pingSectionInput.setUrl(this.lastUrl)
      this.pingSite(this.lastUrl)
    },
    ...mapActions(['pingSite']),
  },
}
</script>
