<template>
  <ul
    v-if="canShowPaginator"
    data-test-id="paginator"
    class="history-section-pagination"
    :class="$style.paginator"
  >
    <li>
      <button
        @click="$emit('previous-page')"
        :disabled="disableBack"
        data-test-id="page-back"
        class="flex items-center"
        title="Back"
      >
        <inline-svg :src="require('@/assets/svg/arrow-circle-left.svg')" />
        <span class="ml-1">
          Back
        </span>
      </button>
    </li>
    <li v-for="n in totalPages" :key="n">
      <button
        @click="$emit('change-page', n)"
        :disabled="n === page"
        :class="n === page ? 'active' : null"
        :data-test-id="`page-${n}`"
      >
        {{ n }}
      </button>
    </li>
    <li>
      <button
        @click="$emit('next-page')"
        :disabled="disableNext"
        data-test-id="page-next"
        class="flex items-center"
        title="Next"
      >
        <span>Next</span>
        <inline-svg
          class="w-6 ml-1"
          :src="require('@/assets/svg/arrow-circle-right.svg')"
        />
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    page: {
      required: true,
      type: Number,
    },
    totalPages: {
      required: true,
      type: Number,
    },
  },
  computed: {
    canShowPaginator() {
      return this.totalPages > 1
    },
    disableBack() {
      return this.page === 1
    },
    disableNext() {
      return this.page === this.totalPages
    },
  },
}
</script>

<style module>
.paginator {
  @apply flex justify-center flex-wrap;

  & button {
    @apply px-2 py-1 bg-white border border-gray-400 transition-colors duration-500;

    &:disabled {
      @apply bg-gray-200 text-gray-500 border-gray-300;
    }

    &:hover {
      @apply bg-gray-100 transition-colors;
    }
  }

  & li {
    @apply -ml-px;
  }

  & li:first-child {
    @apply ml-0;
  }
}
</style>
