<template>
  <div>
    <el-container :v-loading="loading">
      <el-col>
        <el-page-header @back="goBack" :content="username">
        </el-page-header>
        <info-area :assign="assign"></info-area>
        <doc-info></doc-info>
        <score-info :score="record.score" :weight="record.weight"></score-info>
      </el-col>
    </el-container>
  </div>
</template>

<script>
import infoArea from '@/components/info-area.vue'
import { getAssign } from '@/api/assign'
import { getSingleRecord } from '@/api/record'
import ScoreInfo from './component/score-info.vue'
import DocInfo from './component/doc-info.vue'

export default {
  components: { infoArea, ScoreInfo, DocInfo },
  data() {
    return {
      assign_id: this.$route.query.assign_id,
      username: this.$route.query.username,
      assign: {},
      record:{},
      loading: true
    }
  },
  mounted() {
    this.getAssignDetail();
    this.getRecord();
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
    getRecord() {
      getSingleRecord(this.username,this.assign_id).then(response => {
        if (response.data.code == 200) {
          this.record = response.data.data
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