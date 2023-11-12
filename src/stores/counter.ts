import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import type { UserData } from "@/types";
import useRequest from "@/api/useRequest";

export const useAuth = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem("token"));
  const userData = ref<UserData | null>(
    JSON.parse(localStorage.getItem("userData") ?? "null")
  );

  const profileRequest = useRequest(() => ({
    url: "/profile",
    method: "GET",
  }));

  // const user = computed<Student | null>(() => profileRequest.data.value);

  watch(
    token,
    async (value) => {
      if (value) {
        await profileRequest.fetch();
      }
    },
    { immediate: true }
  );

  function saveLogin(data: UserData) {
    token.value = data.accessToken;
    userData.value = data;

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("userData", JSON.stringify(data));
  }

  return { saveLogin, token, userData, profileRequest };
});
