<template>
  <div>
    <pie-chart :chart-data="chartData"></pie-chart>
  </div>
</template>

<script>
import { createChart } from '@/utils/chart'
import { mapGetters } from 'vuex'

export default {
  components: {
    'pie-chart': createChart('pie-chart'),
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['eventsTimeSizes']),
    chartData() {
      return {
        labels: Object.keys(this.eventsTimeSizes),
        datasets: [
          {
            backgroundColor: ['#f8797940'],
            data: Object.values(this.eventsTimeSizes),
          },
        ],
      }
    },
  },
}
</script>

<style></style>
