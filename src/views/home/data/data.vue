<template>
  <div class="data">
    <el-date-picker
      v-model="date"
      type="daterange"
      value-format="timestamp"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-input
      placeholder="ID / 商品名"
      v-model="keyword"
      clearable
      style="width:200px;">
    </el-input>
    <el-button type="primary" style="margin-left:10px;" @click="search">搜索</el-button>
    <p class="title" v-if="date && date[0]">{{date[0] | formatDate}} 至 {{date[1] | formatDate}}数据</p>
    <p class="title" v-else>所有时间</p>
    <el-table
      :data="tableData"
      border
      style="width: 80%;margin-top:10px;">
      <el-table-column
        prop="id"
        label="ID"
        align="center">
      </el-table-column>
      <el-table-column
        prop="game"
        label="商品名"
        align="center">
      </el-table-column>
      <el-table-column
        prop="pv"
        label="PV"
        align="center">
      </el-table-column>
      <el-table-column
        prop="uv"
        label="UV"
        align="center">
      </el-table-column>
      <el-table-column
        prop="pvRate"
        label="PV转化率"
        align="center">
      </el-table-column>
      <el-table-column
        prop="uvRate"
        label="UV转化率"
        align="center">
      </el-table-column>
      <!-- <el-table-column
        label="操作"
        align="center"
        width="150">
        <template slot-scope="scope">
          <button></button>
        </template>
      </el-table-column> -->
    </el-table>

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
      date: [],
      keyword: '',
      total: 0,
      tableData: [],
    }
  },
  created() {
    this.initList()
  },
  filters: {
    formatDate(val) {
      return formatDate(val).slice(0,10)
    }
  },
  methods: {
    //  初始化
    initList() {
      let data = {
        page: this.page,
        pageSize: this.pageSize,
        keyword: this.keyword,
        startTime: this.date && this.date[0],
        endTime: this.date && this.date[1]
      }
      requestApi({
        name: "reportList",
        data,
        }).then((res) => {
          console.log('res',res)
          if(res.data) {
            this.total = res.data.total
            this.tableData = res.data.dataList
            if(res.code == 200) {
              this.Message('success',res.msg)
            }else {
              this.Message('warning',res.msg)
            }
          }
      })
    },
    //  搜索
    search() {
      console.log(this.date)
      this.page = 1
      this.initList()
    },
    //  改变页码
    pageChange(page) {
      this.page = page
      this.initList()
      scrollTop()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .data {
    padding: 10px;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
</style>
