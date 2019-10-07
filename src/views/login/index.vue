<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">一起玩管理后台</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          Sign in
        </el-button>
      </el-form-item>
      <!-- <div class="tips">
        <span style="margin-right:20px;">test</span>
        <span style="margin-right:20px;">username: aaaa</span>
        <span> password: aaaa</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { requestApi } from '@/api/index'
import Layout from '@/views/layout/Layout'


export default {
  name: 'Login',
  created() {
    // this.initRoute()
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur'}],
        password: [{ required: true, trigger: 'blur'}]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then((res) => {
            
            console.log(res)
            if(res.code == 1) {
              if(res.data.menu.length == 0) {
                this.Message("warning","该用户没有任何权限！")
                this.loading = false
                return
              }
              this.loading = false
              let list = res.data.menu
              this.initRoute(list)
            }else {
              this.loading = false
              this.Message("warning",res.msg)
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //  根据用户权限动态添加路由
    initRoute(list) {
      // console.log(list,JSON.parse(localStorage.getItem('userInfo')))
      // list = list ? list : JSON.parse(localStorage.getItem('userInfo')) ? JSON.parse(localStorage.getItem('userInfo')).menu : []
      // console.log(list)
      if(list.length == 0) {
        return
      }
      
      this.$router.options.routes.splice(0,this.$router.options.routes.length)
              
          for(let i = 0; i < list.length; i ++) {
              let name = '',
              childPath = '',
              childList = []
              switch (list[i].id) {
                case 1:
                  name = 'authorization'
                  break;
                case 2:
                  name = 'order'
                  break;
                case 3:
                  name = 'user'
                  break;
                case 4:
                  name = 'goods'
                  break;
                case 5:
                  name = 'goods2'
                  break;
                //  商品渠道模块
                case 10:
                  name = 'goodsChanne'
                  break;
                case 11:
                  name = 'data'
                  break;
                case 18:
                  name = 'service'
                  break;
                case 21:
                  name = 'marketing'
                  break;
                case 25:
                  name = 'operatorData'
                  break;
                case 28:
                  name = 'message'
                  break;
                default:
                  break;
              }
              if(list[i].sub.length == 0) {
                childPath = 'index'
                childList = [
                  {
                    path: childPath,
                    name: name,
                    component: () => import(`@/views/home/${name}/${name}`),
                    meta: { title: list[i].name, icon: 'table' }
                  }
                ]
              }
              this.$router.options.routes.push({
                      path: '/' + name,
                      hidden: false,       
                      component: Layout,
                      alwaysShow:false,
                      name: list[i].name,
                      meta: { title: list[i].name, icon: 'example' },
                      children: childList
                    })
                  childList = []
              for(let j = 0; j < list[i].sub.length; j ++) {
                let childrenName = ''
                switch (list[i].sub[j].id) {
                  case 6:
                    childrenName = 'goodsInfo'
                    break;
                  case 7:
                    childrenName = 'goodsEdit'
                    break;
                  case 8:
                    childrenName = 'goodsInfo2'
                    break;
                  // case 9:
                  //   childrenName = 'goodsChanne'
                  //   break;
                  case 9:
                    childrenName = 'goodsEdit2'
                    break;
                  case 12:
                    childrenName = 'everyData'
                    break;
                  case 13:
                    childrenName = 'shopData'
                    break;
                  case 14:
                    childrenName = 'operativeData'
                    break;
                  case 15:
                    childrenName = 'order2'
                    break;
                  case 16:
                    childrenName = 'order'
                    break;
                  case 17:
                    childrenName = 'everyData2'
                    break;
                  case 19:
                    childrenName = 'handlingPro'
                    break;
                  case 20:
                    childrenName = 'serviceData'
                    break;
                  case 22:
                    childrenName = 'newMarket'
                    break;
                  case 23:
                    childrenName = 'marketData'
                    break;
                  case 24:
                    childrenName = 'proNote'
                    break;
                  case 26:
                    childrenName = 'presaleData'
                    break;
                  case 27:
                    childrenName = 'personalsalesData'
                    break;
                  case 29:
                    childrenName = 'mesModule'
                    break;
                  case 30:
                    childrenName = 'mesSendAll'
                    break;
                  default:
                    break;
                }
                if(j == 0) {
                  this.$router.options.routes[i].redirect = `/${name}/${childrenName}`
                }
                this.$router.options.routes[i].children.push({
                  path: childrenName,
                  name: childrenName,   
                  component: () => import(`@/views/home/${name}/${childrenName}`),
                  meta: { title: list[i].sub[j].name, icon: 'table' }
                })
              }
          }
          this.$router.options.routes = this.$router.options.routes.concat([
            { path: '/login', component: () => import('@/views/login/index'), hidden: true },
            {
              path: '/',
              component: Layout,
              redirect: this.$router.options.routes[0].path + '/' + this.$router.options.routes[0].children[0].path,
              name: '首页',
              hidden: true,
              meta: { title: '二类电商订单', icon: 'example' },
            }
          ])
          //  bin-test-tag
          //测试
          // this.$router.addRoutes(this.$router.options.routes)
          this.$router.push({
            path: this.$router.options.routes[0].path + '/' + this.$router.options.routes[0].children[0].path
          })
          console.log('路由信息',this.$router.options.routes)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
