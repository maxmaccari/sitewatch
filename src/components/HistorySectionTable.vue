<template>
  <table class="history-section-table" v-if="pingHistory.length">
    <thead>
      <tr>
        <th class="col-1"></th>
        <th class="col-2">Site</th>
        <th class="col-3">Latency</th>
        <th class="col-4"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(site, index) in pingHistory" :key="index">
        <td class="col-1">
          <img
            data-test-id="table-site-icon"
            :src="
              `http://s2.googleusercontent.com/s2/favicons?domain_url=${site.url}`
            "
            :alt="`${site.url} icon`"
          />
        </td>
        <td class="col-2">
          {{ site.url }}
        </td>
        <td class="col-3">
          <div class="history-section-table__latency">
            <div
              class="history-section-table__latency-indicator"
              :class="getIndicatorClass(site.latency)"
              :title="getIndicatorTitle(site.latency)"
              data-test-id="table-latency-indicator"
            >
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <span>{{ site.latency }} ms</span>
          </div>
        </td>
        <td class="col-4">
          <a
            @click="$emit('ping-url', site.url)"
            data-test-id="history-table-ping"
            class="history-section-table__ping-again"
            title="ping this url"
          >
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    pingHistory: {
      required: true,
      type: Array,
    },
  },
  methods: {
    getIndicatorClass(latency) {
      if (latency <= 360) {
        return 'history-section-table__latency-indicator--good'
      } else if (latency <= 1000) {
        return 'history-section-table__latency-indicator--average'
      }

      return 'history-section-table__latency-indicator--bad'
    },
    getIndicatorTitle(latency) {
      if (latency <= 360) {
        return 'the latency is good'
      } else if (latency <= 1000) {
        return 'the latency is average'
      }

      return 'the latency is bad'
    },
  },
}
</script>
<style lang="scss">
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
    width: $size-20;
  }

  .col-4 {
    width: $size-2;
    padding-right: $space-2;
  }

  &__latency {
    display: flex;

    span {
      margin-left: $space-1;
    }
  }

  &__latency-indicator {
    width: $size-4;
    padding-top: $space-px;

    &--good {
      color: $secondary-500;
    }

    &--average {
      color: $yellow-500;
    }

    &--bad {
      color: $red-500;
    }
  }

  &__ping-again {
    display: block;
    width: $size-4;
    color: $gray-800;
    cursor: pointer;

    &:hover {
      color: $gray-600;
    }
  }
}
</style>
