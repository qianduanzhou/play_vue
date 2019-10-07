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
    
  },
  

  methods: {
    ...mapMutations({
      setUserInfo:"SET_USERINFO"
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
