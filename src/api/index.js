import request from './axios'
import qs from 'qs'
import apis from "./apis";

function requestApi({ name, data, header, headerType,responseType }) {
  if (Object.keys(apis).indexOf(name) === -1) {
    //action不在reqConfig配置中
    throw new SyntaxError(`请在apis文件注册路由:  ${name}`);
  }
  const options = apis[name];
  options.method = options.method || "get";
  return new Promise((resolve,reject) => {
    request({
      url: options.url,
      method: options.method,
      // withCredentials: true,
      params: options.method == "get" ? data : "",
      data:
        options.method != "get"
          ? headerType == "json"
            ? data
            : qs.stringify(data)
          : "",
      headers: {
        'Content-Type': headerType && headerType == 'json' ? 'application/json' : 'application/x-www-form-urlencoded',
        ...header
      },
      responseType
    }).then(
      function(res) {
        resolve(res);
      },
      function(error) {
        reject(error);
      }
    );
  })
}


export {
  requestApi
}
