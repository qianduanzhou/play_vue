<template>
  <div class="order">
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
    <el-button type="success" style="margin-left:10px;" @click="outExcel">导出excel表</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 80%;margin-top:10px;">
      <el-table-column
        prop="id"
        label="订单ID"
        align="center">
      </el-table-column>
      <el-table-column
        prop="publishId"
        label="发布ID"
        align="center">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户"
        align="center">
      </el-table-column>
      <el-table-column
        prop="enterpriseName"
        label="商家"
        align="center">
      </el-table-column>
      <el-table-column
        prop="game"
        label="商品名"
        align="center">
      </el-table-column>
      <el-table-column
        prop="number"
        label="数量"
        align="center">
      </el-table-column>
      <el-table-column
        prop="money"
        label="金额"
        align="center">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注"
        align="center">
      </el-table-column>
      <el-table-column
        prop="time"
        label="陪玩时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="创建时间"
        align="center">
        <template slot-scope="scope">
          {{scope.row.updateTime | formatDate}}
        </template>
        formatDate
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
      return formatDate(val)
    }
  },
  methods: {
    //  初始化
    initList(isExcel) {
      console.log(123123)
      let data = {
        page: this.page,
        pageSize: this.pageSize,
        keyword: this.keyword,
        startTime: this.date && this.date[0],
        endTime: this.date && this.date[1],
        isExcel: isExcel || ''
      }
      requestApi({
        name: "orderList",
        data,
        responseType: isExcel ? 'blob' : ''
        }).then((res) => {
          if(res.data) {
            this.total = res.data.total
            this.tableData = res.data.dataList
            console.log(res.data)
            if(res.code == 200) {
              this.Message('success',res.msg)
            }else {
              this.Message('warning',res.msg)
            }
          }else {
            const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
            console.log('blob',blob)
            const downloadElement = document.createElement('a')
            const href = window.URL.createObjectURL(blob) // 创建下载的链接
            console.log('href',href)
            downloadElement.href = href
            downloadElement.download = `order.xlsx` // 下载后文件名
            document.body.appendChild(downloadElement)
            downloadElement.click() // 点击下载
            document.body.removeChild(downloadElement) // 下载完成移除元素
            window.URL.revokeObjectURL(href) // 释放blob对象
          }
      })
    },
    //  搜索
    search() {
      console.log(this.date)
      this.page = 1
      this.initList()
    },
    //  导出excel表
    outExcel() {
      this.initList(true)
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
  .order {
    padding: 10px;
  }
</style>
