<script setup lang="ts">

import {ref} from "vue";
import {useRouter} from "vue-router";

export interface FormLogin {
  username: string,
  password: string,
}

const form = ref<FormLogin>({
  username: '',
  password: '',
})

const router = useRouter()
const onSubmit = async () => {
  const response = await fetch('http://localhost:8000/api/auth/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: form.value.username,
      password: form.value.password,
    }),
    credentials: 'include'
  })

  const body = await response.json()
  console.log(body)
  if (body.code === "SUCCESS") {
    const accessToken = body.payload.data.access_token
    localStorage.setItem('access_token', accessToken)
    form.value.username = ""
    form.value.password = ""
    await router.push({
      name: "user-index"
    })
  } else {
    alert("Login Failed")
  }
}
</script>

<template>
  Login User With Library iqbalatma

  <div class="grid grid-cols-12 mt-10 gap-5">
    <div class="col-span-12">
      <label class="block">Username</label>
      <input class="border-2 px-1 border-gray-400 rounded border-opacity-10" placeholder="Please enter your username"
             v-model="form.username"
             autocomplete="username"
             @keydown.enter="onSubmit"
      />
    </div>
    <div class="col-span-12">
      <label class="block">Password</label>
      <input class="border-2 px-1 border-gray-400 rounded border-opacity-10" placeholder="Please enter your password"
             v-model="form.password"
             type="password" @keydown.enter="onSubmit"/>
    </div>
    <div class="col-span-12">
      <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" @click="onSubmit">
        Submit
      </button>
    </div>
  </div>

</template>

<style scoped>

</style>