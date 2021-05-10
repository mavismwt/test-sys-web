<template>
  <div class="info-area">
    <el-card style="margin-top:8px;">
      <el-row class="title-row">
        <label class="title-label">{{info.name}}</label>
        <div class="title-divider"></div>
      </el-row>
      <el-row>
        <p>进行测试{{info.number}}次</p>
      </el-row>
    </el-card>
  </div>
</template>

<script>

export default {
  props:[''],
  data() {
    return {
      info:{
        name: "张三",
        number: 100,
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
.title-label {
  display: inline-block;
  width: 100%;
  text-align: left;
  font-size: 24px;
}
.title-divider {
  width: 100px;
  height: 2px;
  background-color: #409EFF;
  margin: 10px;
  margin-left: 0px;
}

.detail {
  text-align: left;
  font-size: 14px;
}
</style>