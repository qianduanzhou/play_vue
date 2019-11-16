<template>
  <div class="authorization">
    <el-input
      placeholder="ID / 账号"
      v-model="keyword"
      clearable
      style="width:200px;">
    </el-input>
    <el-button type="primary" style="margin-left:10px;" @click="search">搜索</el-button>
    <el-button type="success" style="margin-left:10px;" @click="showAdd = true">新建</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 50%;margin-top:10px;">
      <el-table-column
        prop="id"
        label="Id"
        align="center">
      </el-table-column>
      <el-table-column
        prop="username"
        label="账号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="id"
        label="权限"
        align="center">
        <template slot-scope="scope">
          <span :style=" scope.row.auth == 1 && `color:red;font-weight:bold;`">{{scope.row.auth == 1 ? '超级管理员' : '普通管理员'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteOne(scope.row.id)"
            :disabled="scope.row.auth == 1"
            type="danger"
            size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新建账号弹框 -->
    <el-dialog
      title="新建账号"
      :visible.sync="showAdd"
      width="30%"
      :before-close="resetData">
      <el-form :model="Form" :rules="rules" ref="Form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="Form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="Form.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetData">取 消</el-button>
        <el-button type="primary" @click="created" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>

    <el-pagination
      :total="total"
      :current-page="page"
      background
      layout="total,prev, pager, next, jumper"
      style="margin-top:50px;"
      @current-change = "pageChange"/>
  </div>
</template>

<script>
import { requestApi } from '@/api/index'
import { scrollTop } from '@/utils/domOperate'
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      keyword: '',
      total: 0,
      tableData: [],
      showAdd: false,
      loading: false,
      Form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.initList()
  },
  methods: {
    //  初始化数据
    initList() {
      let data = {
        page: this.page,
        pageSize: this.pageSize,
        keyword: this.keyword
      }
      requestApi({
        name:"getUserList",
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
    //  搜索
    search() {
      this.page = 1
      this.initList()
    },
    //  重置数据
    resetData() {
      this.Form.username = ''
      this.Form.password = ''
      this.showAdd = false
    },
    //  新建账号
    created() {
      this.loading = true
      this.$refs['Form'].validate((valid) => {
        if (valid) {
          requestApi({
            name: "createdUser",
            data: {
              username: this.Form.username,
              password: this.Form.password
            }
          }).then((res) => {
            if(res.code == 200) {
              this.Message('success', '创建成功')
              this.resetData()
              this.pageChange(this.page)
            }else {
              this.Message('error', res.msg)
            }
            this.loading = false
          }).catch((err) => {
            this.loading = false
          })
        } else {
          this.loading = false
          return false;
        }
      });
    },
    //  删除一条
    deleteOne(id) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        requestApi({
          name: "deleteUser",
          data: {
            id: id
          }
        }).then((res) => {
          this.Message('success', '删除成功')   
          this.pageChange(this.page) 
        })
      }).catch(() => {
        this.Message('info', '取消删除')         
      });
    },
    //  改变页码
    pageChange(page) {
      this.page = page
      this.initList(this.page)
      scrollTop()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .authorization {
    padding: 10px;
  }
</style>
