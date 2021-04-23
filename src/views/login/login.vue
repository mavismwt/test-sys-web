<template>
  <div >
    <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" v-on:click="onSubmit()" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" :loading="loginLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { login } from '@/api/login'

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      loginForm: {
        username: 'T201713327',
        password: '123'
      },
      loginLoading: false,

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },

      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  methods: {
    onSubmit() {
      // 为表单绑定验证功能
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loginLoading = true;
          login(this.loginForm.username,this.loginForm.password).then(response => {
            let code = response.data.code;
            if (code == 200) {
              this.loginLoading = false;
              this.$router.push({
                path: "/"+`${response.data.data.identity}`,
                query: {user_id: response.data.data.user_id }
              });
              // 将登录名使用vuex传递到Home页面
              this.$store.commit('setUsername',response.data.data.username);
              this.$store.commit('setUserId',response.data.data.user_id);
              this.$store.commit('setNickname',response.data.data.nickname);
            }else {
              this.loginLoading = false;
              this.$message({
                type: 'error',
                message: `${response.data.code} ` + `${response.data.message}`
              });
            }
          })
        } else {
          this.loginLoading = false;
          this.dialogVisible = true;
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 20%;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 8px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>