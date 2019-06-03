<template>
    <div  :style="{display:visible?'block':'none'}">
         <!-- 添加、编辑 -->
        <el-form :model="ruleForm" ref="ruleForm"  class="m_left_20"  >
            <div >
                <div style=" width:90%;margin: 5px auto;" class="font_12">为保护信息安全，系统需要发送短信验证码到管理员手机号上，输入正 确的验证码后才能进行保存。 </div>          
                <div  style=" width:80%;margin: 5px auto;" class="font_12 te_center">将手机验证码发送至：{{this.formData.phone}}</div>
                <el-form-item label="图形验证码" class="m_top_20 " style=" display: flex;">
                    <el-input style=" width:50%;"  class="fn_left"  v-model="codePic"></el-input>
                    <div class="fn_left m_left_20">
                        <div class="code" @click="refreshCode">
                            <s-identify :identifyCode="identifyCode" ></s-identify>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="短信验证码" style=" display: flex;" >
                    <el-input  style=" width: 50%;"  v-model="codePhone" ></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button  plain  v-show="flag" @click="codeNum()" >获取短信验证码</el-button>
                    <el-button v-show="!flag"><span>{{second}}</span>秒后重新获取</el-button>
                </el-form-item>
                <slot></slot>
                <!-- <div class="btn_box">
                    <el-button @click="backStep()" plain>上一步</el-button>
                    <el-button  @click="yzCode()" plain>下一步</el-button> -->
                    <!-- <el-button type="primary" @click="submitForm(ruleForm)">下一步</el-button> -->
                <!-- </div> -->
            </div>
        </el-form>

        <!-- <el-dialog
            title="提示"
            :visible.sync="successVisible"
            width="30%"
            center>
            <div><i class="el-icon-success"></i>{{msg}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="successVisible = false">关闭</el-button>
            </span>
        </el-dialog> -->

    </div>

</template>

<script>
    
    import {getMerchantAccountList,addPostaAmin,putEdit,getDetele,modifyPhone,putTransfer,postSendOut,getSendOut} from '../../../service/user_admin';
    import SIdentify from '../../common/components/identify'
    export default {
        name: "codetest",
        props:{
            formData:{
               default:{
                networkId:'',
                roleName: '',
                phone: '',
                name: '',
                remark: '',
               },
            },
            visible:{
                default:false
            }
        },
        data() {
            return {
                msg:'',
                display:1,
                aminDialogVisible: false,
                //  successVisible: false,
                //  emptyDialogVisible:false,
                // pageNum:1,
                // pageSize:20,
                // pages:1,
                // totalRows:1,
                 networkId:"",
                //表格
                tableData: [{},],
                // 表单
               ruleForm: {
                   networkId:'',
                    roleName: '',
                    phone: '',
                    name: '',
                    remark: '',
                },
                identifyCodes: "1234567890",
                identifyCode: "",
                inpCode:false,
                 codePic:'',//图形验证码
                 codePhone:'',//手机验证码
                 second:0,//倒计时计时
                 flag: true,//控制显示
                 currentRow: null,
                //timer: null,//防止点击的时候触发多个setInterval
               
            };
        },
        components: {
           SIdentify
        },
        // 初始化列表
        created() {
            console.log('created');
            this.getloaddata({'pageNum':this.pageNum,'pageSize':this.pageSize});
        },
         mounted() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        methods: {
            getloaddata(param){
               param.status=this.hoverItem;
                getMerchantAccountList(param).then( res => {
                    // console.log('res:');
                    // console.log(res);
                    this.tableData=res.data.list;
                    this.totalRows=res.data.total;
                    this.roleName=res.data.roleName;
                    this.phone=res.data.phone;
                    this.remark=res.data.remark;
                    // console.log(this.tableData);
                }).catch( err => {
                    // console.log('err:');
                    this.$message(err);
                })
            },
            
            // 图像验证码
             randomNum(min, max) {
                return  Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                    ];
                }
                console.log(this.identifyCode);
            },
            // 账户修改、添加
            aminoPeration(e){
                this.display=1
                // console.log(e)
                if(e.networkId==undefined){
                    this.networkId=0
                }else{
                    this.ruleForm.roleName = e.roleName;
                    // console.log(this.ruleForm.roleName )
                    
                }
                this.aminDialogVisible=true;
                this.ruleForm=e;
                
                // if(this.ruleForm.networkId==)
            },
             setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            selectUser(val){
                this.currentRow = val;
            },
            
          
            //上一步
            backStep(){
                // this.modifyVisible=false
                this.display=1;
                this.currentRow=null;

            },
            
        //     //提交
        //    submitForm(formName) {
        //          this.aminDialogVisible = false;
        //             // console.log('submit!');
        //             if(this.networkId>0){
        //                 //编辑
        //                 this.ruleForm.networkId=this.networkId;
        //                 console.log(this.ruleForm);
        //                 putEdit(this.ruleForm).then( res => {
        //                     // console.log('res:');
        //                     // console.log(res);
        //                     this.successVisible=true;
        //                     this.msg="编辑成功";
        //                 }).catch( err => {
        //                     // console.log('err:'+err);
        //                     this.$message(err);
        //                 })
                        
        //                 // this.nextDialogVisible = false;
        //             }else{
        //                 //新增
        //                 addPostaAmin(this.ruleForm).then( res => {
        //                     // console.log('res:');
        //                     // console.log(res);
        //                     this.networkId=res.data;
        //                     // this.$message(res.msg);
        //                     this.successVisible=true;
        //                     this.msg="添加成功";
        //                 }).catch( err => {
        //                     // console.log('err:'+err);
        //                     this.$message(err);
        //                 })
        //             }
        //     },
            //倒计时
            countDown(){
                this.flag = false; //点击button改变v-show的状态
                this.second=3;
                let second = setInterval(()=>{  //定时器设置每秒递减
                    this.second--;        //递减时间
                    if(this.second<=0){  
                    this.flag = true;    //60s时间结束还原v-show状态并清除定时器
                    clearInterval(second )
                    }
                },1000)
            },
            // 图像验证码判断输入
            codeNum(){
                // console.log(this.codePic + this.identifyCode)
                if(this.codePic==this.identifyCode ){
                    this.inpCode=true;
                    this.sendOut();
                    
                }else{
                     this.$message.error({message: '验证码错误',});
                }
            },
            // && codePhone==codeInputPhone getSendOut
            // 发送短信
            sendOut(){
                postSendOut({phone:this.ruleForm.phone,phoneCode:'86',type:'1'}).then( res => {
                    console.log('res:');
                    console.log(res);
                    this.countDown()
                })
            },
             // yz
            yzCode(){
                // console.log("请输入图形验证码") 
                if(this.inpCode==false){
                    this.$message.error({message: '请输入正确的图形验证码',});
                    return false;
                }
                 getSendOut({phone:this.ruleForm.phone,code:this.codePhone,type:'1'}).then( res => {
                     
                    // console.log(res);
                    this.submitForm()
                })
            }


        }
    }
</script>

<style scoped>
    .img_code{ width: 70px; height: 30px;}
    .divIdentifyingCode { width: 102px; /*设置图片显示的宽*/ height:35px; /*图片显示的高*/background: #e2e2e2;margin: 0;}
  .btn_box{ width:70%; margin: 0px  auto; padding:30px 0; }
  .p_30{ padding: 30px 0;}
  .color_grey{ color: #999}
  .color_nlue{color:#409eff}
</style>
