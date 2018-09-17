<template>
	<el-row class="list-content">
		<el-col>
			<div class="ibox-title">
				<h5>用户信息</h5>
			</div>
		</el-col>
		<el-col class="ibox-content">
			<el-form label-width="200px">
				<h5>基本信息</h5>
				<el-form-item label="用户ID：" >
					<template slot-scope="scope">
						{{ruleForm.id}}
					</template>
				</el-form-item>
				<el-form-item label="联系方式：">
					<template slot-scope="scope">
						{{ruleForm.userPhone}}
					</template>
				</el-form-item>
				<el-form-item label="创建时间：">
					<template slot-scope="scope">
						{{ruleForm.createTime | formatDate }}
					</template>
				</el-form-item>
				<el-form-item label="用户类型：">
					<template slot-scope="scope">
						{{ruleForm.type | typeFilter }}
					</template>
				</el-form-item>
				
				<el-form-item label="状态：">
					<template slot-scope="scope">
						{{ruleForm.status | statusFilter }}
					</template>
				</el-form-item>

				<el-form-item>
					<el-button size="mini" class="btn-primary" icon="el-icon-arrow-left" @click="back">返回</el-button>
				</el-form-item>

			</el-form>
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
        agentType:''
			}
		},
		methods: {
			back(){
        this.$router.back()
	    	},
		},
		mounted() {
			let _this = this;
	    	let id = store.get('SELECT_ID');
			let url = '';
			REST.getFrontUserById({
				id:id
			}).then(function(res){
				_this.ruleForm = res.data;
			})
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
			typeFilter(type) {
				if(type == 0) {
					return '普通用户'
				} else if(type == 1) {
					return '省级代理'
				} else if(type == 2) {
					return '市级代理'
				} else if(type == 3) {
					return '县级代理'
				} else if(type == 4) {
					return '渠道代理'
				}else if(type == 5) {
					return '一级居间'
				} else if(type == 6) {
					return '二级居间'
				}
			}
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
