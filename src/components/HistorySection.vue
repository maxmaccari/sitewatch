<template>
  <div class="history-section">
    <div class="container">
      <div class="history-section__header">
        <h2>Ping History</h2>

        <div class="history-section__header-controls">
          <input
            data-test-id="search-input"
            type="text"
            class="input"
            placeholder="Search"
            @input="searchHistory($event.target.value)"
          />

          <button
            @click="resetHistory()"
            data-test-id="clear-button"
            class="btn btn-red"
          >
            Clear
          </button>
        </div>
      </div>

      <HistorySectionTable
        :pingHistory="filteredHistory"
        @ping-url="pingSite"
      />

      <HistorySectionPagination
        :page="currentPage"
        :totalPages="historyPages"
        @next-page="nextPage"
        @previous-page="previousPage"
        @change-page="goToPage"
      />
    </div>
  </div>
</template>

<script>
import HistorySectionTable from '@/components/HistorySectionTable'
import HistorySectionPagination from '@/components/HistorySectionPagination'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    HistorySectionTable,
    HistorySectionPagination,
  },
  computed: {
    ...mapState(['currentPage']),
    ...mapGetters(['filteredHistory', 'historyPages']),
  },
  methods: mapActions([
    'pingSite',
    'searchHistory',
    'resetHistory',
    'nextPage',
    'previousPage',
    'goToPage',
  ]),
}
</script>
<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.history-section {
  background-color: $gray-100;
  padding-top: $space-4;
  padding-bottom: $space-4;

  h2 {
    font-weight: 600;
    font-size: $text-3xl;
    color: $gray-700;
  }

  &__header {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &__header-controls {
    width: $size-full;
    display: flex;

    .input {
      flex-grow: 1;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .btn {
      font-size: $text-sm;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .history-section-table {
    margin-top: $space-3;
  }
}

@media screen and (min-width: $medium-screen) {
  .history-section {
    h2 {
      font-weight: 600;
      font-size: $text-xl;
      color: $gray-700;
    }

    &__header {
      flex-direction: row;
      justify-content: space-between;
    }

    &__header-controls {
      width: unset;
      display: flex;

      .input {
        flex-grow: 0;
        width: $size-64;
      }

      .btn {
        font-size: $text-sm;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    .history-section-table {
      margin-top: 0;
    }
  }
}

.container {
  padding-left: $space-2;
  padding-right: $space-2;
}
</style>
