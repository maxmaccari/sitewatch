<template>
  <div class="history-section">
    <div class="container">
      <div class="history-section__header">
        <h2>Ping History</h2>

        <div class="history-section__header-controls">
          <input type="text" class="input" placeholder="Search" />

          <button class="btn btn-red">Clear</button>
        </div>
      </div>

      <HistorySectionTable />

      <HistorySectionPagination />
    </div>
  </div>
</template>

<script>
import HistorySectionTable from '@/components/HistorySectionTable'
import HistorySectionPagination from '@/components/HistorySectionPagination'

export default {
  components: {
    HistorySectionTable,
    HistorySectionPagination,
  },
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
    font-size: $text-xl;
    color: $gray-700;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__header-controls {
    display: flex;
    height: $size-10;

    .input {
      width: $size-64;
    }

    .btn {
      flex: 0;
      margin-left: $space-2;
      font-size: $text-sm;
    }
  }
}

.container {
  padding-left: $space-2;
  padding-right: $space-2;
}
</style>
