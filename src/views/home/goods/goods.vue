<template>
  <div class="goods">
    <el-input
      placeholder="名字 / 类型"
      v-model="keyword"
      clearable
      style="width:200px;">
    </el-input>
    <el-button type="primary" style="margin-left:10px;" @click="search">搜索</el-button>
    <el-button type="primary" style="margin-left:10px;" @click="showAdd = true">新建</el-button>
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
        prop="name"
        label="名字"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column
        label="图标"
        align="center">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" class="gamePic"/>
        </template>
      </el-table-column>
      <el-table-column
        label="段位"
        align="center">
        <template slot-scope="scope">
           <el-select v-model="scope.row.levelList.id" filterable placeholder="段位列表">
            <el-option
              v-for="item in scope.row.levelList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="类型"
        align="center">
        <template slot-scope="scope">
          {{scope.row.type | formatType}}
        </template>
      </el-table-column>
      <el-table-column
        label="是否热门"
        align="center">
        <template slot-scope="scope">
          {{scope.row.hot == 1 ? '是' : '否'}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="150">
        <template slot-scope="scope">
          <!-- <el-button
            @click.native.prevent="pushList(scope.row.id)"
            type="primary"
            size="small">
            发布列表
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 新建账号弹框 -->
    <el-dialog
      title="新建商品"
      :visible.sync="showAdd"
      width="50%"
      :before-close="resetData">
      <el-form :model="Form" :rules="rules" ref="Form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名字" prop="name">
          <el-input v-model.trim="Form.name" placeholder="请输入名字" class="input"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="img">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="Form.picUrl" :src="Form.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="类型" prop="type">
           <el-select v-model="Form.type" filterable placeholder="请选择类型">
            <el-option
              v-for="item in Form.typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="段位">
          <el-tag
            :key="tag"
            v-for="tag in Form.levelList"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="Form.inputVisible"
            v-model="Form.inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新段位</el-button>
        </el-form-item>
        <el-form-item label="是否热门" prop="hot">
          <el-radio v-model="Form.hot" label="1">是</el-radio>
          <el-radio v-model="Form.hot" label="2">否</el-radio>
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
      loading: false,
      showAdd: false,
      Form: {
        name: '',
        type: '',
        picUrl: '',
        type: '',
        hot: '2',
        typeList: [
          {
            id: 1,
            name: '手游'
          },
          {
            id: 2,
            name: '端游'
          },
          {
            id: 3,
            name: '娱乐'
          },
          {
            id: 4,
            name: '心理咨询'
          },
          {
            id: 5,
            name: '文艺生活'
          }
        ],
          levelList: [],
          inputVisible: false,
          inputValue: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名字', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择商品类型', trigger: 'blur' }
        ],
        hot: [
          { required: true, message: '请选择是否热门', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.initList()
    this.uploadUrl = process.env.NODE_ENV == 'development' ? '/api/upload/uploadImg' : process.env.BASE_API + '/upload/uploadImg'
  },
  filters: {
    formatType(val) {
      switch (val) {
        case 1:
          return  '手游'
        case 2:
          return  '端游'
        case 3:
          return  '娱乐'
        case 4:
          return  '心理咨询'
        case 5:
          return  '文艺生活'
        default:
          return  '未知'
      }
    }
  },
  methods: {
    //  初始化列表
    initList() {
      let keyword = this.keyword
      switch (this.keyword) {
        case '手游':
          keyword = 1
          break
        case '端游':
          keyword = 2
          break
        case '娱乐':
          keyword = 3
          break
        case '心理咨询':
          keyword = 4
          break
        case '文艺生活':
          keyword = 5
          break
        default:
          break
      }
      let data = {
        page: this.page,
        pageSize: this.pageSize,
        keyword
      }
      requestApi({
        name: "gameList",
        data
        }).then((res) => {
          this.total = res.data.total
          this.tableData = res.data.dataList
          console.log(res.data)
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
    //  新建游戏
    created() {
      console.log('form',this.Form)
      this.$refs['Form'].validate((valid) => {
        if (valid) {
          if(this.Form.picUrl == '') {
            this.Message('warning', '请上传商品图片')
          }else if(this.Form.type == '') {
            this.Message('warning', '请选择商品类型')
          }else if(this.Form.levelList.length == 0) {
            this.Message('warning', '请添加商品段位')
          }
          let data = {
            name: this.Form.name,
            picUrl: this.Form.picUrl,
            type: this.Form.type,
            levelList: JSON.stringify(this.Form.levelList),
            hot: this.Form.hot
          }
          requestApi({
            name: "createGoods",
            data
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
    //  重置数据
    resetData() {
      this.showAdd = false
    },
    // 上传图片相关
    handleAvatarSuccess(res, file) {
      console.log(file)
      this.Form.picUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //  段位相关
    handleClose(tag) {
      this.Form.levelList.splice(this.Form.levelList.indexOf(tag), 1);
    },
    showInput() {
      this.Form.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.Form.inputValue;
      if (inputValue) {
        this.Form.levelList.push(inputValue);
      }
      this.Form.inputVisible = false;
      this.Form.inputValue = '';
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
  .goods {
    padding: 10px;
  }
  .gamePic {
    display: block;
    margin: 0 auto;
    width: 50px;
    height: 50px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80x;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
  .input {
    width: 50%;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
