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
