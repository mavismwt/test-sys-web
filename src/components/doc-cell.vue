<template>
  <div class="assign-cell">
    <!-- <el-card > -->
      <el-col class="cell">
        <el-row><img src="@/assets/icon/wenjianjia.png" alt="" width="80px" height="80px"></el-row>
        <el-row><span style="font-size:14px;">{{title}}</span></el-row>
        <!-- <el-row><span style="font-size:12px">2020.3.20</span></el-row> -->
      </el-col>
    <!-- </el-card> -->
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      icon_type:""
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.assign-cell {
  width: 120px;
  height: 120px;
  /* border: 1px solid #f0f0f0;
  border-radius: 2px; */
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) */
}
</style>