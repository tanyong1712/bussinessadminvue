<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item><router-link :to="{path:'/supplier_management'}">供应货方管理</router-link></el-breadcrumb-item>
            <el-breadcrumb-item>供应方编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="bg_fff p_30 m_top_20">

            <div class="font_14 "><strong>基本信息</strong></div>
         <div class="m_bottom_20 m_top_20">
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="供应方名称" prop="supplierName">
                    <el-input v-model="ruleForm.supplierName" placeholder="请输入供应方名称" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="connectorName">
                    <el-input v-model="ruleForm.connectorName" placeholder="请输入联系人" style="width:20%;"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="请输入联系电话" style="width:20%;"></el-input>
                </el-form-item>
                <el-form-item label="公司地址" prop="compAddress">
                    <el-input v-model="ruleForm.compAddress" placeholder="请输入公司地址" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="合同时间" required>
                    <el-col :span="11" style="width:20%;">
                        <el-form-item prop="contractstartTime">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.contractstartTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line te_center" :span="2" style="width:30px;">-</el-col>
                        <el-col :span="11 " style="width:20%;">
                            <el-form-item prop="contractendTime">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.contractendTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                    </el-col>
                </el-form-item>
                 <div class="font_14 p_bottom_30"><strong>财务信息</strong></div>
                <el-form-item label="结算方式" prop="settleType" style="width:100%" >
                   <el-col :span="11" style="width:20%;" prop="region" >
                       <el-select v-model="ruleForm.settleType" placeholder="请选择" style="width:100%;">
                            <el-option label="先货后款" value="1"></el-option>
                            <el-option label="先款后货" value="2"></el-option>
                           <el-option label="先货后款(预付款)" value="3"></el-option>
                        </el-select>
                    </el-col>
                     <el-col class="line te_right p_right_10" :span="2" style="width:90px;">结算周 </el-col>
                    <el-col :span="11">
                        <el-form-item  style="width:20%;">
                            <el-input v-model="ruleForm.settleCycle"  placeholder="天" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="支付方式" prop="region " style="width:25%;">
                    <el-select  v-model="ruleForm.paymnetType" placeholder="请选择支付方式" style="width:100%;">
                        <el-option label="网银" value="1"></el-option>
                        <el-option label="支付宝" value="2"></el-option>
                        <el-option label="微信" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开户银行" prop="bank">
                    <el-input v-model="ruleForm.bank" placeholder="请输入开户银行" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="银行账户" prop="bankCardNum">
                    <el-input v-model="ruleForm.bankCardNum" placeholder="请输入银行账户" style="width:20%;"></el-input>
                </el-form-item>
                <el-form-item label="开户名" prop="accountName">
                    <el-input v-model="ruleForm.accountName" placeholder="请输入银行开户名" style="width:20%;"></el-input>
                </el-form-item>
                <el-form-item label="纳税人识别码" prop="taxpayerId" >
                    <el-input v-model="ruleForm.taxpayerId" placeholder="请输入纳税人识别码" style="width:20%;"></el-input>
                </el-form-item>
                <div class="font_14 p_bottom_30"><strong>资质文件</strong></div>
                 <el-form-item >
                     <el-col :span="11" style="width:20%;" >
                       <el-form-item label="法人身份证" >
                            <img src="http://umshop.oss-cn-hangzhou.aliyuncs.com/upload/ndKPoUaHtowzDse9HRzOMir48LRKaqAzVNjhL5V4.png" height="148" width="148"/>
                        </el-form-item>

                    </el-col>
                    <!--<el-col :span="11 " style="width:15%;">-->
                        <!--<el-form-item >-->
                            <!--<el-upload-->
                                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                                <!--list-type="picture-card"-->
                                <!--:on-preview="handlePictureCardPreview"-->
                                <!--:on-remove="handleRemove">-->
                                <!--<i class="el-icon-plus"></i>-->
                            <!--</el-upload>-->
                            <!--<el-dialog :visible.sync="dialogVisible" size="tiny">-->
                                <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                            <!--</el-dialog>-->
                            <!--<p class="te_center" style="width:148px;">替换</p>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="11" style="width:20%;">
                        <el-form-item  label="营业执照">
                            <img src="http://umshop.oss-cn-hangzhou.aliyuncs.com/upload/ZURrtfGkrwR1jlvSwV9spfFz9IjyI71ug9OkXRkB.png" height="148" width="148"/>

                        </el-form-item>
                    </el-col>
                    <!--<el-col :span="11 ">-->
                               <!--<el-form-item label="纳税人证明">-->
                                <!--<el-upload-->
                                    <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                                    <!--list-type="picture-card"-->
                                    <!--:on-preview="handlePictureCardPreview"-->
                                    <!--:on-remove="handleRemove">-->
                                    <!--<i class="el-icon-plus"></i>-->
                                <!--</el-upload>-->
                                <!--<el-dialog :visible.sync="dialogVisible" size="tiny">-->
                                    <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                                <!--</el-dialog>-->
                            <!--<p class="te_center" style="width:148px;">替换</p>-->
                            <!--</el-form-item>-->
                    <!--</el-col>-->
                </el-form-item>

                <div class="font_14 p_bottom_30"><span class="red">*</span><strong> 供应方渠道</strong></div>
                <el-form-item label="供应方来源" >
                    <el-select  placeholder="请选择来源" v-model="ruleForm.supplierFrom"style="width:20%;">
                        <el-option label="自营引进" value="1"></el-option>
                        <el-option label="渠道引进" value="2"></el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label="渠道账号" style="width:100%;">
                    <el-col :span="11" style="width:20%;">
                        <el-form-item>
                            <el-input v-model="ruleForm.adminPhone"  placeholder="请输入渠道账号" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="line te_right p_right_10" :span="2" style="width:90px;">渠道类型 </el-col>
                    <el-col :span="11 ">
                             <el-select  v-model="ruleForm.supplierType" placeholder="请选择 类型" style="width:30%;">
                            <el-option label="自营采购" value="1"></el-option>
                            <el-option label="一件代发" value="2"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>

                <el-form-item label="总部账号">{{ruleForm.adminName}} </el-form-item>
                <el-form-item v-if="buttonVisible">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>  <el-button>取消</el-button>
                </el-form-item>



             </el-form>


         </div>
        </div>


    </div>

