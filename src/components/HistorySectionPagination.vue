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
      >
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
      >
        Next
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

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.history-section-pagination {
  display: flex;
  justify-content: center;
  margin-top: $space-4;
  border-radius: 5px;
  overflow: hidden;

  li {
    list-style: none;
  }

  li + li {
    margin-left: -1px;
  }

  button {
    border: 1px solid $gray-200;
    display: block;
    padding: $space-1 $space-2;
    background: $white;
    cursor: pointer;

    &:hover {
      background-color: $gray-100;
    }

    &:disabled {
      cursor: default;
    }
  }

  .active {
    background-color: $gray-100;
  }
}
</style>
