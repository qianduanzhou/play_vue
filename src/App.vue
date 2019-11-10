<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters,mapMutations  } from 'vuex'
import Layout from '@/views/layout/Layout'
export default {
  name: 'App',
  created() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    console.log('userInfo',userInfo)
    if(userInfo) {
      this.setUserInfo(userInfo)
      this.initRoute(userInfo.auth)
    }
  },
  methods: {
    //  根据用户权限动态添加路由
    initRoute(auth) {
      if(auth === 1) {
        return
      }
      console.log('this.$router.options.',this.$router.options)
      this.$router.options.routes.find((item,i) => {
        console.log('item',item)
        if(item.name == '权限中心') {
          return this.$router.options.routes.splice(i,1)
        }
      })
    },
    ...mapMutations({
      setUserInfo: "SET_USERINFO",
    }),
  }
}
</script>

<style scope>
  .boldDialog .el-dialog__title {
    font-weight: bold;
  }
  .tableNopad .is-center {
    padding: 0;
  }
  .tableNopad .cell {
    padding: 0;
  }
  .ql-container {
    min-height: 400px;
  }
  .el-upload-list {
    display: none;
  }
  .el-table .el-table__header .has-gutter .cell{
    font-weight: bold;
    color: black;
  }
</style>
