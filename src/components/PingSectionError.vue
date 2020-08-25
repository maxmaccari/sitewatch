<template>
  <div
    class="m-auto max-w-md bg-red-100 border border-red-300 text-red-1000 px-3 py-4 text-center rounded shadow-md sm:flex"
  >
    <inline-svg
      class="m-auto w-10 text-red-900 sm:w-48"
      :src="require('@/assets/svg/exclamation-circle.svg')"
    />
    <div class="sm:ml-1">
      <div class="mt-2 font-bold text-xl">Error: {{ title }}</div>
      <div class="mt-1 text-base leading-tight">
        We were not able to connect to
        <b class="font-semibold">{{ error.url }}</b>
        . Check if the URL is correct or if it exists. Click
        <a
          class="underline cursor-pointer hover:text-red-800"
          data-test-id="try-again"
          @click="$emit('try-again')"
          >here</a
        >
        to try again.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  computed: {
    title() {
      if (this.error.code === 'timeout') {
        return 'the connection timed out!'
      } else if (this.error.code === 'network_error') {
        return 'connection failed!'
      } else if (this.error.code === 'ENOTFOUND') {
        return 'the url cannot be resolved!'
      }

      return 'unknown error!'
    },
  },
}
</script>
