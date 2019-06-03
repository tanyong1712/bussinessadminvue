<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">供应货方管理</el-breadcrumb-item>
            <el-breadcrumb-item>供货方编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="bg_fff p_30 m_top_20">

            <div class="font_14 "><strong>基本信息</strong></div>
         <div class="m_bottom_20">
                <div class="dis_flex p_30 font_13">
                    <div  class="w_120 ">供货方状态：</div>
                    <div  class=" m_left_30">启动</div>
                    <div  class="w_120 te_right">ID：</div>
                    <div  class=" m_left_30">0016</div>

                </div>
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="供货方名称" prop="supplierName">
                    <el-input v-model="ruleForm.supplierName" placeholder="请输入供货方名称" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contacts">
                    <el-input v-model="ruleForm.contacts" placeholder="请输入联系人" style="width:20%;"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="inputPhone">
                    <el-input v-model="ruleForm.inputPhone" placeholder="请输入联系电话" style="width:20%;"></el-input>
                </el-form-item>
                <el-form-item label="公司地址" prop="address">
                    <el-input v-model="ruleForm.address" placeholder="请输入公司地址" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="合同时间" required>
                    <el-col :span="11" style="width:20%;">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line te_center" :span="2" style="width:30px;">-</el-col>
                        <el-col :span="11 " style="width:20%;">
                            <el-form-item prop="date2">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                    </el-col>
                </el-form-item>
                 <div class="font_14 p_bottom_30"><strong>财务信息</strong></div>
                <el-form-item label="结算方式" prop="region" style="width:100%" >
                   <el-col :span="11" style="width:20%;" prop="region" >
                       <el-select v-model="ruleForm.region" placeholder="请选择" style="width:100%;">
                            <el-option label="先货后款" value="1"></el-option>
                            <el-option label="先款后货" value="2"></el-option>
                                <el-option label="先货后款(预付款)" value=""></el-option>
                        </el-select>
                    </el-col>
                     <el-col class="line te_right p_right_10" :span="2" style="width:90px;">结算周 </el-col>
                    <el-col :span="11">
                        <el-form-item  style="width:20%;">
                            <el-input  placeholder="天" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="支付方式" prop="region " style="width:25%;">
                    <el-select  v-model="ruleForm.region" placeholder="请选择支付方式" style="width:100%;">
                        <el-option label="网银" value="1"></el-option>
                        <el-option label="支付宝" value="2"></el-option>
                        <el-option label="微信" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开户银行" prop="bank">
                    <el-input v-model="ruleForm.bank" placeholder="请输入开户银行" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="银行账户" prop="bank">
                    <el-input v-model="ruleForm.bank" placeholder="请输入银行账户" style="width:20%;"></el-input>
                </el-form-item>
                <el-form-item label="开户名" prop="bank">
                    <el-input v-model="ruleForm.bank" placeholder="请输入银行开户名" style="width:20%;"></el-input>
                </el-form-item>
                <el-form-item label="纳税人识别码" prop="bank" >
                    <el-input v-model="ruleForm.bank" placeholder="请输入纳税人识别码" style="width:20%;"></el-input>
                </el-form-item>
                <div class="font_14 p_bottom_30"><strong>资质文件</strong></div>
                 <el-form-item label="法人身份证" >
                     <el-col :span="11" style="width:15%;">
                       <el-form-item >
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible" size="tiny">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                            <p class="te_center " style="width:148px;">替换</p>
                        </el-form-item>
                        
                    </el-col>
                    <el-col :span="11 " style="width:15%;">
                        <el-form-item >
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible" size="tiny">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                            <p class="te_center" style="width:148px;">替换</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" style="width:20%;">
                        <el-form-item  label="营业执照">
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible" size="tiny">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        <p class="te_center"style="width:148px;">替换</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11 ">
                               <el-form-item label="纳税人证明">
                                <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible" size="tiny">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            <p class="te_center" style="width:148px;">替换</p>
                            </el-form-item>
                    </el-col>
                </el-form-item>
               <div class="font_14 p_bottom_30"><strong> 供货方来源</strong></div>
                <el-table
                    :data="tableData"
                    stripe
                    style="width:50%">
                    <el-table-column
                        prop="zhanghao"
                        label="渠道类型"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="qudao"
                        label="来源类型"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="账号">
                    </el-table-column>
                </el-table>
                <el-form-item class="p_top_20">
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>  <el-button>取消</el-button>
                </el-form-item>


             </el-form>
            
            
         </div> 
        </div>
           
        
    </div>
   
</template>

<script>
// import AddClass from './add-class'
    export default {
        name: "index",
      
        data () {
            return {
                tableData: [{
                        zhanghao: '1325958483',
                        qudao: '渠道引进',
                        address: '省级中心'
                    }, {
                        zhanghao: '1369582336',
                        qudao: '总部引进',
                        address: '省级中心'
                    }, {
                        zhanghao: '1369859864',
                        qudao: '渠道引进',
                        address: '省级中心'
                    }, {
                        zhanghao: '1365895447',
                        qudao: '总部引进',
                        address: '省级中心'
                    }],
                  dialogImageUrl: '',
                dialogVisible: false,
                ruleForm: {
                    supplierName: '',
                    contacts: '',
                    inputPhone:"",
                    address:"",
                    date1: '',
                    date2: '',
                    settlement: '',
                     payment: '',
                    // delivery: false,
                    // type: [],
                    // resource: '',
                    bank: '',
                    region:""
                    
                },
                rules: {
                    supplierName: [
                        { required: true, message: '请输入供货方名称', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    contacts: [
                        { required: true, message: '请输入联系人', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    inputPhone: [
                        { required: true, message: '请输入电话', trigger: 'blur' },
                        { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' }
                    ],
                     address: [
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

        methods: {
           
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

             submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
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
