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
            <p class="info-left">发布者：张老师</p> 
          </el-col>
          <el-col :span="6">
            <p class="info-right">发布时间2020年3月20日</p>
          </el-col>
        </el-row>
        <el-row>
          <p class="detail">很馋的u发i速度分别设计的咖啡杯的健康萨复活精客户端J地方那就放那的减肥哪家的打开后放点辣椒你饭卡神焕发范德萨匡扶汉室打击报复就啊谁都不分开就是大部分空间的身边</p>
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
  components: { docCell },
  data() {
    return {
      assign: {
        title: "标题"
      }
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
  /* margin-top: -8px; */
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
  margin-top: -6px;
  text-align: left;
  font-size: 14px;
}
</style>