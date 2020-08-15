<template>
  <div class="history-section">
    <transition-group
      data-test-id="header-control"
      :class="{ 'not-empty': pingHistory.length }"
      name="fade"
    >
      <h2
        key="title"
        class="text-gray-900 font-semibold text-3xl text-center transition-all duration-100"
        :class="{ 'not-empty-header': pingHistory.length }"
      >
        Ping History
      </h2>

      <div class="mt-4 flex" key="controls" v-if="pingHistory.length">
        <div class="flex-1 relative md:flex-none md:w-64">
          <inline-svg
            class="search-icon absolute w-5 top-0 left-0 mt-2 ml-2 text-gray-500 z-20"
            :src="require('@/assets/svg/search.svg')"
          />

          <input
            data-test-id="search-input"
            type="text"
            class="input pl-8 text-sm w-full h-full rounded-l"
            placeholder="Search"
            :value="historySearch"
            @input="searchHistory($event.target.value)"
          />
        </div>

        <button
          @click="resetHistory()"
          data-test-id="clear-button"
          class="btn btn-red -ml-px h-full rounded-r"
        >
          Clear
          <inline-svg
            class="w-5 ml-1"
            :src="require('@/assets/svg/trash.svg')"
          />
        </button>
      </div>
    </transition-group>

    <transition name="fade-slow" mode="out-in">
      <HistorySectionTable
        :pingHistory="filteredHistory"
        @ping-url="pingSite"
        class="mt-2"
      />
    </transition>

    <transition name="fade-slow" mode="out-in">
      <div class="mt-4" v-if="!filteredHistory.length">
        <img
          class="w-32 m-auto"
          src="@/assets/images/undraw_no_data.svg"
          alt="No Data"
        />
        <p class="text-center text-lg font-semibold text-primary-700">
          No data found.
        </p>
      </div>
    </transition>

    <transition name="fade-slow" mode="out-in">
      <HistorySectionPagination
        :page="currentPage"
        :totalPages="historyPages"
        @next-page="nextPage"
        @previous-page="previousPage"
        @change-page="goToPage"
        class="mt-4 m-auto"
      />
    </transition>
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

<style scoped>
.search-icon {
  top: 3px;
  left: 1px;
}

@screen md {
  .not-empty {
    @apply flex items-center justify-between;
  }

  .not-empty-header {
    @apply text-2xl mt-3;
  }
}
</style>
