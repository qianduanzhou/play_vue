const OSS = require('ali-oss')

const bucketName = 'shopping-material'

import { requestApi,requestApi2 } from '@/api/index'
import {
  Message,
  MessageBox
} from 'element-ui'

export const initConfig = async() =>{
    return new Promise((resolve,reject)=>{
    requestApi2('/api/backstage/oss/upload_auth_without_sign','post', {
        bucket_name:bucketName
    }).then(res=>{
        // console.log(res)
        resolve(new OSS({
            accessKeyId: res.data.access_key_id,
            accessKeySecret: res.data.access_key_secret,
            stsToken: res.data.security_token,
            region: 'oss-cn-shenzhen', // oss地区
            bucket: bucketName
        }))
  }).catch((e) => {
    // console.log(e)
  })
})
}

export const upload = async (client, file, buckUrl) =>{
    try {
      // let url = buckUrl +'/'+ file.name
      if(file.type == 'image/webp') {
        Message({
          message: '不支持上传webp格式图片',
          type: 'warning',
          duration: 1000
        })
        return
      }
      let url = process.env.UPLOAD_PRO +'/'+ buckUrl + '/' +  new Date().getTime() + Math.floor(Math.random()*100000)
      return client.put(url,file);
    } catch (e) {
      // console.log('错误',e);
    }
}

export const getTimeString = ()=>{
    let date = new Date();
    let yy = date.getFullYear().toString();
    let mm = (date.getMonth() + 1).toString();
    let dd = date.getDate().toString();
    let hh = date.getHours().toString();
    let nn = date.getMinutes().toString();
    let ss = date.getSeconds().toString();
    let mi = date.getMilliseconds().toString();
    let ret = yy + mm + dd + hh + nn + ss + mi;
    return ret;
}