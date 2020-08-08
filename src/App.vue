<template>
  <div id="app">
    <div class="container">
      <h1>How fast is your website loading?</h1>
      <p>
        Enter a url bellow to measure the website latency and we will show how
        fast (or slow) it is.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style src="normalize.css"></style>
<style lang="scss" src="@/scss/app.scss"></style>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.container {
  margin-top: $space-16;
}

h1 {
  text-align: center;
}

p {
  text-align: center;
  font-size: $text-xl;
  color: $gray-700;
}
</style>
