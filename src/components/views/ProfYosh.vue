<template>
  <section class="yosh">
    <div class="yosh__bg" />
    <img src="@/assets/images/BonzaiYoshProfessor.png" alt="professor yosh" />
  </section>
</template>

<style scoped lang="scss">
// TODO: Make yosh img dynamic to show other variations
.yosh {
  height: 100%;
  width: 100%;
  background: $off-white;

  &__bg {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    content: '';
    background-position: left bottom;
    background-size: cover;
    background-image: url('https://cdn.midjourney.com/77285c68-abc5-4c91-adf1-e23f3d231a2e/0_0.png');
    opacity: 0.9;
  }

  img {
    position: absolute;
    bottom: -80px;
    left: -20px;
    height: 400px;
    transform: scaleX(-1);
    @include larger-than-mobile {
      filter: drop-shadow(4px 4px 8px rgba(black, 0.7));
    }
  }
}
</style>
