<template>
	<el-row class="list-content">
		<el-col>
			<div class="ibox-title">
				<h5>渠道居间列表</h5></div>
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
			<el-table border stripe class="list" :data="tableData">
				<el-table-column prop="id" label="伙伴账号"></el-table-column>
				<el-table-column prop="enterpriceName" label="企业名称"></el-table-column>
				<el-table-column prop="type" label="分类">
					<template slot-scope="scope">
						{{ scope.row.type | classifyFilter }}
					</template>
				</el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="userPhone" label="联系方式"></el-table-column>

        <el-table-column prop="ext" label="上级ID"></el-table-column>

        <el-table-column prop="topPhone" label="上级联系方式"></el-table-column>

        <el-table-column prop="monthRecommendSum" label="月推荐人数"></el-table-column>

				<el-table-column prop="createTime" label="加入时间" width="151">
					<template slot-scope="scope">
				        {{ scope.row.createTime | formatDate }}
				    </template>
				</el-table-column>
				<el-table-column prop="status" label="当前状态">
					<template slot-scope="scope">
						{{ scope.row.status | statusFilter }}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="181">
					<template slot-scope="scope">
						<el-button size="mini" class="btn-primary" icon="el-icon-search" @click="goToDetail(scope.$index, scope.row)">查看</el-button>
						<el-button size="mini" class="btn-primary" icon="el-icon-edit">编辑</el-button>
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
	import axios from 'axios';
	import { REST } from 'api';
	import store from 'store';
	import {formatDate} from '@/common/js/date.js';

	export default {
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
			REST.middlemanlist({
				pageNum:_this.seachObj.page,
				pageSize:_this.seachObj.pageSize,
				higherLevelType:'4'
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
        store.set('SELECT_ID', row.id)
				this.$router.push(
					{
						name: 'area_info',
						params: {id: row.id, backUrl: '/middleman_manage/middleman_channel_list'}
					});
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
		        _this.requestFn(_this,pageNum,val,status);
	      	},
	      	//页码
		    handleCurrentChange(val) {
		        let _this = this;
		        _this.seachObj.page = val;
		        let pageSize = _this.seachObj.pageSize;
		        let status = _this.statusValue;
		        // _this.requestFn(_this,val,pageSize,status);
		        REST.middlemanlist({
					pageNum:_this.seachObj.page,
					pageSize:_this.seachObj.pageSize,
					status:_this.statusValue,
					higherLevelType:'4',
				}).then(function (res){
					if(res.success){
						_this.total = res.resultSet;
						_this.tableData = res.data;
					}
				})
		    },
			tableRow({row,rowIndex}) {
				if(rowIndex % 2 === 0) {
					return 'mark_row';
				}
			},
			//四个状态
			statusChange(val){
				let _this = this;
				_this.statusValue = val;
				let pageNum = _this.seachObj.page;
		        let pageSize = _this.seachObj.pageSize;
				_this.requestFn(_this,pageNum,pageSize,val);
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
				if(_this.searchValue === '0'){
					_this.requestFn(_this,_this.seachObj.page,_this.seachObj.pageSize,status,str);
					return
				}
				if(_this.searchValue === '1'){
					_this.requestFn(_this,_this.seachObj.page,_this.seachObj.pageSize,status,'',str);
					return
				}
			},
			//渠道居间列表请求
			requestFn(_this,pageNum=1,pageSize=1,status='',enterpriceName='',userPhone=''){
				REST.middlemanlist({
					pageNum:pageNum,
					pageSize:pageSize,
					status:status,
					enterpriceName:enterpriceName,
					userPhone:userPhone,
					higherLevelType:'4',
				}).then(function (res){
					if(res.success){
						_this.total = res.resultSet;
						_this.tableData = res.data;
					}
				})
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
							_this.requestFn(_this,1,_this.seachObj.pageSize,_this.statusValue);
						}
					})
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
	        	if(type == 5){
	        		return '一级'
	        	}else if(type == 6){
	        		return '二级'
	        	}
	        }
	    }
	}
</script>
<style scoped="scoped">
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
