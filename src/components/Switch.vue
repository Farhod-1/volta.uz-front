<template>
  <div class="inline-flex items-center select-none" @click="toggle">
    <label
      class="flex items-center cursor-pointer rounded-full transition-colors duration-300 relative flex-shrink-0"
      :class="{
        'w-8 h-4': size === 'sm',
        'w-10 h-5': size === 'md',
        'w-12 h-6': size === 'lg',
        'cursor-not-allowed opacity-60': disabled,
        'bg-green-500 shadow shadow-green-300': isChecked,
        'bg-gray-300 border-gray-300': !isChecked,
      }"
    >
      <span
        class="block rounded-full bg-white shadow transform transition-transform duration-300 flex-shrink-0"
        :class="{
          'w-3 h-3': size === 'sm',
          'w-4 h-4': size === 'md',
          'w-5 h-5': size === 'lg',
          'translate-x-full ml-1': isChecked,
          'translate-x-0 ml-0.5': !isChecked,
        }"
      ></span>
    </label>
    <span
      class="ml-1"
      :class="{ 'text-sm': size === 'sm', 'text-lg': size === 'lg' }"
      >{{ label }}</span
    >
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { validSizes } from "./SwitchConst";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md",
    validator(value: string): boolean {
      return validSizes.includes(value);
    },
  },
});

const emit = defineEmits(["update:modelValue"]);

const isChecked = computed({
  get() {
    return props.modelValue;
  },

  set(value) {
    emit("update:modelValue", value);
  },
});

function toggle() {
  if (props.disabled) return;

  isChecked.value = !isChecked.value;
}
</script>
