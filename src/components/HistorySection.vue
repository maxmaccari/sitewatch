<template>
  <div class="history-section">
    <div class="container">
      <div
        class="history-section__header"
        :class="{ 'history-section__header--empty': !pingHistory.length }"
      >
        <h2>Ping History</h2>

        <transition name="fade-slow" mode="out-in">
          <div
            class="history-section__header-controls"
            v-if="pingHistory.length"
          >
            <div class="input-addon">
              <div class="input-addon__icon">
                <inline-svg :src="require('@/assets/svg/search.svg')" />
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
              <inline-svg :src="require('@/assets/svg/trash.svg')" />
            </button>
          </div>
        </transition>
      </div>

      <transition name="fade-slow" mode="out-in">
        <HistorySectionTable
          :pingHistory="filteredHistory"
          @ping-url="pingSite"
        />
      </transition>

      <transition name="fade-slow" mode="out-in">
        <div class="history-section__no-data" v-if="!filteredHistory.length">
          <img src="@/assets/images/undraw_no_data.svg" alt="No Data" />
          <p>No data found here.</p>
        </div>
      </transition>

      <transition name="fade-slow" mode="out-in">
        <HistorySectionPagination
          :page="currentPage"
          :totalPages="historyPages"
          @next-page="nextPage"
          @previous-page="previousPage"
          @change-page="goToPage"
        />
      </transition>
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
    ...mapState(['currentPage', 'historySearch', 'pingHistory']),
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

  &__header--empty {
    justify-content: center;

    h2 {
      margin: auto;
    }
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
      display: flex;

      svg {
        width: $size-4;
        margin-left: $space-1;
      }
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
