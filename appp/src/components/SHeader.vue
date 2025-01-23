<template>
  <header>
    <div class="header">
      <img height="100px" width="300px" src="../assets//public/Авоська.jpg">
      <button @click="router.push('/auth')">Авторизация</button>
      <button @click="router.push('/')">Регистрация</button>
      <button @click="router.push('/goods')">Все продукты</button>
      <button @click="router.push('/cards')">Оформить заказ</button>
      <button @click="router.push('/all')">{{login === 'admin' ? 'Все заказы': 'Мои заказы' }}</button>
    </div>
  </header>
</template>

<script lang="ts" setup>
  import router from '@/router';

  const login = localStorage.getItem('login')
</script>

<style lang="scss">
.header {
 display: flex;
 gap: 20px;
 align-items: center; 
 justify-content: center;
 padding: 30px;
}
</style>