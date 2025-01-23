<template>
  <div>
    <div>
      <p>Логин</p>
      <input type="text" v-model="login">
      <p v-if="!login">Неправильный логин</p>
    </div>
    <div>
      <p>ФИО</p>
      <input type="text" v-model="fio">
      <p v-if="!fio">Неправильный логин</p>
    </div>
    <div>
      <p>Телефон</p>
      <input type="text" v-model="phone">
      <p v-if="!phone">Неправильный логин</p>
    </div>
    <div>
      <p>Почта</p>
      <input type="text" v-model="email">
      <p v-if="!email">Неправильная Почта</p>
    </div>
    <div>
      <p>Пароль</p>
      <input type="password" v-model="password">
      <p v-if="!password">Неправильный Пароль</p>
    </div>
    <div>
      <p>Подтвердите пароль</p>
      <input type="password" v-model="confirmPassword">
      <p v-if="!confirmPassword">Пароли не совпадают</p>
    </div>
    <button @click="register">Зарегистрироваться</button>
	</div>
</template>

<script lang="ts" setup>
import router from '@/router';
import axios from 'axios';
import { ref } from 'vue';

const login = ref()
const fio = ref()
const phone = ref()
const email = ref()
const password = ref()
const confirmPassword = ref()

async function register() {
  try {
    const data = {
      login: login.value,
      fio: fio.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
    }
    await axios.post('http://localhost:3001/register', data)
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