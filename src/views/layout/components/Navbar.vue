<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <el-button class="login" type="primary" @click="$router.push('/login')" v-if="!userInfo.name">登录</el-button>
    <el-dropdown class="avatar-container" trigger="click" v-if="userInfo.name">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1564219745&di=1cccdde1a0fb4a7d0e63c309836def8c&src=http://ku.90sjimg.com/element_origin_min_pic/01/35/19/43573bd7171010e.jpg">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <p style="list-style: none;
                  line-height: 36px;
                  padding: 0px 20px 5px 20px;
                  margin: 0;
                  font-size: 14px;
                  color: #606266;
                  cursor: pointer;
                  outline: 0;
                  border-bottom:1px solid #EBEEF5;">{{userInfo.name}}</p>
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            回首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters,mapMutations  } from 'vuex'
import { requestApi } from '@/api/index'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import Layout from '@/views/layout/Layout'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'sidebar',
      'avatar'
    ])
  },
  created() {
    //  bin-test-tag
    // this.checkLogin()
  },
  methods: {
    
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    
    ...mapMutations({
      setUserInfo:"SET_USERINFO"
    }),
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: blue;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .login {
    position: absolute;
    right: 20px;
    top: 5px;
  }
}
</style>

