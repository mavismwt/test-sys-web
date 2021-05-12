import request from '@/utils/request' //引入封装好的 axios 请求

//上交作业-学生权限
export function upload(file,studentId) {
  return request({
    url:'/file/upload',
    method:'post',
    data: file,
    params:{
      id: studentId
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

//下载作业-教师权限
export function download(path) {
  return request({
    url:'/download',
    method:'post',
    params:{
      filePath: path,
      fileName: "本科17级电信第二党支部-同上四史思政大课心得感悟.docx"
    },
    responseType: 'blob'
  })
}