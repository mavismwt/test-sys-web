<template>
  <div>
    <el-page-header @back="goBack" content="ide">
    </el-page-header>
  </div>
</template>

<script>

export default {
  methods: {
    goBack() {
      this.$router.pop()
    }
  }
  
}
</script>