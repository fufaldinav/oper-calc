<template>
  <main>
    <div>
      <div class="md:max-w-[500px]">
        <form action="#" method="POST">
          <div class="shadow sm:overflow-hidden sm:rounded-md">
            <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3 sm:col-span-2">
                  <label
                    for="income"
                    class="block text-sm font-medium text-gray-700"
                    >Выручка</label
                  >
                  <div class="mt-1 rounded-md shadow-sm">
                    <input
                      v-model="income"
                      type="number"
                      name="income"
                      id="income"
                      class="block w-full rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Введите выручку"
                    />
                  </div>
                </div>
                <div class="col-span-3 sm:col-span-2">
                  <label
                    for="cooks"
                    class="block text-sm font-medium text-gray-700"
                    >Количество поваров</label
                  >
                  <div class="mt-1 rounded-md shadow-sm">
                    <input
                      v-model="cooks"
                      type="number"
                      name="cooks"
                      id="cooks"
                      class="block w-full rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Введите кол-во поваров в смене"
                    />
                  </div>
                </div>
                <div class="col-span-3 sm:col-span-2">
                  <label
                    for="hours"
                    class="block text-sm font-medium text-gray-700"
                    >Часы</label
                  >
                  <div class="mt-1 rounded-md shadow-sm">
                    <input
                      v-model="hours"
                      type="number"
                      name="hours"
                      id="hours"
                      class="block w-full rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Введите отработанные часы"
                    />
                  </div>
                </div>
                <div class="col-span-3 sm:col-span-2">
                  <label
                    for="hours"
                    class="block text-sm font-medium text-gray-700"
                    >Роллы дня</label
                  >
                  <div class="mt-1 rounded-md shadow-sm">
                    <input
                      v-model="rollOfDayCount"
                      type="number"
                      name="hours"
                      id="hours"
                      class="block w-full rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Введите кол-во роллов дня"
                    />
                  </div>
                </div>
                <div class="col-span-3 sm:col-span-2">
                  <h3>Коэф: {{ rate }}</h3>
                  <h3>Итого: {{ salary.toFixed(2) }} руб</h3>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';

const MIN_INCOME = 10000;
const RATE_GROW_STEP = 2000;
const RATE_STEP = 0.05;
const HOUR_COST = 153.571;
const ROLL_OF_DAY_PRICE = 10;

const income = ref(0);
const cooks = ref(5);
const hours = ref(14);
const rollOfDayCount = ref(0);

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

const rollOfDayBonus = computed(() => ROLL_OF_DAY_PRICE * rollOfDayCount.value);

const salary = computed(
  () => HOUR_COST * hours.value * rate.value + rollOfDayBonus.value,
);
</script>

<style lang="scss"></style>
