<template>
  <!--头部-->
  <el-row class="container">
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logos">
        <a href="/"><img src="../../assets/logo.png"></a>
      </div>
      <div class="topbar-title">
        <span style="font-size: 18px;color: #fff;">华夏互娱后台管理系统</span>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont icon-user"/>
           {{usernam}}
            <i class="iconfont icon-down"/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div><span style="color: #555;font-size: 14px;">个人信息</span></div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div><span style="color: #555;font-size: 14px;" @click="modify_pwd">修改密码</span></div>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>

    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="{showSidebar:!collapsed}">
        <!--展开折叠开关-->
        <div class="menu-toggle" @click.prevent="collapse">
          <i class="iconfont icon-menufold" v-show="!collapsed"></i>
          <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
        </div>
        <!--导航菜单-->
        <el-menu default-active="dashboard" router :collapse="collapsed"
                 class="el-menu-vertical-demo"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b" @select="handleSelect">

          <!--<el-menu-item index="dashboard">-->
          <!--<i class="el-icon-menu"></i>-->
          <!--<span slot="title">首页</span>-->
          <!--</el-menu-item>-->

          <!--<el-submenu index="0">-->
          <!--<template slot="title">-->
          <!--<i class="el-icon-menu"></i>-->
          <!--<span>代理伙伴</span>-->
          <!--</template>-->
          <!--<el-menu-item-group>-->
          <!--<el-menu-item index="dashboard">渠道代理列表</el-menu-item>-->
          <!--<el-menu-item index="dashlist">区域代理列表</el-menu-item>-->
          <!--<el-menu-item index="List">新建渠道代理</el-menu-item>-->
          <!--<el-menu-item index="">新建区域代理</el-menu-item>-->
          <!--<el-menu-item index="">区域代理分级</el-menu-item>-->
          <!--<el-menu-item index="">代理商结算记录</el-menu-item>-->
          <!--</el-menu-item-group>-->
          <!--</el-submenu>-->
          <!--<el-submenu index="1">-->
          <!--<template slot="title">-->
          <!--<i class="el-icon-location"></i>-->
          <!--<span>居间伙伴</span>-->
          <!--</template>-->
          <!--<el-menu-item-group>-->
          <!--<el-menu-item index="">区域居间商列表</el-menu-item>-->
          <!--<el-menu-item index="">新建区域居间</el-menu-item>-->
          <!--<el-menu-item index="">新建渠道居间</el-menu-item>-->
          <!--<el-menu-item index="">渠道居间列表</el-menu-item>-->
          <!--</el-menu-item-group>-->
          <!--</el-submenu>-->

          <el-submenu v-for="group of list" :key="group.menuIndex" :index="group.resourceCode">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{group.resourceName}}</span>
            </template>
            <!--<el-menu-item-group>-->
              <el-menu-item v-for="item of group.clildren" :key="item.menuIndex" :index="'/'+group.resourceCode+'/'+item.resourceCode">{{item.resourceName}}</el-menu-item>
            <!--</el-menu-item-group>-->
          </el-submenu>

        </el-menu>
      </aside>

      <!--右侧内容区-->
      <section class="content-container">
        <el-col :span="24" class="content-wrapper">
          <transition name="fade" mode="out-in">
            <!--<h1>这是导航一一一这是导航一一一这是导航一一一这是导航一一一这是导航一一一</h1>-->
            <router-view>

            </router-view>
          </transition>
        </el-col>
      </section>
    </el-col>
  </el-row>
</template>
<script>
  import { REST } from 'api'
  import store from 'store'
  import { SET } from "common/js/user"


  export default {
    data () {
      return {
        list: {},
        defaultActiveIndex: "1-1",
        nickname: '',
        collapsed: false,
        username:''
      }
    },
    created () {

      this.usernam = localStorage.getItem('username')

      if(store.get('__HXHY_MANAGER_TOKEN__')){
        SET('TOKEN', store.get('__HXHY_MANAGER_TOKEN__'))
      }

      let _this = this;
      REST.resource().then(function (res) {
        _this.list = res.data
        console.log(res.data)
      }, function (err) {
      })
    },
    methods: {
      handleSelect (index) {
        this.defaultActiveIndex = index;
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      jumpTo (url) {
        this.defaultActiveIndex = url;
        this.$router.push(url);
      },
      logout () {
        let _this = this;
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonClass: 'el-button--warning'
        }).then(() => {
          //确认
          _this.loading = true;
          _this.$router.push({ path: '/login' });
          localStorage.removeItem('username');
        }).catch(() => {
        });
      },
      modify_pwd(){
      	this.$router.push({path: '/modify_password'});
      }
    }
  }
</script>
<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .topbar-wrap {
      height: 70px;
      line-height: 70px;
      background: #373d41;
      padding: 0px;

      .topbar-btn {
        color: #fff;
      }
      /*.topbar-btn:hover {*/
      /*background-color: #4A5064;*/
      /*}*/
      .topbar-logo {
        float: left;
        width: 59px;
        line-height: 26px;
      }
      .topbar-logos {
        float: left;
        width: 120px;
        line-height: 26px;
        text-align: center;
      }
      .topbar-logo img, .topbar-logos img {
        height: 40px;
        margin-top: 15px;
        margin-left: 2px;
      }
      .topbar-title {
        float: left;
        text-align: left;
        width: 200px;
        padding-left: 10px;
      }
      .topbar-account {
        float: right;
        padding-right: 50px;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        padding-left: 10px;
      }
    }
    .main {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      top: 70px;
      bottom: 0px;
      overflow: hidden;
    }

    aside {
      min-width: 50px;
      background: #333744;
      &::-webkit-scrollbar {
        display: none;
      }

      &.showSidebar {
        overflow-x: hidden;
        overflow-y: auto;
      }

      .el-menu {
        height: 100%; /*写给不支持calc()的浏览器*/
        height: -moz-calc(100% - 30px);
        height: -webkit-calc(100% - 30px);
        height: calc(100% - 30px);
        border-radius: 0px;
        background-color: #333744;
        border-right: 0px;
      }

      .el-submenu .el-menu-item {
        min-width: 60px;
      }
      .el-menu {
        width: 180px;
        text-align: left;
      }
      .el-menu--collapse {
        width: 60px;
      }

      .el-menu .el-menu-item, .el-submenu .el-submenu__title {
        height: 46px;
        line-height: 46px;
      }

      .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
        background-color: #7ed2df;
      }
    }

    .menu-toggle {
      background: #4A5064;
      text-align: center;
      color: white;
      height: 26px;
      line-height: 30px;
      cursor: pointer;
    }

    .content-container {
      background: #f3f3f4;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      padding-bottom: 1px;

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
</style>
