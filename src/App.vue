<template>
  <div id="app">
    <div class="container top-section">
      <h1>How fast is your website loading?</h1>
      <p>
        Enter a url bellow to measure the website latency and we will show how
        fast (or slow) it is.
      </p>

      <PingSection />
    </div>

    <HistorySection />

    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '@/components/AppFooter'
import PingSection from '@/components/PingSection'
import HistorySection from '@/components/HistorySection'

export default {
  name: 'App',
  components: {
    AppFooter,
    PingSection,
    HistorySection,
  },
}
</script>
