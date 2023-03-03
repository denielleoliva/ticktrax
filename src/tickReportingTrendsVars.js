import inatjs from "inaturalistjs";
import {Dark} from "quasar";
import {watch} from "vue";
import {lymeDiseaseByGenderChartInputs} from "src/lymeDiseaseByGenderVars";
export async function getTickObservationsHistogramStats() {
  return inatjs
    .observations
    .histogram({
      taxon_id: 51672,
      quality_grade: 'research'
    });
}



let chartInputs = null;

watch(() => Dark.isActive, () => {

});



async function createChartInputs () {
  const observations = await getTickObservationsHistogramStats();
  const monthOfYear = observations.results.month_of_year;

  chartInputs = {
    type: "bar",
    options: {
      chart: {
        id: 'basic-bar',
      },
      fill: {
        colors: ['#5CAB7D']
      },
      tooltip: {
        y: {
          formatter: (value) => value.toLocaleString(),
        },
        theme: 'light'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: {}
        }

      },
      yaxis: {
        labels: {
          style: {

          },
          formatter: (value) => value.toLocaleString(),
        }
      },
      title: {
        text: 'Monthly Distribution of Tick Observations',
        style: {
          fontSize: '12px',
          color: ''
        },
      },
      dataLabels: {
        enabled: false,
      }
    },

    series: [{
      name: 'Tick reports',
      data: Object.values(monthOfYear)
    }]
  };

  return chartInputs;

}

export async function getChartInputs() {
  if (!chartInputs) {
    await createChartInputs();
  }
  const xaxis = chartInputs.options.xaxis;
  chartInputs.options.title.style.color = Dark.isActive ? '#FFFFFF': '';
  chartInputs.options.xaxis.labels.style.colors = xaxis.categories.map(() => Dark.isActive ? '#FFFFFF': '');
  chartInputs.options.yaxis.labels.style.colors = Dark.isActive ? ['#FFFFFF']: [];
  chartInputs.options.tooltip.theme = Dark.isActive ? 'dark': 'light';


  return chartInputs;
}





