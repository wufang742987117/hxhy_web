<template>
  <el-row  class="list-content">
    <el-col>
      <div class="ibox-title"><h5>新建渠道代理伙伴</h5></div>
    </el-col>
    <el-col class="ibox-content">
      <el-form label-width="200px">
        <h5>基本信息</h5>
        <el-form-item label="姓名：">
          <el-col :span="12">
            <el-input v-model="ruleForm.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电话：">
          <el-col :span="12">
            <el-input v-model="ruleForm.tel"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="代理地区：">
          <el-select v-model="shengValue" placeholder="请选择" class="form-control">
            <el-option
             v-for="item in sheng"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
          </el-select>
          <el-select v-model="shiValue" placeholder="请选择" class="form-control">
            <el-option
              v-for="item in shi"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
          <el-select v-model="quValue" placeholder="请选择" class="form-control">
            <el-option
              v-for="item in qu"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系地址：">
          <el-col :span="12">
            <el-input v-model="ruleForm.address"></el-input>
          </el-col>
        </el-form-item>

        <h5>返佣人信息</h5>
        <el-form-item label="账户名称：">
          <el-col :span="12">
            <el-input></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="开户银行：">
          <el-col :span="12">
            <el-input></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="企业账号/个人账号：">
          <el-col :span="12">
            <el-input></el-input>
          </el-col>
        </el-form-item>

        <h5>企业基本信息</h5>
        <el-form-item label="企业：">
          <el-col :span="12">
            <el-input></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="企业统一社会信用代码：">
          <el-col :span="12">
            <el-input></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="法人身份证正面：">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="1"
            :on-exceed="handleExceed"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">(图片名称不能包含汉字)</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="法人身份证反面：">

        </el-form-item>
        <el-form-item label="企业三证合一扫描：">

        </el-form-item>
        <el-form-item label="合同：">

        </el-form-item>
        <el-form-item label="合同2：">

        </el-form-item>
        <el-form-item>
          <el-button size="mini" class="btn-primary" icon="el-icon-check">保存</el-button>
        </el-form-item>

      </el-form>
    </el-col>

  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          tel: '',
          address: ''
        },
        shengValue: '',
        sheng:[],
        shiValue: '',
        shi:[],
        quValue: '',
        qu:[],
        dialogImageUrl: '',
        dialogVisible: false

      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleExceed(files, fileList) {
        this.$message.warning('只上传一张图片！');
      },
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
