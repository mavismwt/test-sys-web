<template>
  <div>
    <el-container :v-loading="loading">
      <el-col>
        <el-page-header @back="goBack" :content="assign.title">
        </el-page-header>
        <info-area :assign="assign"></info-area>
        <div class="info-area" >
          <el-card style="margin-top:8px;">
            <span class="top-label">文件列表>></span>
            <el-divider style="margin-top:-8px;"></el-divider>
            <el-row>
              <el-col span="3"><doc-cell v-if="file_source" type="source" :title="getName(file_source,1)"></doc-cell></el-col>
              <el-col span="3"><doc-cell v-if="file_report" type="report" :title="getName(file_report,0)"></doc-cell></el-col>
            </el-row>
            <el-row v-if="isDue(assign.date_end)">
                <el-button type="primary" @click="upload()">上传文件</el-button>
            </el-row>
            <el-row style="font-size:12px;color:#c0c0c0;">支持上传一份源码和一份报告，上传文件会自动覆盖；最大上传50MB文件</el-row>
          </el-card>
        </div>
      </el-col>
    </el-container>

    <el-dialog title="上传文件" :visible.sync="dialogUploadVisible">
      <assign-upload></assign-upload>
    </el-dialog>
  </div>
</template>

<script>
import infoArea from '@/components/info-area.vue'
import { getAssign } from '@/api/assign'
import AssignUpload from './component/assign-upload'
import DocCell from '../../../components/doc-cell.vue'
import { getSingleRecord } from '@/api/record'

export default {
  components: { infoArea, AssignUpload, DocCell },
  data() {
    return {
      assign_id: this.$route.query.assign_id,
      username:localStorage.getItem('username'),
      assign: {
        
      },
      file_report: "",
      file_source: "",
      loading: true,
      dialogUploadVisible:false
    }
  },
  mounted() {
    this.getAssignDetail();
    this.getSingleRecord();
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
      getSingleRecord(this.username,this.assign_id).then(response => {
        if (response.data.code == 200) {
          let resData = response.data.data
          // let report_path = resData.file_report
          // let report_arr = report_path.split("/")
          // let report_name = report_arr[report_arr.length-1] 
          this.file_report = resData.file_report

          let source_path = resData.file_source
          // let source_arr = source_path.split("/")
          // let source_name = source_arr[source_arr.length-1] 
          this.file_source = resData.file_source
          //////
        } else {
          this.loading = false
          this.$message({
            type: 'error',
            message: `${response.data.code} ` + `${response.data.message}`
          });
        }
      })
    },
    upload() {
      this.dialogUploadVisible=true;
      this.$store.commit('setAssignId',this.assign.assign_id);
      this.$store.commit('setTitle',this.assign.title);
    },
    getName(str,type) {
      if (str == null || str == "") {
        return null
      }
      let arr = str.split('/')
      if (arr.length >= 1 && type == 0){
        this.file_report = arr[arr.length-1]
        return this.file_report
      } else if (arr.length >= 1) {
        this.file_source = arr[arr.length-1]
        return this.file_source
      } else {
        return null
      }
    },
    isDue(DateString) {
      const date = Date.parse(DateString)
      if (date > new Date) {
        return true
      } else {
        return false
      }
    },
    goBack() {
      this.$router.push({path:'/student/assign'})
    }
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
