<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formData">
      <h2>用户登陆</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin()" class="login-btn" type="primary">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      const res = await this.$http.post('login', this.formData)
      const {
        meta: {msg, status}
      } = res.data

      if (status === 200) {
        this.$router.push({name: 'home'})
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }

      // this.$http.post('login', this.formData).then(res => {
      //   const {
      //     meta: {msg, status}
      //   } = res.data
      //
      //   if (status === 200) {
      //     this.$router.push({name: 'home'})
      //     this.$message.success(msg)
      //   } else {
      //     this.$message.error(msg)
      //   }
      // }).catch(error => {
      //   console.log(error)
      // })
    }
  }
}
</script>

<style scoped>
  .login-wrap {
    height: 100%;
    background-color: #2c3e50;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-form {
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px;
  }

  .login-wrap .login-btn {
    width: 100%;
  }
</style>
