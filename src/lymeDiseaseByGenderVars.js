import {Dark} from "quasar";
import {watch, reactive} from "vue";

const lymeDiseaseByGenderData = {
  "2016": {
    "Total": {
      "Female": {
        "No.": 15307,
        "Rate": 9.37
      },
      "Male": {
        "No.": 20567,
        "Rate": 12.99
      },
      "Sex not stated": {
        "No.": 555,
        "Rate": null
      },
      "Total": {
        "No.": 36429
      }
    },
    "Confirmed": {
      "Female": {
        "No.": 10971,
        "Rate": 6.72
      },
      "Male": {
        "No.": 14810,
        "Rate": 9.35
      },
      "Sex not stated": {
        "No.": 422,
        "Rate": null
      },
      "Total": {
        "No.": 26203
      }
    },
    "Probable": {
      "Female": {
        "No.": 4336,
        "Rate": 2.65
      },
      "Male": {
        "No.": 5757,
        "Rate": 3.64
      },
      "Sex not stated": {
        "No.": 133,
        "Rate": null
      },
      "Total": {
        "No.": 10226
      }
    }
  },
  "2017": {
    "Total": {
      "Female": {
        "No.": 17710,
        "Rate": 10.76
      },
      "Male": {
        "No.": 24392,
        "Rate": 15.27
      },
      "Sex not stated": {
        "No.": 641,
        "Rate": null
      },
      "Total": {
        "No.": 42743
      }
    },
    "Confirmed": {
      "Female": {
        "No.": 12152,
        "Rate": 7.38
      },
      "Male": {
        "No.": 16920,
        "Rate": 10.6
      },
      "Sex not stated": {
        "No.": 441,
        "Rate": null
      },
      "Total": {
        "No.": 29513
      }
    },
    "Probable": {
      "Female": {
        "No.": 5558,
        "Rate": 3.38
      },
      "Male": {
        "No.": 7472,
        "Rate": 4.68
      },
      "Sex not stated": {
        "No.": 200,
        "Rate": null
      },
      "Total": {
        "No.": 13230
      }
    }
  },
  "2018": {
    "Total": {
      "Female": {
        "No.": 14048,
        "Rate": 8.5
      },
      "Male": {
        "No.": 19092,
        "Rate": 11.9
      },
      "Sex not stated": {
        "No.": 526,
        "Rate": null
      },
      "Total": {
        "No.": 33666
      }
    },
    "Confirmed": {
      "Female": {
        "No.": 9708,
        "Rate": 5.87
      },
      "Male": {
        "No.": 13346,
        "Rate": 8.32
      },
      "Sex not stated": {
        "No.": 504,
        "Rate": null
      },
      "Total": {
        "No.": 23558
      }
    },
    "Probable": {
      "Female": {
        "No.": 4340,
        "Rate": 2.63
      },
      "Male": {
        "No.": 5746,
        "Rate": 3.58
      },
      "Sex not stated": {
        "No.": 22,
        "Rate": null
      },
      "Total": {
        "No.": 10108
      }
    }
  },
  "2019": {
    "Total": {
      "Female": {
        "No.": 14578,
        "Rate": 8.79
      },
      "Male": {
        "No.": 19612,
        "Rate": 12.19
      },
      "Sex not stated": {
        "No.": 755,
        "Rate": null
      },
      "Total": {
        "No.": 34945
      }
    },
    "Confirmed": {
      "Female": {
        "No.": 9590,
        "Rate": 5.78
      },
      "Male": {
        "No.": 13164,
        "Rate": 8.18
      },
      "Sex not stated": {
        "No.": 699,
        "Rate": null
      },
      "Total": {
        "No.": 23453
      }
    },
    "Probable": {
      "Female": {
        "No.": 4988,
        "Rate": 3.01
      },
      "Male": {
        "No.": 6448,
        "Rate": 4.01
      },
      "Sex not stated": {
        "No.": 56,
        "Rate": null
      },
      "Total": {
        "No.": 11492
      }
    }
  }
};


export const lymeDiseaseByGenderChartInputs = {
    type: "bar",
    options: {
      chart: {
        id: 'two-column-bar',
      },
        fill: {
        colors: ['#5CAB7D', '#D25D3A']
      },
      tooltip: {
        y: {
          formatter: (value) => value.toLocaleString(),
        },
        theme:'light'
      },
      xaxis: {
        categories: Object.keys(lymeDiseaseByGenderData),
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
      legend: {
        labels: {
          colors: ['#5CAB7D', '#D25D3A'],
          useSeriesColors: false
        },
        markers: {
          fillColors: ['#5CAB7D', '#D25D3A'],
        }
      },

      stroke: {
        colors: ['transparent'],
        width: 2,
      },
      title: {
        text: 'Annual reported cases of lyme disease by gender (USA)',
        style: {
          fontSize: '12px',
        },

      },
      dataLabels: {
        enabled: false,
      }
    },

    series: [{
      name: 'Female',
      data: Object.keys(lymeDiseaseByGenderData).map((item) => lymeDiseaseByGenderData[item].Total.Female["No."])
    },
      {
        name: 'Male',
        data: Object.keys(lymeDiseaseByGenderData).map((item) => lymeDiseaseByGenderData[item].Total.Male["No."])
      }

    ]

}

watch(()=> Dark.isActive, (isDarkmode) => {
  lymeDiseaseByGenderChartInputs.options.title.style.color = isDarkmode ? '#FFFFFF': '';
  const xaxis = lymeDiseaseByGenderChartInputs.options.xaxis;
  lymeDiseaseByGenderChartInputs.options.xaxis.labels.style.colors = xaxis.categories.map(() => isDarkmode ? '#FFFFFF': '');
  lymeDiseaseByGenderChartInputs.options.yaxis.labels.style.colors = isDarkmode ? ['#FFFFFF']: [];
  lymeDiseaseByGenderChartInputs.options.tooltip.theme = isDarkmode ? 'dark': 'light';

})

