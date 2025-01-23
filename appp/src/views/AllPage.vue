<template>
    <div class="all">
        <SHeader />
        <h1>{{login === 'admin' ? 'Все заказы': 'Мои заказы' }}</h1>
        <div>
          <table v-if="data">
            <thead>
            <tr>
            <th>id</th>
              <th>name</th>
              <th>value</th>
              <th>status</th>
              <th>adress</th>
              <th>login</th>
            </tr>

            </thead>
            <tbody>
                <tr v-for="item in data.data.row" :key="item">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.value }}</td>
                    <td><v-autocomplete :items="items" v-model="status" @update:model-value="update(item.id, status)"></v-autocomplete>{{ item.status }}</td>
                    <td>{{ item.adress }}</td>
                    <td>{{ item.login }}</td>
                </tr>
            </tbody>
          </table>
        </div>
    </div>
    <SFooter class="foot" />
  </template>
  
  <script lang="ts" setup>
  import axios from 'axios';
  import { onMounted, ref } from 'vue';
  import SHeader from '@/components/SHeader.vue';
  import SFooter from '@/components/SFooter.vue';
  
  const login = ref(localStorage.getItem('login'))
  const data = ref()
  const items = ['Отменено', 'подтвержденно']
  const status = ref('')
  
  async function register() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
  
      data.value = await axios.post('http://localhost:3001/requests', {login: login.value}, config)
      console.log(data.value.data);
    } catch(err) {
      console.error(err);
    }
  }

  async function update(id: number, statuss: string) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }

      await axios.post('http://localhost:3001/all', {id: id, status: statuss}, config)
      data.value = await axios.post('http://localhost:3001/requests', {login: login.value}, config)
      status.value = ''
    } catch(err) {
        console.error(err);
    }
  }
  
  onMounted(() => {
    register()
  })
  </script>
  
  <style lang="scss" scoped>
  th, td {
    min-width: 136px;
    min-height: 136px;
    border: solid gray 2px;
  }
  .all {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  </style>