import request from '@/utils/request'

export function fetchDiseaseList(query) {
  return request({
    url: '/vue-element-admin/disease/list',
    method: 'get',
    params: query
  })
}

export function fetchDisease(id) {
  return request({
    url: `/vue-element-admin/disease/detail/${id}`,
    method: 'get',
    // params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createDisease(data) {
  return request({
    url: '/vue-element-admin/disease/create',
    method: 'post',
    data
  })
}
// 修改表
export function updateDisease(data) {
  return request({
    url: '/vue-element-admin/disease/update',
    method: 'put',
    data
  })
}

// 删除样本测序表记录
export function deleteDisease(sequence_id) {
  return request({
    url: `/vue-element-admin/disease/delete/${sequence_id}`,
    method: 'delete',
  })
}

export function importExcel(data) {
    return request({
      url: '/vue-element-admin/disease/import',
      method: 'post',
      data
    })
  }
