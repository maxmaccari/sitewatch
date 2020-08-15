<template>
  <div id="app" class="antialiased min-h-screen flex flex-col">
    <div class="px-2 sm:px-8 md:px-0 container m-auto" :class="$style.top">
      <h1
        class="mt-6 m-auto text-3xl font-bold text-center leading-tight flex-grow-0"
      >
        How fast is your website loading?
      </h1>
      <p
        class="mt-4 m-auto max-w-2xl text-xl text-gray-700 text-center leading-tight"
      >
        Enter a url bellow to measure the website latency and we will show how
        fast (or slow) it is.
      </p>

      <PingSection class="mt-4" />
    </div>

    <div
      class="mt-4 px-2 py-6 bg-gray-200 flex-1 sm:px-8 md:px-4 lg:px-2 xl:px-0"
    >
      <div class="container max-w-3xl m-auto">
        <HistorySection />
      </div>
    </div>

    <AppFooter class="self-end" />
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

<style module>
.top {
  min-height: 300px;
}
</style>
