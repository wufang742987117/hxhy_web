// 接口 API

export const Login = '/backend/login'
export const Resource = '/backend/resource'
export const WithdrawList = '/backend/withdraw/list'
export const WithdrawHear = '/backend/withdraw/hear'
export const WithdrawConfirm = '/backend/withdraw/confirm'

export const Channellist = '/backend/agentArea/queryAgentAreaChannelList' //获取渠道列表
export const Arealist = '/backend/agentArea/queryAgentAreaAreaList' //获取区域列表
export const Middlemanlist = '/backend/agentMiddleman/getAgentMiddlemanList' //获取居间列表
export const Frozen_and_thaw = '/backend/agentMiddleman/freezeAgentMiddleman' //冻结解冻
export const Areainfo = '/backend/agentMiddleman/getAgentMiddleman' //获取居间信息
export const Agentnum = '/backend/agentArea/queryAgentCountByType' //获取代理数量
export const New_channel_agent = '/backend/agentArea/addAgentAreaChannel' //创建渠道代理
export const New_area_agent = '/backend/agentArea/addAgentAreaArea' //创建区域代理
// export const Uploadimage = '/backend/image/uploadImage' //上传图片
export const Provincedata = '/backend/address/getProvincialData' //获取省级地址列表
export const Lowerlist = '/backend/address/getlowerLeve' //根据区域编码获取下级地址列表
export const Modify_pwd = '/backend/resetPassword' //修改密码
export const AgentInfo = '/backend/agentArea/queryAgentAreaByUserId' //查看渠道信息

export const AgentApplyInfo = '/backend/examine/queryExamineAgentByUserId' //查看申请渠道信息


export const queryAgentDeficiencylList = '/backend/examine/queryAgentDeficiencylList'  //获取未审核代理
export const examineAgent = '/backend/examine/examineAgent'  //代理审核通过
export const notExamineAgent = '/backend/examine/notExamineAgent'  //代理审核未通过

export const queryUserIdIsExist = '/backend/agentArea/queryUserIdIsExist'  //新建渠道判断id

export const updateAgentAreaInfo = '/backend/agentArea/updateAgentAreaInfo'  //修改渠道商信息

export const frontUserList = '/backend/userManage/frontUserList'  //用户列表查询

export const conservatorList = '/backend/userManage/conservatorList'  //管理员列表查询

export const getFrontUserById = '/backend/userManage/getFrontUserById'  //根据id查询用户信息

export const frontUserFreeze = '/backend/userManage/frontUserFreeze'  //用户冻结/解冻

export const conservatorFound = '/backend/userManage/conservatorFound'  //新建管理员

export const findRoleListAll = '/backend/userManage/findRoleListAll'  //获取角色列表

export const deleteConservator = '/backend/userManage/deleteConservator'  //删除管理员

export const getConservatorById = '/backend/userManage/getConservatorById'  //查询管理员信息

export const updateConservator = '/backend/userManage/updateConservator'  //更新管理员信息

export const conservatorFreeze = '/backend/userManage/conservatorFreeze'  //管理员冻结/解冻

export const findRoleListe = '/backend/userManage/findRoleList'  //角色列表分页查询

export const roleFreeze = '/backend/userManage/roleFreeze'  //角色冻结/解冻

export const queryRoleByRoleid = '/backend/userManage/queryRoleByRoleid'  //查询角色信息

export const findTResourceListByStatus = '/backend/userManage/findTResourceListByStatus'  //查询全部可用菜单

export const deleteRole = '/backend/userManage/deleteRole'  //删除角色

export const foundRole = '/backend/userManage/foundRole'  //新建角色

export const updateRole = '/backend/userManage/updateRole'  //修改角色

export const resourceList = '/backend/resourceManage/resourceList'  //菜单管理分页查询

export const findFatherResourceList = '/backend/resourceManage/findFatherResourceList'  //查询所有一级菜单

export const foundTresource = '/backend/resourceManage/foundTresource'  //新建菜单

export const findTresourceById = '/backend/resourceManage/findTresourceById'  //查询菜单信息

export const deleteRoleCarte = '/backend/resourceManage/deleteTresource'  //删除菜单

export const freezeTresource = '/backend/resourceManage/freezeTresource'  //菜单冻结/。解冻

export const queryAgentByUserId = '/backend/agentArea/queryAgentByUserId'  //渠道商类型转换获取信息

export const agentTypeAlert = '/backend/agentArea/agentTypeAlert'  //渠道商类型修改






