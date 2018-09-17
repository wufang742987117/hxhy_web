<template>
	<el-row class="list-content">
		<el-col>
			<div class="ibox-title">
				<h5>管理员列表</h5></div>
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
				<el-table-column prop="id" label="管理员ID" align="center"></el-table-column>
				<el-table-column prop="roleId" label="角色" align="center">
					<template slot-scope="scope">
						{{ scope.row.roleId | roleFilter }}
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" width="151" align="center">
					<template slot-scope="scope">
						{{ scope.row.createTime | formatDate }}
					</template>
				</el-table-column>
				
				<el-table-column prop="status" label="状态" width="151" align="center">
					<template slot-scope="scope">
						{{ scope.row.status | statusFilter }}
					</template>
				</el-table-column>
				
				<el-table-column prop="userName" label="管理员名称" align="center"></el-table-column>
				<el-table-column label="操作" width="181" align="center">
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
		
		<el-dialog title="新建管理员" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="用户名" :label-width="formLabelWidth">
				<el-input v-model="form.userName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
				<el-input type="password" v-model="form.pwd" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色类型" :label-width="formLabelWidth">
				<el-select v-model="form.roleId" placeholder="请选择角色类型">
					<el-option  v-for="item in roleIdArr" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
				</el-select>
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
// 				status: [{
// 					value: '',
// 					label: '所有状态'
// 				}, {
// 					value: '3',
// 					label: '审核中'
// 				}, {
// 					value: '1',
// 					label: '正常'
// 				}, {
// 					value: '2',
// 					label: '冻结'
// 				}],
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
				},
				formLabelWidth:'120px'
			}
		},
		created() {
			let _this = this;
			let token = store.get('__HXHY_MANAGER_TOKEN__')
			REST.conservatorList({
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
				store.set('SELECT_ID', row.id);
				this.$router.push({
					name: 'conserv_info',
					params: {
						id: row.id,
						backUrl: '/user_manage/conservator_manage'
					}
				});
			},
			
			dialogShow() {
				let _this = this;
				_this.dialogFormVisible = true;
				REST.findRoleListAll().then(function(res) {
					if(res.success) {
						_this.roleIdArr = res.data;
					}
				})
			},
			//删除
			deletes(index,row) {
				 let _this = this;
				 _this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  REST.deleteConservator({id:row.id}).then(function(res) {
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
				// let _this = this;
				if(this.form.userName =='') {
					this.$message('请输入管理员名称');
					return;
				}
				if(this.form.userName.length<5) {
					this.$message('管理员名称最少为5位数');
					return;
				}
				if(this.form.pwd =='') {
					this.$message('请输入密码');
					return;
				}
				if(this.form.roleId =='') {
					this.$message('请设置角色类型');
					return;
				}
// 				this.$message({
// 				  message: '新建成功',
// 				  type: 'success'
// 				})
				let _this = this;
				REST.conservatorFound({
					userName: this.form.userName,
					pwd: this.form.pwd,
					roleId: this.form.roleId,
				}).then(function(res) {
					if(res.success) {
						_this.$message({
						  message: '新建成功',
						  type: 'success'
						})
						_this.dialogFormVisible = false;
						REST.conservatorList({
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
				
			},
			//编辑
			goToEdit(index,row) {
				store.set('SELECT_ID', row.id);
				this.$router.push({
					name: 'conserv_edit',
					params: {
						id: row.id,
						backUrl: '/user_manage/conservator_manage'
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
				REST.conservatorList({
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
				REST.conservatorList({
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
					REST.conservatorFreeze({
						id: row.id,
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
