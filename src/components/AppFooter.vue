<template>
  <div class="app-footer">
    <p>
      Developed by Maxsuel Maccari -
      <a href="https://www.github.com/maxmaccari" target="_blank">
        https://www.github.com/maxmaccari
      </a>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.app-footer {
  background-color: $gray-600;
  padding: $space-3 0;

  p {
    margin: 0;
    text-align: center;
    color: $gray-100;
  }

  a {
    color: $gray-200;
    font-size: $text-sm;

    &:hover {
      color: $gray-100;
    }
  }
}
</style>
