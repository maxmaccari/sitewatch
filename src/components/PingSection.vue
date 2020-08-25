<template>
  <div class="ping-section">
    <PingSectionInput
      v-model="inputUrl"
      :loading="loading"
      :lastUrl="lastResult && lastResult.url"
      @ping="pingSite"
    />

    <transition name="fade" mode="out-in">
      <VLoading class="m-auto mt-6" :with-text="true" v-if="loading" />

      <template v-else>
        <PingSectionResult
          v-if="lastResult"
          :result="lastResult"
          class="mt-4"
        />

        <PingSectionError
          v-if="error"
          @try-again="tryAgain"
          :error="error"
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
import { mapState, mapActions } from 'vuex'

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
    ...mapState(['lastResult', 'error', 'loading']),
  },
  methods: {
    tryAgain() {
      this.inputUrl = this.error.url
      this.pingSite(this.error.url)
    },
    ...mapActions(['pingSite']),
  },
  watch: {
    lastResult(newResult) {
      if (!this.inputUrl && newResult) this.inputUrl = newResult.url
    },
  },
}
</script>
