import fetch from '@/utils/request'

export function login(username, password) {
  return fetch({
    url: `/admin/login?username=${username}&password=${password}`,
    method: 'get'
  })
}

export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return fetch({
    url: 'admin/logout',
    method: 'get'
  })
}
