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
import { upload,importInfo } from '@/api/file'
import { updateReport,updateSource } from '@/api/record'

export default {
  data() {
    return {
      record: {
        assign_id:1,
        username:"",
        title:"",
        date:"",
        weight:100
      },
      reportLoading:false,
      sourceLoading:false
    }
  },
  methods: {
    uploadSource() {
      this.sourceLoading = true
      let sourcefile = this.$refs.sourcefile;
      let files = sourcefile.files;
      let file = files[0];
      let studentId = localStorage.getItem('username');
      var formData = new FormData();
      formData.append("file", file);
      upload(formData,studentId).then(response => {
        if (response.data.code == 200) {
          let path = response.data.data
          this.record.file_source = path
          this.record.date = this.getDate()
          this.record.assign_id = localStorage.getItem('assign_id')
          this.record.title = localStorage.getItem('title')
          this.record.username = studentId
          this.record.nickname = localStorage.getItem('nickname')
          updateSource(this.record).then(res => {
            if (response.data.code == 200) {
              this.sourceLoading = false;
              this.$message("上传源码成功");
            }
          })
        } else {
          this.sourceLoading = false;
          this.$message({
            type: 'danger',
            msg:'上传失败，请稍后重试'
          })
        }
      })
    },
    
    uploadReport() {
      this.reportLoading = true;
      let reportfile = this.$refs.reportfile;
      let files = reportfile.files;
      let file = files[0];
      let studentId = localStorage.getItem('username');
      var formData = new FormData();
      formData.append("file", file);
      upload(formData,studentId).then(response => {
        if (response.data.code == 200) {
          let path = response.data.data
          this.record.file_report = path
          this.record.date = this.getDate()
          updateReport(this.record).then(res => {
            if (response.data.code == 200) {
              this.reportLoading = false;
              this.$message("上传报告成功");
            }
          })
        } else {
          this.reportLoading = false;
          this.$message({
            type: 'danger',
            msg:'上传失败，请稍后重试'
          })
        }
      })
    },
    getDate() {
      var data = new Date();
      var month =data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
      var date = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
      return data.getFullYear() + "-" + month + "-" + date;
    },

  }

}
</script>
