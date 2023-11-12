<template>
  <div
    style="z-index: 1"
    class="relative flex items-center w-screen justify-center h-screen"
  >
    <div class="py-10 px-12 border bg-white rounded-md shadow">
      <div class="text-5xl text-black-900 font-bold login-form-title">
        Kirish
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
          type="password"
          placeholder="Parolni kiriting "
          v-model="form.password"
          required
        />
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
          >Kirish
        </Btn>
        <br />
        <div>Siz ro'yxatdan o'tmaganmisiz?</div>
        <router-link to="/register" class="text-blue-500"
          >Ro'yxatdan o'tish</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import useRequest from "@/api/useRequest";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/counter";
import type { UserData } from "@/types";
import "@/components/Btn.vue";
import Btn from "@/components/Btn.vue";
import User from "@/components/icons/User.vue";
import PassIcon from "@/components/icons/PassIcon.vue";
const form = reactive({
  username: "",
  password: "",
});

const loginRequest = useRequest<UserData>(() => ({
  url: "/auth/login",
  method: "POST",
  data: form,
}));

const router = useRouter();
const auth = useAuth();

const handleSubmit = async () => {
  const response = await loginRequest.fetch();

  if (response?.status === 201) {
    auth.saveLogin(response.data);

    await router.push("/");
  }
};
</script>
