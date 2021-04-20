<template>
  <div>
    <el-row class="top-label">
      <label class="title-label">当前总得分为 </label>
      <label class="score-label">100</label>
      <label class="title-label"> 分， </label>
      <label class="title-label">当前排名第 </label>
      <label class="rank-label">1</label>
      <label class="title-label"> 位</label>
    </el-row>
    <!-- <el-card>
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
    </el-card> -->
    
    <el-card style="margin-top:12px">
      <el-table
        ref="multipleTable"
        :data="assign"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="date_end"
          label="截止日期"
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
          prop=""
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
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40"
        style="margin-top: 20px"
        >
      </el-pagination>
    </el-card>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        /* 表格数据 */
        assign: [{
          date_end: '2016-05-03',
          title: '数组排序',
          score: 85
        },
        {
          date_end: '2016-05-03',
          title: '数组排序',
          score: 85
        },
        {
          date_end: '2016-05-03',
          title: '数组排序',
          score: 85
        }]
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