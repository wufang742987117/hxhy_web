import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve => require(['c/login'], resolve);
const Home = resolve => require(['c/home'], resolve);
const List = resolve => require(['c/list'], resolve);

//提现
const Withdraw_list = resolve => require(['c/withdraw/withdraw_list'],resolve);

//代理管理
const Channel_agent_list = resolve => require(['c/agent_manage/channel_agent_list'], resolve);
const Area_agent_list = resolve => require(['c/agent_manage/area_agent_list'], resolve);
const New_channel_agent = resolve => require(['c/agent_manage/new_channel_agent'], resolve);
const New_area_agent = resolve => require(['c/agent_manage/new_area_agent'], resolve);
const Area_agent_grade = resolve => require(['c/agent_manage/area_agent_grade'], resolve);
const Agent_type_alter = resolve => require(['c/agent_manage/agent_type_alter'], resolve);

//居间
const Middleman_area_list = resolve => require(['c/middleman_manage/middleman_area_list'], resolve);
const Middleman_channel_list = resolve => require(['c/middleman_manage/middleman_channel_list'], resolve);
const New_area_middleman = resolve => require(['c/middleman_manage/new_area_middleman'], resolve);
const New_channel_middleman = resolve => require(['c/middleman_manage/new_channel_middleman'], resolve);

//代理审核
const agent_examine_list = resolve => require(['c/agent_examine/agent_examine_list'], resolve);

//基本信息
const Area_info = resolve => require(['c/area_info'], resolve);
const Agent_info = resolve => require(['c/agent_info'], resolve);
const User_info = resolve => require(['c/user_info'], resolve);
const Conserv_info = resolve => require(['c/conserv_info'], resolve);
const Carte_info = resolve => require(['c/carte_info'], resolve);
const Role_info = resolve => require(['c/role_info'], resolve);


//修改基本信息
const Agent_edit = resolve => require(['c/agent_edit'], resolve);
const Conserv_edit = resolve => require(['c/conserv_edit'], resolve);
const Role_edit = resolve => require(['c/role_edit'], resolve);

//修改密码
const Modify_password = resolve => require(['c/modify_password'], resolve);

//用户管理
const FrontUser_manage = resolve => require(['c/user_manage/frontUser_manage'], resolve);
const Conservator_manage = resolve => require(['c/user_manage/conservator_manage'], resolve);
const Role_manage = resolve => require(['c/user_manage/role_manage'], resolve);

//菜单管理
const Carte_manage = resolve => require(['c/resource_manage/carte_manage'], resolve);

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/withdraw',
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/withdraw',
      component: Home,
      redirect: '/withdraw/withdraw_list',
      children: [
        {
          path: 'withdraw_list',
          component: Withdraw_list,
        }
      ]
    },
    {
      path: '/agent_manage',
      component: Home,
      children: [
        {
          path: 'channel_agent_list',
          component: Channel_agent_list,
        },
        {
          path: 'area_agent_list',
          component: Area_agent_list,
        },
        {
          path: 'new_channel_agent',
          component: New_channel_agent,
        },
        {
          path: 'new_area_agent',
          component: New_area_agent,
        },
        {
          path: 'area_agent_grade',
          component: Area_agent_grade,
        },
				{
					path: 'agent_type_alter',
					component: Agent_type_alter,
				}
      ]
    },
    {
      path: '/agent_examine',
      component: Home,
      children: [
        {
          path: 'agent_examine_list',
          component: agent_examine_list,
        }
      ]
    },
		{
			path: '/resource_manage',
			component: Home,
			children: [
				{
					path: 'carte_manage',
					component: Carte_manage,
				}
			]
		},
    {
      path: '/middleman_manage',
      component: Home,
      children: [
        {
          path: 'middleman_channel_list',
          component: Middleman_channel_list,
        },
        {
          path: 'middleman_area_list',
          component: Middleman_area_list,
        },
        {
          path: 'new_area_middleman',
          component: New_area_middleman,
        },
        {
          path: 'new_channel_middleman',
          component: New_channel_middleman,
        }
      ]
    },
		{
			path: '/user_manage',
			component: Home,
			children: [
				{
					path: 'frontUser_manage',
					component: FrontUser_manage,
				},
				{
					path: 'conservator_manage',
					component: Conservator_manage,
				},
				{
					path: 'role_manage',
					component: Role_manage,
				}
			]
		},

    {
			path: '/area_info',
			component: Home,
			children: [
				{
          path: 'area_info',
          name: 'area_info',
          component: Area_info,
        }
			]
		},
		{
			path: '/agent_info',
			component: Home,
			children: [
				{
          path: 'agent_info',
          name: 'agent_info',
          component: Agent_info,
        }
			]
		},
		{
			path: '/user_info',
			component: Home,
			children: [
				{
					path: 'user_info',
					name: 'user_info',
					component: User_info,
				}
			]
		},
		{
			path: '/conserv_info',
			component: Home,
			children: [
				{
					path: 'conserv_info',
					name: 'conserv_info',
					component: Conserv_info,
				}
			]
		},
		{
			path: '/carte_info',
			component: Home,
			children: [
				{
					path: 'carte_info',
					name: 'carte_info',
					component: Carte_info,
				}
			]
		},
		{
			path: '/role_info',
			component: Home,
			children: [
				{
					path: 'role_info',
					name: 'role_info',
					component: Role_info,
				}
			]
		},
		{
			path: '/conserv_edit',
			component: Home,
			children: [
				{
					path: 'conserv_edit',
					name: 'conserv_edit',
					component: Conserv_edit,
				}
			]
		},
		{
			path: '/role_edit',
			component: Home,
			children: [
				{
					path: 'role_edit',
					name: 'role_edit',
					component: Role_edit,
				}
			]
		},
		{
			path: '/agent_edit',
			component: Home,
			children: [
				{
					path: 'agent_edit',
					name: 'agent_edit',
					component: Agent_edit,
				}
			]
		},
		{
      path: '/modify_password',
      component: Home,
      children: [
        { path: '/modify_password', component: Modify_password }
      ]
    },
    // {
    //   path: '/home',
    //   name: '首页',
    //   component: Home,
    //   redirect: '/home/List',
    //   children: [
    //     { path: '/home/List', component: List, name: '首页', menuShow: true }
    //   ]
    // }
  ]
})
export default router
