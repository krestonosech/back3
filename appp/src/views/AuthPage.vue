<template>
  <div>
    <div>
      <p>Логин</p>
      <input type="text" v-model="login">
      <p v-if="!login">Неправильный логин</p>
    </div>
    <div>
      <p>Пароль</p>
      <input type="password" v-model="password">
      <p v-if="!password">Неправильный Пароль</p>
    </div>
    <button @click="register">Зарегистрироваться</button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import router from '@/router';
  import axios from 'axios';
  import { ref } from 'vue';
  
  const login = ref()
  const password = ref()
  
  async function register() {
    try {
      const token = await axios.post('http://localhost:3001/auth', {login: login.value, password: password.value})
      localStorage.setItem('token', token.data.token)
      localStorage.setItem('login', login.value)
      router.push('/goods')
    } catch(err) {
      console.error(err);
    }
  }
  </script>
  
  <style lang="scss" scoped>
* {
  display: flex;
  flex-direction: column;
  align-items: center;
}
  </style>