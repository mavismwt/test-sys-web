import request from '@/utils/request' //引入封装好的 axios 请求
 
//登录接口
export function login(username, password) { 
  return request({ //使用封装好的 axios 进行网络请求
    url: '/login',
    method: 'post',
    data: { //提交的数据
      username,
      password
    }
  })
}

//获取用户信息
export function getUser(user_id) {
  return request({
    url:'/getUser',
    method:'get',
    params: {
      'user_id': user_id
    }
  })
}