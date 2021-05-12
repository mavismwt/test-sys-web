<template>
  <div>
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
    
  }
  
}
</script>