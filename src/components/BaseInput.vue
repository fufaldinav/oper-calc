<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="form-label inline-block mb-2 text-gray-700"
    >
      {{ label }}
    </label>
    <input
      v-model="inputValue"
      :type="type"
      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      :id="id"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  modelValue?: string | number;
  id?: string;
  type?: string;
  label?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  id: undefined,
  type: 'text',
  label: '',
  placeholder: 'Введите данные',
});

interface Emits {
  (e: 'update:model-value', value: string | number): void;
}

const emit = defineEmits<Emits>();

const prepareNewValue = (value: string) =>
  props.type === 'number' ? Number(value) : value;

const inputValue = computed({
  get: (): string => props.modelValue.toString(),
  set: (value: string): void =>
    emit('update:model-value', prepareNewValue(value)),
});
</script>

<style lang="scss" scoped></style>
