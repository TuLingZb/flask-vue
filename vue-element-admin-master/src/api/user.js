import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/tokens/',
    method: 'post',
    auth:data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function updateInfo(data) {
  return request({
    url: '/vue-element-admin/user/update',
    method: 'put',
    data
  })
}
