<template>
  <q-page class="q-pa-lg"  :class="$q.dark.isActive ? null : 'bg-green-1'">
<!--    <dashboard-sidebar />-->
    <p class="text-h5 text-weight-medium q-ml-xl q-pt-md">Dashboard</p>
    <div class="parent q-pt-lg q-gutter-lg q-px-xl">
      <div v-for="(card, index) in socialCards" :class="`div${index + 1} `">
        <card-social :item="card" />
      </div>
      <chart-viz  :key="'tickHistogram' + isDarkMode" v-if="chartData"
                  :type="chartData.type" :options="chartData.options"
                  :series="chartData.series" class="div5"   />
<!--      <chart-viz  :key="'tickHistogram' + isDarkMode" v-if="chartData"-->
<!--                  :type="chartData.type" :options="chartData.options"-->
<!--                  :series="chartData.series" class="div6" />-->

      <chart-viz :key="'pieChart' + isDarkMode" type="heatmap" :options="options" :series="options.series"  class="div6" />

      <UserTable :user-data="userData" class="div7 q-pt-lg q-pb-lg" />
    </div>
  </q-page>
</template>

<script>
import {defineComponent,defineAsyncComponent, ref} from 'vue';
import {getTickTypeTrends} from "src/tickReportingTrendsVars";
//import { collection, doc, setDoc } from "firebase/firestore";
import {analytics} from "src/FirebaseInit";
import { logEvent } from "firebase/analytics";

import {getChartInputs, getRecentTickData} from "src/tickReportingTrendsVars";
import ChartViz from "components/ChartViz.vue";
import {Dark} from "quasar";
import {getUsers} from "src/FirebaseInit";

function generateData(count, yrange) {
  let i = 0;
  let series = [];
  while (i < count) {
    let x = (i + 1).toString();
    let y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y
    });
    i++;
  }
  return series;
}

let metrics = [];
const now = new Date();
const startTime = new Date(now.getTime() - 9 * 60 * 60 * 1000);
const interval = 60 * 60 * 1000; // 1 hour
const timestamps = [];

for (let time = startTime.getTime(); time <= now.getTime(); time += interval) {
  const timestamp = new Date(time);
  timestamp.setSeconds(0,0)
  timestamps.push(timestamp);
}

for (let timestamp of timestamps) {
  metrics.push({
    name: `${timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`,
    data: generateData(18, {
      min: 0,
      max: 90
    })
  })
}

const options = {
  series:
    metrics
  ,
  chart: {
    height: 350,
    type: 'heatmap',
  },
  tooltip: {
    y: {
      formatter: (value) => `${value}%`,
    },
  },
  dataLabels: {
    enabled: false
  },
  colors: ["#5CAB7D"],
  title: {
    text: 'Server Load'
  },
};

