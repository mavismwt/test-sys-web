<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="6"> 题目：
          <el-input placeholder="请输入题目标题" style="width: 180px" v-model="title"></el-input>
        </el-col>
        <el-col :span="6"> 
          <el-button-group>
            <el-button
              @click="getAssign()"
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
          @click="dialogAddVisible = true"
          style="margin-left:10px;float:left;"
          size="small"
          type="primary"
        >新建数据</el-button>
        <el-button
          @click="handleBatchDelete"
          v-loading="deleteLoading"
          style="margin-left:10px;float:left;"
          size="small"
          type="danger"
        >批量删除</el-button>

        <el-button
          :loading="allExportBtnLoading"
          @click="dispatchAssign"
          style="margin-right:10px;float:right;"
          icon="ios-cloud-download-outline"
          size="small"
          type="warning"
        >添加助教</el-button>
        <el-button
          :loading="batchExportBtnLoading"
          @click="batchExport"
          style="margin-right:10px;float:right;"
          icon="ios-download-outline"
          size="small"
          type="warning"
        >分发作业</el-button>
      </el-row>

      <el-table
        ref="multipleTable"
        :data="assign.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="loading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="date_start"
          label="创建日期"
          sortable
          width="200">
        </el-table-column>
        <el-table-column
          prop="title"
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
          <template slot-scope="scope">
            <el-button @click="dialogTableVisible = true" type="text" size="small">提交记录</el-button>
            <el-button @click="handleEdit(scope.row)" type="text" size="small">作业详情</el-button>
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
        :total="assign.length"
        style="margin-top: 20px">
      </el-pagination>
      <!-- <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div> -->
    </el-card>

    <!----查看提交记录弹框----->
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

    <el-dialog title="新建作业" :visible.sync="dialogAddVisible">
      <add-form :formData="defaultInfo" @submitAdd="submitAddAssign" @cancelAdd="dialogAddVisible = false"></add-form>
    </el-dialog>

    <el-dialog title="编辑作业" :visible.sync="dialogFormVisible">
      <edit-form :form="form" @submit="submitUpdateAssign" @cancel="dialogFormVisible = false"></edit-form>
    </el-dialog>

  </div>
</template>

<script>
import { getAssignT,deleteAssign } from '@/api/assign';
import editForm from './component/edit-form.vue';
import { getAssign } from '../../../api/assign';
import AddForm from './component/add-form.vue';

export default {
  components: { editForm,AddForm },
  data() {
    return {

      /* 表格数据 */
      assign: [{}],
      loading: true,
      currentPage: 1,
      pageSize: 10,
      formLabelWidth: '120px',
      title:"",  //查询

      /* 弹出表单(新建) */
      defaultInfo:{},
      dialogAddVisible: false,
     
      /* 弹出表单(编辑) */
      form: {},
      dialogFormVisible: false,

      /* 删除数据 */
      multipleSelection: [],
      deleteLoading: false,

      /* 提交记录 */
      dialogTableVisible: false,
    }
  },
  mounted() {
    this.getAssign();
    this.getTeacher();
  },
  methods: {
    //获取表格
    getAssign() {
      const username = localStorage.getItem('username');
      getAssignT(username,this.title).then(response => {
        if (response.data.code == 200) {
          let resData = response.data.data
          if (resData != null) {
            this.assign = resData
          }
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

    //批量删除
    handleBatchDelete() {
      var arr = [];
      var assign_id = "";
      for (var i = 0; i<this.multipleSelection.length; i ++) {
        arr.push(this.multipleSelection[i].assign_id);
        assign_id = `(`+arr.toLocaleString()+`)`;
      }
      if (assign_id != "") {
        this.deleteLoading = true
        deleteAssign(assign_id).then(response => {
          if (response.data.code == 200 && response.data.data) {
            this.deleteLoading = false;
            this.$message({
              message: "删除成功"
            });
            this.getAssign()
          } else {
            this.deleteLoading = false;
            this.$message({
              type: 'error',
              message: "删除失败"
            });
          }
        })
      }
    },

    //新建数据
    submitAddAssign() {
      this.dialogAddVisible = false;
      this.$message({
        message: `新建成功`
      });
      this.getAssign()
    },

    //新建数据时带上自己的身份信息
    getTeacher() {
      const username = localStorage.getItem('username');
      const user_id = localStorage.getItem('user_id');
      const nickname = localStorage.getItem('nickname');
      const json = [{
        username: username,
        user_id: user_id,
        nickname: nickname
      }]
      this.defaultInfo.teachers = JSON.stringify(json)

      const date = new Date()
      this.defaultInfo.date_start = date
    },


    //修改作业
    submitUpdateAssign() {
      this.dialogFormVisible = false;
      this.$message({
        message: `修改成功`
      });
      this.getAssign()
    },

    //查询题目(重置)
    resetQueryList() {
      this.title = "",
      this.getAssign()
    },

    //分发作业
    

    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
    },
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
      this.dialogFormVisible = true;
      this.form = row;
      console.log(row);
    },
    handleClick(row) {
      console.log(row);
    }
  },

}
</script>