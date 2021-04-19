<template>
  <div>
    <div class="info-area">
      <el-card style="margin-top:8px;">
        <span class="top-label">详细信息>></span>
        <el-divider style="margin-top:-8px;"></el-divider>
        <el-row class="title-row">
          <label class="title-label">{{assign.title}}</label>
        </el-row>
        <el-row>
          <el-col :span="4">
            <p class="info-left">发布者：{{getTeacher(assign.teachers)}}}</p> 
          </el-col>
          <el-col :span="6">
            <p class="info-right">开放时间：{{assign.date_start}} - {{assign.date_end}}</p>
          </el-col>
        </el-row>
        <el-row>
          <p class="detail">{{assign.detail}}</p>
        </el-row>
      </el-card>
    </div>
    <div class="info-area">
      <el-card style="margin-top:8px;">
        <span class="top-label">文件列表>></span>
        <el-divider style="margin-top:-8px;"></el-divider>
        <el-row>
          <el-col span="3"><doc-cell></doc-cell></el-col>
          <el-col span="3"><doc-cell></doc-cell></el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import docCell from './doc-cell.vue'

export default {
  props:['assign'],
  components: { docCell },
  data() {
    return {
      ass:{

      },
      teacherName:""
    }
  },
  methods: {
    getTeacher(teachers) {
      let teacherJSON = JSON.parse(teachers)
      return teacherJSON[0].username
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
.title-label {
  display: inline-block;
  width: 100%;
  text-align: left;
  font-size: 24px;
}
.info-left {
  text-align: left;
  font-size: 12px;
}
.info-right {
  text-align: left;
  font-size: 12px;
}
.detail {
  text-align: left;
  font-size: 14px;
}
</style>