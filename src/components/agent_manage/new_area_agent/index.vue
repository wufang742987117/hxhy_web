<template>
	<el-row class="list-content">
		<el-col>
			<div class="ibox-title">
				<h5>新建区域渠道</h5></div>
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
				<el-form-item label="级别：" prop="type">
					<el-col :span="12">
						<el-select v-model="ruleForm.type" placeholder="请选择" class="form-control" id="rank" name="rank" @change="rankChange">
							<el-option v-for="item in rank" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
				</el-form-item>

				<el-form-item label="渠道地区：">
					<el-col :span="18">
						<el-select v-model="ruleForm.agentProvince" placeholder="请选择" class="form-control" id="province" name="province" @change="provinceChange">
							<el-option v-for="item in province" :key="item.areaCode" :label="item.areaName" :value="item.caId" v-bind:disabled="item.isAgent==1">
							</el-option>
						</el-select>
						<el-select v-model="ruleForm.agentCity" placeholder="请选择" class="form-control" id="city" name="city" @change="cityChange" :disabled='isCity'>
							<el-option v-for="item in city" :key="item.areaCode" :label="item.areaName" :value="item.caId" v-bind:disabled="item.isAgent==1">
							</el-option>
						</el-select>
						<el-select v-model="ruleForm.agentArea" placeholder="请选择" class="form-control" id="area" name="area" @change="areaChange" :disabled='isArea'>
							<el-option v-for="item in area" :key="item.areaCode" :label="item.areaName" :value="item.caId" v-bind:disabled="item.isAgent==1">
							</el-option>
						</el-select>
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
				rank: [{
					value: '1',
					label: '省级'
				}, {
					value: '2',
					label: '市级'
				}, {
					value: '3',
					label: '县级'
				}],

				province: [],
				city: [],
				area: [],

				provinceCode: '',
				cityCode: '',

				isCity: true,
				isArea: true,

				ruleForm: {
					name:'',
					type:'1',
					agentProvince:'',
					agentCity:'',
					agentArea:'',
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
            {trigger:'blur'}
          ],
					name: [
						{required:true, message:'请输入您的姓名', trigger:'blur'}
					],
					type: [
						{required:true, message:'请选择区域代理的级别', trigger:'change'}
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
				console.log(_this.ruleForm);
				//表单验证方法
				_this.$refs.agentInfo.validate((valid) => {
					console.log(valid)
					if(valid){
						//_this.resetForm('agentInfo');
            _this.ruleForm.contractUrl=JSON.stringify(_this.ruleForm.contractUrl);
            _this.ruleForm.contract2Url=JSON.stringify(_this.ruleForm.contract2Url);
            REST.new_area_agent(_this.ruleForm).then(function (res) {
                  _this.$message('新建代理成功');
                  setTimeout(function(){
                    _this.$router.push('/agent_manage/area_agent_list');

                  },1000)
            }, function (err) {
              _this.ruleForm.contractUrl=JSON.parse(_this.ruleForm.contractUrl);
              _this.ruleForm.contract2Url=JSON.parse(_this.ruleForm.contract2Url);
            })
					}else{
						_this.$message('新建区域代理失败');
					}
				})
			},

			//级别变化时触发
			rankChange(val){
				let _this = this;
				_this.ruleForm.type = val;
				if(val === '1'){
					_this.isCity = true;
					_this.isArea = true;
					_this.city = [];
					_this.area = [];
					_this.ruleForm.agentCity = '';
					_this.ruleForm.agentArea = '';
				}else if(val === '2'){
					_this.isCity = false;
					_this.isArea = true;
					_this.area = [];
					_this.ruleForm.agentArea = '';
					_this.getCityList(_this);
				}else if(val === '3'){
					_this.isCity = false;
					_this.isArea = false;
					_this.getAreaList(_this);
				}
			},

			//省级编码
			provinceChange(val){
				let _this = this;
				let obj = {};
				obj = _this.province.find((item)=>{//这里的province就是上面遍历的数据源
			        return item.caId === val;//筛选出匹配数据
			    });
			    _this.provinceCode = obj.areaCode; //当前省级地区编码
			    _this.ruleForm.agentProvince = val;//当前省级caId
				_this.city = [];
				if(_this.ruleForm.type === '2'){
					_this.getCityList(_this);
				}else if(_this.ruleForm.type === '3'){
					_this.getAreaList(_this);
				}
			},
			//市级编码
			cityChange(val){
				let _this = this;
				let obj = {};
				obj = _this.city.find((item)=>{//这里的city就是上面遍历的数据源
			        return item.caId === val;//筛选出匹配数据
			    });
			    _this.cityCode = obj.areaCode; //当前市区编码
			    _this.ruleForm.agentCity = val;//当前省级caId
				_this.area = [];
				if(_this.ruleForm.type === '3'){
					REST.lowerlist({
						parentAreaCode:_this.cityCode
					}).then(function(res){
						if(res.success){
							_this.area = res.data;
							_this.alreadyAgent(_this.area);
							_this.ruleForm.agentArea = res.data[0].caId;
						}
					})
				}else{
					_this.area = [];
					_this.ruleForm.agentArea = '';
				}
			},
			//县级编码
			areaChange(val){
				let _this = this;
				_this.ruleForm.agentArea = val;
			},

			//根据省级编码获取该省下的市级地址
			getCityList(_this){
				REST.lowerlist({
					parentAreaCode:_this.provinceCode
				}).then(function(res){
					if(res.success){
						_this.city = res.data;
						_this.alreadyAgent(_this.city);
						_this.cityCode = res.data[0].areaCode;
						_this.ruleForm.agentCity = res.data[0].caId;
					}
				})
			},
			//根据市级编码获取该市下的县级地址
			getAreaList(_this){
				REST.lowerlist({
					parentAreaCode:_this.provinceCode
				}).then(function(res){
					if(res.success){
						_this.city = res.data;
						_this.alreadyAgent(_this.city);
						_this.cityCode = res.data[0].areaCode;
						_this.ruleForm.agentCity = res.data[0].caId;

						REST.lowerlist({
							parentAreaCode:_this.cityCode
						}).then(function(res){
							if(res.success){
								_this.area = res.data;
								_this.alreadyAgent(_this.area);
								_this.ruleForm.agentArea = res.data[0].caId;
							}
						})
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
					// this.ruleForm.contract2Url = response.data.src;
//					this.$refs.ref_contract2Url.clearValidate();
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
        console.log(111111,this.ruleForm.contractUrl)
			},
			handleRemove4(file, fileList) {
				// if(file.response.success){
				// 	this.ruleForm.contract2Url = '';
				// }
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
				//console.log(file)
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
			//验证银行卡号
			validateBankCard(rule,value,callback){
        var reg =/^[1-9]\d*$/;
        if(!reg.test(value) || value.length>25){
          callback(new Error('请输入正确的银行账户'));
        }else{
          callback();
        }
			},

      // 验证id
      validateId(rule,value,callback) {
        let _this = this;
        _this.value = value;
        var reg =/^[1-9]\d*$/;
        if(!reg.test(value) || value.length!=8){
          callback(new Error('用户ID需为八位数的正整数'));
        }else{
          REST.queryUserIdIsExist({id:_this.value}).then(function(res){
            callback();
          }, function (err) {
            callback(new Error('该ID已被占用'));
          })
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
			//(已有代理)标注
			alreadyAgent(arr){
				for(var index in arr){
					if(arr[index].isAgent == 1){
						arr[index].areaName += '(已绑定)';
					}
				}
			},
			resetForm(formName) {
		        this.$refs[formName].resetFields();
		    }
		},
		mounted() {
			let _this = this;
			REST.provincedata().then(function(res){
				_this.province = res.data;
				_this.alreadyAgent(_this.province);
				_this.provinceCode = res.data[0].areaCode;
				_this.ruleForm.agentProvince = res.data[0].caId;
			})
		}
	}
</script>

<style scoped>

</style>
