<script setup lang="ts">

import {onMounted, ref} from "vue";
const users = ref([])
onMounted(async () => {
  const response = await fetch('http://localhost:8000/api/management/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    },
    credentials: 'include'
  })

  const body = await response.json()

  if (body.code === "SUCCESS") {
    users.value = body.payload.data
  } else {
    console.error(body)
    alert("Error")
  }
})
</script>

<template>
  User List Index
  <table class="w-full border border-gray-200">
    <thead class="bg-gray-100">
    <tr>
      <th scope="col" class="text-left px-2 py-1">No</th>
      <th scope="col" class="text-left px-2 py-1">First Name</th>
      <th scope="col" class="text-left px-2 py-1">Last Name</th>
      <th scope="col" class="text-left px-2 py-1">Email</th>
      <th scope="col" class="text-left px-2 py-1">Username</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(user, key) in users" :key="key" class="border-t">
      <td class="text-left px-2 py-1">{{ key + 1 }}</td>
      <td class="text-left px-2 py-1">{{ user.first_name }}</td>
      <td class="text-left px-2 py-1">{{ user.last_name }}</td>
      <td class="text-left px-2 py-1">{{ user.email }}</td>
      <td class="text-left px-2 py-1">{{ user.username }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>