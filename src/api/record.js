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

//更新提交记录-报告
export function updateReport(record) {
  return request({
    url:'/record/report',
    method:'post',
    data: record
  })
}

//更新提交记录-源码
export function updateSource(record) {
  return request({
    url:'/record/source',
    method:'post',
    data: record
  })
}

//更新提交记录-成绩
export function updateScore(record) {
  return request({
    url:'/record/score',
    method:'post',
    data: record
  })
}
