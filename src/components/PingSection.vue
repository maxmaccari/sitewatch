<template>
  <div class="ping-section grid-8 grid-offset-2">
    <PingSectionInput
      :loading="loading"
      :lastSite="lastSite"
      :lastSiteUrl="lastSiteUrl"
      @ping="pingSite"
      ref="pingSectionInput"
    />

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
  }

  .space-top {
    margin-top: $space-6;
  }
}
</style>
