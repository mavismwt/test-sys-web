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
          @click="dialogAddVisible = true"
          style="margin-left:10px;float:left;"
          size="small"
          type="primary"
        >新建数据</el-button>
        <el-button
          @click="dialogUploadVisible = true"
          v-loading="deleteLoading"
          style="margin-left:10px;float:left;"
          size="small"
          type="warning"
        >导入数据</el-button>
        
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
            <el-button @click="getUserRecords(scope.row.username)" type="text" size="small">提交记录</el-button>
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
      <el-table :data="records">
        <el-table-column property="date" label="提交时间" width="150"></el-table-column>
        <el-table-column property="title" label="题目" width="150"></el-table-column>
        <el-table-column property="info" label="测试结果" width="150"></el-table-column>
        <el-table-column property="score" label="得分" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="recordDetail(scope.row.assign_id,scope.row.username)" type="text" size="small">更改评分</el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="新建信息" :visible.sync="dialogAddVisible">
      <el-form ref="formData" :model="formData" :rules="rules" v-loading="loading">
        <el-form-item label="学生姓名" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model="formData.nickname"
            autocomplete="off"
            placeholder="请输入学生姓名"
            maxlength="10"
            show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="学号" :label-width="formLabelWidth" prop="username">
          <el-input v-model="formData.username"
            autocomplete="off"
            placeholder="请输入学号"
            maxlength="10"
            show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="身份" :label-width="formLabelWidth" prop="identity">
          <template>
            <el-radio v-model="formData.identity" label="1">学生</el-radio>
            <el-radio v-model="formData.identity" label="2">教师</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="导入信息" :visible.sync="dialogUploadVisible">
      <el-row style="margin-top:20px;" >
        <el-col :span="12">
          <label>学生信息表(.xls.xlsx)</label>
        </el-col>
        <input type="file"
        id="avatar" name="avatar"
        accept=".xlsx,.xls" ref="reportfile" >
      </el-row>
      <el-row style="padding:20px;" >
        <el-button @click="upload" type="success" size="mini" icon="el-icon-upload2" :loading="insertLoading">导入信息</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { importInfo } from '@/api/file'
import { getUserQuery,exportExcelAll,exportExcel,insertUser } from '@/api/login';
import { getUserRecord } from '@/api/record';
  export default {
    data() {
      return {

        students: [],
        records: [],
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
        multipleSelection: [],

        /* 导入 */
        formData:{
        },
        rules: {
          nickname: [
            {required: true, message: '学生姓名不可为空', trigger: 'blur'}
          ],
          username: [
            {required: true, message: '学号不可为空', trigger: 'blur'}
          ],
          identity: [
            {required: true, message: '请选择身份信息',trigger: 'blur'}
          ]
        },
        insertLoading: false,
        dialogAddVisible: false,
        dialogUploadVisible: false,
        /* 导出 */
        allExportBtnLoading: false,
        batchExportBtnLoading: false,
      }
      
    },
    mounted() {

    },

    methods: {
      //获取学生列表
      getStudents() {
        if (this.collection != "") {
          getUserQuery(this.collection,"","student").then(response => {
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
        const json = JSON.parse(collection);
        var str = "";
        for (var i=0; i<json.length; i++) {
          str += json[i].collection_name;
        }
        return str;
      },
      resetQueryList() {
        this.collection = "",
        this.students = []
      },

      //提交记录
      getUserRecords(username){
        this.dialogTableVisible = true
        getUserRecord(username).then(response => {
          if (response.data.code == 200) {
            this.records = response.data.data
          }
        })
      },
      //更改评分
      recordDetail(assign_id,username) {
        this.$router.push({
          path:'/teacher/score',
          query: {
            assign_id: assign_id,
            username: username
          }
        }
        )
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

      //新建用户
      onSubmit() {
        this.$refs.formData.validate((valid) => {
        if (valid) {
          this.insertLoading = true
          if (this.formData.identity == "学生") {
            this.formData.identity = "student"
          } else {
            this.formData.identity = "teacher"
          }
          insertUser(this.formData).then(response => {
            if (response.data.code == 200) {
              this.insertLoading = false
              this.dialogAddVisible = false
              this.$message("新建成功")
            } else {
              this.insertLoading = false
              this.$message({
                type: 'error',
                message:  "新建失败"
              })
            }
          })
        }
        
        
        })
      },

      //表格导入
      upload() {
        this.loading = true;
        let reportfile = this.$refs.reportfile;
        let files = reportfile.files;
        let file = files[0];
        var formData = new FormData();
        formData.append("file", file);
        importInfo(formData).then(response => {
          if (response.data.code == 200) {
            this.loading = false
            this.getStudents()
            this.$message(response.data.data)
            this.dialogUploadVisible = false
          } else {
            this.$message({
              type: 'danger',
              msg:'导入失败，请稍后重试'
            })
          }
        })
      },

      //批量导出
      batchExport() {
        this.batchExportBtnLoading = true;
        var arr = [];
        var user_id = "";
        for (var i = 0; i<this.multipleSelection.length; i ++) {
          arr.push(this.multipleSelection[i].user_id);
        }
        exportExcel(arr).then(response => {
          if (response.data != null) {
            this.downloadFile(response.data,this.collection+'批量')
            this.$message("导出成功")
          } else {
            this.$message({
              type: 'error',
              message:  "未查询到相关数据"
            })
          }
          this.batchExportBtnLoading = false
        })
      },
      

      //导出全部
      exportAll() {
        this.allExportBtnLoading = true
        exportExcelAll(this.collection).then(response => {
          if (response.data != null) {
            this.downloadFile(response.data,this.collection)
            this.$message("导出成功")
          } else {
            this.$message({
              type: 'error',
              message:  "未查询到相关数据"
            })
          }
          this.allExportBtnLoading = false
        })
      },
      downloadFile(data,title) {
        if (!data) {
          return
        }
        const link = document.createElement('a');
        let blob = new Blob([data], {type: 'application/vnd.ms-excel'});
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);

        link.setAttribute('download', title + '成绩表' + '.xls');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    }
  }
</script>
