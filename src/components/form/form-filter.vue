<template>
  <div>
    <el-card>
      <el-row>
        <span>
          班级：
          <el-input placeholder="请输入班级名称" style="width: 180px" v-model="queryForm.id" ></el-input>
        </span>
        <span>
          姓名：
          <el-input placeholder="请输入学生姓名" style="width: 180px" v-model="queryForm.id" ></el-input>
        </span>
        <span>
          学号：
          <el-input placeholder="请输入学生学号" style="width: 180px" v-model="queryForm.id" ></el-input>
        </span>
        <span>
          题号：
          <el-input placeholder="请输入题号" style="width: 180px" v-model="queryForm.id" ></el-input>
        </span>
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
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryForm: {
          //ID
          id:null,
          //品种
          kind:null,
          //名字
          name:null,
          //颜色
          color:null,
          createTimeRange: ["",""],
          updateTimeRange: ["",""],
          pageNum: 1,
          //pageSize: PAGE_SIZE_INIT,
          orders: []
        },
    }
  }
}
</script>