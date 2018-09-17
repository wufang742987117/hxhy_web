<template>
	<el-row class="list-content">
	    <el-col>
	      <div class="ibox-title"><h5>区域渠道分级</h5></div>
	    </el-col>

	    <el-col class="ibox-content">
	      	<el-table :data="tableData" class="list" border :row-class-name="tableRow">
		      <el-table-column prop="level" label="分级" width="100"></el-table-column>
		      <el-table-column prop="name" label="命名" width="150"></el-table-column>
		      <el-table-column prop="current_num" label="当前数量" width="150"></el-table-column>
		      <el-table-column prop="remarks" label="备注"></el-table-column>
		      <el-table-column prop="date" label="建立时间" width="250"></el-table-column>
		    </el-table>
	    </el-col>

	</el-row>
</template>

<script>
	import { REST } from 'api';

	export default{
		data(){
			return {
				tableData: [{
		            level: 'Ⅰ',
		            name: '省级',
		            current_num: 0,
		            remarks: '系统默认分级（不可更改）',
		            date: '2018-01-20 11:00:00'
		          }, {
		            level: 'Ⅱ',
		            name: '市级',
		            current_num: 0,
		            remarks: '系统默认分级（不可更改）',
		            date: '2018-01-20 12:00:00'
		          }, {
		            level: 'Ⅲ',
		            name: '县级',
		            current_num: 0,
		            remarks: '系统默认分级（不可更改）',
		            date: '2018-01-20 13:00:00'
		          }]
			}
		},
		methods:{
			tableRow({row,rowIndex}){
				if(rowIndex%2 === 0){
					return 'mark_row';
				}
			}
		},
		mounted(){
			let _this = this;
    		REST.agentnum().then(function(res){
    			if(res.success){
    				let obj = res.data;
//  				let i = 0;
//  				for(var index in obj){
//  					_this.tableData[i].current_num = obj[index];
//  					i++;
//  				}
					_this.tableData[0].current_num = obj.provinceCount;
					_this.tableData[1].current_num = obj.cityCount;
					_this.tableData[2].current_num = obj.countyCount;
    			}
    		})
    	}
	}
</script>

<style scoped>
	.el-table >>> th{
		background: #f5f5f5 !important;
	}
	.el-table >>> .mark_row {
	    background: #f9f9f9;
	}
	.el-table >>> .cell{
		text-align: center;
	}
	.list{
		width: 100%;
		text-align: center;
		border-color: #ebebeb;
	}
</style>
