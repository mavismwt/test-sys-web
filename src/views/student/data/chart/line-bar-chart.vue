<template>
	<!--为echarts准备一个具备大小的容器dom-->
	<div id="line" style="width: 600px;height: 400px;"></div>
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
              selectedMode: true,//可点击
              data: ['答题时长',  '正确率'],
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
              {
                type: 'category',
                data: ['冒泡排序法', '选择排序法', '快速排序法', '堆排序法', '归并排序法','基数排序法'],
                splitLine: {//不显示分割线
                    show: false
                },
                axisLabel: {
                  interval:0,
                  rotate:40
                }
              }

          ],
          yAxis: [
              {
                  type: 'value',
                  name: '答题时长/秒',
                  splitLine: {//显示分割线
                      show: true
                  }
              },
              {
                  type: 'value',
                  name: '正确率',
//	                        axisLabel: {
//	                            formatter: '{value} °C'
//	                        },
                  splitLine: {
                      show: true
                  }
              }
          ],
          series: [
              {
                  name: '答题时长',
                  type: 'bar',
                  data: [350, 360, 890, 750, 750, 950],
                  itemStyle: {
              color:'rgba(132, 136, 211, 1)'
            }
              },
              {
                  name: '正确率',
                  type: 'line',
                  yAxisIndex: 1,//索引从0开始
                  data: [1, 1, 0.75, 0.75, 0.5, 0.2],
                  itemStyle: {
                  color:'rgba(91, 245, 204, 1)'
                  }
              }
          ]
				})
			}
		},
		//调用
		mounted() {
      this.drawLine('line')
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