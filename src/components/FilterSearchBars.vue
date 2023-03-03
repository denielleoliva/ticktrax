<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-select
        filled
        v-model="selectedTicks"
        multiple
        use-input
        input-debounce="0"
        label="Tick type"
        :options="tickOptions"
        @filter="filterFn"
        style="width: 285px"
        hint="Filter by tick type"
        clear-icon="close"
        clearable
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-input filled  hint="Filter by date"
               :input-style="{ width: '184px' }"
               :value="dateRangeDisplay" clear-icon="close" clearable @clear="dateRange = ''">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="dateRange" range minimal>
            <div class="row items-center justify-end">
              <q-btn flat color="grey" label="Clear" @click.stop.prevent="dateRange = ''" />
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer"/>
        </template>
      </q-input>

<!--      <q-input v-model="location" filled type="search" hint="Filter by country" />-->

<!--      <q-input v-model="search" filled type="search" hint="Search">-->
<!--        <template v-slot:append>-->
<!--          <q-icon name="search" />-->
<!--        </template>-->
<!--      </q-input>-->

    </div>
  </div>
</template>

<script setup>
import { debounce } from 'quasar';
import {ref, reactive, watch, defineEmits, defineProps, computed} from 'vue';
import {tickCommonNames, tickScientificNames} from "src/vars";


const dateRange = ref('');
const dateRangeDisplay = computed(() => {
  if (typeof dateRange.value === 'object') {
    return `${dateRange.value.from} ${dateRange.value.from || dateRange.value.to ? '-': ''} ${dateRange.value.to}`
  }

  return dateRange.value
})
const search = ref('');
const selectedTicks = ref([]);
const location = ref('');



const emits = defineEmits(['filteredResults']);
const props = defineProps(['filterSettings']);

const tickNames = props.filterSettings.useScientificName ? tickScientificNames: tickCommonNames;

const tickOptions = ref(tickNames);
const countryOptions = ref([]);

const searchPayload = reactive({
  selectedTicks: {tickTypes: selectedTicks, keyName: props.filterSettings.useScientificName? 'scientificName': 'commonName'},
  dateRange: dateRange,
  location: location
});

function filterFn(val, update){
  update(() => {
    tickOptions.value = tickNames;
  })

  update(() => {
    const needle = val.toLowerCase()
    tickOptions.value = tickNames.filter(v => v.toLowerCase().indexOf(needle) > -1)
  })
}

watch(searchPayload, (value)=> {
  //emits('filteredResults', searchPayload);
  console.log(searchPayload)
  debounce(() => {
    emits('filteredResults', searchPayload);
  }, 300)();

})


</script>

<style scoped>

</style>
