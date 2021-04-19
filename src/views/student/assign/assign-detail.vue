<template>
  <div>
    <el-container :v-loading="loading">
      <el-col>
        <el-page-header @back="goBack" :content="assign.title">
        </el-page-header>
        <el-row>
          <info-area :assign="assign"></info-area>
        </el-row>
        <el-row>
            <el-button type="primary">上传文件</el-button>
            <el-button type="danger">删除文件</el-button>
        </el-row>
      </el-col>
    </el-container>
  </div>
</template>

<script>
import infoArea from './component/info-area.vue'
import { getAssign } from '@/api/assign'

export default {
  components: { infoArea },
  data() {
    return {
      assign_id: this.$router.assign_id,
      assign: {
        
      },
      loading: true
    }
  },
  mounted() {
    this.getAssignDetail();
  },
  methods: {
    getAssignDetail() {
      getAssign(this.assign_id).then(response => {
        if (response.data.code == 200) {
          this.assign = response.data.data
          this.loading = false
        } else {
          this.loading = false
          this.$message({
            type: 'error',
            message: `${response.data.code} ` + `${response.data.message}`
          });
        }
      })
    },
    goBack() {
      this.$router.push({path:'/student/assign'})
    }
  }
  
}
</script>

<style scoped>

</style>
