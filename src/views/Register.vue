<template>
  <div
    style="z-index: 1"
    class="relative flex items-center w-screen justify-center h-screen"
  >
    <div class="py-10 px-12 border bg-white rounded-md shadow">
      <div class="text-5xl text-black-900 font-bold login-form-title">
        Ro'yxatdan o'tish
      </div>
      <label for="">Username</label>
      <div class="mb-4 flex items-center border border-gray-300 rounded-md">
        <User class="pl-2 w-6 h-6 text-gray-400" />
        <input
          class="w-full px-4 py-2 border-none focus:outline-none"
          type="text"
          placeholder="Usernamingizni kiriting  "
          v-model="form.username"
          required
        />
      </div>
      <label for="">Parol</label>
      <div class="mb-4 flex items-center border border-gray-300 rounded-md">
        <PassIcon class="pl-2 w-6 h-6 text-gray-400" />
        <input
          class="w-full px-4 py-2 border-none focus:outline-none"
          :type="type"
          placeholder="Parolni kiriting "
          v-model="form.password"
          required
        />
      </div>

      <div class="input-group w-full border-none focus:outline-none">
        <label for="">Davlat</label>
        <select>
          <option v-for="country in countries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
      </div>

      <div
        class="bg-red-400 rounded p-2 px-4 text-white"
        v-if="loginRequest.error.value"
      >
        {{ loginRequest.error.value.message }}
      </div>

      <div class="mt-4 text-center">
        <Btn
          @click="handleSubmit"
          class="w-[300px] btn"
          :loading="loginRequest.loading.value"
          >Ro'yxatdan o'tish
        </Btn>
        <br />
        <router-link to="/login" class="text-blue-500">Kirish</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import useRequest from "@/api/useRequest";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/counter";
import type { UserData } from "@/types";
import Btn from "@/components/Btn.vue";
import User from "@/components/icons/User.vue";
import PassIcon from "@/components/icons/PassIcon.vue";
const form = reactive({
  username: "",
  password: "",
});

const countries = [
  "Uzbekistan",
  "Russia",
  "USA",
  "China",
  "Korea",
  "Japan",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "England",
  "Turkey",
  "India",
  "Pakistan",
  "Iran",
  "Iraq",
  "Egypt",
  "Brazil",
  "Argentina",
  "Mexico",
  "Canada",
  "Australia",
  "New Zealand",
  "South Africa",
  "Nigeria",
  "Ethiopia",
  "Kenya",
  "Tanzania",
  "Algeria",
  "Morocco",
  "Saudi Arabia",
  "Yemen",
  "Oman",
  "United Arab Emirates",
  "Afghanistan",
  "Kazakhstan",
  "Ukraine",
  "Belarus",
  "Poland",
  "Austria",
  "Czech Republic",
  "Slovakia",
  "Hungary",
  "Romania",
  "Bulgaria",
  "Greece",
];

const loginRequest = useRequest<UserData>(() => ({
  url: "/auth/signup",
  method: "POST",
  data: form,
}));

const router = useRouter();
const auth = useAuth();

const handleSubmit = async () => {
  const response = await loginRequest.fetch();

  if (response?.status === 201) {
    auth.saveLogin(response.data);

    await router.push("/login");
  }
};
const type = ref("password");
</script>

<style scoped></style>
