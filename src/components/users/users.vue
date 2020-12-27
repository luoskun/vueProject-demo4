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
        <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
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
        <template  slot-scope="scope">
          <el-switch
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
          <el-button  size="small" plain="true" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button size="small" plain="true" type="success" icon="el-icon-check" circle></el-button>
          <el-button size="small" plain="true" type="danger" icon="el-icon-delete" circle></el-button>
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
      pagesize: 10,
      userList: []
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
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    }
    ,
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
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
