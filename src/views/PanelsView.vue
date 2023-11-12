<template>
  <BaseLayout>
    <div class="p-4">
      <div class="text-2xl mb-3">Panellar ro'yxati</div>
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
            <tr class="border-b" :key="row.id" v-for="row in panels">
              <td class="px-6 py-4">{{ row.name }}</td>
              <td class="px-6 py-4">{{ row.power }}</td>
              <td class="px-6 py-4">{{ row.status ? "ON" : "OFF" }}</td>

              <td class="px-6 py-3">
                <Switch label="Holat" v-model="row.status" />
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
import { reactive } from "vue";

import Switch from "@/components/Switch.vue";

const panels = reactive([
  {
    id: 1,
    name: "Monocrystalline Solar Panels",
    power: 880,
    status: true,
  },
  {
    id: 2,
    name: "Polycrystalline Solar Panel",
    power: 200,
    status: false,
  },
  {
    id: 3,
    name: "Thin-Film Solar Cells",
    power: 300,
    status: true,
  },
  {
    id: 4,
    name: "Amorphous Silicon Solar Cell",
    power: 400,
    status: false,
  },
  {
    id: 5,
    name: "Biohybrid Solar Cell",
    power: 500,
    status: true,
  },
]);
</script>
<style></style>
