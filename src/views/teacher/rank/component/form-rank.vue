<template>
  <div>
    <el-card>
      <el-row>
        <el-col span="6">班级：
          <el-input placeholder="请输入班级名称" style="width: 180px" v-model="group" ></el-input>
        </el-col>
        <el-col span="6">姓名：
          <el-input placeholder="请输入学生姓名" style="width: 180px" v-model="username" ></el-input>
        </el-col>
        <el-col span="6">学号：
          <el-input placeholder="请输入学生学号" style="width: 180px" v-model="number" ></el-input>
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
          prop="number"
          label="学号"
          sortable
          width="200">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          sortable
          width="200px">
        </el-table-column>
        <el-table-column
          prop="group"
          label="班级"
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="score"
          label="得分"
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
    <el-dialog title="得分记录" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="date" label="提交时间" width="150"></el-table-column>
        <el-table-column property="name" label="题目" width="150"></el-table-column>
        <el-table-column property="info" label="测试结果" width="150"></el-table-column>
        <el-table-column property="score" label="得分" width="100"></el-table-column>
        <el-table-column label="操作" width="100">
            <el-button @click="recordDetail()" type="text" size="small">更改评分</el-button>
        </el-table-column>
      </el-table>
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
          name: '二叉树',
          info: '通过',
          score: '85'
        }, {
          date: '2021-05-03',
          name: '二叉树',
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
          number: 'U201713327',
          username: '王小虎',
          group:'电信1704',
          score: '85'
        },
        {
          number: 'U201713327',
          username: '王小虎',
          group:'电信1704',
          score: '85'
        },
        {
          number: 'U201713327',
          username: '王小虎',
          group:'电信1704',
          score: '85'
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
      },
      recordDetail() {

      }
    }
  }
</script>