<template>
  <SHeader />
  <div>
    <div>
      <p>Логин</p>
      <input disabled type="text" v-model="login">
    </div>
    <div>
      <p>Адрес</p>
      <input type="text" v-model="adress">
      <p v-if="!adress">Неправильный Адрес</p>
    </div>
    <button @click="register">Оформить заказ</button>
  </div>
  <SFooter class="foot" />

</template>

<script lang="ts" setup>
import axios from 'axios';
import { computed, ref } from 'vue';
import SHeader from '@/components/SHeader.vue';
import { useStore } from 'vuex';
import SFooter from '@/components/SFooter.vue';
  
const store = useStore();
const selected = computed(() => store.state.selected);

const login = ref(localStorage.getItem('login'))
const adress = ref()

async function register() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    for (let i = 0; i < selected.value.length; i++) {
      await axios.post('http://localhost:3001/request', {login: login.value, name: selected.value[i].name, value: selected.value[i].value, adress: adress.value}, config)
    }
  } catch(err) {
    console.error(err);
  }
}
</script>

<style lang="scss" scoped>
.goods {
  display: flex;
  justify-content: space-around;
}
h1 {
  display: flex;
  justify-content: center;
}

.foot {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

* {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>