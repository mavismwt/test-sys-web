<template>
  <div class="header">
      <div class="title">C语言在线作业评测系统</div>
      <div class="header-right">
          <div class="header-user-con">
              <!-- 用户头像，根据需要自行修改图片路径 -->
              <!-- <div class="user-avator"><img src="../../assets/logo.png" /></div> -->
              <!-- 用户名下拉菜单 -->
              <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link">
                      {{ username }}
                      <i class="el-icon-caret-bottom"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item disabled>修改密码</el-dropdown-item>
                      <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    username() {
      let userInfo = localStorage.getItem('username');
      return userInfo;
    }
  },
  methods:{
      // 用户名下拉菜单选择事件
      handleCommand(command) {
          if (command == 'loginout') {
              localStorage.removeItem('username');
              this.$router.push('/login');
          }
      }
  }
}
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 22px;
  background-color: #ffffff;
}
.header .title {
  float: left;
  margin-left: 20px;
  margin-top: 12.5px;
  height: 29px;
  width: 260px;
  vertical-align: middle;
}

.header-right {
    float: right;
    padding-right: 10px;
}
.header-user-con {
    display: flex;
    height: 60px;
    align-items: center;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.user-name {
    margin-left: 10px;
}
.el-dropdown-link {
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}

</style>