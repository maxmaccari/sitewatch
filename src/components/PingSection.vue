<template>
  <div class="ping-section grid-8 grid-offset-2">
    <div class="ping-section__form-group">
      <input class="input" type="text" placeholder="ex: www.google.com" />
      <button class="btn btn-primary">Ping</button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.ping-section {
  &__form-group {
    display: flex;
    margin: auto;
    overflow: hidden;
    width: $size-full;

    .input {
      border-bottom-left-radius: 25px;
      border-top-left-radius: 25px;
      flex-grow: 1;
      margin-right: -$size-px;
      padding-left: $size-6;
    }

    .btn {
      border-bottom-right-radius: 25px;
      border-top-right-radius: 25px;
      flex-grow: 0;
      margin-left: -$size-px;
      padding-right: $size-6;
    }

    &--shadowed {
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
  }

  .ping-section-result {
    margin-top: $space-6;
  }
}
</style>
