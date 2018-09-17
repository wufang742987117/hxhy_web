<template>
  <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">管理员登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="account.password" auto-complete="off" placeholder="密码" @keyup.enter.native="login"></el-input>
    </el-form-item>
    <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="login" :loading="loading">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { REST } from 'api'
  import { SET } from "common/js/user"
  import store from 'store'

  export default {
    data () {
      return {
        loading: false,
        account: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    created(){
      SET('TOKEN', '')
      store.remove('__HXHY_MANAGER_TOKEN__')
    },
    methods: {
      login () {
        let _this = this;
        this.$refs.AccountFrom.validate((valid) => {
          if (valid) {
            this.loading = true;
            REST.login(_this.account).then(function (res) {
              SET('TOKEN', res.data)
              localStorage.setItem('username',_this.account.username);
              store.set('__HXHY_MANAGER_TOKEN__', res.data)
              _this.$router.push({ path: '/' });
              _this.loading = false
            }, function (res) {
              _this.loading = false;
							_this.$message(res.msg);
            })
          }
        });
      }
    }
  }
</script>
<style>
  body {
    background: #DFE9FB;
  }
</style>
<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    background: -ms-linear-gradient(top, #ace, #00C1DE);
    background: -moz-linear-gradient(top, #ace, #00C1DE);
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ace), to(#00C1DE));
    background: -webkit-linear-gradient(top, #ace, #00C1DE);
    background: -o-linear-gradient(top, #ace, #00C1DE);

    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
