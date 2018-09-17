<template>
  <div>
    <el-row class="list-content">
      <el-col>
        <div class="ibox-title"><h5>提现列表</h5></div>
      </el-col>

      <el-col>

      </el-col>
      <el-col class="ibox-content">

        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="审核状态">
            <el-select v-model="seachObj.status" placeholder="审核状态">
							<el-option label="全部数据" value=""></el-option>
              <el-option label="用户提交" value="1"></el-option>
              <el-option label="审核通过" value="2"></el-option>
              <el-option label="提现成功" value="3"></el-option>
              <el-option label="用户取消" value="4"></el-option>
              <el-option label="提现驳回" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户类型">
            <el-select v-model="seachObj.userType" placeholder="活动区域">
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

        <el-table border stripe size="small" style="width: 100%"
                  :data="data.data">
          <el-table-column prop="id" label="数据ID" align="center"></el-table-column>
          <el-table-column prop="userId" label="用户账户" align="center"></el-table-column>
          <el-table-column label="提现申请时间" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.createTime | date('yyyy-MM-dd HH:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="提现申请金额" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.money | currency(2, '￥')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="可提现余额" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.balance | currency(2, '￥')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-tag size="mini" :type="stateText[scope.row.status][1]" v-if="!scope.row.memo">{{stateText[scope.row.status][0]}}</el-tag>
              <el-tooltip class="item" effect="dark" :content="scope.row.memo" placement="top" v-else>
                <el-tag size="mini" :type="stateText[scope.row.status][1]">{{stateText[scope.row.status][0]}}</el-tag>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="181" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" v-if="scope.row.status === 1" @click="openCheckModal(scope.row.id)">提现审核</el-button>
              <el-button size="mini" type="success" icon="el-icon-edit" v-else-if="scope.row.status === 2" @click="openConfirmModal(scope.row.id)">提现确认</el-button>
              <span v-else>-</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination @child-say="listenToMyBoy" @child-say2="listenToMyBoy2" :totalNum="data.totalCount"></pagination>
      </el-col>
    </el-row>

    <el-dialog title="提现审核" center :visible.sync="checkModalVisible" :before-close="handleClose" width="30%">
      <el-form>
        <el-form-item label="备注" label-width="40px">
          <el-input auto-complete="off" type="textarea" autosize v-model="memo"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="danger" @click="withdrawCheck(2)">驳 回</el-button>
        <el-button size="small" type="primary" @click="withdrawCheck(1)">通 过</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提现确认" center :visible.sync="confirmModalVisible" :before-close="handleClose" width="30%">
      <el-form>
        <el-form-item label="备注" label-width="40px">
          <el-input auto-complete="off" type="textarea" autosize v-model="memo"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="withdrawConfirm">通 过</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import pagination from 'b/pagination'
  import { REST } from 'api'

  const stateText = [
    ['-', ''],
    ['用户提交', ''],
    ['审核通过', 'success'],
    ['提现成功', 'success'],
    ['用户取消', 'info'],
    ['提现驳回', 'danger']
  ]

  export default {
    components: { pagination },
    data () {
      return {
        data: {},
        stateText: stateText,
        checkModalVisible: false,
        confirmModalVisible: false,
        memo: '',
        dataId: '',
        seachObj: {
          page_no: 1,
          page_size: 10,
          status: '',
          userType: ''
        }
      }
    },
    created () {
      this.queryList()
    },
    methods: {
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
        REST.withdrawList(_this.seachObj).then(function (res) {
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
      withdrawCheck (type) {
        let _this = this
        console.log(type, _this.memo, _this.dataId)

        REST.withdrawCheck({
          type: type,
          id: _this.dataId,
          memo: _this.memo
        }).then(function (res) {
          _this.checkModalVisible = false
          _this.memo = ''
          _this.dataId = ''
          // 刷新列表（当前页当前搜索条件）
          _this.queryList()
        }, function (err) {

        })
      },
      withdrawConfirm () {
        let _this = this
        REST.withdrawConfirm({
          id: _this.dataId,
          memo: _this.memo
        }).then(function (res) {
          _this.confirmModalVisible = false
          _this.memo = ''
          _this.dataId = ''
          // 刷新列表（当前页）
          _this.queryList()
        }, function (err) {

        })
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
