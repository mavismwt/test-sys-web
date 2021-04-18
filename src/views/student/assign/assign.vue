<template>
  <div>
    <div class="info-area">
      <el-card style="height:44px">
      <span class="top-label">开放中>></span>
      </el-card>
        <el-row style="margin-top:12px;">
          <el-col :span="4" @click.native="detail()"><assign-cell></assign-cell></el-col>
        </el-row>
    </div>
    <div class="info-area">
      <el-card style="height:44px">
      <span class="top-label">已过期>></span>
      </el-card>
        <el-row style="margin-top:12px;">
          <el-col :span="4" @click.native="detail()"><assign-cell></assign-cell></el-col>
        </el-row>
    </div>
    
  </div>
</template>

<script>
import assignCell from './component/assign-cell.vue'

export default {
  components: { assignCell },
  name: 'Assign',
  data() {
    return {
      activeNames: ['1'],
      items:[{
        title:"标题1",
        date:"2020.3.20"
      },
      {
        title:"标题2",
        date:"2020.3.22"
      }
      ]
    }
  },
  methods: {
    detail() {
      this.$router.push({path:'/student/assign/detail'})
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
  margin-top: -8px;
}
.sec {
  top: 40px;
}
</style>
