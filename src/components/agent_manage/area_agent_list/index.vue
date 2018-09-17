<template>
	<el-row class="list-content">
		<el-col>
			<div class="ibox-title">
				<h5>区域渠道列表</h5></div>
		</el-col>

		<el-col>
			<form class="form-horizontal m-t" id="commentForm">
				<el-row :gutter="20" class="ibox-content">
					<el-col :span="3" class="control-label">检查排序：</el-col>
					<el-col :span="3">
						<el-select v-model="statusValue" placeholder="请选择" class="form-control" id="status" name="status" @change="statusChange">
							<el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="3">
						<el-select v-model="rankValue" placeholder="请选择" class="form-control" id="alId" name="alId" @change="rankChange">
							<el-option v-for="item in rank" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="3" class="control-label">分类搜索：</el-col>
					<el-col :span="3">
						<el-select v-model="searchValue" placeholder="请选择" class="form-control" id="searchs" name="searchs" @change="searchChange">
							<el-option v-for="item in search" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>

					<el-col :span="3">
						<el-input id="end" v-model="input" placeholder="请输入内容"></el-input>
					</el-col>
					<el-col :span="3">
						<el-button class="btn-primary" @click="searchForm">查询</el-button>
					</el-col>
				</el-row>
			</form>
		</el-col>
		<el-col class="ibox-content">
			<el-table border stripe class="list"
				:data="tableData"
				:header-row-class-name="tableHeader">
				<el-table-column prop="id" label="伙伴账号"></el-table-column>
				<el-table-column prop="enterpriceName" label="企业名称"></el-table-column>
				<el-table-column prop="type" label="分类">
					<template slot-scope="scope">
						{{ scope.row.type | classifyFilter }}
					</template>
				</el-table-column>

        <el-table-column label="区域" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.agentProvince}}{{scope.row.agentCity}}{{scope.row.agentArea}}</span>
          </template>
        </el-table-column>

				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="userPhone" label="联系方式"></el-table-column>
				<el-table-column prop="createTime" label="加入时间" width="151">
					<template slot-scope="scope">
				        {{ scope.row.createTime | formatDate }}
				    </template>
				</el-table-column>
        <el-table-column label="可提现余额" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.balance | currency(2, '￥')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="佣金" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.accumulatedMoney | currency(2, '￥')}}</span>
          </template>
        </el-table-column>


        <el-table-column prop="recommendCount" label="月推荐数"></el-table-column>

				<el-table-column prop="status" label="当前状态">
					<template slot-scope="scope">
						{{ scope.row.status | statusFilter }}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="181">
					<template slot-scope="scope">
						<el-button size="mini" class="btn-primary" icon="el-icon-search" @click="goToDetail(scope.$index, scope.row)">查看</el-button>
						<el-button size="mini" class="btn-primary" icon="el-icon-edit" @click="goToEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" class="btn-primary el-btn" icon="el-icon-edit" @click="frozen(scope.$index, scope.row)">冻结</el-button>
						<el-button size="mini" class="btn-primary el-btn" icon="el-icon-edit" @click="thaw(scope.$index, scope.row)">解冻</el-button>
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

	</el-row>
</template>

