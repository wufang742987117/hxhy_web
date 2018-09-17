<template>
	<el-row class="list-content">
		<el-col>
			<div class="ibox-title">
				<h5>角色列表</h5></div>
		</el-col>

		
		<el-col>
			<form class="form-horizontal m-t" id="commentForm">
				<el-row :gutter="20" class="ibox-content">
					<el-col style="padding: 0;">
						<el-button type="primary"  @click="dialogShow" icon="el-icon-circle-plus-outline">新建</el-button>
					</el-col>
				</el-row>
			</form>
		</el-col>
		
		<el-col class="ibox-content">
			<el-table border stripe class="list" :data="tableData">
				<el-table-column prop="roleName" label="角色" align="center">
					<template slot-scope="scope">
						{{ scope.row.roleName}}
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间"  align="center">
					<template slot-scope="scope">
						{{ scope.row.createTime | formatDate }}
					</template>
				</el-table-column>
				
				<el-table-column prop="status" label="状态" align="center">
					<template slot-scope="scope">
						{{ scope.row.status | statusFilter }}
					</template>
				</el-table-column>
				
				<el-table-column label="操作" width="" align="center">
					<template slot-scope="scope">
						<el-button size="mini" class="btn-primary" icon="el-icon-search" @click="goToDetail(scope.$index, scope.row)">查看</el-button>
						<el-button size="mini" class="btn-primary" icon="el-icon-edit" @click="goToEdit(scope.$index, scope.row)" >编辑</el-button>
						<el-button style="width: 57px;" size="mini" type="danger" icon="el-icon-warning" @click="frozen(scope.$index, scope.row)">
							<span v-if="scope.row.status=='1'">冻结</span>
							<span v-if="scope.row.status=='2'">解冻</span>
						</el-button>
						<el-button size="mini" type="danger" icon="el-icon-delete" @click="deletes(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10, 20, 50, 100]"
				:page-size="seachObj.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</el-col>
		
		<el-dialog title="新建角色" :visible.sync="dialogFormVisible" style="">
			<el-form :model="form">
				<el-form-item label="角色名称:" :label-width="formLabelWidth">
				<el-input v-model="form.roleName" auto-complete="off"></el-input>
				</el-form-item>
				
				<el-form-item label="权限设置:" :label-width="formLabelWidth" >
				<el-tree style="max-height: 400px;overflow-y: auto;"
				  :data="roleIdArr"
				  show-checkbox
				  default-expand-all
				  node-key="id"
				  ref="tree"
				  highlight-current
				  :props="defaultProps">
				</el-tree>
				</el-form-item>
				
				<el-form-item label="备注:" :label-width="formLabelWidth">
				<el-input v-model="form.remark" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="formSubmit">确 定</el-button>
			</div>
		</el-dialog>
	</el-row>
	
	
</template>

