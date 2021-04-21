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

//条件查询-学生
export function getUserS(collection,nickname) {
  return request({
    url:'/getUsers',
    method:'get',
    params: {
      'identity':'student',
      'collection': collection,
      'nickname': nickname
    }
  })
}

//条件查询-教师
export function getUserT(collection,nickname) {
  return request({
    url:'/getUsers',
    method:'get',
    params: {
      'identity':'teacher',
      'collection': collection,
      'nickname': nickname
    }
  })
}