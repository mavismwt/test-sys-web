import request from '@/utils/request' //引入封装好的 axios 请求

//获取作业详情
export function getAssign(assign_id) {
  return request({
    url:'/getAssign',
    method:'get',
    params: {
      'assign_id': assign_id
    }
  })
}

//条件查找


//新建作业-教师



//修改作业-教师权限



//上交作业-学生权限