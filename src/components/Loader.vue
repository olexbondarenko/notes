<template>
  <div class="loader">
    <div class="loader__content">
      <div class="loader__balls">
        <div class="loader__balls-item"></div>
        <div class="loader__balls-item"></div>
        <div class="loader__balls-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style lang="scss">
@keyframes scale {
  0%,
  80% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
  45% {
    -webkit-transform: scale(0.1);
    transform: scale(0.1);
    opacity: 0.7;
  }
}

.loader {
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #ff0476;
  z-index: 999999;

  &.active {
    display: table;
  }

  &__content {
    text-align: center;
    display: table-cell;
    vertical-align: middle;
  }

  &__balls {
    &-item {
      background-color: #fff;
      margin: 2px;
      display: inline-block;
      width: 20px;
      height: 20px;
      animation-fill-mode: both;
      border-radius: 50%;

      &:nth-child(1) {
        animation: scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
      }

      &:nth-child(2) {
        animation: scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
      }

      &:nth-child(3) {
        animation: scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
      }
    }
  }
}
</style>
