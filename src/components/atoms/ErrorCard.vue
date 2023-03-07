<template>
  <FrostCard>
    <div class="error-card">
      <p class="error-card__msg">We're sorry, we are having some trouble fetching your data 🙁</p>
    </div>
  </FrostCard>
</template>

<style scoped lang="scss">
.error-card {
  @include flex-center;
  height: 100%;
  padding: $card-padding;
  color: $off-white;
  &__msg {
    text-align: center;
  }
}
</style>
