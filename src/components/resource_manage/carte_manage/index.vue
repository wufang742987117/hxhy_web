<template>
	<el-row class="list-content">
		<el-col>
			<div class="ibox-title">
				<h5>菜单列表</h5></div>
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
				<el-table-column prop="resourceId" label="资源编码" align="center"></el-table-column>
				<el-table-column prop="resourceName" label="资源名称" align="center"></el-table-column>
				<el-table-column prop="resourceCode" label="节点CODE" align="center"></el-table-column>
				<el-table-column prop="fatherResource" label="父节点CODE" align="center"></el-table-column>
				<el-table-column prop="menuIndex" label="菜单排序" align="center"></el-table-column>
				<el-table-column prop="createTime" label="是否叶节点" width="151" align="center">
					<template slot-scope="scope">
						{{ scope.row.isLeaf | formatisLeaf }}
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

				<el-table-column label="操作" width="181" align="center">
					<template slot-scope="scope">
						<el-button size="mini" class="btn-primary" icon="el-icon-search" @click="goToDetail(scope.$index, scope.row)">查看</el-button>
						<el-button size="mini" class="btn-primary" icon="el-icon-edit" readonly disabled  @click="goToEdit(scope.$index, scope.row)" >编辑</el-button>
						<el-button style="width: 57px;" size="mini" type="danger" icon="el-icon-warning" @click="frozen(scope.$index, scope.row)">
							<span v-if="scope.row.status=='1'">冻结</span>
							<span v-if="scope.row.status=='0'">解冻</span>
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
		
		<el-dialog title="新建菜单" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				
				<el-form-item label="节点类型" :label-width="formLabelWidth">
				<el-select placeholder="请选择节点类型" v-model="form.type" @change="onselectType($event)">
					<el-option label="一级节点" :value="1"></el-option>
					<el-option label="二级节点" :value="2"></el-option>
				</el-select>
				</el-form-item>
				
				<el-form-item label="父节点code" :label-width="formLabelWidth"  v-if="form.type=='2'">
				<el-select v-model="form.fatherResource" placeholder="请选择父节点">
					<el-option  v-for="item in roleIdArr" :key="item.resourceCode" :label="item.resourceName" :value="item.resourceCode"></el-option>
				</el-select>
				</el-form-item>
				<el-form-item label="资源code" :label-width="formLabelWidth">
				<el-input v-model="form.resourceCode" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="资源名称" :label-width="formLabelWidth">
				<el-input v-model="form.resourceName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="菜单排序" :label-width="formLabelWidth">
				<el-input v-model="form.menuIndex" auto-complete="off"></el-input>
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
			REST.resourceList({
				pageNo: _this.seachObj.page,
				pageSize: _this.seachObj.pageSize,
			}).then(function(res) {
				if(res.success) {
					_this.total = res.totalCount;
					_this.tableData = res.data;
				}
			});
			
		},
		methods: {
			
			//选择节点级别
			onselectType(e) {
				let _this = this;
				if(e == '2') {
					REST.findFatherResourceList().then(function(res) {
						if(res.success) {
							_this.roleIdArr = res.data;
						}
					})
				}
			},
			
			//查看
			goToDetail(index, row) {
				store.set('SELECT_ID', row.resourceId);
				this.$router.push({
					name: 'carte_info',
					params: {
						id: row.resourceId,
						backUrl: '/user_manage/carte_manage'
					}
				});
			},
			
			dialogShow() {
				let _this = this;
				_this.dialogFormVisible = true;
			},
			//删除
			deletes(index,row) {
				 let _this = this;
				 _this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  REST.deleteRoleCarte({id:row.resourceId}).then(function(res) {
					  if(res.success) {
						  _this.$message({
						  type: 'success',
						  message: '删除成功!'
						  });
						  _this.handleCurrentChange(1);
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
				if(!this.form.type) {
					this.$message('请选择节点类型');
					return;
				}
				if(this.form.type=='2'&&!this.form.fatherResource) {
					this.$message('请选择父节点');
					return;
				}
				if(!this.form.resourceCode) {
					this.$message('请输入资源code');
					return;
				}
				if(!this.form.resourceName) {
					this.$message('请输入资源名称');
					return;
				}
				if(!this.form.menuIndex) {
					this.$message('请输入菜单排序');
					return;
				}
				
				
// 				this.$message({
// 				  message: '新建成功',
// 				  type: 'success'
// 				})
				if(this.form.type=='2') {
					this.form.isLeaf = 1;
				}else {
					this.form.isLeaf = 0;
					this.form.fatherResource = '';
				}
				let _this = this;
				REST.foundTresource({
					resourceCode: this.form.resourceCode,
					resourceName: this.form.resourceName,
					fatherResource: this.form.fatherResource,
					isLeaf:this.form.isLeaf,
					menuIndex:this.form.menuIndex
					
				}).then(function(res) {
					if(res.success) {
						_this.$message({
						  message: '新建成功',
						  type: 'success'
						})
						_this.dialogFormVisible = false;
						REST.resourceList({
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

			},
			
		
			//冻结
			frozen(index, row) {
				let _this = this;
				if(row.status==0) {
					_this.frozen_and_thaw(_this, 1, index, row);
				}else if(row.status==1) {
					_this.frozen_and_thaw(_this, 0, index, row);
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
				REST.resourceList({
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
			requestFn(_this, pageNo = 1, pageSize = 1) {
				console.log(typeof(id));
				REST.resourceList({
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
					REST.freezeTresource({
						id: row.resourceId,
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
				if(status == 0) {
					return '不可用'
				} else if(status == 1) {
					return '可用'
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
			},
			formatisLeaf(is_leaf) {
				if(is_leaf == 0) {
					return '否'
				} else if(is_leaf == 1) {
					return '是'
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
