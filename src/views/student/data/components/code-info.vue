<template>
  <div class="info-area">
    <el-card style="margin-top:8px;">
      <el-row class="title-row">
        <label class="title-label">编程题测试情况</label>
        <div class="title-divider"></div>
      </el-row>
      <!-- <line-chart></line-chart>
      <pie-chart></pie-chart> -->
      <el-row>
        <p>平均答题正确率{{info.number}}%，最难发现的考点（错误）是{{info.detail}}</p>
        <p>命中问题时长最短的题目是{{info.detail}}，最长的是{{info.detail}}</p>
        <p>解决问题时长最短的题目是{{info.detail}}，最低的是{{info.detail}}</p>
        <p>题目{{info.detail}}中，最纠结的考点是{{info.detail}}</p>
      </el-row>
      <el-row>
        <div class="chart">
          <radar-chart></radar-chart>
        </div>
      </el-row>
      <el-row>
        <div class="chart">
          <line-chart></line-chart>
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import LineBarChart from '../chart/line-bar-chart.vue'
import lineChart from '../chart/line-chart.vue'
import PieChart from '../chart/pie-chart.vue'
import RadarChart from '../chart/radar-chart.vue'

export default {
  components: { lineChart, PieChart, LineBarChart, RadarChart },
  props:[''],
  data() {
    return {
      info:{
        name: "张三",
        number: 100,
        detail:'难点'
      },
      teacherName:""
    }
  },
  methods: {
    getTeacher(teachers) {
      let teacherJSON = JSON.parse(teachers)
      return teacherJSON[0].username
    }
  }
}
</script>

<style scoped>
.info-area {
  margin: 14px;
}
.title-label {
  display: inline-block;
  width: 100%;
  text-align: left;
  font-size: 18px;
}
.title-divider {
  width: 100px;
  height: 2px;
  background-color: #cdcdcd;
  margin: 10px;
  margin-left: 0px;
}
.chart {
  display:inline-block;
  margin:10px;
  padding: 10px;
  border: 1px solid #DCDFE6;
}
.detail {
  text-align: left;
  font-size: 14px;
}
</style>