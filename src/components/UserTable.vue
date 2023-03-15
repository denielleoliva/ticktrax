<template>
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <q-card class="text-grey-8 no-shadow" bordered>
        <q-card-section class="q-pa-none">
          <q-table class="no-shadow"
                   :data="$props.userData"
                   title="Registered Users"
                   :hide-header="mode === 'grid'"
                   :columns="columns"
                   row-key="name"
                   :filter="filter"
                   v-model:pagination="pagination"
          >
            <template v-slot:top-right="props">
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>

              <q-btn
                flat
                round
                dense
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen"
                v-if="mode === 'list'" class="q-px-sm"
              >
                <q-tooltip
                  :disable="$q.platform.is.mobile"
                  v-close-popup
                >{{ props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen' }}
                </q-tooltip>
              </q-btn>

              <q-btn
                color="primary"
                icon-right="archive"
                label="Export to csv"
                no-caps
                @click="exportTable"
              />
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import {exportFile} from 'quasar'
import { ref } from 'vue'
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val
  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)
  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')
  return `"${formatted}"`
}

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    field: 'name',
    align: 'left',
    sortable: true
  },
  {name: 'userName', align: 'left', label: 'User Name', field: 'userName', sortable: true},
  {name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true},
  {
    name: 'ip',
    align: 'right',
    label: 'IP',
    field: 'ip',
    sortable: true
  }
];

export default defineComponent({
  name: 'TableVisits',
  props: {
    userData: Array,
  },
  setup(props) {
    const filter = ref('');
    return {
      filter,
      mode: 'list',
      columns,
      pagination: {
        rowsPerPage: 10
      },
      exportTable() {
        // naive encoding to csv format
        const content = [columns.map(col => wrapCsvValue(col.label))].concat(
          rows.map(row => columns.map(col => wrapCsvValue(
            typeof col.field === 'function'
              ? col.field(row)
              : row[col.field === void 0 ? col.name : col.field],
            col.format
          )).join(','))
        ).join('\r\n')
        const status = exportFile(
          'table-export.csv',
          content,
          'text/csv'
        )
        if (status !== true) {

        }
      }
    }
  },
})
</script>
