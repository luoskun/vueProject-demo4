<template>
  <el-card class="box-card">
    <!--    1.面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    2搜索-->
    <el-row class="searchRow">
      <el-col>
        <el-input

          @clear="loadUserList"
          placeholder="请输入内容" v-model="query" class="inputSearch" clearable>
          <el-button slot="append" @click.prevent="search()" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="dialogFormVisible = true" plain>添加用户</el-button>
      </el-col>

    </el-row>
    <!--     3表格-->
    <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="40">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="160">
      </el-table-column>
      <el-table-column
        width="120"
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        label="创建日期"
        width="160">
        <template slot-scope="userList">
          {{userList.row.create_time | fmtdate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="mg_state"
        width="120"
        label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="changeMgSate(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button
            size="small"
            plain type="primary"
            icon="el-icon-edit"
            @click="edit(scope.row)"
            circle>
          </el-button>
          <el-button
            size="small" plain
            type="danger"
            icon="el-icon-delete"
            @click="deleteUser(scope.row.id)"
            circle>
          </el-button>
          <el-button
            size="small"
            @click="showRow(scope.row)"
            plain type="success"
            icon="el-icon-check"
            circle>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!--  添加用户-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话 " :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.prevent="save">确 定</el-button>
      </div>
    </el-dialog>
    <!--    编辑用户-->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click.prevent="updateUserInfo">确 定</el-button>
      </div>
    </el-dialog>

    <!--    分配角色-->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRow">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <!--          <el-input disabled v-model="form.username" autocomplete="off"></el-input>-->
          {{currUsername}}
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="currRoleId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="item.roleName"
                       :value="item.id" v-for="(item,i) in roles" :key=i>

            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRow = false">取 消</el-button>
        <el-button type="primary" @click.prevent="selectRow()">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      query: '',
      pagenum: 1,
      total: -1,
      pagesize: 2,
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRow: false,
      userList: [],
      currRoleId: -1,
      currUsername: '',
      formLabelWidth: '120px',
      form: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        id: ''
      },
      roles:[]
    }
  },
  created () {
    this.getUserList()
  },

  methods: {

    async getUserList () {
      //获取列表请求
      //需要API授权
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log(res)
      const {
        data: {users, total},
        meta: {msg, status}
      } = res.data
      if (status === 200) {
        this.userList = users
        this.total = total
        //  this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.getUserList()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getUserList()
      console.log(`当前页: ${val}`)
    },
    search () {
      this.getUserList()
    },
    loadUserList () {
      this.getUserList()
    },
    async save () {

      const res = await this.$http.post('users', this.form)
      const {
        data,
        meta: {msg, status}
      } = res.data
      console.log(res)
      if (status === 201) {
        this.$message.success(msg)
        this.dialogFormVisible = false
        this.getUserList()
        this.form = ''
      } else {
        this.$message.error(msg)
      }
    }
    ,
    // 删除
    deleteUser (userId) {
      this.$confirm('删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {

        const res = await this.$http.delete(`users/${userId}`)
        console.log(res)
        const {
          data,
          meta: {msg: status}
        } = res.data
        if (res.data.meta.status === 200) {
          this.pagenum = 1
          this.getUserList()
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })

        } else {
          this.$message({
            type: 'error',
            message: res.data.meta.msg
          })
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })

    }
    ,
    async edit (user) {
      this.dialogFormVisibleEdit = true
      this.form = user
      console.log(user)
    }
    ,
    async updateUserInfo () {
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      console.log(res)
      const {
        data,
        meta: {msg, status}
      } = res.data

      if (status === 200) {
        this.dialogFormVisibleEdit = false
        this.pagenum = 1
        this.getUserList()
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    },
    // 修改状态
    async changeMgSate (user) {
      console.log(user)
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      console.log(res)
      const {
        data,
        meta: {msg, status}
      } = res.data

      if (status === 200) {
        this.$message.success(msg)
        this.pagenum = 1
        this.getUserList()
      } else {
        this.$message.error(msg)
      }

    },
    async showRow (user) {

      this.currUsername = user.username
      //根据用户id查询用户角色

      const res1 = await this.$http.get(`roles`)
      console.log(res1)
      this.roles = res1.data.data
      const res = await this.$http.get(`users/${user.id}}`)
      this.currRoleId = res.data.data.rid
      this.dialogFormVisibleRow = true
    }
  }

}
</script>

<style scoped>
  .box-card {
    height: 100%;
  }

  .inputSearch {
    width: 300px;

  }

  .searchRow {
    margin-top: 20px;
  }
</style>
