<template>
	<el-row class="list-content">
		<el-col>
			<div class="ibox-title">
				<h5>渠道信息</h5>
			</div>
		</el-col>
		<el-col class="ibox-content">
			<el-form label-width="200px" :model="ruleForm" ref="agentEdit"  :rules="rules">
				<h5>基本信息</h5>
				<el-form-item label="姓名："  prop="name">
					<el-col :span="12">
						<el-input v-model="ruleForm.name"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="电话：">
					<el-col :span="12">
						<el-input v-model="ruleForm.userPhone" readonly></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="地址：" prop="address">
					<el-col :span="12">
						<el-input v-model="ruleForm.address"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="渠道地区：" :class="className" v-if="agentType!=4">
					<el-col :span="12">
						<el-input v-model="agentArea" readonly></el-input>
					</el-col>
				</el-form-item>

				<h5>返佣人信息</h5>
				<el-form-item label="账户名称：" prop="servantName">
					<el-col :span="12">
						<el-input v-model="ruleForm.servantName" ></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="开户银行：" prop="servantBank">
					<el-col :span="12">
						<el-input v-model="ruleForm.servantBank" ></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="银行账户：" prop="servantBankAccount">
					<el-col :span="12">
						<el-input v-model="ruleForm.servantBankAccount"></el-input>
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
				<el-form-item label="企业名称："  prop="enterpriceName">
					<el-col :span="12">
						<el-input v-model="ruleForm.enterpriceName"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="企业统一社会信用代码：" prop="creditCode">
					<el-col :span="12">
						<el-input v-model="ruleForm.creditCode"></el-input>
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
				<el-button size="mini" class="btn-primary" icon="el-icon-arrow-left" @click="back">返回</el-button>
				<el-button size="mini" class="btn-primary" icon="el-icon-check" @click="saveInfo">保存</el-button>
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
				agentType:'',
				params:{},
				rules: {
					name: [
						{required:true, message:'请输入您的姓名', trigger:'blur'}
					],
					address: [
						{required:true,message:'请输入您的地址,具体到门牌号',trigger:'blur'}
					],
					servantName: [
						{required:true, message:'请输入账户名称', trigger:'blur'}
					],
					servantBank: [
						{required:true, message:'请输入开户银行', trigger:'blur'}
					],
					servantBankAccount: [
						{required:true, message:'请输入银行账户', trigger:'blur'},
						{validator:this.validateBankCard, trigger:'blur'}
					],
					enterpriceName: [
						{required:true, message:'请输入企业名称', trigger:'blur'},
					],
					creditCode: [
						{required:true, message:'企业统一社会信用代码', trigger:'blur'},
					]
				}
			}
		},
		methods: {
			back(){
				this.$router.back()
	    	},
			saveInfo() {
				let _this = this;
				_this.params.id = _this.ruleForm.id;
				_this.params.twoRebate = _this.ruleForm.twoRebate;
				_this.params.name = _this.ruleForm.name;
				_this.params.address = _this.ruleForm.address;
				_this.params.servantName = _this.ruleForm.servantName;
				_this.params.servantBank = _this.ruleForm.servantBank;
				_this.params.servantBankAccount = _this.ruleForm.servantBankAccount;
				_this.params.address = _this.ruleForm.address;
				_this.params.enterpriceName = _this.ruleForm.enterpriceName;
				_this.params.creditCode = _this.ruleForm.creditCode;
				_this.$refs.agentEdit.validate((valid) => {
					if(valid){
						REST.updateAgentAreaInfo(_this.params).then(function(res){
								debugger;
								_this.$message('编辑成功');
								setTimeout(function(){
									_this.$router.back();
								},1000)
						}, function (err) {
							})
					}else{
						_this.$message('新建渠道代理失败');
					}
				})
				
			},
			//验证银行卡号
			validateBankCard(rule,value,callback){
				var reg =/^[1-9]\d*$/;
				if(!reg.test(value) || value.length>25){
					callback(new Error('请输入正确的银行账户'));
				}else{
					callback();
				}
			},
		},
		mounted() {
			let _this = this;
	    	let id = store.get('SELECT_ID');
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
</script>

<style scoped>
	.isShow{
		display: block;
	}
	.noShow{
		display: none;
	}
</style>
