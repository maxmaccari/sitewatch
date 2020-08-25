<template>
  <table class="history-section-table table-auto" v-if="pingHistory.length">
    <thead>
      <tr>
        <th></th>
        <th>Site</th>
        <th>Latency</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <HistorySectionTableEntry
        v-for="result in pingHistory"
        :key="result.id"
        :pingResult="result"
        @ping-url="$emit('ping-url', $event)"
      />
    </tbody>
  </table>
</template>

<script>
import HistorySectionTableEntry from './HistorySectionTableEntry'

export default {
  components: {
    HistorySectionTableEntry,
  },
  props: {
    pingHistory: {
      required: true,
      type: Array,
    },
  },
}
</script>

<style scoped>
.history-section-table {
  @apply text-gray-900 border-collapse w-full border border-gray-300;

  & thead {
    @apply bg-white;
  }

  & th {
    @apply py-1;
  }

  & th,
  & td {
    @apply text-left text-sm;
  }

  & tbody tr:nth-child(even) {
    @apply bg-white;
  }

  & tbody tr:nth-child(odd) {
    @apply bg-gray-200;
  }
}
</style>