<script>
	import axios from 'axios';
	import { REST } from 'api';
	import store from 'store';
	import { formatDate } from '@/common/js/date.js';
	import { Message } from 'element-ui'

	export default {
		data() {
			return {
				dialogFormVisible: false,
				statusValue: '',
				roleIdArr:[],
				searchValue: '',
				search: [{
					value: '0',
					label: '用户ID'
				}, {
					value: '1',
					label: '联系方式'
				}],
				input: '',
				tableData: [],
				total: 0,
				seachObj: {
					page: 1,
					pageSize: 10
				},
				currentPage: 1,
				form: {
				  userName: '',
				  pwd: '',
				  roleId: '',
					resourceIdArr:[]
				},
				formLabelWidth:'120px',
				data2: [{
				  id: 1,
				  label: '一级 1',
				  children: [{
					id: 4,
					label: '二级 1-1'
				  }]
				}, {
				  id: 2,
				  label: '一级 2',
				  children: [{
					id: 5,
					label: '二级 2-1'
				  }, {
					id: 6,
					label: '二级 2-2'
				  }]
				}, {
				  id: 3,
				  label: '一级 3'
				}],
				defaultProps: {
				  children: 'children',
				  label: 'label'
				}
			}
		},
		created() {
			let _this = this;
			let token = store.get('__HXHY_MANAGER_TOKEN__')
			REST.findRoleListe({
				pageNo: _this.seachObj.page,
				pageSize: _this.seachObj.pageSize,
			}).then(function(res) {
				if(res.success) {
					_this.total = res.totalCount;
					_this.tableData = res.data;
				}
			})
		},
		methods: {
			//查看
			goToDetail(index, row) {
				
				store.set('SELECT_ID', row.roleId);
				
				this.$router.push({
					name: 'role_info',
					params: {
						id: row.roleId,
						backUrl: '/user_manage/role_manage'
					}
				});
			},
			
			dialogShow() {
				let _this = this;
				_this.dialogFormVisible = true;
				REST.findTResourceListByStatus().then(function(res) {
					if(res.success) {
						_this.roleIdArr = res.data;
					}
				})
			},
			//删除
			deletes(index,row) {
				 let _this = this;
				 _this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  REST.deleteRole({roleId:row.roleId}).then(function(res) {
					  if(res.success) {
						  _this.$message({
						  type: 'success',
						  message: '删除成功!'
						  });
						  _this.requestFn(_this, 1, _this.seachObj.pageSize);
					  }
				  })
				}).catch(() => {
// 				  _this.$message({
// 					type: 'info',
// 					message: '已取消删除'
// 				  });          
				});
			},
			
			//新建
			formSubmit() {
				console.log(this.$refs.tree.getCheckedKeys());
				let _this = this;
				_this.form.resourceIdArr =  JSON.stringify(this.$refs.tree.getCheckedKeys());
				
				console.log(_this.form.resourceIdArr.substring(0,_this.form.resourceIdArr.length-1).substring(1));
				if(!this.form.roleName) {
					this.$message('请输入角色名称');
					return;
				}
				if(this.$refs.tree.getCheckedKeys().length==0) {
					this.$message('请设置权限菜单');
					return;
				}
				if(!this.form.remark) {
					this.$message('请输入备注');
					return;
				}
				REST.foundRole({
					roleName: _this.form.roleName,
					remark: _this.form.remark,
					resourceIdArr:_this.form.resourceIdArr.substring(0,_this.form.resourceIdArr.length-1).substring(1)
				}).then(function(res) {
					if(res.success) {
						_this.$message({
							message: '新建成功',
							type: 'success'
						})
						_this.dialogFormVisible = false;
						REST.findRoleListe({
							pageNo: _this.seachObj.page,
							pageSize: _this.seachObj.pageSize,
						}).then(function(res) {
							if(res.success) {
								_this.total = res.totalCount;
								_this.tableData = res.data;
							}
						})
					}
				})
// // 				this.$message({
// // 				  message: '新建成功',
// // 				  type: 'success'
// // 				})
// 				let _this = this;
// 				REST.conservatorFound({
// 					userName: this.form.userName,
// 					pwd: this.form.pwd,
// 					roleId: this.form.roleId,
// 				}).then(function(res) {
// 					if(res.success) {
// 						_this.$message({
// 						  message: '新建成功',
// 						  type: 'success'
// 						})
// 						_this.dialogFormVisible = false;
// 						REST.conservatorList({
// 							pageNo: _this.seachObj.page,
// 							pageSize: _this.seachObj.pageSize,
// 						}).then(function(res) {
// 							if(res.success) {
// 								_this.total = res.totalCount;
// 								_this.tableData = res.data;
// 							}
// 						})
// 					}
// 				})
				
			},
			//编辑
			goToEdit(index,row) {
				store.set('SELECT_ID', row.roleId);
				this.$router.push({
					name: 'role_edit',
					params: {
						id: row.roleId,
						backUrl: '/user_manage/role_manage'
					}
				});
			},
			
		
			//冻结
			frozen(index, row) {
				let _this = this;
				if(row.status==1) {
					_this.frozen_and_thaw(_this, 2, index, row);
				}else if(row.status==2) {
					_this.frozen_and_thaw(_this, 1, index, row);
				}
			},
			//每页的数量
			handleSizeChange(val) {
				let _this = this;
				_this.seachObj.pageSize = val;
				_this.seachObj.page = 1;
				let status = _this.statusValue;
				console.log(1111);
				_this.requestFn(_this, 1, val);
			},
			//页码
			handleCurrentChange(val) {
				let _this = this;
				_this.seachObj.page = val;
				let pageSize = _this.seachObj.pageSize;
				let status = _this.statusValue;
				// _this.requestFn(_this,val,pageSize,status);
				REST.findRoleListe({
					pageNo: _this.seachObj.page,
					pageSize: _this.seachObj.pageSize,
				}).then(function(res) {
					if(res.success) {
						_this.total = res.totalCount;
						_this.tableData = res.data;
					}
				})
			},
			//搜索类别
			searchChange(val) {
				this.searchValue = val;
			},
			//查询事件
			searchForm() {
				let _this = this;
				let str = parseInt(_this.input);
				let status = _this.statusValue;
				if(_this.searchValue === '0') {
					if(_this.input)  {
						_this.requestFn(_this, _this.seachObj.page, _this.seachObj.pageSize, status, str);
						
					}
					else {
						_this.requestFn(_this, _this.seachObj.page, _this.seachObj.pageSize);
					}
				}
				if(_this.searchValue === '1') {
					if(_this.input) {
						_this.requestFn(_this, _this.seachObj.page, _this.seachObj.pageSize, status, '', str);
					}
					else {
						_this.requestFn(_this, _this.seachObj.page, _this.seachObj.pageSize);
					}
				}
			},
			
			requestFn(_this, pageNo = 1, pageSize = 1) {
				console.log(typeof(id));
				REST.findRoleListe({
					pageNo: pageNo,
					pageSize: pageSize
				}).then(function(res) {
					if(res.success) {
						_this.total = res.totalCount;
						_this.tableData = res.data;
					}
				})
			},
			//解冻(1)/冻结(2)函数
			frozen_and_thaw(_this, num, index, row) {
				//let page = _this.seachObj.page;
				if(row.status != num) {
					REST.roleFreeze({
						id: row.roleId,
						status: num
					}).then(function(res) {
						if(res.success) {
							_this.requestFn(_this, 1, _this.seachObj.pageSize);
						}
					})
				}
			}
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			},
			statusFilter(status) {
				if(status == 4) {
					return '新建居间'
				} else if(status == 1) {
					return '正常'
				} else if(status == 2) {
					return '冻结'
				} else if(status == 3) {
					return '审核中'
				} 
			},
			roleFilter(roleId) {
				if(roleId == 1) {
					return '超级管理员'
				} else if(roleId == 2) {
					return '财务'
				}
			},
			classifyFilter(type) {
				if(type == 5) {
					return '一级'
				} else if(type == 6) {
					return '二级'
				}
			}
		}
	}
</script>
<style scoped="scoped">
	.el-button--mini {
		padding: 7px !important;
	}

	.el-btn {
		margin-top: 3px;
	}

	.el-button+.el-button {
		margin-left: 0;
	}

	.list {
		width: 100%;
		text-align: center !important;
		border-color: #ebebeb;
	}
</style>
