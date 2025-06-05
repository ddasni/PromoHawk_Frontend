<script lang="ts" setup>
interface AreaChartItem {
  month: string
  desktop: number
}

const categories: Record<string, BulletLegendItemInterface> = {
  desktop: { name: 'Desktop', color: '#22c55e' },
}

const AreaChartData: AreaChartItem[] = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
]

const xFormatter = (i: number): string | number => `${AreaChartData[i]?.month}`
</script>
<template>
  <AreaChart
    :data="AreaChartData"
    :height="275"
    x-label="Month"
    :categories="categories"
    :y-num-ticks="4"
    :x-num-ticks="7"
    :y-grid-line="true"
    :legend-position="LegendPosition.Top"
    :x-formatter="xFormatter"
  />
</template>