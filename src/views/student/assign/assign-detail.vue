<template>
  <div>
    <el-page-header @back="goBack" :content="assign.title">
    </el-page-header>
    <el-row>
      <info-area></info-area>
    </el-row>
    <el-row>
      <span>
        <el-button type="primary">上传文件</el-button>
        <el-button type="danger">删除文件</el-button>
      </span>
    </el-row>
  </div>
</template>

<script>
import infoArea from './component/info-area.vue'

export default {
  components: { infoArea },
  data() {
    return {
      assign: {
        title: "标题"
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push({path:'/student/assign'})
    }
  }
  
}
</script>

<style scoped>

</style>
