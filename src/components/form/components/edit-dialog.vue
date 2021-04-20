<template>
  <div>
    <el-dialog title="编辑作业" :visible.sync="dialogFormVisible">
      <el-form :model="form">
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
            <el-form-item label="创建日期" :label-width="formLabelWidth">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                disabled="true">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="截止日期" :label-width="formLabelWidth">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日">
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
        <el-form-item label="源码文件" :label-width="formLabelWidth">
          <el-input v-model="form.file_source"
            type="file"
            accept="image/png, image/jpeg">
          </el-input>
        </el-form-item>
        <el-form-item label="报告文件" :label-width="formLabelWidth">
          <el-input v-model="form.file_report"
            type="file"
            accept="image/png, image/jpeg">
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="得分" :label-width="formLabelWidth">
              <el-input v-model="form.score"
                type="number"
                autocomplete="off"
                placeholder="0~100"
                min="10" 
                max="100"
                disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  props:['assign_id',"dialogFormVisible"],
  data() {
    return {
      form: {
        title: '',
        detail: '',
        teachers: '',
        score: '',
        weight: '',
        date_start: '',
        date_end: '',
        file_source:'',
        file_report:'',
        test_example: ''
      },
      formLabelWidth: '120px',
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        title: [
          {required: true, message: '标题不可为空', trigger: 'blur'}
        ],
        date_end: [
          {required: true, message: '截止日期不可为空', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    onSubmit() {
      this.$emit('isVisible',this.dialogFormVisible);
    }
  }
}
</script>
