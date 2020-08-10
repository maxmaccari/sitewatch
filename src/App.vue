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

<style src="normalize.css"></style>
<style lang="scss" src="@/scss/app.scss"></style>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.top-section {
  margin: auto;
  padding: 0 $space-2;
}

@include break('medium') {
  .history-section {
    min-height: $size-64;
  }
}

h1 {
  text-align: center;
}

p {
  color: $gray-700;
  font-size: $text-xl;
  text-align: center;
  max-width: $layout-8;
  margin: auto;
}

.ping-section {
  margin-top: $space-6;
}

.history-section {
  margin-top: $space-6;
}
</style>
