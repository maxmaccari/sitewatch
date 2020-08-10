<template>
  <div class="ping-section">
    <PingSectionInput
      :loading="loading"
      :lastSite="lastSite"
      :lastSiteUrl="lastSiteUrl"
      @ping="pingSite"
      ref="pingSectionInput"
    />

    <transition name="fade" mode="out-in">
      <VLoading :with-text="true" v-if="loading" />

      <template v-else>
        <PingSectionResult
          v-if="lastSiteUrl && lastLatency"
          :site="lastSite"
          :latency="lastLatency"
        />

        <PingSectionError
          v-if="lastSiteUrl && error"
          @try-again="tryAgain"
          :error="error"
          :site="lastSite"
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
    ...mapState(['lastSiteUrl', 'lastLatency', 'error', 'loading']),
    ...mapGetters(['lastSite']),
  },
  methods: {
    tryAgain() {
      this.$refs.pingSectionInput.setUrl(this.lastSiteUrl)
      this.pingSite(this.lastSiteUrl)
    },
    ...mapActions(['pingSite']),
  },
}
</script>

<style lang="scss" scoped>
.ping-section {
  .v-loading {
    margin: auto;
    margin-top: $space-4;
  }

  .ping-section-result,
  .ping-section-error {
    margin-top: $space-6;
  }
}
</style>
