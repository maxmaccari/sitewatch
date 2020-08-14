<template>
  <ul
    v-if="canShowPaginator"
    data-test-id="paginator"
    class="history-section-pagination"
  >
    <li>
      <button
        @click="$emit('previous-page')"
        :disabled="disableBack"
        data-test-id="page-back"
        class="with-icon"
        title="Back"
      >
        <inline-svg :src="require('@/assets/svg/arrow-circle-left.svg')" />
        Back
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
        class="with-icon"
        title="Next"
      >
        Next
        <inline-svg :src="require('@/assets/svg/arrow-circle-right.svg')" />
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
