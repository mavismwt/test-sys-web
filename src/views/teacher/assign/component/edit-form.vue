<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" v-loading="loading">
        <el-form-item label="作业标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title"
            autocomplete="off"
            placeholder="请输入作业标题"
            maxlength="20"
            show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="作业详情" :label-width="formLabelWidth">
          <el-input v-model="form.detail"
            type="textarea"
            autocomplete="off"
            placeholder="请输入作业详情"
            :autosize="{ minRows: 3, maxRows: 5}"
            maxlength="200"
            show-word-limit>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="创建日期" :label-width="formLabelWidth" prop="date_start">
              <el-date-picker
                v-model="form.date_start"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                disabled>
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="截止日期" :label-width="formLabelWidth" prop="date_end">
              <el-date-picker
                v-model="form.date_end"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item></el-col>
        </el-row>
        <el-form-item label="测试用例" :label-width="formLabelWidth">
          <el-input v-model="form.test_example"
            type="textarea"
            autocomplete="off"
            placeholder="请输入测试用例"
            :autosize="{ minRows: 3, maxRows: 5}"
            maxlength="200"
            show-word-limit>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="权重" :label-width="formLabelWidth">
              <el-input v-model="form.weight"
                type="number"
                autocomplete="off"
                placeholder="0~100"
                min="10" 
                max="100">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel()">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
  </div>
</template>

<script>
import { updateAssign } from '../../../../api/assign'

export default {
  props:['form'],
  data() {
    return {
      formData: {

      },
      rules: {
        title: [
          {required: true, message: '标题不可为空', trigger: 'blur'}
        ],
        date_start: [
          {required: true, trigger: 'blur'}
        ],
        date_end: [
          {required: true, trigger: 'blur'}
        ]
      },
      formLabelWidth: '120px',
      loading: false
    }
  },
  mounted() {
    
  },
  
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          updateAssign(this.form).then(response => {
            if (response.data.code == 200) {
              this.loading = false
              this.$emit('submit')
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: `请完善信息重新尝试`
          });
        } 
      })
    }
  }
}
</script>
