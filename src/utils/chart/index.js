import Vue from 'vue'
import vueChart from 'vue-chartjs'

export const createChart = (chart) => {
  const CAHRT_MAP = {
    'bar-chart': vueChart.Bar,
    'line-chart': vueChart.Line,
    'pie-chart': vueChart.Pie,
    'horizontal-bar-chart': vueChart.HorizontalBar,
    'doughnut-chart': vueChart.Doughnut,
    'polar-area-chart': vueChart.PolarArea,
    'radar-chart': vueChart.Radar,
    'bubble-chart': vueChart.Bubble,
    'scatter-chart': vueChart.Scatter,
  }

  return Vue.component(chart, {
    extends: CAHRT_MAP[chart],
    props: {
      chartData: {
        type: Object,
        default() {
          return {}
        },
      },
      options: {
        type: Object,
        default() {
          return {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              labels: {
                fontColor: '#292931',
              },
            },
          }
        },
      },
    },
    computed: {
      labels() {
        return this.chartData.map((dataItem) => {
          return dataItem.label
        })
      },
      datasets() {
        return this.chartData.map((dataItem) => {
          return dataItem
        })
      },
    },
    watch: {
      chartData() {
        this.render()
      },
    },
    mounted() {
      this.render()
    },
    methods: {
      render() {
        this.renderChart(
          // {
          //   labels: ['a', 'b'],
          //   datasets: [
          //     {
          //       label: '111',
          //       backgroundColor: ['#f8797940', '#ff0000'],
          //       data: [100, 200],
          //     },
          //     {
          //       label: '222',
          //       backgroundColor: ['#ff000050'],
          //       data: [200, 100],
          //     },
          //   ],
          // },
          this.chartData,
          this.options
        )
      },
    },
  })
}
