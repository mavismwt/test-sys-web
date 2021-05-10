<template>
	<!--为echarts准备一个具备大小的容器dom-->
	<div id="aoi" style="width: 600px;height: 400px;"></div>
</template>
<script>
	import * as echarts from 'echarts'
	export default {
		name: '',
		data() {
			return {
				charts: '',
			/*	opinion: ["1", "3", "3", "4", "5"],*/
				opinionData: ["3", "2", "4", "4", "5"]
			}
		},
		methods: {
			drawLine(id) {
				this.charts = echarts.init(document.getElementById(id))
				this.charts.setOption({
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['近七日收益']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},

					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
					  data: ["1","2","3","4","5"]
					},
					yAxis: {
						type: 'value',
            boundaryGap: false,
            splitArea: {
              show: true,
              areaStyle: {
                color: [
                  "#F0FFF0",
                  "#F0FFF0",
                  "#F0FFF0",
                  "#F0FFF0",
                  "#FFF0F5"
                ]
              }
            }
					},

					series: [{
						name: '近七日收益',
						type: 'line',
						stack: '总量',
						data: this.opinionData
					}]
				})
			}
		},
		//调用
		mounted() {
      this.drawLine('aoi')
			// this.$nextTick(function() {
			// 	this.drawLine('main')
			// })
		}
	}
</script>
<style scoped>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>