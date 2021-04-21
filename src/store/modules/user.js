import { login } from '@/api/login'//引入登录 api 接口
 
const user = {
  actions: {

  },
  state: {
    username: "",
    user_id:"",
    nickname:""
  },
  mutations: {
    // 保存用户登录信息
    setUserId (state, user_id) {
      state.user_id = user_id;
      localStorage.setItem('user_id', user_id);
    },
    setUsername (state, username) {
      state.username = username;
      localStorage.setItem('username', username);
    },
    setNickname (state, nickname) {
      state.nickname = nickname;
      localStorage.setItem('nickname', nickname);
    },
  }
}
export default user