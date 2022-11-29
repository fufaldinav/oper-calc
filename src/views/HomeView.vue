<template>
  <main>
    <div class="md:tw-max-w-[500px]">
      <form action="#" method="POST">
        <div class="tw-shadow sm:tw-overflow-hidden sm:tw-rounded-md">
          <div class="tw-space-y-6 tw-bg-white tw-px-4 tw-py-5 sm:tw-p-6">
            <div class="tw-flex tw-flex-col tw-gap-6">
              <q-input
                v-for="field in form"
                :key="field.id"
                v-model="field.value.value"
                type="number"
                :label="field.label"
              />
              <div>
                <h3 class="tw-text-xl">Коэф: {{ rate }}</h3>
                <h3 class="tw-text-xl">Итого: {{ salary.toFixed(2) }} руб</h3>
              </div>
            </div>
          </div>
        </div>
      </form>
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          icon="perm_identity"
          label="Настройки"
        >
          <div class="tw-space-y-6 tw-bg-white tw-px-4 tw-py-5 sm:tw-p-6">
            <div class="tw-flex tw-flex-col tw-gap-6">
              <q-input
                v-for="field in settings"
                :key="field.id"
                v-model="field.value.value"
                type="number"
                :label="field.label"
              />
            </div>
          </div>
        </q-expansion-item>
      </q-list>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const MIN_INCOME = 10000;
const RATE_GROW_STEP = 2000;
const RATE_STEP = 0.05;

const hourCost = ref(160.714286);
const rollOfDayPrice = ref(10);

const settings = [
  {
    id: 'hourCost',
    type: 'number',
    label: 'Стоимость часа',
    value: hourCost,
  },
  {
    id: 'rollOfDayPrice',
    type: 'number',
    label: 'Цена ролла дня',
    value: rollOfDayPrice,
  },
];

const income = ref(0);
const cooks = ref(5);
const hours = ref(14);
const rollOfDayCount = ref(0);

const form = [
  {
    id: 'income',
    type: 'number',
    label: 'Выручка',
    value: income,
  },
  {
    id: 'cooks',
    type: 'number',
    label: 'Количество поваров',
    value: cooks,
  },
  {
    id: 'hours',
    type: 'number',
    label: 'Часы',
    value: hours,
  },
  {
    id: 'roll-of-the-day',
    type: 'number',
    label: 'Роллы дня',
    value: rollOfDayCount,
  },
];

const rate = computed(() => {
  if (!cooks.value) {
    return 0;
  }
  const perCook = income.value / cooks.value;

  if (perCook < MIN_INCOME) {
    return 1;
  }

  return (
    Math.floor((perCook - MIN_INCOME) / RATE_GROW_STEP) * RATE_STEP +
    RATE_STEP +
    1
  );
});

const rollOfDayBonus = computed(
  () => rollOfDayPrice.value * rollOfDayCount.value,
);

const salary = computed(
  () => hourCost.value * hours.value * rate.value + rollOfDayBonus.value,
);
</script>

<style lang="scss"></style>
