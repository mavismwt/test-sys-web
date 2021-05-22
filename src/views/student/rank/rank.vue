<template>
  <div>
    <el-row class="top-label">
      <label class="title-label">当前总得分为 </label>
      <label class="score-label">{{score}}</label>
      <label class="title-label"> 分 </label>
      <!-- <label class="title-label">当前排名第 </label>
      <label class="rank-label">1</label>
      <label class="title-label"> 位</label> -->
    </el-row>
    <el-card style="margin-top:12px">
      <el-table
        ref="multipleTable"
        :data="assign.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loading">
        <el-table-column
          prop="date"
          label="提交日期"
          sortable
          width="150">
        </el-table-column>
        <el-table-column
          prop="title"
          label="作业标题"
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="info"
          label="状态"
          sortable
          width="150">
        </el-table-column>
        <el-table-column
          prop="score"
          label="得分"
          sortable
          width="150">
        </el-table-column>
      </el-table>
      
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="assign.length"
        style="margin-top: 20px"
        >
      </el-pagination>
    </el-card>
    
  </div>
</template>

<script>
  import { getUserRecord } from '@/api/record'
  import { getUser } from '@/api/login'

  export default {
    data() {
      return {
        /* 表格数据 */
        assign: [],
        currentPage: 1,
        pageSize: 10,
        loading: true,

        score:0,
      }
      
    },
    mounted() {
      this.getAssign()
      this.getUserInfo()
    },
    methods: {
      getUserInfo() {
        let user_id = localStorage.getItem('user_id');
        getUser(user_id).then(response => {
          if (response.data.code == 200) {
            this.score = response.data.data.score
          }
        })
      },
      getAssign() {
        const username = localStorage.getItem('username');
        getUserRecord(username).then(response => {
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
      }
    }
  }
</script>

<style scoped>
.top-label {
  padding: 20px;

}
.title-label {
  display: inline-block;
  text-align: left;
  font-size: 20px;
}
.score-label {
  display: inline-block;
  text-align: left;
  font-size: 28px;
  color: #ff0000;
}
.rank-label {
  display: inline-block;
  text-align: left;
  font-size: 28px;
  color: #409eff;
}
</style>