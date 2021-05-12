<template>
  <div>
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
    
  }
  
}
</script>