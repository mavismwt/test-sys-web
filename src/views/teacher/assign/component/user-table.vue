<template>
  <div>
    <el-row>
      <el-col :span="8">班级：
        <el-input placeholder="请输入班级名称" style="width: 180px" v-model="queryData.collection" ></el-input>
      </el-col>
      <el-col :span="8">姓名：
        <el-input placeholder="请输入姓名" style="width: 180px" v-model="queryData.nickname" ></el-input>
      </el-col>
      <el-col :span="8">
        <el-button-group>
          <el-button
            @click="getUsers(queryData.collection,queryData.nickname,queryData.identity)"
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
    <el-table
      ref="multipleTable"
      :data="users"
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
        width="200">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="姓名"
        width="200px">
      </el-table-column>
      <el-table-column
        label="班级"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{getCollectionName(scope.row.collection)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer" style="margin-top:16px;">
      <el-button @click="onCancel()">取 消</el-button>
      <el-button type="primary" @click="onSubmit(queryData.identity)">确 定</el-button>
    </div>

  </div>
</template>

<script>
import { getUserQuery } from '@/api/login';
import { updateAssign,updateAssignTeacher,updateAssignStudent } from '../../../../api/assign';

  export default {
    props:['queryData'],
    data() {
      return {

        users: [],
        nickname:"",
        collection:"",
        identity:"",

        loading: false,
        
        multipleSelection: []
      }
      
    },
    mounted() {

    },

    methods: {
      //获取学生列表
      getUsers(collection,nickname,identity) {
        if (collection != "" || nickname != "" ) {
          getUserQuery(collection,nickname,identity).then(response => {
            this.loading = true
            if (response.data.code == 200) {
              let resData = response.data.data
              this.users = resData
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
          this.$message("请输入班级或姓名进行查询")
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
        this.users = []
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

      onCancel() {
        this.$emit('cancel')
      },

      onSubmit(identity) {        
        if (identity == 'student') {
          var arr = []
          if (this.multipleSelection.length >= 1) {
            for (var i=0; i<this.multipleSelection.length; i++) {
              arr.push(this.multipleSelection[i].username)
            }
            var assign = {
              assign_id:1,
              students: arr.join("")
            }
            updateAssignStudent(assign).then(response => {

            })
          } else {
            this.$message('请选择数据')
          }
          
          
        }
        if (identity == 'teacher') {
          var arr = [];
          var username = localStorage.getItem('username');
          // info['user_id'] = localStorage.getItem('username');
          // info['nickname'] = localStorage.getItem('nickname');
          // arr.push(info);
          if (this.multipleSelection.length >= 1) {
            for (var i=0; i<this.multipleSelection.length; i++) {
              let str = this.multipleSelection[i].username
              if (str == username ){
                continue;
              }
              arr.push()
            }
            var assign = {
              assign_id:1,
              teachers: JSON.stringify(arr)
            }
            updateAssignTeacher(assign).then(response => {

            })
          } else {
            this.$message('请选择数据')
          }
          
          
        }
        this.$emit('submit')
      },
      

      getRecord(user_id) {

      },

      recordDetail(user_id,) {

      }
    }
  }
</script>