</template>

<script>
// import AddClass from './add-class'
import {getonesupplier,addsupplier,updatesupplier} from '../../../service/supplier';

    export default {
        name: "index",

        data () {
            return {
                buttonVisible:true,
                pid:0,
                tableData: [],
                  dialogImageUrl: '',
                dialogVisible: false,
                ruleForm: {
                    supplierName: '',
                    connectorName: '',
                    phone:"",
                    compAddress:"",
                    contractstartTime: '',
                    contractendTime: '',
                    settleType:'',
                    settleCycle:'',
                    paymnetType: '',
                    bank: '',
                    bankCardNum:'',
                    accountName:"",
                    taxpayerId:'',
                    legalCardNum:'',
                    businessCert:'',
                    generalTaxpayerCert:'',
                    status:1,
                    supplierFrom:'',
                    supplierType:'',
                    adminPhone:'',
                    adminName:'admin',
                },
                rules: {
                    supplierName: [
                        { required: true, message: '请输入供应方名称', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    connectorName: [
                        { required: true, message: '请输入联系人', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入电话', trigger: 'blur' },
                        { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' }
                    ],
                     compAddress: [
                        { required: true, message: '请输入公司地址', trigger: 'blur' },
                        { min: 1, max: 11, message: '长度在 1 到 60 个字符', trigger: 'blur' }
                    ],
                     settlement: [
                        { required: true, message: '请选择结算方式', trigger: 'change' }
                    ],
                    region: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    bank: [
                        { required: true, message: '请输入开户银行', trigger: 'blur' },
                        { min: 1, max: 100, message: '', trigger: 'blur' }
                    ],


                }


            }
        },
        watch:{
            $route:function(value){
                console.log('value:'+value);
                console.log(value);
                if(this.$route.query.action=='view'){
                    this.buttonVisible=false;
                }else{
                    this.buttonVisible=true;
                }
                console.log(this.buttonVisible);
            }
        },
        created() {
            console.log('created');
            if(this.$route.query.action=='view'){
                this.buttonVisible=false;
            }else{
                this.buttonVisible=true;
            }
            console.log(this.buttonVisible);

            if(this.$route.query.id) {
                this.pid = this.$route.query.id;
                this.getonedata(this.pid);
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
            getonedata(id){
              //获取单条数据
                getonesupplier(id).then( res => {
                    console.log('res:');
                    console.log(res);
                    this.ruleForm=res.data;
                    this.$message(res.msg);
                }).catch( err => {
                    console.log('err:'+err);
                    this.$message(err);
                })
            },
             submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submit!');
                    if(this.pid>0){
                        //编辑
                        this.ruleForm.id=this.pid;
                        console.log(this.ruleForm);
                        updatesupplier(this.ruleForm).then( res => {
                            console.log('res:');
                            console.log(res);
                            this.$message(res.msg)
                        }).catch( err => {
                            console.log('err:'+err);
                            this.$message(err);
                        })
                    }else{
                        //新增
                        addsupplier(this.ruleForm).then( res => {
                            console.log('res:');
                            console.log(res);
                            this.pid=res.data;
                            this.$message(res.msg);
                        }).catch( err => {
                            console.log('err:'+err);
                            this.$message(err);
                        })
                    }

                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },

        }
    }
</script>

<style scoped>
    .title{ width: 100%; padding-bottom:20px;}
    .lable_tit{ height: 36px; line-height:36px;}
    .fn_right{ float: right;}
    .fn_left{ float: left;}
    .red{ color: #f56c6c;}

</style>
