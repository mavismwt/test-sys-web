<template>
  <div>
    <el-page-header @back="goBack" content="代码阅读测试结果分析">
    </el-page-header>
    <user-info></user-info>
    <web-info></web-info>
  </div>
</template>

<script>
import userInfo from './components/user-info.vue'
import WebInfo from './components/web-info.vue'

export default {
  components: { userInfo, WebInfo },
  methods: {
    goBack() {
      console.log('go back')
    }
  }
  
}
</script>