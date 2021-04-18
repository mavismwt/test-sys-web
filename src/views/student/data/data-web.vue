<template>
  <div>
    <el-page-header @back="goBack" content="web">
    </el-page-header>
  </div>
</template>

<script>

export default {
  methods: {
    goBack() {
      console.log('go back')
    }
  }
  
}
</script>