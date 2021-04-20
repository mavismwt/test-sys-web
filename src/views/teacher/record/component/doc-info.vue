<template>
  <div class="info-area">
    <el-card style="margin-top:8px;">
      <span class="top-label">文件列表>></span>
      <el-divider style="margin-top:-8px;"></el-divider>
      <el-row>
        <el-col span="3"><doc-cell></doc-cell></el-col>
        <el-col span="3"><doc-cell></doc-cell></el-col>
      </el-row>
      <el-row>
          <el-button type="primary">上传文件</el-button>
          <el-button type="danger">删除文件</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import docCell from '@/components/doc-cell.vue'


export default {
  components: { docCell },
  data() {
    return {

    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.info-area {
  margin: 14px;
}
.top-label {
  font-size:14px;
  text-align:left;
  display:block;
  height: 14px;
}

</style>