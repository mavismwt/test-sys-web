<template>
  <div>
    <el-form ref="formData" :model="formData" :rules="rules" v-loading="loading">
        <el-form-item label="作业标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="formData.title"
            autocomplete="off"
            placeholder="请输入作业标题"
            maxlength="20"
            show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="作业详情" :label-width="formLabelWidth">
          <el-input v-model="formData.detail"
            type="textarea"
            autocomplete="off"
            placeholder="请输入作业详情"
            :autosize="{ minRows: 3, maxRows: 5}"
            maxlength="200"
            show-word-limit>
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="教师信息" :label-width="formLabelWidth" prop="teachers">
          <el-select
            v-model="formData.teachers"
            filterable
            remote
            reserve-keyword
            placeholder="获取教师信息"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="创建日期" :label-width="formLabelWidth" prop="date_start">
              <el-date-picker
                v-model="formData.date_start"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                disabled>
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="截止日期" :label-width="formLabelWidth" prop="date_end">
              <el-date-picker
                v-model="formData.date_end"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日">
              </el-date-picker>
            </el-form-item></el-col>
        </el-row>
        <el-form-item label="测试用例" :label-width="formLabelWidth">
          <el-input v-model="formData.test_example"
            type="textarea"
            autocomplete="off"
            placeholder="请输入测试用例"
            :autosize="{ minRows: 3, maxRows: 5}"
            maxlength="200"
            show-word-limit>
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="源码文件" :label-width="formLabelWidth">
          <el-input v-model="file_source"
            type="file"
            accept="image/png, image/jpeg">
          </el-input>
        </el-form-item>
        <el-form-item label="报告文件" :label-width="formLabelWidth">
          <el-input v-model="form.file_report"
            type="file"
            accept="image/png, image/jpeg">
          </el-input>
        </el-form-item> -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="得分" :label-width="formLabelWidth">
              <el-input v-model="formData.score"
                type="number"
                autocomplete="off"
                placeholder="0~100"
                min="10" 
                max="100"
                disabled>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权重" :label-width="formLabelWidth">
              <el-input v-model="formData.weight"
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
import { addAssign } from '../../../../api/assign'

export default {
  props:['formData'],
  data() {
    return {
      // formData: {
      //   date_start: "2021-02-09 00:00",
      //   teachers:""
      // },
      rules: {
        title: [
          {required: true, message: '标题不可为空', trigger: 'blur'}
        ],
        teachers: [
          {required: true, message: '教师信息不可为空', trigger: 'blur'}
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
      this.$emit('cancelAdd')
    },
    onSubmit() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.loading = true
          addAssign(this.formData).then(response => {
            if (response.data.code == 200) {
              this.loading = false
              this.$emit('submitAdd')
            } else {
              this.loading = false
              this.$message({
                type: 'error',
                message: `新建失败`
              });
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