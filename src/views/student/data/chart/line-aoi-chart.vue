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
				opinionData: ["3", "2", "4", "4", "7"]
			}
		},
		methods: {
			drawLine(id) {
				this.charts = echarts.init(document.getElementById(id))
				this.charts.setOption({
          title : {
            text: '眼动轨迹图',
            x: 'center'
          },
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
            name: 'Time/Sec',
            min: 0,
            interval:1,
            max: 200,
						boundaryGap: false,
					},
					yAxis: [
            {
						type: 'value',
            name:'Line',
            min: 0,
            interval:5,
            max: 24,
            boundaryGap: false,
            
					},
          {
						type: 'value',
            min: 0,
            interval:1,
            max: 24,
            boundaryGap: false,
            axisLine:{       //y轴
              show:false

            },
            axisTick:{       //y轴刻度线
              show:false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: [
                  "#FFF0F5","#FFF0F5","#FFF0F5","#FFF0F5",
                  "#F0FFF0","#F0FFF0","#F0FFF0","#F0FFF0","#F0FFF0","#F0FFF0","#F0FFF0","#F0FFF0","#F0FFF0","#F0FFF0",
                  "#F0F8FF","#F0F8FF","#F0F8FF","#F0F8FF","#F0F8FF","#F0F8FF","#F0F8FF","#F0F8FF","#F0F8FF","#F0F8FF"
                ]
              }
            }
					},
          ],

					series: [{
            symbol: 'none',
						type: 'line',
						data: [1,1,1,1,4,3,1,2,4,1,1,1,9,8,5,5,6,7,7,8,8,4,10,11,11,11,11,8,9,10,10,6,6,8,8,10,10,10,6,5,5,8,5,6,6,5,5,11,2,8,1,14,14,14,14,11,11,12,14,14,18,14,15,16,13,17,13,11,15,18,22,16,19,15,17,18,18,21,18,18,23,17,17,14,16,17,18,18,21,16,16,6,5,6,21,8,7,8,7,7,8,7,7,7,7,11,6,6,6,9,7,7,7,10,8,8,8,11,12,9,9,9,14,16,21,1,14,1,15,11,15,1,11,11,1,11,11,11,18,17,17,17,17,17,14,12,14,14,14,15,14,14,11,11,21,1,18,1,19,20,22,23,21,23,21,21,23,21,21,23,22,22,22,18,21,21,21,17,23,16,23,15,23,7,14,14,16,14,23,18,22,19,20,22,]
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