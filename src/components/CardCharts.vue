<template>
  <div class="row align-items-stretch justify-start q-pt-lg q-gutter-sm q-pl-xl" >
    <div>
  <chart-viz  :key="'tickHistogram' + isDarkMode" v-if="chartData" :type="chartData.type" :options="chartData.options" :series="chartData.series" style="width: 480px !important;" />

    </div>

  </div>
</template>

<script>
import ChartViz from "components/ChartViz.vue";
import {Dark} from "quasar";
import {getChartInputs} from "src/tickReportingTrendsVars";

export default {
  name: "cardCharts",
  data () {
    return {
      isDarkMode: Dark.isActive,
      chartData: null,
    };
  },
  created() {
   getChartInputs().then((data) => {
     this.chartData = data;
   })
  },
  components: {ChartViz}
}
</script>

<style scoped>

</style>
