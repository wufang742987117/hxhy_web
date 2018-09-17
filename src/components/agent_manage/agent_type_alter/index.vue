<template>
	<el-row class="list-content">
		<el-col>
			<div class="ibox-title">
				<h5>渠道商类型转换</h5></div>
		</el-col>
		<el-col>
				<form class="form-horizontal m-t" id="commentForm">
					<el-row :gutter="20" class="ibox-content">
						<el-col :span="3">
							<el-input id="end" placeholder="请输入ID" v-model="form.id"></el-input>
						</el-col>
						<el-col :span="3">
							<el-button class="btn-primary" @click="searchForm">查询</el-button>
						</el-col>
					</el-row>
				</form>
			</el-col>
			<el-col class="ibox-content">
				<el-form label-width="200px" :model="ruleForm" ref="agentInfo">
							<el-form-item label="ID：" prop="id">
								<el-col :span="12">
									<el-input v-model="ruleForm.id" readonly disabled></el-input>
								</el-col>
							</el-form-item>
							<el-form-item label="手机号：" prop="userPhone">
								<el-col :span="12">
									<el-input v-model="ruleForm.userPhone" readonly disabled></el-input>
								</el-col>
							</el-form-item>
							<el-form-item label="渠道商类型：" prop="type">
								<el-col :span="12">
									<el-select v-model="ruleForm.type" placeholder="请选择" class="form-control" id="rank" name="rank" @change="rankChange">
										<el-option v-for="item in rank" :key="item.value" :label="item.label" :value="item.value" v-bind:disabled="ruleForm.typeagent == 1&&item.value=='4'">
										</el-option>
									</el-select>
								</el-col>
							</el-form-item>
			
							<el-form-item label="渠道地区：">
								<el-col :span="18">
									<el-select v-model="ruleForm.agentProvince" placeholder="请选择" v-bind:disabled="ruleForm.typeagent!=4||ruleForm.type=='流量'||ruleForm.type=='4'"  class="form-control" id="province" name="province" @change="provinceChange">
										<el-option v-for="item in province" :key="item.areaCode" :label="item.areaName" :value="item.caId" v-bind:disabled="item.isAgent==1">
										</el-option>
									</el-select>
									<el-select v-model="ruleForm.agentCity" placeholder="请选择"  class="form-control" id="city" name="city" @change="cityChange" :disabled='isCity||ruleForm.type=="4"||ruleForm.type=="流量"'>
										<el-option v-for="item in city" :key="item.areaCode" :label="item.areaName" :value="item.caId" v-bind:disabled="item.isAgent==1">
										</el-option>
									</el-select>
									<el-select v-model="ruleForm.agentArea" placeholder="请选择" class="form-control" id="area" name="area" @change="areaChange" :disabled='isArea||ruleForm.type=="4"||ruleForm.type=="流量"'>
										<el-option v-for="item in area" :key="item.areaCode" :label="item.areaName" :value="item.caId" v-bind:disabled="item.isAgent==1">
										</el-option>
									</el-select>
								</el-col>
							</el-form-item>
							
							<el-form-item>
								<!-- <el-button size="mini" class="btn-primary" icon="el-icon-arrow-left"  @click="back">返回</el-button> -->
								<el-button size="mini" class="btn-primary" icon="el-icon-check" @click="resetSubmit">确认</el-button>
							</el-form-item>
						</el-form>
					</el-col>
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
				}, {
					value: '4',
					label: '流量'
				}],

				province: [],
				city: [],
				area: [],

				provinceCode: '',
				cityCode: '',

				isCity: true,
				isArea: true,
				
				form:{
					id:''
				},
				
				
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
					contract2Url:[],
					typeagent:0
				},
				dialogImageUrl: '',
				dialogVisible: false,
			}
		},
		methods: {
			//保存
			resetSubmit(){
				let _this = this;
				REST.agentTypeAlert({id:_this.ruleForm.id,type:_this.ruleForm.type,agentProvince:_this.ruleForm.agentProvinceId,agentCity:_this.ruleForm.agentCity,agentArea:_this.ruleForm.agentArea}).then(function (res) {
				  _this.$message({
						type: 'success',
						message: '重置成功'
					  }); 
				}, function (err) {
				 _this.$message(err.msg);
				})
			},
			back() {
				this.$router.back();
			},
			searchForm() {
				let _this = this;
				REST.queryAgentByUserId({
					id:_this.form.id
				}).then(function(res){
					_this.ruleForm = res.data;
					if(_this.ruleForm.type !=4) {
						_this.ruleForm.agentProvince = _this.ruleForm.agentProvince;
						_this.ruleForm.agentCity = _this.ruleForm.agentCity;
						_this.ruleForm.agentArea = _this.ruleForm.agentArea;
						_this.provinceChange(_this.ruleForm.agentProvince);
						_this.ruleForm.typeagent = 1;
					}else {
						_this.ruleForm.typeagent = 4;
						
					}
					if(_this.ruleForm.type == 1) {
						_this.ruleForm.type = '省级'
						_this.ruleForm.typeagent = 1;
						_this.isCity = true;
						_this.isArea = true;
						_this.rankChange('1');
					}else if(_this.ruleForm.type == 2) {
						_this.ruleForm.type = '市级'
						_this.isCity = false;
						_this.isArea = true;
						_this.ruleForm.typeagent = 1;
						_this.rankChange('2');
					}else if(_this.ruleForm.type == 3) {
						_this.ruleForm.type = '县级'
						_this.ruleForm.typeagent = 1;
						_this.isCity = false;
						_this.isArea = false;
						_this.rankChange('3');
					}else {
						_this.ruleForm.type = '流量'
					}
					if(_this.ruleForm.typeagent == 4&&_this.ruleForm.type == 1) {
						_this.ruleForm.agentProvince = _this.province[0];
					}
				}, function (err) {
				 _this.$message(err.msg);
				})
			},

			//级别变化时触发
			rankChange(val){
				let _this = this;
				_this.ruleForm.type = val;
				console.log(_this.province);
				if(val === '1'){
					if(_this.ruleForm.typeagent == 4) {
						_this.ruleForm.agentProvince = _this.province[0].areaName;
					}
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
					if(_this.ruleForm.typeagent == 4) {
						_this.provinceCode = _this.province[0].areaCode;
						_this.ruleForm.agentProvince = _this.province[0].caId;
					}
					_this.getCityList(_this);
				}else if(val === '3'){
					_this.isCity = false;
					_this.isArea = false;
					if(_this.ruleForm.typeagent == 4) {
						_this.provinceCode = _this.province[0].areaCode;
						_this.ruleForm.agentProvince = _this.province[0].caId;
					}
// 					_this.provinceCode = _this.province[0].areaCode;
// 					_this.ruleForm.agentProvince = _this.province[0].caId;
					_this.getAreaList(_this);
					
				}else if(val === '4') {
					_this.isCity = true;
					_this.isArea = true;
					_this.ruleForm.agentCity = '';
					_this.ruleForm.agentArea = '';
					_this.ruleForm.agentProvince = '';
				}
			},

			//省级编码
			provinceChange(val){
				debugger;
				let _this = this;
				let obj = {};
				console.log(_this.province)
				if(_this.ruleForm.typeagent == 4) {
					obj = _this.province.find((item)=>{//这里的province就是上面遍历的数据源
						return item.caId == val;//筛选出匹配数据
					});
				}else{
					obj = _this.province.find((item)=>{//这里的province就是上面遍历的数据源
						return item.areaName == val;//筛选出匹配数据
					});
				}
				
				console.log(obj);
			    _this.provinceCode = obj.areaCode; //当前省级地区编码
			    _this.ruleForm.agentProvince = val;//当前省级caId
				_this.ruleForm.agentProvinceId = obj.caId;
				_this.city = [];
				if(_this.ruleForm.type === '2'){
					_this.getCityList(_this);
					// _this.cityChange(_this.ruleForm.agentCity);
				}else if(_this.ruleForm.type === '3'){
					_this.getAreaList(_this);
				}
			},
			//市级编码
			cityChange(val){
				debugger
				let _this = this;
				let obj = {};
				if(_this.ruleForm.typeagent == 4) {
					obj = _this.city.find((item)=>{//这里的city就是上面遍历的数据源
						return item.caId == val;//筛选出匹配数据
					});
				}else {
					obj = _this.city.find((item)=>{//这里的city就是上面遍历的数据源
						return item.areaName == val;//筛选出匹配数据
					});
				}
			    _this.cityCode = obj.areaCode; //当前市区编码
			    _this.ruleForm.agentCity = obj.areaName;//当前省级caId
				_this.ruleForm.agentCityId = obj.caId;//当前省级caId
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
			alreadyAgent(arr){
				for(var index in arr){
					if(arr[index].isAgent == 1){
						arr[index].areaName += '(已绑定)';
					}
				}
			},
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
