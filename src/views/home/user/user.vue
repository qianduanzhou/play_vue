<template>
  <div class="user">
    <el-input
      placeholder="ID / 账号 / 昵称"
      v-model="keyword"
      clearable
      style="width:200px;">
    </el-input>
    <el-button type="primary" style="margin-left:10px;" @click="search">搜索</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 80%;margin-top:10px;">
      <el-table-column
        prop="id"
        label="Id"
        align="center">
      </el-table-column>
      <el-table-column
        prop="username"
        label="账号"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="头像"
        align="center">
        <template slot-scope="scope">
          <img :src="scope.row.userPic" class="userPic"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="性别"
        label="权限"
        align="center">
        <template slot-scope="scope">
          {{scope.row.sex == 1 ? '男' : '女'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        align="center">
      </el-table-column>
      <el-table-column
        prop="city"
        label="地区"
        align="center">
      </el-table-column>
      <el-table-column
        prop="fans"
        label="粉丝"
        align="center">
      </el-table-column>
      <el-table-column
        prop="concern"
        label="关注"
        align="center">
      </el-table-column>
      <el-table-column
        prop="money"
        label="余额"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="150">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="pushList(scope.row.id)"
            type="primary"
            size="small">
            发布列表
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 发布列表 -->
    <el-dialog
      title="发布列表"
      :visible.sync="showPushList"
      width="80%"
      >
      <el-table
      :data="pushListData"
      border
      style="width: 80%;margin-top:10px;">
      <el-table-column
        prop="id"
        label="Id"
        align="center">
      </el-table-column>
      <el-table-column
        prop="game"
        label="陪玩项目"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column
        prop="gameType"
        label="陪玩类型"
        align="center">
      </el-table-column>
      <el-table-column
        prop="level"
        label="段位"
        align="center">
      </el-table-column>
      <el-table-column
        label="价格"
        align="center">
        <template slot-scope="scope">
          {{scope.row.moneyType + scope.row.moneyNum}}
        </template>
      </el-table-column>
      <el-table-column
        prop="introduction"
        label="介绍"
        align="center">
      </el-table-column>
      <el-table-column
        prop="city"
        label="时间"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.updateTime | formatDate}}
        </template>
      </el-table-column>
    </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showPushList = false">取 消</el-button>
        <el-button type="primary" @click="showPushList = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-pagination
      :total="total"
      :current-page="page"
      :page-size="pageSize"
      background
      layout="total,prev, pager, next, jumper"
      style="margin-top:50px;"
      @current-change = "pageChange"/>
  </div>
</template>

<script>
import { requestApi } from '@/api/index'
import { scrollTop } from '@/utils/domOperate'
import formatDate from '@/utils/formatDate'
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      keyword: '',
      total: 0,
      tableData: [],
      pushListData: [],
      loading: false,
      showPushList: false
    }
  },
  created() {
    this.initList()
  },
  filters: {
    formatDate(val) {
      return formatDate(val)
    }
  },
  methods: {
    //  初始化列表
    initList() {
      let data = {
        page: this.page,
        pageSize: this.pageSize,
        keyword: this.keyword
      }
      requestApi({
        name: "getCustomerList",
        data
        }).then((res) => {
          this.total = res.data.total
          this.tableData = res.data.dataList
          if(res.code == 200) {
            this.Message('success',res.msg)
          }else {
            this.Message('warning',res.msg)
          }
      })
    },
    //  查看发布列表
    pushList(userId) {
      requestApi({
        name: "getPushList",
        data: {
          userId
        }
        }).then((res) => {
          if(res.code == 200) {
            this.pushListData = res.data.dataList
            this.showPushList = true
          }else {
            this.Message('warning',res.msg)
          }
      })
    },
    //  搜索
    search() {
      this.page = 1
      this.initList()
    },
    //  改变页码
    pageChange(page) {
      this.page = page
      this.initList(this.page)
      scrollTop()
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user {
    padding: 10px;
  }
  .userPic {
    display: block;
    margin: 0 auto;
    width: 50px;
    height: 50px;
  }
</style>
