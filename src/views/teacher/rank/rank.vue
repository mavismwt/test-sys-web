<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="6">班级：
          <el-input placeholder="请输入班级名称" style="width: 180px" v-model="collection" ></el-input>
          <!-- <el-select
            v-model="value"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
        </el-col>
        <el-col :span="6">
          <el-button-group>
            <el-button
              @click="getStudents"
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
        :data="students.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="loading">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="username"
          label="学号"
          sortable
          width="200">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="姓名"
          sortable
          width="200px">
        </el-table-column>
        <el-table-column
          label="班级"
          sortable
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{getCollectionName(scope.row.collection)}}</span>
          </template>
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
          <template slot-scope="scope">
            <el-button @click="getRecord(scope.row.user_id)" type="text" size="small">提交记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="students.length"
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
        <el-table-column fixed="right" label="操作" width="100">
            <el-button @click="recordDetail()" type="text" size="small">更改评分</el-button>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getUserS } from '@/api/login';
  export default {
    data() {
      return {

        students: [],
        collection:"",
        loading: false,
        
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

        queryLoading: false,
        currentPage: 1,
        pageSize: 10,
        multipleSelection: []
      }
      
    },
    mounted() {

    },

    methods: {
      //获取学生列表
      getStudents() {
        if (this.collection != "") {
          getUserS(this.collection,"").then(response => {
            this.loading = true
            if (response.data.code == 200) {
              let resData = response.data.data
              this.students = resData
              this.loading = false
            } else {
              this.loading = false
              this.$message({
                type: 'error',
                message: `${response.data.code} ` + `${response.data.message}`
              });
            }
          })
        } else {
          this.$message("请输入班级名称进行查询")
        }
      },
      //获取班级名称
      getCollectionName(collection) {
        const json = JSON.parse(collection)
        return json[0].collection_name
      },
      //选择一页显示多少行
      handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.currentPage = 1;
          this.pageSize = val;
      },
      //跳转其他页
      handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
      },

      // 选择控制
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
      

      getRecord(user_id) {

      },

      recordDetail(user_id,) {

      }
    }
  }
</script>
