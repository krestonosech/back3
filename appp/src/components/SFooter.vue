<template>
    <header>
      <div class="header">
        <button @click="router.push('/auth')">footer</button>
        <button @click="router.push('/')">footer</button>
        <button @click="router.push('/goods')">footer</button>
        <button @click="router.push('/cards')">footer</button>
        <button @click="router.push('/all')">{{login === 'admin' ? 'Все заказы': 'Мои заказы' }}</button>
      </div>
    </header>
  </template>
  
  <script lang="ts" setup>
    import router from '@/router';
  
    const login = localStorage.getItem('login')
  </script>
  
  <style lang="scss" scoped>
  .header {
   display: flex;
   gap: 20px;
   align-items: center; 
   justify-content: center;
   padding: 30px;
  }
  </style>