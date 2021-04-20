<template>
  <div>
    <el-container :v-loading="loading">
      <el-col>
        <el-page-header @back="goBack" :content="username">
        </el-page-header>
        <info-area :assign="assign"></info-area>
        <doc-info></doc-info>
        <score-info :score="assign.score" :weight="assign.weight"></score-info>
      </el-col>
    </el-container>
  </div>
</template>

<script>
import infoArea from '@/components/info-area.vue'
import { getAssign } from '@/api/assign'
import ScoreInfo from './component/score-info.vue'
import DocInfo from './component/doc-info.vue'

export default {
  components: { infoArea, ScoreInfo, DocInfo },
  data() {
    return {
      //assign_id: this.$route.qeury.assign_id,
      username:"王大虎",
      assign: {
        title:"标题",
        score:"100",
        weight:"100"
        
      },
      loading: true
    }
  },
  mounted() {
    //this.getAssignDetail();
  },
  methods: {
    getAssignDetail() {
      getAssign(this.assign_id).then(response => {
        if (response.data.code == 200) {
          this.assign = response.data.data
          this.loading = false
        } else {
          this.loading = false
          this.$message({
            type: 'error',
            message: `${response.data.code} ` + `${response.data.message}`
          });
        }
      })
    },
    goBack() {
      this.$router.push({path:'/student/assign'})
    }
  }
  
}
</script>

<style scoped>

</style>