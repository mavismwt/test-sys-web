<template>
  <div class="home">
    <el-container>
      <el-header>
        <!-- 顶部标题部分 -->
        <top-nav></top-nav>
      </el-header>
      <el-container>
        <!-- 左侧导航菜单 -->
          <el-aside width="200px">
            <left-menu :items="items"></left-menu>
          </el-aside>
        <!-- 主要内容部分 -->
        <el-main class="main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TopNav from '@/components/top-nav.vue'
import LeftMenu from '@/components/left-menu.vue'
export default {
  name: "Home",
  data() {
    return {
      items:[{
          icon: "el-icon-s-platform",
          index: "/student/assign",
          title: "我的作业"
        },
        {
          icon: "el-icon-s-flag",
          index: "/student/rank",
          title: "成绩排名"
        },
        {
          icon: "el-icon-s-data",
          index: "/student/data",
          title: "周测数据",
          subs: [
            {
              index: "/student/data/ide",
              title: "数据1",
            },
            {
              index: "/student/data/web",
              title: "数据2"
            }
          ]
        }],
    }
  },
  computed: {
      username() {
          let username = localStorage.getItem('ms_username');
          return username ? username : this.name;
      }
  },
  methods:{
      // 用户名下拉菜单选择事件
      handleCommand(command) {
          if (command == 'loginout') {
              localStorage.removeItem('ms_username');
              this.$router.push('/login');
          }
      }
  },
  components: {
    TopNav,
    LeftMenu
  }
}
</script>

<style>
.home {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #ffffff;
  text-align: center;
  min-width: 100vh;
}
.main {
  width: 100%;
  height: 93vh;
  background-color: rgba(244,246,248, 255);
}

</style>