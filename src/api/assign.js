import request from '@/utils/request' //引入封装好的 axios 请求

//获取作业详情
export function getAssign(assign_id) {
  return request({
    url:'/assign',
    method:'get',
    params: {
      'assign_id': assign_id
    }
  })
}

//获取个人作业-学生
export function getAssignS(username) {
  return request({
    url:'/assign/student',
    method:'get',
    params: {
      'username': username
    }
  })
}

//获取个人作业-教师
export function getAssignT(username) {
  return request({
    url:'/assign/teacher',
    method:'get',
    params: {
      'username': username
    }
  })
}

//条件查找
export function getAssignByTitle(title) {
  return request({
    url:'/assign/title',
    method:'get',
    body: {
      'title': title
    }
  })
}

//新建作业-教师
export function addAssign(assign) {
  return request({
    url:'/assign/add',
    method:'post',
    data: assign
  })
}


//修改作业-教师权限
export function updateAssign(assign) {
  return request({
    url:'/assign/update',
    method:'post',
    data: assign
  })
}


//批量删除=教师
export function deleteAssign(assign_id) {
  return request({
    url:'/assign/delete',
    method:'post',
    params: {
      'assign_id': assign_id
    }
  })
}



//上交作业-学生权限
