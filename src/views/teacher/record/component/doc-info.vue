<template>
  <div class="info-area">
    <el-card style="margin-top:8px;">
      <span class="top-label">文件列表>></span>
      <el-divider style="margin-top:-8px;"></el-divider>
      <el-row>
        <el-col span="3"><doc-cell v-if="record.file_report != null" :title="getName(record.file_report,0)"></doc-cell></el-col>
        <el-col span="3"><doc-cell v-if="record.file_source != null" :title="getName(record.file_source,1)"></doc-cell></el-col>
      </el-row>
      <el-row>
          <el-button type="default">查看文件</el-button>
          <el-button type="primary" @click="downloadFile(record.file_report)">下载文件</el-button>
          <!-- <div name="downloadfile" @click="downloadExcel">下载</div> -->
      </el-row>
    </el-card>
  </div>
</template>

<script>
import docCell from '@/components/doc-cell.vue'
import { download } from '@/api/file'

export default {
  props:['record'],
  components: { docCell },
  data() {
    return {
      file_report:"",
      file_source:"",
    }
  },
  methods: {
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
    downloadFile(path) {
      download(path,this.file_report).then(response => {
        if (response.data != null) {
          this.down(response.data,this.file_report)
        }
      })
    },
    down(data,filename) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
    },
    // downloadExcel() {
    //     let a = document.createElement('a')
    //     a.href ="localhost:8088/download?fileName=本科17级电信第二党支部-同上四史思政大课心得感悟.docx"
    //     a.target="_blank"
    //     a.click();
    // } 
    
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