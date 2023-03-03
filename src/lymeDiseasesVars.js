import {Dark} from "quasar";
import {watch} from "vue";
import {lymeDiseaseByGenderChartInputs} from "src/lymeDiseaseByGenderVars";
export const lymeCases = [
  {
    "YEAR": "00",
    "CASES": 17570
  },
  {
    "YEAR": "01",
    "CASES": 16864
  },
  {
    "YEAR": "02",
    "CASES": 23466
  },
  {
    "YEAR": "03",
    "CASES": 21183
  },
  {
    "YEAR": "04",
    "CASES": 19665
  },
  {
    "YEAR": "05",
    "CASES": 23174
  },
  {
    "YEAR": "06",
    "CASES": 19848
  },
  {
    "YEAR": "07",
    "CASES": 26442
  },
  {
    "YEAR": "08",
    "CASES": 32819
  },
  {
    "YEAR": "09",
    "CASES": 36105
  },
  {
    "YEAR": "10",
    "CASES": 27737
  },
  {
    "YEAR": "11",
    "CASES": 31007
  },
  {
    "YEAR": "12",
    "CASES": 28748
  },
  {
    "YEAR": "13",
    "CASES": 35072
  },
  {
    "YEAR": "14",
    "CASES": 33052
  },
  {
    "YEAR": "15",
    "CASES": 37583
  },
  {
    "YEAR": "16",
    "CASES": 36006
  },
  {
    "YEAR": "17",
    "CASES": 42321
  },
  {
    "YEAR": "18",
    "CASES": 33360
  },
  {
    "YEAR": "19",
    "CASES": 34383
  }
];
export const lymeCasesOptions = {
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    colors: ['#1B4942'],
  },
  tooltip: {
    y: {
      formatter: (value) => value.toLocaleString(),
    },
    x: {

      formatter: (value) => '20' + value.toString().padStart(2, '0'),
    },
    marker: {
      show: false,
    },
    theme: 'light'
  },
  stroke: {
    curve: 'straight',
    colors: ['#5CAB7D']
  },
  title: {
    text: 'Reported Lyme Disease Cases from 2000-2019 (USA)',
    style: {
      fontSize: '12px',
    },
    align: 'left'
  },
  grid: {
    row: {
     // colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  xaxis: {
    categories: lymeCases.map((x) => x.YEAR),
    labels: {
      style: {

      }
    }

  },
  yaxis: {
    labels: {
      style: {

      },
      formatter: (value) => value.toLocaleString(),
    }
  },
};

export const lymeCasesSeries = [{
  name: "Cases",
  data: lymeCases.map((x) => x.CASES)
}];

watch(()=> Dark.isActive, (isDarkmode) => {
  lymeCasesOptions.title.style.color = isDarkmode ? '#FFFFFF': '';
  const xaxis = lymeCasesOptions.xaxis;
  lymeCasesOptions.xaxis.labels.style.colors = xaxis.categories.map(() => isDarkmode ? '#FFFFFF': '');
  lymeCasesOptions.yaxis.labels.style.colors = isDarkmode ? ['#FFFFFF']: [];
  lymeCasesOptions.tooltip.theme = isDarkmode ? 'dark': 'light';

})



