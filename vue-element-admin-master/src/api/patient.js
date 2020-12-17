import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/patient/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: `/vue-element-admin/patient/detail/${id}`,
    method: 'get',
    // params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/patient/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/patient/create',
    method: 'post',
    data
  })
}
// 修改样本测序表
export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/patient/update',
    method: 'put',
    data
  })
}

// 删除样本测序表记录
export function deleteArticle(sequence_id) {
  return request({
    url: `/vue-element-admin/patient/delete/${sequence_id}`,
    method: 'delete',
  })
}
