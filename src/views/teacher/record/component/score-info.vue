<template>
  <div class="info-area">
      <el-card style="margin-top:8px;">
          <span class="top-label">得分信息>></span>
          <el-divider style="margin-top:-8px;"></el-divider>
          <el-row>
            <el-col :span="20">
              <label class="title-label">当前得分：</label>
              <label class="score-label">{{score}}</label>
            </el-col>
            <el-col :span="4">
              <el-button type="danger">更改评分</el-button>
              <label class="detail">本题得分权重为：{{weight}}</label>
            </el-col>
          </el-row>
        </el-card>
        
    </div>
</template>

<script>

export default {
  props:['score','weight'],
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
.title-label {
  display: inline-block;
  text-align: left;
  font-size: 24px;
}
.score-label {
  display: inline-block;
  text-align: left;
  font-size: 36px;
  color: #ff0000;
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
  display: inline-block;
  text-align: left;
  font-size: 14px;
  color: #6d6d6d;
}
</style>