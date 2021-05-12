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
          <el-button type="primary" @click="downloadFile(record.report_path)">下载文件</el-button>
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
      if (str == null && str == "") {
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
      download(path).then(response => {
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
        // 获取文件名
        // download 属性定义了下载链接的地址而不是跳转路径
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
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