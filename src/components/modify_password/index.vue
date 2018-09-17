<template>
	<el-row class="list-content">
		<el-col class="ibox-content">
			<el-form label-width="200px" :model="info" ref="passwordForm" :rules="rules">
				<h5>修改密码</h5>
				<el-form-item label="原密码：" prop="oldPwd">
					<el-col :span="12">
						<el-input v-model="info.oldPwd" type="password"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="新密码：" prop="newPwd">
					<el-col :span="12">
						<el-input v-model="info.newPwd" type="password"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="确认密码：" prop="confirmPwd">
					<el-col :span="12">
						<el-input v-model="info.confirmPwd" type="password"></el-input>
					</el-col>
				</el-form-item>

				<el-form-item>
					<el-button size="mini" class="btn-primary" @click="submit">提交</el-button>
				</el-form-item>

			</el-form>
		</el-col>

	</el-row>
</template>

<script>
	import { REST } from 'api';

	export default {
		data() {
			return {
				info: {
					oldPwd: '',
					newPwd: '',
					confirmPwd: ''
				},
				rules: {
					oldPwd: [
						{required: true,message: '请输入您的旧密码',trigger: 'blur'}
					],
					newPwd: [
						{required: true,message: '请输入您的新密码',trigger: 'blur'}
					],
					confirmPwd: [
						{required: true,message: '请确认您的新密码',trigger: 'blur'}
					]
				}
			}
		},
		methods: {
			submit() {
				let _this = this;
				//表单提交
				_this.$refs.passwordForm.validate((valid) => {
					if(valid) {
						if(_this.info.newPwd == _this.info.confirmPwd){
							REST.modify_pwd({
								oldPwd:_this.info.oldPwd,
								newPwd:_this.info.newPwd
							}).then(function(res){
								if(res.success){
									_this.$alert('修改密码成功', '提示', {
							          confirmButtonText: '确定',
							          callback: action => {
							            _this.$router.push({ path: '/login' });
							          }
							        });
								}
							})
						}else{
							_this.$message('您两次输入的新密码不一致,请重新输入');
						}
					} else {
						_this.$message('修改密码失败');
					}
				})
			},
		},
		mounted() {

		}
	}
</script>

<style scoped>

</style>