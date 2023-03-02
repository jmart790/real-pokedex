<template>
  <section class="yosh">
    <img src="@/assets/images/BonazaiYoshFullbody2.png" alt="professor yosh" />
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.yosh {
  height: 100%;
  width: 100%;
  background-position: right bottom;
  background-size: cover;
  // background-image: url('https://cdn.discordapp.com/attachments/1057467541062168586/1080837755703144448/BonzaiYosh_landscape_of_a_jungle_with_a_waterfall_in_the_style__b3bcc660-211f-4694-860e-06c31980dec1.png');
  // background-image: url('https://cdn.discordapp.com/attachments/1057467541062168586/1080838078010232832/BonzaiYosh_landscape_of_a_jungle_with_a_waterfall_in_the_style__c15c6045-dac9-43a0-946c-291d32e775f1.png');
  // background-image: url('https://cdn.discordapp.com/attachments/1057467541062168586/1080838421444046929/BonzaiYosh_landscape_of_a_jungle_with_a_waterfall_in_the_style__b8fb07ed-2ae1-4a8c-862d-35b568d0b1db.png');
  background-image: url('https://cdn.discordapp.com/attachments/1057467541062168586/1080838415878205520/BonzaiYosh_landscape_of_a_jungle_with_a_waterfall_in_the_style__77285c68-abc5-4c91-adf1-e23f3d231a2e.png');
  // background-image: url('https://cdn.discordapp.com/attachments/1057467541062168586/1080838082972110969/BonzaiYosh_landscape_of_a_jungle_with_a_waterfall_in_the_style__2f3def86-a54a-418b-91e7-1e43b110c64e.png');

  img {
    position: absolute;
    bottom: -100px;
    left: 20px;
    height: 400px;
    // transform: scaleX(-1);
    filter: drop-shadow(0px 4px 4px rgba(black, 0.7));
  }
}
</style>