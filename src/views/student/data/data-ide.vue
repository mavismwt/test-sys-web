<template>
  <div>
    <el-page-header @back="goBack" content="编程测试结果分析">
    </el-page-header>
    <user-info></user-info>
    <code-info></code-info>
  </div>
</template>

<script>
import CodeInfo from './components/code-info.vue'
import userInfo from './components/user-info.vue'

export default {
  components: { userInfo, CodeInfo },
  methods: {
    goBack() {
      this.$router.pop()
    }
  }
  
}
</script>