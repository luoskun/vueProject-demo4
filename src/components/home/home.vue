<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="" alt="无法显示图片">
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <h3>电商管理后台系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a href="#" @click.prevent="handleSignout()" class="loginout">退出</a></div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside">
        <el-menu
          :router="true"
          :unique-opened="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-map-location"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-map-location"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-map-location"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>


          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-map-location"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-map-location"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-map-location"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>


          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-map-location"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>


          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-map-location"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  beforeCreate() {
    //获取token
    const token = localStorage.getItem("token");
    //如果失效了 就跳到登陆页面
    if (!token){
      this.$router.push({name:'login'})
    }
  },
  methods:{
    handleSignout() {
      //请求token
      localStorage.clear();
      //提示
      this.$message.success("退出成功");
      //调到登陆页
      this.$router.push({name:'login'})
    }
  }
}
</script>

<style scoped>
  .container {
    background-color: white;
    height: 100%;
  }

  .header {
    background-color: #476f7f;
  }

  .aside {
    background-color: rgba(32, 127, 125, 0.22);
  }

  .main {
    background-color: #476f7f;
  }

  .middle {
    text-align: center;
  }

  .loginout {
    line-height: 60px;
    text-decoration: none;
  }
</style>