export default defineComponent({
  name: 'PageIndex',
  components: {
    ChartViz,
    CardSocial: defineAsyncComponent(() => import('components/CardSocial.vue')),
    DashboardSidebar: defineComponent(() => import('components/DashboardSidebar.vue')),
    CardCharts: defineComponent(() => import('components/CardCharts.vue')),
    UserTable: defineComponent(() => import('components/UserTable.vue')),
    // CardCharts: defineAsyncComponent(() => import('components/cards/CardCharts.vue')),
    // TabSocial: defineAsyncComponent(() => import('components/tabs/TabSocial.vue')),
    // CardWithImage: defineAsyncComponent(() => import('components/cards/CardWithImage.vue')),
    // CardTimeLine: defineAsyncComponent(() => import('components/cards/CardTimeLine.vue')),
    // TodoList: defineAsyncComponent(() => import('components/list/TodoList.vue')),
    // TableVisits: defineAsyncComponent(() => import('components/tables/TableVisits.vue')),
  },
  computed: {
    socialCards: function () {
      return [
        {
          title: "Total ticks reported",
          icon: "person",
          value: this.totalTickCount.toLocaleString(),
          tooltipMsg: "The total number of ticks reported.",
          color1: "rgb(92, 171, 125, 0.7)",
          color2: "rgb(92, 171, 125)"
        },
        {
          title: "Recent tick reports",
          icon: "bar_chart",
          value: this.recentTickCount.toLocaleString(),
          tooltipMsg: "The number of ticks reported in the last 24 hours.",
          color1: "rgb(92, 171, 125, 0.7)",
          color2: "rgb(92, 171, 125)"
        },
        {
          title: "Total registered users",
          icon: "people",
          value: this.userCount.toLocaleString(),
          tooltipMsg: "The total number of registered users.",
          color1: "rgb(92, 171, 125, 0.7)",
          color2: "rgb(92, 171, 125)"
        },
        {
          title: "Server availability",
          icon: "public",
          value: "91.26%",
          tooltipMsg: "The percentage of time that the server is fully operational.",
          color1: "rgb(92, 171, 125, 0.7)",
          color2: "rgb(92, 171, 125)"
        }

      ];
    }
  },
  created() {
    logEvent(analytics, 'notification_received');
    getTickTypeTrends().then((page) => {
      console.log(page.results);
    })
    getChartInputs().then((data) => {
      this.chartData = data;
    });

    getUsers().then((blob) => blob.text().then((users) => {
      this.userData = JSON.parse(users);
      this.userCount = this.userData.length;
      this.animateNumber('userCount', 0, this.userCount);
    }));

    getRecentTickData().then((data) => {
      this.recentTickCount = data.results.length;
      this.animateNumber('recentTickCount', 0, this.recentTickCount);
    });

    fetch(this.url)
      .then(res => res.text())
      .then(rep => {
        //Remove additional text and extract only JSON:
        const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
        this.totalTickCount = jsonData.table.rows.length;
        this.animateNumber('totalTickCount', 0, this.totalTickCount);
      });

  },
  methods: {
    animateNumber(variable, startValue, endValue) {
      const duration = 1000; // 2 seconds
      const range = Math.abs(endValue - startValue);
      const increment = (endValue > startValue ? 1 : -1) * range / (duration / 60);
      let current = startValue;
      const animate = () => {
        current += increment;
        if ((endValue > startValue && current >= endValue) || (endValue < startValue && current <= endValue)) {
          this[variable] = endValue;
        } else {
          this[variable] = Math.round(current);
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  },


  setup() {
    logEvent(analytics, 'notification_received');

    const chartData = ref(null);
    const userData = ref([]);
    const userCount = ref(0);
    const recentTickCount = ref(0);
    const totalTickCount = ref(0);

    const sheetId = '1rJaYUmA0Ua26IS6sQsFIQhpTbCdSyxzT9s5W5xXLD7c';
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
    const sheetName = 'Sheet2';
    const query = encodeURIComponent('Select *');
    const url = `${base}&sheet=${sheetName}&tq=${query}`

    return {
      mode: 'list',
      chartData,
      options,

      url,
      userData,
      userCount,
      recentTickCount,
      totalTickCount,
      isDarkMode: Dark.isActive,
      messages: [
        {
          id: 5,
          name: 'Pratik Patel',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
          time: '10:42 PM'
        }, {
          id: 6,
          name: 'Winfield Stapforth',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
          time: '11:17 AM'
        }, {
          id: 1,
          name: 'Boy',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          time: '5:17 AM'
        }, {
          id: 2,
          name: 'Jeff Galbraith',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
          time: '5:17 AM'
        }, {
          id: 3,
          name: 'Razvan Stoenescu',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
          time: '5:17 AM'
        }
      ],
    }
  },
})
</script>
<style lang="sass">
.parent
  display: grid
  grid-template-columns: repeat(4, 1fr)

  grid-column-gap: 0
  grid-row-gap: 0
.div1
  grid-area: 1 / 1 / 2 / 2
.div2
  grid-area: 1 / 2 / 2 / 3
.div3
  grid-area: 1 / 3 / 2 / 4
.div4
  grid-area: 1 / 4 / 2 / 5
.div5
  grid-area: 2 / 1 / 3 / 3
.div6
  grid-area: 2 / 3 / 3 / 5
.div7
  grid-area: 3 / 1 / 4 / 5

</style>
