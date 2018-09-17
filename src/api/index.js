import * as host from './config.js'
import { get, post } from './fetch'

export const REST = {

	login(params) {
		return post(host.Login, params)
	},

	resource(params) {
		return get(host.Resource, params)
	},

	//提现列表
	withdrawList(params) {
		return get(host.WithdrawList, params)
	},

	withdrawCheck(params) {
		return post(host.WithdrawHear, params)
	},
	
	queryAgentByUserId(params) {
		return get(host.queryAgentByUserId, params)
	},

	withdrawConfirm(params) {
		return post(host.WithdrawConfirm, params)
	},

  //待审核代理列表
  queryAgentDeficiencylList(params) {
    return post(host.queryAgentDeficiencylList, params)
  },
	
	//渠道商类型修改
	agentTypeAlert(params) {
			return post(host.agentTypeAlert, params)
	},
	
	//角色列表分页查询
	findRoleListe(params) {
		return post(host.findRoleListe, params)
	},
	
	//角色冻结/解冻
	roleFreeze(params) {
		return get(host.roleFreeze, params)
	},
	
	//删除角色
	deleteRole(params) {
		return get(host.deleteRole, params)
	},
	
	//查询角色信息
	queryRoleByRoleid(params) {
		return get(host.queryRoleByRoleid, params)
	},
	
	//修改角色信息
	updateRole(params) {
		return post(host.updateRole, params)
	},

  //代理审核通过
  examineAgent(params) {
    return post(host.examineAgent, params)
  },

  //代理审核驳回
  notExamineAgent(params) {
    return post(host.notExamineAgent, params)
  },
	
	//新建角色
	foundRole(params) {
		return post(host.foundRole, params)
	},
	
	//菜单管理分页查询
	resourceList(params) {
		return post(host.resourceList, params)
	},

	//查询一级菜单
	findFatherResourceList(params) {
		return get(host.findFatherResourceList, params)
	},
	
	//查询全部可用菜单
	findTResourceListByStatus(params) {
		return get(host.findTResourceListByStatus, params)
	},
	
	//新建菜单
	foundTresource(params) {
		return post(host.foundTresource, params)
	},
	
	//查询菜单信息
	findTresourceById(params) {
		return get(host.findTresourceById, params)
	},
	
	//删除菜单
	deleteRoleCarte(params) {
		return get(host.deleteRoleCarte, params)
	},
	
	//菜单冻结/解冻
	freezeTresource(params) {
		return get(host.freezeTresource, params)
	},

	//居间列表
	middlemanlist(params) {
		return post(host.Middlemanlist, params)
	},
	//解冻/冻结
	frozen_and_thaw(params) {
		return get(host.Frozen_and_thaw, params)
	},
	//居间信息
	area_info(params) {
		return get(host.Areainfo, params)
	},
	//渠道代理列表
	channellist(params) {
		return post(host.Channellist, params)
	},
	//区域代理列表
	arealist(params) {
		return post(host.Arealist, params)
	},
	//代理数量
	agentnum(params) {
		return get(host.Agentnum, params)
	},
	//创建渠道代理
	new_channel_agent(params) {
		return post(host.New_channel_agent, params)
	},
	//创建区域代理
	new_area_agent(params) {
		return post(host.New_area_agent, params)
	},
	//获取省级地址列表
	provincedata(params) {
		return get(host.Provincedata, params);
	},
	//根据区域编码获取下级地址列表
	lowerlist(params) {
		return get(host.Lowerlist, params);
	},
	//修改密码
	modify_pwd(params) {
		return post(host.Modify_pwd, params);
	},
	//代理信息
	agentInfo(params) {
		return get(host.AgentInfo,params);
	},
	
	//用户列表查询
	frontUserList(params) {
		return post(host.frontUserList, params);
	},
	
	//管理员列表查询
	conservatorList(params) {
		return post(host.conservatorList, params);
	},
	
	//新建管理员
	conservatorFound(params) {
		return post(host.conservatorFound, params);
	},
	
	//查询管理员信息
	getConservatorById(params) {
		return get(host.getConservatorById,params);
	},
	
	//管理员冻结/解冻
	conservatorFreeze(params) {
		return get(host.conservatorFreeze,params);
	},
	
	//更新管理员信息
	updateConservator(params) {
		return post(host.updateConservator,params);
	},
	
	//获取角色列表
	findRoleListAll(params) {
		return get(host.findRoleListAll, params);
	},
	
	//删除管理员
	deleteConservator(params) {
		return get(host.deleteConservator, params);
	},
	
	//用户详情查询
	getFrontUserById(params) {
		return get(host.getFrontUserById, params);
	},
	
	//用户冻结/解冻
	frontUserFreeze(params) {
			return get(host.frontUserFreeze, params);
	},
	
	agentApplyInfo(params) {
		return get(host.AgentApplyInfo,params)
	},

  queryUserIdIsExist(params) {
    return post(host.queryUserIdIsExist, params);
  },
	
	updateAgentAreaInfo(params) {
		return post(host.updateAgentAreaInfo,params);
	}
};
