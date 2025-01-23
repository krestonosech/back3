<template>
  <SHeader />
  <h1>Наша продукция</h1>
  <div class="goods">
    <MilkGood class="good" />
    <EggsGood class="good" />
    <BreadGood class="good" />
    <BananaGood class="good" />
    <AppleGood class="good" />
  </div>
</template>

<script lang="ts" setup>
import MilkGood from '@/components/MilkGood.vue';
import EggsGood from '@/components/EggsGood.vue';
import BreadGood from '@/components/BreadGood.vue';
import BananaGood from '@/components/BananaGood.vue';
import AppleGood from '@/components/AppleGood.vue';
import SHeader from '@/components/SHeader.vue';
</script>

<style lang="scss">
.goods {
  display: flex;
  justify-content: space-around;
}
.good:hover {
  animation: goods 2s;
}
@keyframes goods {
  from {
    width: 17%;
  }
  50% {
    width: 20%;
  }
  to {
    width: 17%;
  }
}
h1 {
  display: flex;
  justify-content: center;
}
</style>