<template>
  <BaseLayout>
    <div class="p-4">
      <div class="text-2xl mb-3">Qurilmalar ro'yxati</div>

      <div>
        <router-link
          class="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to="/adddevice"
        >
          qurilma qo'shish
        </router-link>
      </div>

      <div class="mt-4 rounded-lg bg-white shadow-lg p-2">
        <table class="table-auto border w-full">
          <thead class="border-b font-bold uppercase text-left">
            <tr>
              <th class="px-6 py-4">Turi</th>
              <th class="px-6 py-4">Sarflayotgan Quvvati</th>

              <th class="px-6 py-4">Holati</th>
              <th class="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            <tr class="border-b" :key="row.id" v-for="row in rows">
              <td class="px-6 py-4">{{ row.name }}</td>
              <td class="px-6 py-4">{{ row.power }}</td>
              <td class="px-6 py-4">{{ row.status }}</td>

              <td class="px-6 py-3">
                <DeleteIcon
                  class="cursor-pointer"
                  @click="() => handleDelete(row.id)"
                >
                </DeleteIcon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </BaseLayout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/components/layout/BaseLayout.vue";
import { devices } from "@/api/invoices";
import { computed } from "vue";
import useRequest from "@/api/useRequest";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import { useToast } from "vue-toastification";
import type { Device } from "@/types";

const handleDelete = async (id: number) => {
  const response = await useRequest(() => ({
    url: `/devices/${id}`,
    method: "DELETE",
  })).fetch();
  console.log(response);
  if (response?.status === 200) {
    await devicesRequest.fetch();
    useToast().success("Qurilma o'chirildi");
  } else {
    useToast().error("Error");
  }
};
const devicesRequest = devices();
const rows = computed<Device[]>(() => devicesRequest.data.value);
devicesRequest.fetch();
</script>
<style></style>
