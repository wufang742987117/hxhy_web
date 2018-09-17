<template>
  <div>
    <el-row class="list-content">
      <el-col>
        <div class="ibox-title"><h5>渠道商待审核列表</h5></div>
      </el-col>

      <el-col>

      </el-col>
      <el-col class="ibox-content">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="用户类型">
            <el-select v-model="seachObj.agentType">
              <el-option label="全部数据" value=""></el-option>
              <el-option label="省级渠道" value="1"></el-option>
              <el-option label="市级渠道" value="2"></el-option>
              <el-option label="县级渠道" value="3"></el-option>
              <el-option label="流量渠道" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryList">查询</el-button>
          </el-form-item>
        </el-form>

        <el-table border stripe size="small" style="width: 100%" :data="data.data">
          <!--<el-table-column prop="id" label="申请时间" align="center"></el-table-column>-->
          <el-table-column prop="frontUserId" label="用户账号" align="center"></el-table-column>
          <el-table-column label="申请时间" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.createTime | date('yyyy-MM-dd HH:mm:ss')}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="姓名" align="center"></el-table-column>

          <el-table-column prop="enterpriceName" label="公司名称" align="center"></el-table-column>

          <el-table-column prop="userPhone" label="联系电话" align="center"></el-table-column>

          <el-table-column prop="creditCode" label="企业统一社会信用代码" align="center"></el-table-column>
					
					<el-table-column prop="checkUser" label="审核人" align="center"></el-table-column>
					
					<el-table-column label="状态" align="center">
						<template slot-scope="scope">
							<el-tag size="mini" :type="stateText[scope.row.isExamine][1]" v-if="!scope.row.memo">{{stateText[scope.row.isExamine][0]}}</el-tag>
							<el-tooltip class="item" effect="dark" :content="scope.row.memo" placement="top" v-else>
								<el-tag size="mini" :type="stateText[scope.row.isExamine][1]">{{stateText[scope.row.isExamine][0]}}</el-tag>
							</el-tooltip>
						</template>
					</el-table-column>

          <el-table-column label="操作" width="181" align="center">
            <template slot-scope="scope">
              <el-button size="mini" class="btn-primary" icon="el-icon-search" @click="goToDetail(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" class="btn-primary"v-if="!scope.row.memo" icon="el-icon-edit" @click="openCheckModal(scope.row.id)">审核</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination @child-say="listenToMyBoy" @child-say2="listenToMyBoy2" :totalNum="data.resultSet"></pagination>
      </el-col>
    </el-row>

    <el-dialog title="代理审核" center :visible.sync="checkModalVisible" :before-close="handleClose" width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="agentInfo" >
        <el-form-item label="备注" label-width="55px" prop="memo">
          <el-input auto-complete="off" type="textarea" autosize v-model="ruleForm.memo" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="danger" @click="agentCheck(2)">驳 回</el-button>
        <el-button size="small" type="primary" @click="agentCheck(1)">通 过</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import pagination from 'b/pagination'
  import { REST } from 'api'
  import store from 'store'

  const stateText = [
    ['审核中', ''],
    ['通过', 'success'],
    ['不通过', 'danger']
  ]

  export default {
    components: { pagination },
    data () {
      return {
        data: {},
        stateText: stateText,
        checkModalVisible: false,
        confirmModalVisible: false,
        ruleForm:{
          memo: ''
        },
        dataId: '',
        seachObj: {
          pageNum: 1,
          pageSize: 10,
          agentType:''
        },
        rules:{
          memo: [
            {required:true,message:'请输入备注'}
          ],
        }
      }
    },
    created () {
      this.queryList()
    },
    methods: {
      goToDetail(index, row) {
        store.set('SELECT_ID', row.id)
				store.set('SELECT_TYPE','apply');
        this.$router.push({
          name: 'agent_info',
          params: {
            id: row.id,
            backUrl: '/agent_manage/channel_agent_list'
          }
        });
      },
      listenToMyBoy (currentSect) { // 翻页
        this.seachObj.page_no = currentSect;
        this.queryList()
      },
      listenToMyBoy2 (currentSect) { // 修改页长
        this.seachObj.page_no = 1
        this.seachObj.page_size = currentSect;
        this.queryList()
      },
      queryList () {
        let _this = this
        REST.queryAgentDeficiencylList(_this.seachObj).then(function (res) {
          _this.data = res
        }, function (err) {

        })
      },
      openCheckModal(id){
        this.checkModalVisible = true
        this.dataId = id
      },
      openConfirmModal(id){
        this.confirmModalVisible = true
        this.dataId = id
      },
      agentCheck (type) {
        let _this = this
        console.log(type, _this.ruleForm.memo, _this.dataId)
        if(type==1) {
					_this.$refs.agentInfo.validate((valid) => {
						if(valid){
							REST.examineAgent({
								frontUserId: _this.dataId,
									memo: _this.ruleForm.memo
								}).then(function (res) {
									_this.checkModalVisible = false
									_this.memo = ''
									_this.dataId = ''
									// 刷新列表（当前页当前搜索条件）
									_this.queryList()
								}, function (err) {
										
								})
						}
					})
        }else {
          _this.$refs.agentInfo.validate((valid) => {
            if(valid){
              REST.notExamineAgent({
                frontUserId: _this.dataId,
                memo: _this.ruleForm.memo
              }).then(function (res) {
                _this.checkModalVisible = false
                _this.memo = ''
                _this.dataId = ''
                // 刷新列表（当前页当前搜索条件）
                _this.queryList()
              }, function (err) {
									
              })
            }
          })
        }
      },
      handleClose(){
        this.memo = ''
        this.dataId = ''
        this.checkModalVisible = false
        this.confirmModalVisible = false
      }
    }
  }
</script>
<style scoped>

</style>
