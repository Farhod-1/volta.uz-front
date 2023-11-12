<template>
  <BaseLayout>
    <div class="p-4">
      <div>
        <div
          class="relative flex flex-col justify-center m-5 p-2 overflow-hidden"
        >
          <div
            class="w-full p-3 m-auto bg-white rounded shadow-lg ring-2 ring-blue-800/50 lg:max-w-md"
          >
            <h1 class="text-3xl font-semibold text-center text-primary">
              Qurilma qo'shish
            </h1>

            <form class="mt-3">
              <div>
                <label class="block text-sm text-gray-800">Turi</label>
                <select
                  v-model="form.name"
                  type="text"
                  required
                  class="block w-full px-4 py-2 mt-1 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="Muzlatgich">Muzlatgich</option>
                  <option value="Konditsioner">Konditsioner</option>
                  <option value="Televizor">Televizor</option>
                  <option value="Komp'yuter">Komp'yuter</option>
                  <option value="Led Lampa">Led Lampa</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Mikrovolnovka">Mikrovolnovka</option>
                  <option value="Plita">Plita</option>
                  <option value="Elektr choynak">Elektr choynak</option>
                  <option value="Kofemashina">Kofemashina</option>
                </select>
              </div>
              <div class="mt-3">
                <div>
                  <label class="block text-sm text-gray-800"
                    >Sarflayotgan Quvvati</label
                  >
                  <input
                    v-model="form.power"
                    type="number"
                    required
                    class="block w-full px-4 py-2 mt-1 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>
              <div class="mt-3">
                <div>
                  <label class="block text-sm text-gray-800">Holati</label>
                  <select
                    v-model="form.status"
                    type="text"
                    class="block w-full px-4 py-2 mt-1 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  >
                    <option value="ON">ON</option>
                    <option value="OFF">OFF</option>
                  </select>
                </div>
              </div>

              <div class="mt-6">
                <button
                  type="submit"
                  @click="
                    (e) => {
                      e.preventDefault();
                      handleSubmit();
                    }
                  "
                  class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="text-2xl mb-3">Qurilmalar ro'yxati</div>
      <div class="rounded-lg bg-white shadow-lg p-2">
        <table class="table-auto border w-full">
          <thead class="border-b font-bold uppercase text-left">
            <tr>
              <th class="px-6 py-2">Turi</th>
              <th class="px-6 py-2">Sarflayotgan Quvvati</th>
              <th class="px-6 py-2">Holati</th>
              <th class="px-6 py-2"></th>
            </tr>
          </thead>

          <tbody>
            <tr class="border-b" :key="row.id" v-for="row in rows">
              <td class="px-6 py-3">{{ row.name }}</td>
              <td class="px-6 py-3">{{ row.power }}watt</td>
              <td class="px-6 py-3">{{ row.status }}</td>
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
import { reactive } from "vue";
import useRequest from "@/api/useRequest";
import { useToast } from "vue-toastification";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import type { Device } from "@/types";

const form = reactive({
  name: "",
  power: "",
  status: "",
});

const handleDelete = async (id: number) => {
  const response = await useRequest(() => ({
    url: `/devices/${id}`,
    method: "DELETE",
  })).fetch();
  console.log(response);
  if (response?.status === 200) {
    await DevicesRequest.fetch();
    useToast().success("Qurilma o'chirildi");
  } else {
    useToast().error("Error");
  }
};

const AddingRequest = useRequest<Device>(() => ({
  url: "/devices/add",
  method: "POST",
  data: form,
}));

const handleSubmit = async () => {
  console.log(form);
  if (form.name != "" && form.power != "" && form.status != "") {
    const response = await AddingRequest.fetch();

    if (response?.status === 201) {
      await DevicesRequest.fetch();

      form.name = "";
      form.power = "";
      form.status = "";
      useToast().success("Qurilma qo'shildi");
    }
  } else {
    useToast().error("Barcha maydonlarni to'ldiring");
  }
};

const DevicesRequest = devices();
const rows = computed<Device[]>(() => DevicesRequest.data.value);

DevicesRequest.fetch();
</script>