<script>
	import pagination from '@/base/pagination';
	import axios from 'axios';
	import { REST } from 'api';
	import store from 'store';
	import {formatDate} from '@/common/js/date.js';

	export default {
		components: {
			pagination
		},
		data(){
			return {
				statusValue: '',
				status: [{
					value: '',
					label: '所有状态'
				}, {
					value: '3',
					label: '审核中'
				}, {
					value: '1',
					label: '正常'
				}, {
					value: '2',
					label: '冻结'
				}],
				searchValue: '',
				search: [{
					value: '0',
					label: '企业名称'
				}, {
					value: '1',
					label: '联系方式'
				}],
				rankValue: '',
				rank: [{
					value: '',
					label: '所有等级'
				}, {
					value: '1',
					label: '省级'
				}, {
					value: '2',
					label: '市级'
				}, {
					value: '3',
					label: '县级'
				}],
				input: '',
				tableData: [],
				total: 0,
				seachObj: {
					page: 1,
					pageSize: 10
				},
				currentPage:1
			}
		},
		created() {
			let _this = this;
			let token = store.get('__HXHY_MANAGER_TOKEN__')
			REST.arealist({
				pageNum:_this.seachObj.page,
				pageSize:_this.seachObj.pageSize
			}).then(function (res){
				if(res.success){
					_this.total = res.resultSet;
					_this.tableData = res.data;
				}
			})
		},
		methods: {
			//查看
			goToDetail(index,row){
        store.set('SELECT_ID', row.id);
				store.set('SELECT_TYPE', 'detail');
				this.$router.push(
					{
						name: 'agent_info',
						params: {id: row.id, backUrl: '/agent_manage/area_agent_list'}
					});
			},
			//编辑
			goToEdit(index,row) {
				store.set('SELECT_ID', row.id);
				this.$router.push({
					name: 'agent_edit',
					params: {
						id: row.id,
						backUrl: '/agent_manage/area_agent_list'
					},
				})
			},
			//解冻
			thaw(index,row){
				let _this = this;
				_this.frozen_and_thaw(_this,1,index,row);
			},
			//冻结
			frozen(index,row){
				let _this = this;
				_this.frozen_and_thaw(_this,2,index,row);
			},
			//每页的数量
			handleSizeChange(val) {
				let _this = this;
		        _this.seachObj.pageSize = val;
		        let pageNum = _this.seachObj.page;
		        let status = _this.statusValue;
		        let rankValue = _this.rankValue;
		        _this.requestFn(_this,pageNum,val,rankValue,status);
	      	},
	      	//页码
		    handleCurrentChange(val) {
		        let _this = this;
		        _this.seachObj.page = val;
		        let pageSize = _this.seachObj.pageSize;
		        let status = _this.statusValue;
		        let rankValue = _this.rankValue;
		        _this.requestFn(_this,val,pageSize,rankValue,status);
		    },
			//选择状态
			statusChange(val){
				let _this = this;
				_this.statusValue = val;
				let pageNum = _this.seachObj.page;
		        let pageSize = _this.seachObj.pageSize;
		        let rankValue = _this.rankValue;
				_this.requestFn(_this,pageNum,pageSize,rankValue,val);
			},
			//选择等级
			rankChange(val){
				let _this = this;
				_this.rankValue = val;
				let pageNum = _this.seachObj.page;
		        let pageSize = _this.seachObj.pageSize;
		        let status = _this.statusValue;
		        _this.requestFn(_this,pageNum,pageSize,val,status);
			},
			//搜索类别
			searchChange(val){
				this.searchValue = val;
			},
			//查询事件
			searchForm(){
				let _this = this;
				let str = _this.input;
				let status = _this.statusValue;
				let rankValue = _this.rankValue;
				let pageNum = _this.seachObj.page;
				let pageSize = _this.seachObj.pageSize;
				if(_this.searchValue === '0'){
					_this.requestFn(_this,pageNum,pageSize,rankValue,status,str);
					return
				}
				if(_this.searchValue === '1'){
					_this.requestFn(_this,pageNum,pageSize,rankValue,status,'',str);
					return
				}
			},
			//解冻(1)/冻结(2)函数
			frozen_and_thaw(_this,num,index,row){
				//let page = _this.seachObj.page;
				if(row.status != num){
					REST.frozen_and_thaw({
						id:row.id,
						status:num
					}).then(function(res){
						if(res.success){
							_this.requestFn(_this,1,_this.seachObj.pageSize,_this.rankValue,_this.statusValue);
						}
					})
				}
			},
			//区域居间列表请求
			requestFn(_this,pageNum=1,pageSize=1,rankValue='',status='',enterpriceName='',userPhone=''){
				REST.arealist({
					pageNum:pageNum,
					pageSize:pageSize,
					type:rankValue,
					status:status,
					enterpriceName:enterpriceName,
					userPhone:userPhone
				}).then(function (res){
					if(res.success){
						_this.total = res.resultSet;
						_this.tableData = res.data;
					}
				})
			},
			//头部样式
			tableHeader({row, rowIndex}){
				if(rowIndex == 0){
					return 'headerStyle';
				}
			}
		},
		filters: {
	        formatDate(time) {
	            var date = new Date(time);
	            return formatDate(date, 'yyyy-MM-dd hh:mm');
	        },
	        statusFilter(status){
	        	if(status == 0){
	        		return '审核中'
	        	}else if(status == 1){
	        		return '正常'
	        	}else if(status == 2){
	        		return '冻结'
	        	}
	        },
	        classifyFilter(type){
	        	if(type == 1){
	        		return '省代'
	        	}else if(type == 2){
	        		return '市代'
	        	}else if(type == 3){
	        		return '县代'
	        	}
	        }
	    }
	}
</script>
<style scoped>
	.el-table .headerStyle{
		text-align: center;
	}

	.el-table >>> th{
		text-align: center;
	}
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
