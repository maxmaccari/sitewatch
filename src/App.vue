<template>
  <div id="app" class="antialiased">
    <div class="px-2">
      <h1 class="mt-6 text-3xl font-bold text-center leading-tight">
        How fast is your website loading?
      </h1>
      <p class="mt-4 text-xl text-gray-700 text-center leading-tight">
        Enter a url bellow to measure the website latency and we will show how
        fast (or slow) it is.
      </p>

      <PingSection class="mt-4" />
    </div>

    <HistorySection class="mt-4" />

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
