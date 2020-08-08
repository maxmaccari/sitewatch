<template>
  <div id="app">
    <div class="container">
      <h1>How fast is your website loading?</h1>
      <p class="grid-8 grid-offset-2">
        Enter a url bellow to measure the website latency and we will show how
        fast (or slow) it is.
      </p>

      <PingSection class="ping-section" />
    </div>
  </div>
</template>

<script>
import PingSection from '@/components/PingSection'

export default {
  name: 'App',
  components: {
    PingSection,
  },
}
</script>

<style src="normalize.css"></style>
<style lang="scss" src="@/scss/app.scss"></style>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

@media screen and (min-width: $medium-screen) {
  .container {
    margin-top: $space-16;
  }
}

h1 {
  text-align: center;
}

p {
  color: $gray-700;
  font-size: $text-xl;
  text-align: center;
}

.ping-section {
  margin-top: $space-3;
}
</style>
