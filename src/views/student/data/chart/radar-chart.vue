<template>
	<!--为echarts准备一个具备大小的容器dom-->
	<div id="radar" style="width: 600px;height: 400px;"></div>
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
					title : {
            text: '学生综合能力雷达图',
          },
          tooltip : {
            trigger: 'item',
          },
          legend: {
            orient : 'vertical',              //这里主要是标识不同颜色代表不同的同学
            x : 'right',
            y : 'bottom',
            data:['A同学成绩 ', 'B同学成绩 ']
          },

          toolbox: {
            show : true,
            feature : {
              // mark : {show: true},
              // dataView : {show: true, readOnly: false},
              // restore : {show: true},
              saveAsImage : {show: true},
            }
          },
          polar : [
            {
              indicator : [
                { text: '总耗时排名', max: 5.0},    //这里用于设置各轴的参数以及最大值
                { text: '命中错误耗时', max: 5.0},
                { text: '解决错误耗时', max: 5.0},
                { text: '命中正确率', max: 5.0},
                { text: '解决正确率', max: 5.0},
              ]
            }
          ],
          calculable : true,
          series : [
            {
              name: '综合能力',
              type: 'radar',
              data : [
                {
                  value : [3.5, 4.8, 3.2, 4.7, 4.5],
                  name : '张三 '
                },
                // {
                //   value : [4.2, 4.1, 3.9, 3.7, 3.5 ],
                //   name : 'B同学 '
                // }
              ]
            }
          ]
				})
			}
		},
		//调用
		mounted() {
      this.drawLine('radar')
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