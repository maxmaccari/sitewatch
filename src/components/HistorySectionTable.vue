<template>
  <table class="history-section-table">
    <thead>
      <tr>
        <th class="col-1"></th>
        <th class="col-2">Site</th>
        <th class="col-3">Latency</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in 10" :key="i">
        <td class="col-1">
          <img
            data-test-id="site-icon"
            src="http://s2.googleusercontent.com/s2/favicons?domain_url=http://www.google.com"
            alt="www.google.com icon"
          />
        </td>
        <td class="col-2">
          www.google.com
        </td>
        <td class="col-3">
          125 ms
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {}
</script>
<style lang="scss">
@import '@/scss/_variables.scss';

.history-section-table {
  width: $size-full;
  border: 1px solid $gray-200;
  border-radius: 2px;
  border-collapse: collapse;

  th {
    text-align: left;
    background-color: $white;
    padding-top: $space-2;
    padding-bottom: $space-2;
    color: $gray-600;
    font-size: $text-sm;
  }

  td {
    color: $gray-700;
    font-size: $text-sm;
  }

  tr {
    background-color: $gray-100;

    &:hover {
      background-color: lighten($gray-100, 2%);
    }
  }

  tr:nth-child(even) {
    background-color: $white;
  }

  .col-1 {
    width: 10px;
    padding-top: $space-2;
    padding-left: $space-2;
    padding-right: $space-1;
  }

  .col-3 {
    width: $size-32;
  }
}
</style>
