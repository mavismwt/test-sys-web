import request from '@/utils/request' //引入封装好的 axios 请求

//获取指定记录
export function getSingleRecord(username,assign_id) {
  return request({
    url:'/record/single',
    method:'get',
    params:{
      username: username,
      assign_id: assign_id
    }
  })
}

//根据题目
export function getAssignRecord(assign_id) {
  return request({
    url:'/record/assign',
    method:'get',
    params:{
      assign_id: assign_id
    }
  })
}

//根据学生
export function getUserRecord(username) {
  return request({
    url:'/record/user',
    method:'get',
    params:{
      username: username
    }
  })
}
