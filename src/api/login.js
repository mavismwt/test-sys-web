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

//条件查询
export function getUserQuery(collection,nickname,identity) {
  return request({
    url:'/getUsers',
    method:'get',
    params: {
      'identity': identity,
      'collection': collection,
      'nickname': nickname
    }
  })
}

//导出全部用户信息
export function exportExcelAll(collection) {
  return request({
    url:'/exportExcelAll',
    method:'post',
    responseType: 'blob',
    data: {
      'collection': collection
    }
  })
}

//批量导出用户信息
export function exportExcel(id) {
  return request({
    url:'/export',
    method:'post',
    responseType: 'blob',
    data: id
  })
}
