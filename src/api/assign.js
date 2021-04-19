import request from '@/utils/request' //引入封装好的 axios 请求

export function getAssign(assign_id) {
  return request({
    url:'/getAssign',
    method:'get',
    params: {
      'assign_id': assign_id
    }
  })
}