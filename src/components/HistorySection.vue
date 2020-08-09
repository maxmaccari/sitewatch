<template>
  <div class="history-section">
    <div class="container">
      <div class="history-section__header">
        <h2>Ping History</h2>

        <div class="history-section__header-controls">
          <div class="input-addon">
            <div class="input-addon__icon">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>

            <input
              data-test-id="search-input"
              type="text"
              class="input"
              placeholder="Search"
              :value="historySearch"
              @input="searchHistory($event.target.value)"
            />
          </div>

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

      <div class="history-section__no-data" v-if="!filteredHistory.length">
        <img src="@/assets/images/undraw_no_data.svg" alt="No Data" />
        <p>No data found here.</p>
      </div>

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
    ...mapState(['currentPage', 'historySearch']),
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
    position: relative;

    .input-addon {
      flex-grow: 1;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      position: relative;
    }

    .input {
      width: $size-full;
      padding-left: $space-8;
    }

    .input-addon__icon {
      width: $size-5;
      position: absolute;
      top: 10px;
      left: 8px;
      color: $gray-400;
    }

    .btn {
      position: relative;
      font-size: $text-sm;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  &__no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: $space-5;

    img {
      max-width: 100%;
      width: $size-32;
    }

    p {
      font-size: $text-lg;
      font-weight: 600;
      color: $primary-500;
      margin-top: 0;
    }
  }

  .history-section-table {
    margin-top: $space-3;
  }
}

@include break('medium') {
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

      .input-addon {
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
