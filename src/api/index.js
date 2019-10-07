import request from '@/utils/request'
import qs from 'qs'

function requestApi(url, method, data, params, header, noQs, responseType) {
  return new Promise(function(resolve, reject) {
    request({
      url: url,
      method: method || 'get',
      withCredentials: true,
      data: data ? noQs ? data : qs.stringify(data) : '',
      params: params || {},
      headers: {
        // eslint-disable-next-line eqeqeq
        'Content-Type': header && header == 'json' ? 'application/json' : header == 'form' ? 'multipart/form-data' : 'application/x-www-form-urlencoded'
      },
      responseType: responseType
    }).then(function(res) {
      resolve(res)
    }, function(error) {
      reject(error)
    })
  })
}

export {
  requestApi
}
