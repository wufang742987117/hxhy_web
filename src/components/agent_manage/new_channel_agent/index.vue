<template>
	<el-row class="list-content">
		<el-col>
			<div class="ibox-title">
				<h5>新建流量渠道</h5></div>
		</el-col>
		<el-col class="ibox-content">
			<el-form label-width="200px" :model="ruleForm" ref="agentInfo"  :rules="rules">
				<h5>基本信息</h5>

        <el-form-item label="账号：" prop="id">
          <el-col :span="12">
            <el-input v-model="ruleForm.id"></el-input>
          </el-col>
        </el-form-item>
				<el-form-item label="姓名：" prop="name">
					<el-col :span="12">
						<el-input v-model="ruleForm.name"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="电话：" prop="userPhone">
					<el-col :span="12">
						<el-input v-model="ruleForm.userPhone"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="地址：" prop="address">
					<el-col :span="12">
						<el-input v-model="ruleForm.address"></el-input>
					</el-col>
				</el-form-item>

				<h5>返佣人信息</h5>
				<el-form-item label="账户名称：" prop="servantName">
					<el-col :span="12">
						<el-input v-model="ruleForm.servantName"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="开户银行：" prop="servantBank">
					<el-col :span="12">
						<el-input v-model="ruleForm.servantBank"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="银行账户：" prop="servantBankAccount">
					<el-col :span="12">
						<el-input v-model="ruleForm.servantBankAccount"></el-input>
					</el-col>
				</el-form-item>
				<!--<el-form-item label="一级返佣：" prop="oneRebate">
					<el-col :span="12">
						<el-input type="number" v-model="ruleForm.oneRebate"></el-input>
					</el-col>
				</el-form-item>-->
				<!--<el-form-item label="二级返佣：" prop="twoRebate">-->
					<!--<el-col :span="12">-->
						<!--<el-input type="number" v-model="ruleForm.twoRebate"></el-input>-->
					<!--</el-col>-->
				<!--</el-form-item>-->

				<h5>企业基本信息</h5>
				<el-form-item label="企业名称：" prop="enterpriceName">
					<el-col :span="12">
						<el-input v-model="ruleForm.enterpriceName"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="企业统一社会信用代码：" prop="creditCode">
					<el-col :span="12">
						<el-input v-model="ruleForm.creditCode"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item ref="ref_idCardFrontUrl" label="法人身份证正面：" prop="idCardFrontUrl">
					<el-upload
						action="/api/backend/image/uploadImage"
						list-type="picture-card"
						:limit="1"
						:on-exceed="handleExceed"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove0"
						:on-success="handleImage0">
						<i class="el-icon-plus"></i>
						<div slot="tip" class="el-upload__tip">(图片名称不能包含汉字)</div>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item ref="ref_idCardBackUrl" label="法人身份证反面：" prop="idCardBackUrl">
					<el-upload
						action="/api/backend/image/uploadImage"
						list-type="picture-card"
						:limit="1"
						:on-exceed="handleExceed"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove1"
						:on-success="handleImage1">
						<i class="el-icon-plus"></i>
						<div slot="tip" class="el-upload__tip">(图片名称不能包含汉字)</div>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item ref="ref_threeCardUrl" label="企业三证合一扫描：" prop="threeCardUrl">
					<el-upload
						action="/api/backend/image/uploadImage"
						list-type="picture-card"
						:limit="1"
						:on-exceed="handleExceed"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove2"
						:on-success="handleImage2">
						<i class="el-icon-plus"></i>
						<div slot="tip" class="el-upload__tip">(图片名称不能包含汉字)</div>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item ref="ref_contractUrl" label="合同：" prop="contractUrl">
					<el-upload
						action="/api/backend/image/uploadImage"
						list-type="picture-card"
						:on-exceed="handleExceed"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove3"
						:on-success="handleImage3">
						<i class="el-icon-plus"></i>
						<div slot="tip" class="el-upload__tip">(图片名称不能包含汉字)</div>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item ref="ref_contract2Url" label="合同2：" prop="contract2Url">
					<el-upload
						action="/api/backend/image/uploadImage"
						list-type="picture-card"
						:on-exceed="handleExceed"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove4"
						:on-success="handleImage4">
						<i class="el-icon-plus"></i>
						<div slot="tip" class="el-upload__tip">(图片名称不能包含汉字)</div>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item>
					<el-button size="mini" class="btn-primary" icon="el-icon-check" @click="saveInfo">保存</el-button>
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
				ruleForm: {
					name:'',
					userPhone:'',
					address:'',
					servantName:'',
					servantBank:'',
					servantBankAccount:'',
					oneRebate:'',
					// twoRebate:'',
					enterpriceName:'',
					creditCode:'',
					idCardFrontUrl:'',
					idCardBackUrl:'',
					threeCardUrl:'',
					contractUrl:[],
					contract2Url:[]
				},
				dialogImageUrl: '',
				dialogVisible: false,
				rules: {
          id:[
            {validator:this.validateId, trigger:'blur'}
          ],
					name: [
						{required:true, message:'请输入您的姓名', trigger:'blur'}
					],
					userPhone: [
						{required:true, message:'请输入您的手机号码', trigger:'blur'},
						{validator:this.validateTel, trigger:'blur'}
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
// 					oneRebate: [
// 						{required:true, message:'请输入一级返佣', trigger:'blur'},
// 						{validator:this.validateInt, trigger:'blur'}
// 					],
					// twoRebate: [
					// 	{required:true, message:'请输入二级返佣', trigger:'blur'},
					// 	{validator:this.validateInt, trigger:'blur'}
					// ],
					enterpriceName: [
						{required:true, message:'请输入企业名称', trigger:'blur'},
					],
					creditCode: [
						{required:true, message:'企业统一社会信用代码', trigger:'blur'},
					],
					idCardFrontUrl: [
						{required:true, message:'请上传法人身份证正面', trigger:'blur'},
					],
					idCardBackUrl: [
						{required:true, message:'请上传法人身份证反面', trigger:'blur'},
					],
					threeCardUrl: [
						{required:true, message:'请上传企业三证合一扫描', trigger:'blur'},
					],
					contractUrl: [
						{required:true, message:'请上传合同', trigger:'blur'},
					],
					contract2Url: [
						{required:true, message:'请上传合同2', trigger:'blur'},
					]
				},
			}
		},
		methods: {
			//保存
			saveInfo(){
				let _this = this;
        _this.ruleForm.contractUrl=JSON.stringify(_this.ruleForm.contractUrl);
        _this.ruleForm.contract2Url=JSON.stringify(_this.ruleForm.contract2Url);
				//表单验证方法
				_this.$refs.agentInfo.validate((valid) => {
					console.log(valid)
					if(valid){
						REST.new_channel_agent(_this.ruleForm).then(function(res){
								_this.$message('新建渠道代理成功');
								setTimeout(function(){
									_this.$router.push('/agent_manage/channel_agent_list');
								},1000)
						}, function (err) {
              _this.ruleForm.contractUrl=JSON.parse(_this.ruleForm.contractUrl);
              _this.ruleForm.contract2Url=JSON.parse(_this.ruleForm.contract2Url);
            })
					}else{
						_this.$message('新建渠道代理失败');
					}
				})
			},
			//图片上传
			handleImage0(response, file, fileList){
				if(response.success){
					this.ruleForm.idCardFrontUrl = response.data.src;
//					this.$refs.ref_idCardFrontUrl.clearValidate();
				}
			},
			handleImage1(response, file, fileList){
				if(response.success){
					this.ruleForm.idCardBackUrl = response.data.src;
//					this.$refs.ref_idCardBackUrl.clearValidate();
				}
			},
			handleImage2(response, file, fileList){
				if(response.success){
					this.ruleForm.threeCardUrl = response.data.src;
//					this.$refs.ref_threeCardUrl.clearValidate();
				}
			},
			handleImage3(response, file, fileList){
				if(response.success){
					// this.ruleForm.contractUrl = response.data.src;
          this.ruleForm.contractUrl.push(
              response.data.src
          )
				}
			},
			handleImage4(response, file, fileList){
				if(response.success){
          this.ruleForm.contract2Url.push(
            response.data.src
          )
				}
			},
			handleRemove0(file, fileList) {
				if(file.response.success){
					this.ruleForm.idCardFrontUrl = '';
				}
			},
			handleRemove1(file, fileList) {
				if(file.response.success){
					this.ruleForm.idCardBackUrl = '';
				}
			},
			handleRemove2(file, fileList) {
				if(file.response.success){
					this.ruleForm.threeCardUrl = '';
				}
			},
			handleRemove3(file, fileList) {
				// if(file.response.success){
				// 	this.ruleForm.contractUrl = '';
				// }
        let dele_url = file.response.data.src;
        for(var i=0;i<this.ruleForm.contractUrl.length;i++) {
          if(this.ruleForm.contractUrl[i] == dele_url) {
            delete this.ruleForm.contractUrl[i];
          }
        }
        for(var i=0; i<this.ruleForm.contractUrl.length; i++){
          if(this.ruleForm.contractUrl[i] == "" || typeof(this.ruleForm.contractUrl[i]) == "undefined"){
            this.ruleForm.contractUrl.splice(i,1);
            i--;
          }
        }
			},
			handleRemove4(file, fileList) {
        let dele_url = file.response.data.src;
        for(var i=0;i<this.ruleForm.contract2Url.length;i++) {
          if(this.ruleForm.contract2Url[i] == dele_url) {
            delete this.ruleForm.contract2Url[i];
          }
        }
        for(var i=0; i<this.ruleForm.contract2Url.length; i++){
          if(this.ruleForm.contract2Url[i] == "" || typeof(this.ruleForm.contract2Url[i]) == "undefined"){
            this.ruleForm.contract2Url.splice(i,1);
            i--;
          }
        }
			},
			handlePictureCardPreview(file) {
				console.log(file)
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			//上传图片超过一张时的操作
			handleExceed(files, fileList) {
				this.$message.warning('只上传一张图片！');
			},
			//验证手机号码
			validateTel(rule,value,callback){
				var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!reg.test(value)){
					callback(new Error('请输入正确的手机号码'));
				}else{
					callback();
				}
			},


      // 验证id
      validateId(rule,value,callback) {
			  let _this = this;
        _this.value = value;
        var reg =/^[1-9]\d*$/;
        if(value&&!reg.test(value) || value&&value.length!=8){
          callback(new Error('用户ID需为八位数的正整数'));
        }else{
          REST.queryUserIdIsExist({id:_this.value}).then(function(res){
            callback();
          }, function (err) {
            callback(new Error('该ID已被占用'));
          })
        }
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
			//验证返佣比例是否是整数
			validateInt(rule,value,callback){
				var reg = /^(?:0|[1-9][0-9]?|100)$/;
				if(!reg.test(value)){
					callback(new Error('请输入100以内的整数'));
				}else{
					callback();
				}
			},

		},
		mounted() {

		}
	}
</script>

<style scoped>

</style>
