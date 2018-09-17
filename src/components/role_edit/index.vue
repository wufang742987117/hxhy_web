<template>
	<el-row class="list-content">
		<el-col>
			<div class="ibox-title">
				<h5>角色信息</h5>
			</div>
		</el-col>
		<el-col class="ibox-content">
			<el-form :model="form">
				<el-form-item label="角色名称:" :label-width="formLabelWidth">
				<el-input v-model="ruleFormData.tRole.roleName" auto-complete="off"></el-input>
				</el-form-item>
				
				<el-form-item label="权限设置:" :label-width="formLabelWidth" >
				<el-tree
					:data="ruleFormData.resourceList"
					show-checkbox
					default-expand-all
					node-key="id"
					ref="tree"
					highlight-current
					:props="defaultProps">
				</el-tree>
				</el-form-item>
				
				<el-form-item label="备注:" :label-width="formLabelWidth">
				<el-input v-model="ruleFormData.tRole.remark" auto-complete="off"></el-input>
				</el-form-item>
				
				<el-form-item style="margin-left: 120px;">
					<el-button size="mini" class="btn-primary" icon="el-icon-arrow-left" @click="back">返回</el-button>
					<el-button size="mini" class="btn-primary" icon="el-icon-check" @click="saveInfo">保存</el-button>
				</el-form-item>
			</el-form>
			<!-- <div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="formSubmit">确 定</el-button>
			</div> -->
		</el-col>

	</el-row>
</template>

<script>
	import { REST } from 'api';
	  import store from 'store'
	  import { formatDate } from '@/common/js/date.js';

	export default {
		data() {
			return {
				className:'',
				agentArea:'',
				type: '',
				id: this.$route.params.id,
				backUrl: this.$route.params.backUrl,
				ruleForm: {},
				dialogImageUrl: '',
				dialogVisible: false,
				ruleFormData:{
					tRole:{
						roleName:'',
						remark:''
					},
					resourceList:[]
				},
				roleIdArr:[],
				agentType:'',
				form: {
					userName: '',
					pwd: '',
					roleId: '',
					resourceIdArr:[]
				},
				formLabelWidth:'120px',
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			}
		},
		methods: {
			back(){
				this.$router.back()
	    	},
			saveInfo() {
				let _this = this;
				_this.form.resourceIdArr =  JSON.stringify(this.$refs.tree.getCheckedKeys());
				if(!this.ruleFormData.tRole.roleName) {
					this.$message('请输入角色名称');
					return;
				}
				if(this.$refs.tree.getCheckedKeys().length==0) {
					this.$message('请设置权限菜单');
					return;
				}
				if(!this.ruleFormData.tRole.remark) {
					this.$message('请输入备注');
					return;
				}
				REST.updateRole({
					roleId:store.get('SELECT_ID'),
					roleName: _this.ruleFormData.tRole.roleName,
					remark: _this.ruleFormData.tRole.remark,
					resourceIdArr:_this.form.resourceIdArr.substring(0,_this.form.resourceIdArr.length-1).substring(1)
				}).then(function(res) {
					if(res.success) {
						_this.$message({
							message: '修改成功',
							type: 'success'
						})
						_this.$router.back();
					}
				})
			},
			formSubmit() {
				
			}
		},
		mounted() {
			let _this = this;
	    	let id = store.get('SELECT_ID');
			let url = '';
			REST.queryRoleByRoleid({
				roleId:id
			}).then(function(res){
				_this.ruleFormData = res.data;
				let selectKey = [];
				for(var i=0;i<_this.ruleFormData.resourceList.length;i++) {
// 					if(_this.ruleFormData.resourceList[i].isHave == 1) {
// 						selectKey.push(_this.ruleFormData.resourceList[i].id)
// 					}
					for(var j=0;j<_this.ruleFormData.resourceList[i].children.length;j++) {
						if(_this.ruleFormData.resourceList[i].children[j].isHave == 1) {
							selectKey.push(_this.ruleFormData.resourceList[i].children[j].id)
						}
						else {
							for(var a=0;a<selectKey.length;a++) {
								if(selectKey[a] == _this.ruleFormData.resourceList[i].children[j].id) {
									delete selectKey[a];
								}
							}
						}
					}
				}
				console.log(selectKey);
				_this.$refs.tree.setCheckedKeys(selectKey);
			});
		}
	}
</script>

<style scoped>
	.isShow{
		display: block;
	}
	.noShow{
		display: none;
	}
</style>
