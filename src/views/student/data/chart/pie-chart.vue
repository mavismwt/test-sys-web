<template>
	<!--为echarts准备一个具备大小的容器dom-->
	<div id="pie" style="width: 400px;height: 400px;"></div>
</template>
<script>
	import * as echarts from 'echarts'
	export default {
		name: '',
		data() {
        return {                                     
            chartPie: null
        }
    },
		methods: {
			drawPie(id) {
				this.charts = echarts.init(document.getElementById(id))
				this.charts.setOption({
					title: {
              text: '注视时长',
              x: 'center'
          },
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              right: 'right',
              top: 20,
              data: ['func1()', 'func2()', 'func3()', 'func4()', 'func5()']
          },
          series: [
              {
                name: '注视时长',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: 'func1()' },
                    { value: 310, name: 'func2()' },
                    { value: 234, name: 'func3()' },
                    { value: 135, name: 'func4()' },
                    { value: 548, name: 'func5()' }
                ],
                itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                },
                label: {
                  show: false,
                }
              }
          ]
				})
			}

		},
		//调用
		mounted() {
      this.drawPie('pie')
			// this.$nextTick(function() {
			// 	this.drawPie('pie')
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