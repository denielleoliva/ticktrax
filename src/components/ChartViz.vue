<template>
  <q-card class="my-card">
    <q-card-section>
      <VueApexCharts  :type="type" :options="options" :series="series"></VueApexCharts>
    </q-card-section>
  </q-card>
</template>

<script setup>
import {defineProps} from 'vue';
import VueApexCharts from 'vue-apexcharts';
const props = defineProps(['options', 'series', 'type']);

</script>

<style scoped>

</style>

