<template>
  <div>
    <el-card class="assign-cell">
      <el-col class="cell">
        <el-row><img src="@/assets/icon/wenjianjia.png" alt="" width="100px" height="100px"></el-row>
        <el-row><span>{{title}}</span></el-row>
        <el-row><span style="font-size:12px">{{date}}</span></el-row>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import { formatDate } from '@/utils/date.js' 

export default {
  props: ['title','date'],
  data() {
    return {
      format:"111",
    }
  },
  methods: {
    formatDate(time) {
      let timeS = Date.parse(time)
      return formatDate(timeS, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>

<style scoped>
.assign-cell {
  width: 160px;
  height: 200px;
}
</style>