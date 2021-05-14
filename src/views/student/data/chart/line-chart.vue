<template>
	<!--为echarts准备一个具备大小的容器dom-->
	<div id="main" style="width: 600px;height: 400px;"></div>
</template>
<script>
	import * as echarts from 'echarts'
	export default {
		name: '',
		data() {
			return {
				charts: '',
			  opinion: ["1", "3", "3", "4", "5"],
				opinionData: ["3", "2", "4", "4", "5"]
			}
		},
		methods: {
			drawLine(id) {
				this.charts = echarts.init(document.getElementById(id))
				this.charts.setOption({
          title : {
            text: '学生答题表现',
          },
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['平均命中错误耗时','平均解决错误耗时']
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
					yAxis: [
            {
              name: '测试表现',
              type: 'value'
            },
            {
              type: 'value'
            }

          ],

					series: [{
						name: '平均命中错误耗时',
						type: 'line',
						stack: '总量',
            smooth: true,
						data: [7,23,97,134,340]
					},
          {
						name: '平均解决错误耗时',
						type: 'line',
						stack: '总量',
            smooth: true,
						data: [524,136,1147,243,546]
					}]
				})
			}
		},
		//调用
		mounted() {
      this.drawLine('main')
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