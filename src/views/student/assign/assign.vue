<template>
  <div>
    <div class="info-area">
      <el-card style="height:44px">
      <span class="top-label">开放中>></span>
      </el-card>
        <el-row style="margin-top:12px;" :v-loading="loading">
          <template v-for="item in items">
            <template v-if="isDue(item.date_end)">
              <el-col :span="4" @click.native="detail(item.assign_id)" 
                :index="item.index" :key="item.key">
                <assign-cell :title="item.title"
                  :date="item.date_end" 
                ></assign-cell>
              </el-col>
            </template>
          </template>
        </el-row>
    </div>
    <div class="info-area">
      <el-card style="height:44px">
      <span class="top-label">已过期>></span>
      </el-card>
        <el-row style="margin-top:12px;" :v-loading="loading">
          <template v-for="item in items">
            <template v-if="!isDue(item.date_end)">
              <el-col :span="4" @click.native="detail(item.assign_id)" 
                :index="item.index" :key="item.key">
                <assign-cell :title="item.title"
                  :date="item.date_end" 
                ></assign-cell>
              </el-col>
            </template>
          </template>
        </el-row>
    </div>
  </div>
</template>

<script>
import assignCell from './component/assign-cell.vue'
import { getAssignS } from '@/api/assign'//引入登录 api 接口

export default {
  components: { assignCell },
  name: 'Assign',
  data() {
    return {
      user_id: this.$router.user_id,
      data: {},
      items:[],
      loading: true
    }
  },
  mounted() {
    this.getAssign()
  },
  methods: {
    getAssign() {
      const user_id = localStorage.getItem('username');
      getAssignS(user_id).then(response => {
        if (response.data.code == 200) {
          let resData = response.data.data
          if (resData!= null) {
            this.items = resData;
          }
          this.loading = false
        } else {
          this.loading = false
          this.$message({
            type: 'error',
            message: `${response.data.code} ` + `${response.data.message}`
          });
        }
      }
      )
    },
    isDue(DateString) {
      const date = Date.parse(DateString)
      if (date > new Date) {
        return true
      } else {
        return false
      }
    },
    detail(assign_id) {
      this.$router.push({
        path:'/student/assign/detail',
        query: {
          assign_id: assign_id
        }
      })
    }
  }
}
</script>

<style scoped>
.info-area {
  margin: 14px;
}
.top-label {
  font-size:14px;
  text-align:left;
  display:block;
  margin-top: -8px;
}
.sec {
  top: 40px;
}
</style>
