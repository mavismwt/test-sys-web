<template>
  <div>
    <el-card>
      <el-row>
        <el-col span="6"> 题目：
          <el-input placeholder="请输入题目标题" style="width: 180px" v-model="title"></el-input>
        </el-col>
        <el-col span="6"> 
          <el-button-group>
            <el-button
              @click="queryList"
              icon="el-icon-search"
              type="primary"
            >查询</el-button>
            <el-button
              @click="resetQueryList"
              icon="el-icon-refresh-right"
              type="default"
            >重置</el-button>
        </el-button-group>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top:12px">
      <el-row>
        <el-button
          @click="showAddPeonyForm"
          style="margin-left:10px;float:left;"
          size="small"
          type="primary"
          v-privilege="'peony-list-add'"
        >新建数据</el-button>
        <el-button
          @click="showBatchDeleteModal"
          style="margin-left:10px;float:left;"
          size="small"
          type="danger"
        >批量删除</el-button>

        <el-button
          :loading="allExportBtnLoading"
          @click="exportAll"
          style="margin-right:10px;float:right;"
          icon="ios-cloud-download-outline"
          size="small"
          type="warning"
        >导出全部</el-button>

        <el-button
          :loading="batchExportBtnLoading"
          @click="batchExport"
          style="margin-right:10px;float:right;"
          icon="ios-download-outline"
          size="small"
          type="warning"
        >批量导出</el-button>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="创建日期"
          sortable
          width="200">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="标题"
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="record"
          label="提交人数"
          sortable
          width="150px">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template>
          <!-- <template slot-scope="scope"> -->
            <!-- <span>{{scope.$index}}</span> -->
            <el-button @click="dialogTableVisible = true" type="text" size="small">提交记录</el-button>
            <el-button @click="dialogFormVisible = true" type="text" size="small">作业详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40"
        style="margin-top: 20px"
        >
      </el-pagination>
      <!-- <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div> -->
    </el-card>
    <el-dialog title="提交记录" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="date" label="提交时间" width="150"></el-table-column>
        <el-table-column property="name" label="提交者" width="150"></el-table-column>
        <el-table-column property="info" label="测试结果" width="150"></el-table-column>
        <el-table-column property="score" label="得分" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
            <el-button @click="recordDetail()" type="text" size="small">更改评分</el-button>
        </el-table-column>
      </el-table>
    </el-dialog>
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
    data() {
      return {
        /* 弹出详情格 */
        gridData: [{
          date: '2021-05-03',
          name: '王小虎',
          info: '通过',
          score: '85'
        }, {
          date: '2021-05-03',
          name: '王小虎',
          info: '通过',
          score: '85'
        }],
        dialogTableVisible: false,
        
        /* 弹出表单 */
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
        dialogFormVisible: false,
        formLabelWidth: '120px',

        /* 表格数据 */
        tableData: [{
          date: '2016-05-03',
          name: '二叉树',
          record: '11/22'
        }, {
          date: '2016-05-02',
          name: '二叉树',
          record: '15/22'
        }, {
          date: '2016-05-04',
          name: '二叉树',
          record: '13/22'
        }, {
          date: '2016-05-01',
          name: '二叉树',
          record: '11/22'
        }, {
          date: '2016-05-08',
          name: '二叉树',
          record: '1/22'
        }],
        multipleSelection: []
      }
      
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(row) {
        console.log(row);
      },
      handleClick(row) {
        console.log(row);
      }
    }
  }
</script>