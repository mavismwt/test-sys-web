<template>
  <div>
    <el-card class="assign-cell">
      <el-col class="cell">
        <el-row><img src="@/assets/icon/wenjianjia.png" alt="" width="100px" height="100px"></el-row>
        <el-row><span>标题</span></el-row>
        <el-row><span style="font-size:12px">2020.3.20</span></el-row>
      </el-col>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['items']
}
</script>

<style scoped>
.assign-cell {
  width: 160px;
  height: 200px;
}
</style>