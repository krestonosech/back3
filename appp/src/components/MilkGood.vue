<template>
    <div class="good">
      <h3 class="name">Молоко</h3>
      <img width="150px" height="150px" src='../assets/public/молоко.jpg' />
      <p class="description">Прекрасное молоко</p>
      <p class="price">19 руб.</p>
      <div v-if="isAdd && number > 0" class="buttons">
        <button class="number" @click="number++; register('Молоко')">+</button>
        <p>{{ number }}</p>
        <button class="number" @click="number--; register('Молоко')">-</button>
      </div>
      <button v-else @click="register('Молоко'); number = 1">Добавить товар</button>
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
      name: 'Молоко',
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
    console.log(selected.value);
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
  