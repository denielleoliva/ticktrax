<template>
  <div class="q-pa-md q-px-lg q-pt-lg">
    <q-table
      title="Tabular View"
      :data="rows"
      :columns="columns"
      color="primary"
      :row-key="row => row.id"
      :rows-per-page-options="[3,5,10,15,20]"
      :loading="loading"
      :filter="filter"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
<!--            <q-btn size="sm" color="positive" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />-->

            <q-btn size="sm" color="primary" round dense @click="$emit('onLocateClick', [props.row.properties.coordinates.longitude, props.row.properties.coordinates.latitude])" icon="travel_explore" />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >

            <div v-if="col.name !== 'photo_urls'">{{ col.value }}</div>
            <div v-else><q-img class="tickImg"  style="width: 80px" :alt="props.row.properties.commonName" :src="props.row.properties.imageUrls.split(',')[0]" @click="$emit('onImageClick', props.row.properties)" /></div>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-img :src="props.row.properties.imageUrls" />
          <q-td colspan="100%">

            <pre>{{ props.row.properties.imageUrls }}</pre>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>
      <template v-slot:top-left>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    </q-table>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {formatDate, wrapCsvValue} from "src/utils";
import {exportFile} from "quasar";

const props = defineProps(['dataTable', 'loadingState']);

const rows = ref([]);
const loading = ref(false);
const filter = ref('');

loading.value = props.loadingState;

//let columnNames = getColumnNames();

rows.value = props.dataTable;


const columns = [
  {
    name: 'common_name',
    label: 'Tick Type',
    align: 'left',
    field: row => row.properties.commonName,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'observed_on', align: 'left', label: 'Observed On', field: row => row.properties.observedOn, format: val => formatDate(val),  sortable: true, sort: (a,b) => parseDate(a) - parseDate(b) },
  { name: 'location_name', align: 'left',label: 'Location', field: row => row.properties.location, sortable: true },
  { name: 'coordinates', align: 'left', label: 'Coordinates', field: row => `${row.properties.coordinates.latitude}, ${row.properties.coordinates.longitude}` },
  { name: 'photo_urls', align: 'center', label: 'Photo(s)', field: 'photo_urls' },
  // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]



function getColumnNames() {
  return props.dataTable[0].c.map(x => x.v.toString().trim());
}


function cellChecker(row) {
  try {
    return row.properties.v
  } catch (e) {
    return ''
  }
}

function parseDate(date) {
  return new Date(date).getTime();
}

function exportTable () {
  // naive encoding to csv format
  //console.log([ columns.map(col => wrapCsvValue(col.label)) ]);



  const content = [ columns.map(col => wrapCsvValue(col.label)) ].concat(
    rows.value.map(row => columns.map(col => wrapCsvValue(
      typeof col.field === 'function'
        ? col.field(row)
        : row[col.field === void 0 ? col.name : col.field],
      col.format
    )).join(','))
  ).join('\r\n')

  const status = exportFile(
    'tick-observations.csv',
    content,
    'text/csv'
  )

  if (status !== true) {
    this.$q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning'
    })
  }
}

</script>

<style lang="sass" scoped>
.tickImg
  cursor: pointer

</style>
