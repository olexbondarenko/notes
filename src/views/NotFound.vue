<template>
  <div class="not-found">
    <div class="not-found__title">404</div>
    <div class="not-found__subtitle">Страница не найдена!</div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style lang="scss">
.not-found {
  text-align: center;
  &__title {
    font-size: 100px;
  }
  &__subtitle {
    font-size: 18px;
    letter-spacing: 2px;
  }
}
</style>
