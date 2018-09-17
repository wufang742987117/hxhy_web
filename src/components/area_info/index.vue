<template>
  <el-row  class="list-content">
    <el-col class="ibox-content">
      <el-form label-width="200px">
        <h5>基本信息</h5>
        <el-form-item label="账号：">
          <el-col :span="12">
            <el-input v-model="info.id" readonly></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-col :span="12">
            <el-input v-model="info.name" readonly></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机：">
          <el-col :span="12">
            <el-input v-model="info.userPhone" readonly></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-col :span="12">
            <el-input v-model="info.idNumber" readonly></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="账户名称：">
          <el-col :span="12">
            <el-input v-model="info.servantName" readonly></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="开户行：">
          <el-col :span="12">
            <el-input v-model="info.servantBank" readonly></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="银行卡号：">
          <el-col :span="12">
            <el-input v-model="info.servantBankAccount" readonly></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="地址：">
          <el-col :span="12">
            <el-input v-model="info.address" readonly></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button size="mini" class="btn-primary" @click="back">返回</el-button>
        </el-form-item>

      </el-form>
    </el-col>

  </el-row>
</template>

<script>
	import {REST} from 'api';
  import store from 'store';


  export default {
    data() {
      return {
      	id: store.get('SELECT_ID'),
      	backUrl: this.$route.params.backUrl,
        info: {}
      }
    },
    methods: {
      back(){
      	this.$router.push(this.backUrl);
      }
    },
    mounted() {
    	let _this = this;
    	let id = _this.id;
    	REST.area_info({
    		frontUserId:id
    	}).then(function(res){
    		if(res.success){
    			_this.info = res.data;
    			console.log(_this.info)
    		}
    	})
    }
  }
</script>

<style scoped>

</style>
