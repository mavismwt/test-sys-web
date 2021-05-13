<template>
  <div>
    <el-container :v-loading="loading">
      <el-col>
        <el-page-header @back="goBack" :content="username">
        </el-page-header>
        <info-area :assign="assign"></info-area>
        <doc-info :record="record"></doc-info>
        <score-info :score="record.score" :weight="record.weight" @edit="dialogEditVisible = true"></score-info>
      </el-col>
    </el-container>
    <el-dialog title="更改评分" :visible.sync="dialogEditVisible" >
      <el-form ref="formData" :model="formData" :rules="rules">
        <el-form-item label="评分" :label-width="formLabelWidth" prop="score">
          <el-input v-model="formData.score"
            oninput="value=value.replace(/[^\d]/g,'')"
            autocomplete="off"
            placeholder="请输入更改后的评分"
            maxlength="3"
            style="width:360px;">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel()">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import infoArea from '@/components/info-area.vue'
import { getAssign } from '@/api/assign'
import { getSingleRecord,updateScore } from '@/api/record'
import ScoreInfo from './component/score-info.vue'
import DocInfo from './component/doc-info.vue'

export default {
  components: { infoArea, ScoreInfo, DocInfo },
  data() {
    return {
      assign_id: this.$route.query.assign_id,
      username: this.$route.query.username,
      assign: {},
      record: {},
      loading: true,

      formData:{
        score: 0,
      },
      formLabelWidth: '120px',
      dialogEditVisible: false,
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
          this.formData.score = this.record.score
        } else {
          this.loading = false
          this.$message({
            type: 'error',
            message: `${response.data.code} ` + `${response.data.message}`
          });
        }
      })
    },

    onCancel() {
      this.dialogEditVisible = false;
      this.formData.score = this.record.score;
    },

    onSubmit() {
      this.record.score = parseInt(this.formData.score);
      this.dialogEditVisible = false;
      updateScore(this.record).then(response => {
        if (response.data.code == 200) {
          this.$message('更改评分成功')
        } else {
          this.$message({
            type: 'danger',
            msg: '更改评分失败'
          })
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