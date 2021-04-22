<template>
  <div>
    <el-row>
      <el-col :span="12">
        <label>源码文件(.c.cpp)</label>
      </el-col>
      <input type="file"
       id="avatar" name="avatar"
       accept=".c,.cpp" ref="sourcefile" >
    </el-row>
    <el-row style="padding:20px;" >
      <el-button @click="uploadSource" type="success" size="mini" icon="el-icon-upload2" :loading="sourceLoading">上传源码</el-button>
    </el-row>
    <el-row style="margin-top:20px;" >
      <el-col :span="12">
        <label>报告文件(.doc.docx.pdf)</label>
      </el-col>
      <input type="file"
       id="avatar" name="avatar"
       accept=".doc,.docx,.pdf" ref="reportfile" >
    </el-row>
    <el-row style="padding:20px;" >
      <el-button @click="uploadReport" type="success" size="mini" icon="el-icon-upload2" :loading="reportLoading">上传报告</el-button>
    </el-row>
  </div>
</template>

<script>
import { upload,updateReport } from '@/api/assign'

export default {
  data() {
    return {
      record: {
        assign_id:1,
        username:"U201713327",
        title:"二叉树",
        date:"2020-01-01 00:00",
        weight:100
      },
      reportLoading:false,
      sourceLoading:false
    }
  },
  methods: {
    uploadSource() {
      this.sourceLoading = true

    },
    
    uploadReport() {
      this.reportLoading = true;
      let reportfile = this.$refs.reportfile;
      let files = reportfile.files;
      let file = files[0];
      var formData = new FormData();
      formData.append("file", file);
      upload(formData,this.record,"report").then(response => {
        if (response.data.code == 200) {
          let path = response.data.data
          this.record.file_report = path
          updateReport(this.record).then(res => {
            if (response.data.code == 200) {
              this.reportLoading = false;
              this.$message("上传报告成功");
            }
          })
        }
      })
    }
  }

}
</script>
