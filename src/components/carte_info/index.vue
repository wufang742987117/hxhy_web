<template>
	<el-row class="list-content">
		<el-col>
			<div class="ibox-title">
				<h5>菜单信息</h5>
			</div>
		</el-col>
		<el-col class="ibox-content">
			<el-form label-width="200px">
				<h5>基本信息</h5>
				<el-form-item label="菜单编码：" >
					<template slot-scope="scope">
						{{ruleForm.resourceId}}
					</template>
				</el-form-item>
				<el-form-item label="菜单名称：">
					<template slot-scope="scope">
						{{ruleForm.resourceName}}
					</template>
				</el-form-item>
				<el-form-item label="创建时间：">
					<template slot-scope="scope">
						{{ruleForm.createTime | formatDate }}
					</template>
				</el-form-item>
				<el-form-item label="节点code：">
					<template slot-scope="scope">
						{{ruleForm.resourceCode}}
					</template>
				</el-form-item>
				
				<el-form-item label="菜单排序：">
					<template slot-scope="scope">
						{{ruleForm.menuIndex}}
					</template>
				</el-form-item>
				<el-form-item label="是否叶节点：">
					<template slot-scope="scope">
						{{ruleForm.isLeaf | formatisLeaf }}
					</template>
				</el-form-item>
				<el-form-item label="节点code：">
					<template slot-scope="scope">
						{{ruleForm.resourceCode}}
					</template>
				</el-form-item>
				
				<el-form-item label="父节点code：">
					<template slot-scope="scope">
						{{ruleForm.fatherResource}}
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
			REST.findTresourceById({
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
				if(status == 1) {
					return '正常'
				} else if(status == 2) {
					return '冻结'
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

<style scoped>
	.isShow{
		display: block;
	}
	.noShow{
		display: none;
	}
</style>
