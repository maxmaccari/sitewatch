<template>
  <ul class="history-section-pagination">
    <li><a>Back</a></li>
    <li><a>1</a></li>
    <li class="active"><a>2</a></li>
    <li><a>3</a></li>
    <li><a>Next</a></li>
  </ul>
</template>

<script>
export default {}
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

  a {
    border: 1px solid $gray-200;
    display: block;
    padding: $space-1 $space-2;
    background: $white;
    cursor: pointer;

    &:hover {
      background-color: $gray-100;
    }
  }

  .active a {
    background-color: $gray-100;
  }
}
</style>
