<template>
  <div class="good">
    <h3 class="name">Яблоко</h3>
    <img width="150px" height="150px" src='../assets/public/яблоко.jpg' />
    <p class="description">Прекрасное вкусное яблоко</p>
    <p class="price">19 руб.</p>
    <div v-if="isAdd && number > 0" class="buttons">
      <button class="number" @click="number++; register('Яблоко')">+</button>
      <p>{{ number }}</p>
      <button class="number" @click="number--; register('Яблоко')">-</button>
    </div>
    <button v-else @click="register('Яблоко'); number = 1">Добавить товар</button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const selected = computed(() => store.state.selected);

const isAdd = ref(false);
const number = ref(1);

async function register(nickName: string) {
  const data = {
    name: 'Яблоко',
    value: number.value,
  };
  const existingItemIndex = selected.value.findIndex((item: { name: string; }) => item.name === nickName);

  if (existingItemIndex === -1) {
    store.commit('setSelected', [...selected.value, data]);
  } else {
    const updatedSelected = [...selected.value];
    updatedSelected[existingItemIndex].value = number.value;
    store.commit('setSelected', updatedSelected);
  }

  for (let i = 0; i < selected.value.length; i++) {
    console.log(selected.value[i]);
  }
  isAdd.value = true;
}
</script>

<style lang="scss">
.good {
  border: solid black 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 400px;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  align-items: center;
  height: 20px;
}
</style>
