<template>
	<el-row class="list-content">
		<el-col>
			<div class="ibox-title">
				<h5>渠道信息</h5>
			</div>
		</el-col>
		<el-col class="ibox-content">
			<el-form label-width="200px">
				<h5>基本信息</h5>
				<el-form-item label="姓名：" >
					<el-col :span="12">
						<el-input v-model="ruleForm.name" readonly></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="电话：">
					<el-col :span="12">
						<el-input v-model="ruleForm.userPhone" readonly></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="地址：">
					<el-col :span="12">
						<el-input v-model="ruleForm.address" readonly></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="渠道地区：" :class="className" v-if="agentType!=4">
					<el-col :span="12">
						<el-input v-model="agentArea" readonly></el-input>
					</el-col>
				</el-form-item>

				<h5>返佣人信息</h5>
				<el-form-item label="账户名称：">
					<el-col :span="12">
						<el-input v-model="ruleForm.servantName" readonly></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="开户银行：">
					<el-col :span="12">
						<el-input v-model="ruleForm.servantBank" readonly></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="银行账户：">
					<el-col :span="12">
						<el-input v-model="ruleForm.servantBankAccount" readonly></el-input>
					</el-col>
				</el-form-item>
				<!-- <el-form-item label="一级返佣：">
					<el-col :span="12">
						<el-input type="number" v-model="ruleForm.oneRebate" readonly></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="二级返佣：">
					<el-col :span="12">
						<el-input type="number" v-model="ruleForm.twoRebate" readonly></el-input>
					</el-col>
				</el-form-item> -->

				<h5>企业基本信息</h5>
				<el-form-item label="企业名称：">
					<el-col :span="12">
						<el-input v-model="ruleForm.enterpriceName" readonly></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="企业统一社会信用代码：">
					<el-col :span="12">
						<el-input v-model="ruleForm.creditCode" readonly></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="法人身份证正面：">
					<el-col :span="12">
						<img :src="ruleForm.idCardFrontUrl" width="200" />
					</el-col>
				</el-form-item>
				<el-form-item label="法人身份证反面：">
					<el-col :span="12">
						<img :src="ruleForm.idCardBackUrl" width="200"/>
					</el-col>
				</el-form-item>
				<el-form-item label="企业三证合一扫描：">
					<el-col :span="12">
						<img :src="ruleForm.threeCardUrl" width="200"/>
					</el-col>
				</el-form-item>
				<el-form-item label="合同：">
					<el-col :span="4" style="width: 220px;" v-for="(item,index) in ruleForm.contractUrl" :key="index" >
						<img :src="item" width="200"/>
					</el-col>
				</el-form-item>
				<el-form-item label="合同2：">
          <el-col :span="4" style="width: 220px;" v-for="(item,index) in ruleForm.contract2Url" :key="index">
            <img :src="item" width="200"/>
          </el-col>
        </el-form-item>

				<el-form-item>
					<el-button size="mini" class="btn-primary" icon="el-icon-check" @click="back">返回</el-button>
				</el-form-item>

			</el-form>
		</el-col>

	</el-row>
</template>

<script>
	import { REST } from 'api';
  import store from 'store'

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
				let type = store.get('SELECT_TYPE');
				let url = '';
// 				if(type == 'apply') 
// 					url = 'agentApplyInfo'
// 				else 
// 					url = 'agentInfo'
				if(type=='apply') {
					REST.agentApplyInfo({
						id:id
					}).then(function(res){
						if(res.success){
							let data = res.data;
							_this.agentType = data.agentType;
							_this.ruleForm = data;
							_this.ruleForm.contractUrl = JSON.parse(_this.ruleForm.contractUrl);
							_this.ruleForm.contract2Url = JSON.parse(_this.ruleForm.contract2Url);
							_this.type = data.type;
							if(_this.type != '4'){
								_this.className = 'isShow';
								if(data.agentProvince) {
										_this.agentArea = data.agentProvince;
									if(data.agentCity) {
										_this.agentArea = data.agentProvince + "/" + data.agentCity;
										if(data.agentArea){
											_this.agentArea = data.agentProvince + "/" + data.agentCity + "/" + data.agentArea;
										}
									}
								}
								
							}else{
								_this.className = 'noShow';
							}
						}
					})
				}else {
					REST.agentInfo({
						id:id
					}).then(function(res){
						if(res.success){
							let data = res.data;
							_this.agentType = data.agentType;
							_this.ruleForm = data;
							_this.ruleForm.contractUrl = JSON.parse(_this.ruleForm.contractUrl);
							_this.ruleForm.contract2Url = JSON.parse(_this.ruleForm.contract2Url);
							_this.type = data.type;
							if(_this.type != '4'){
								_this.className = 'isShow';
								if(data.agentProvince) {
										_this.agentArea = data.agentProvince;
									if(data.agentCity) {
										_this.agentArea = data.agentProvince + "/" + data.agentCity;
										if(data.agentArea){
											_this.agentArea = data.agentProvince + "/" + data.agentCity + "/" + data.agentArea;
										}
									}
								}
								
							}else{
								_this.className = 'noShow';
							}
						}
					})
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
