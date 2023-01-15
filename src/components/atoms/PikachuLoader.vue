<template>
  <div class="loader">
  <p>Loading...</p>
    <div class="loader__pikachu">
      <img
        src="https://c.tenor.com/2lFt6lp1KaMAAAAi/run-pokemon.gif"
        alt="pikachu"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.loader {
  position: relative;
  height: 100%;
  display: grid;
  align-items: center;
  p {
    position: absolute;
    bottom: 0;
    left: 0;
    color: $primary;
    font-family: $secondary-font;
    letter-spacing: 4px;
  }
  &__pikachu {
    position: relative;
    animation: 3s run linear infinite;
  }
  img {
    height: 75px;
  }

  @keyframes run {
    0% {
      transform: translateX(-20%);
    }
    100% {
      transform: translateX(110%);
    }
  }
}
</style>
