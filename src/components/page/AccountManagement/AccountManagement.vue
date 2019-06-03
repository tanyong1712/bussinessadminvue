<template>
    <div>
        <el-breadcrumb separator=">" class="font_14 color_78839A">
            <el-breadcrumb-item class="color_34425E">账户管理</el-breadcrumb-item>
            <el-button type="primary" class="fn_right" @click="aminoPeration({})">新增账号</el-button>
        </el-breadcrumb>
        <div class="bg_fff p_30 m_top_20">
            <div class="font_14 color_445370 m_left_20"> <strong>当前账户</strong></div>
            <div class=" font_14 m_top_14 dis_flex">
                <div class="li_he_30 w_100 te_right">姓名：</div> <div class="m_left_20 li_he_30">{{userName}}</div>
            </div>
            <div class=" font_14 m_top_14 dis_flex">
                <div class="li_he_30 w_100 te_right">账号：</div> <div class="m_left_20 li_he_30">{{accountNumber}}</div>
            </div>
            <div class=" font_14 m_top_14 dis_flex">
                <div class="li_he_30 w_100 te_right">手机号码：</div> <div class="m_left_20 li_he_30">{{userPhone}}</div>
                <div  class="m_left_50"> <el-button type="primary" @click="updatemobiled" >修改手机号</el-button></div>
            </div>
        </div>
        <div class="bg_fff p_30 m_top_20">
            <div class="font_14 color_445370 m_left_20"><strong>账号设置</strong></div>
            <div class=" m_top_30">
                <el-table border  :data="tableData" style="width: 100%">
                    <el-table-column prop="roleName" label="角色"> </el-table-column>
                    <el-table-column prop="phone" label="手机号码"> </el-table-column>
                    <el-table-column prop="name" label="姓名"> </el-table-column>
                    <el-table-column prop="remark" label="备注"> </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope" >
                            <div v-if="scope.row.roleId==0"  >
                                <el-button size="small" @click="aminoPeration(scope.row)" >修改</el-button>
                                <el-button size="small"@click="delDate(scope.row,scope.$index)" >删除</el-button>
                            </div>
                            <el-button  size="small"@click="transfer(scope.row)" v-else>移交</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="p_20">
                <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                                   :total="totalRows">
                    </el-pagination>
                </div>
            </div>
        </div>
         <!-- 添加\编辑账号 -->
        <el-dialog
            :visible.sync="aminDialogVisible"
            style="width:70%;margin: 5px auto;">
            <el-form :model="ruleForm" ref="ruleForm"  class="m_left_20"  >
                <div class="p_bottom_30"><strong>账号管理</strong></div>
                <div v-if="display==1" >
                    <el-form-item >
                        <el-radio-group v-model="ruleForm.roleName" >
                            <div>
                                <el-radio label="管理员"><span class="font_12"><strong>管理员账号：</strong></span><span class=" font_12"> 权限：所有权限</span></el-radio>
                            </div>
                            <div class="m_top_14">
                                <el-radio label="运营商账号"  >
                                    <span  class=" font_12"><strong>运营商账号：</strong></span>
                                    <span class="font_12"> 权限：管理供应方，货品管理，订单查询，物流信息导入，<span>发布、编辑营销活动；</span></span>
                                </el-radio>
                            </div>
                            <div class="m_top_14">
                                <el-radio label="客户账号" ><span  class=" font_12"><strong>客户账号：</strong></span><span class="  font_12"> 权限：处理投诉，回答咨询</span></el-radio>
                            </div>
                            <div class="m_top_14">
                                <el-radio label="财务账号"> <span  class=" font_12"><strong>财务账号：</strong></span><span class="  font_12">权限：查看财务报表，操作付款，导出数据</span></el-radio>
                            </div>
                        </el-radio-group>
                    </el-form-item>
                    <div class="p_top_30 p_bottom_30"><strong>填写信息</strong></div>
                    <el-form-item label="姓名"><el-input style=" width: 50%;" v-model="ruleForm.name"></el-input> </el-form-item>
                    <el-form-item label="手机"><el-input style=" width: 50%;" v-model="ruleForm.phone" type="tel" ></el-input></el-form-item>
                    <el-form-item label="备注"><el-input style=" width: 50%;" v-model="ruleForm.remark"></el-input></el-form-item>
                    <div class="btn_box"><el-button plain @click="secondStep('ruleForm')" >下一步</el-button></div>
                </div>
                <div  v-if="display==2">
                    <div style=" width:90%;margin: 5px auto;" class="font_12">为保护信息安全，系统需要发送短信验证码到管理员手机号上，输入正 确的验证码后才能进行保存。 </div>
                    <div  style=" width:80%;margin: 5px auto;" class="font_12 te_center">将手机验证码发送至：{{this.ruleForm.phone}}</div>
                    <el-form-item label="图形验证码" class="m_top_20 " style=" display: flex;">
                        <el-input style=" width:50%;"  class="fn_left"  v-model="codePic"></el-input><!-- 图形验证码输入框 -->
                        <div class="fn_left m_left_20">
                            <div class="code" @click="refreshCode"> <identify  :identifyCode="identifyCode" ></identify></div>
                        </div>
                    </el-form-item>
                    <el-form-item label="短信验证码" style=" display: flex;" >
                        <el-input  style=" width: 50%;"  v-model="codePhone" ></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-button  plain  v-show="flag" @click="codeNum()" >获取短信验证码</el-button>
                        <el-button v-show="!flag"><span>{{second}}</span>秒后重新获取</el-button>
                    </el-form-item>
                    <div class="btn_box">
                        <el-button @click="backStep()" plain>上一步</el-button>
                        <el-button  @click="yzCode()" plain>下一步</el-button>
                    </div>
                </div>
            </el-form>
        </el-dialog>
        <!-- 操作成功 -->
        <el-dialog
            :visible.sync="successVisible"
            width="30%"
            center>
            <div class="pop_center"><i class="el-icon-success"></i>{{msg}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="successVisible = false">关闭</el-button>
            </span>
        </el-dialog>
         <!-- 移交 highlight-current-row -->
        <el-dialog
            :visible.sync="emptyDialogVisible"
            style="width:70%;margin: 5px auto;" >
            <el-form :model="ruleForm" ref="ruleForm"  class="m_left_20"  >
                <div class="p_bottom_30"><strong>账号管理</strong></div>
                <div v-if="display==1" >
                    <el-table :data="tableData" style="width: 100%" :show-header=false >
                        <el-table-column >
                            <template slot-scope="scope" >
                                <el-radio v-model="radio" :label='scope.row.networkId'  class="dis_flex width100" @change="getRadioVal(scope.row)" >
                                    <span class="width30">{{scope.row.roleName}}</span>
                                    <span class="width30">{{scope.row.name}}</span>
                                    <span class="width30">{{scope.row.phone}}</span>
                                </el-radio>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="btn_box"><el-button plain @click="secondChoice()" >下一步</el-button> </div>
                </div>
                <div v-if="display==2">
                    <div style=" width:90%;margin: 5px auto;" class="font_12">为保护信息安全，系统需要发送短信验证码到管理员手机号上，输入正 确的验证码后才能进行保存。 </div>
                    <div  style=" width:80%;margin: 5px auto;" class="font_12 te_center">将手机验证码发送至：{{this.ruleForm.phone}}</div>
                    <el-form-item label="图形验证码" class="m_top_20 " style=" display: flex;">
                        <el-input style=" width:50%;"  class="fn_left"  v-model="codePic"></el-input>
                        <div class="fn_left m_left_20">
                            <div class="code" @click="refreshCode">
                                <identify :identifyCode="identifyCode" ></identify>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="短信验证码" style=" display: flex;" >
                        <el-input  style=" width: 50%;"  v-model="codePhone" ></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-button  plain  v-show="flag" @click="codeNum()" >获取短信验证码</el-button>
                        <el-button v-show="!flag"><span>{{second}}</span>秒后重新获取</el-button>
                    </el-form-item>
                    <div class="btn_box">
                        <el-button @click="backStep()" plain>上一步</el-button>
                        <el-button  @click="transferOK()" plain>下一步</el-button>
                    </div>
                </div>
            </el-form>
        </el-dialog>
        <!-- 修改手机号 -->
        <el-dialog
            title="修改手机号"
            :visible.sync="updatePhoneShow"
            width="30%">
            <el-form    class="m_left_20"  >
                <div>
                    <div style=" width:90%;margin: 5px auto;" class="font_12">为保护信息安全，系统需要发送短信验证码到管理员手机号上，输入正 确的验证码后才能进行保存。 </div>
                    <div  style=" width:80%;margin: 5px auto;" class="font_12 te_center">将手机验证码发送至：{{userPhone}}</div>
                    <el-form-item label="图形验证码" class="m_top_20 " style=" display: flex;">
                        <el-input style=" width:50%;"  class="fn_left" placeholder="请输入验证码"  v-model="codePic"></el-input>
                        <div class="fn_left m_left_20">
                            <div class="code" @click="refreshCode">
                                <s-identify :identifyCode2="identifyCode" ></s-identify>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="短信验证码" style=" display: flex;" >
                        <el-input  style=" width: 50%;"  v-model="codePhone" placeholder="请输入验证码" ></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-button  plain  v-show="flag" @click="codeNum()" >获取短信验证码</el-button>
                        <el-button v-show="!flag"><span>{{second}}</span>秒后重新获取</el-button>
                    </el-form-item>
                    <el-form-item label="新手机号码" style=" display: flex;" >
                        <el-input placeholder="请输入新手机号码" v-model="newPhone" ></el-input>
                    </el-form-item>
                </div>
                 <div class="btn_box">
                    <el-button @click="updatePhoneShow = false">取 消</el-button>
                    <el-button type="primary" @click="updatePhone()">确 定</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>

    import {getMerchantAccountList,addPostaAmin,putEdit,getDetele,modifyPhone,putTransfer,postSendOut,getSendOut} from '../../../service/user_admin';
    import Identify from '../../common/components/identify'
    import SIdentify from '../../common/components/s-identify'
    export default {
        name: "codetest",
        data() {
            return {
                userName: '张三',//姓名
                userPhone: '1325848595',//电话
                accountNumber:'管理员',//账户
                newPhone:'',//新手机号
                useid:"",//员工id
                merchantId:"",//商户id
                updater:"",//商户id
                msg:'',
                display:1,
                aminDialogVisible: false,
                successVisible: false,
                emptyDialogVisible:false,
                updatePhoneShow: false,
                pageNum:1,
                pageSize:20,
                pages:1,
                totalRows:1,
                roleId:"",// 角色ID
                networkId:"",// 网络ID
                //表格
                tableData: [{},],
                // 表单
                radio:'',
                ruleForm: {
                   networkId:'',
                    roleName: '',
                    phone: '',
                    name: '',
                    remark: '',
                    roleId:''// 角色ID
                },
                identifyCodes: "1234567890",
                identifyCode: "",
                inpCode:false,
                 codePic:'',//图形验证码
                 codePhone:'',//手机验证码
                 second:0,//倒计时计时
                 flag: true,//控制显示获取还是倒计时
                transferNetworkId:'',//移交人的网络身份证id
                handoverNetworkId:'',//交接人的网络身份证id
            };
        },
        components: {
            Identify,
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
            //  this.imgUrls(0.1)
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
                    this.roleId=res.data.roleId;//角色ID
                    console.log(this.tableData);
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
            // 账户修改、添加显示出
            aminoPeration(e){
                this.display=1
                console.log(e)
                if(e.networkId==undefined){
                    this.networkId=0
                }else{
                    this.ruleForm.roleName = e.roleName;
                    console.log(this.ruleForm.roleName )
                }
                this.aminDialogVisible=true;
                this.ruleForm=e;
                this.codePic=""
                this.codePhone="";
                // if(this.ruleForm.networkId==)
            },
            // 删除
            delDate(e,index) {
                this.$confirm('将删除 '+ e.name + ' 账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                }).then(() => {
                 getDetele({ networkId:e.networkId }).then( res => {
                    console.log('res');
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                 this.tableData.splice(index,1)
                }).catch((el) => {
                    console.log(el)
                this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //上一步
            backStep(){
                // this.modifyVisible=false
                this.display=1
            },
            //第二步账户输入判断
            secondStep(ruleForm){
                 if(this.ruleForm.roleName==undefined){
                     this.$message.error({message: '请选择角色',});
                    return false;
                }
                 if(this.ruleForm.name==undefined){
                     this.$message.error({message: '请输入姓名',});
                    return false;
                }
                if(this.ruleForm.phone==undefined){
                    this.$message.error({message: '请输入手机号码',});
                    return false;
                }
                this.display=2
            },

            //提交添加，编辑接口调用            
           submitForm(formName) {
                this.aminDialogVisible = false;
                console.log('submit!');
                if(this.networkId>0){
                    this.ruleForm.networkId=this.networkId;
                    console.log(this.ruleForm);
                    putEdit(this.ruleForm).then( res => { //编辑
                        console.log('res:');
                        console.log(res);
                        this.successVisible=true;
                        this.msg="编辑成功";
                    }).catch( err => {
                        console.log('err:'+err);
                        this.$message(err);
                    })
                    // this.nextDialogVisible = false;
                }else{
                    addPostaAmin(this.ruleForm).then( res => {//新增
                        console.log('res:');
                        console.log(res);
                        this.networkId=res.data;
                        // this.$message(res.msg);
                        this.successVisible=true;
                        this.msg="添加成功";
                    }).catch( err => {
                        console.log('err:'+err);
                        this.$message(err);})
                    // this.nextDialogVisible = false;
                }
                // this.ruleForm=e;
            },
            //倒计时
            countDown(){
                this.flag = false; //点击button改变v-show的状态
                this.second=60;
                let second = setInterval(()=>{  //定时器设置每秒递减
                    this.second--;        //递减时间
                    if(this.second<=0){
                    this.flag = true;    //60s时间结束还原v-show状态并清除定时器
                    clearInterval(second )
                    }
                },1000)
            },
            //验证码
            codeNum(){
                console.log(this.codePic + this.identifyCode)
                if(this.codePic==this.identifyCode ){
                    this.inpCode=true;
                    this.sendOut();
                }else{
                     this.$message.error({message: '验证码错误',});
                }
            },
            //发送验证码
            sendOut(){
                postSendOut({phone:this.ruleForm.phone,phoneCode:'86',type:'1'}).then( res => {
                    console.log('res:');
                    console.log(res);
                    this.countDown()
                })
            },
            // 提交修改、新增
            yzCode(){
                console.log("请输入验证码")
                if(this.inpCode==false){
                    this.$message.error({message: '请输入图形验证码',});
                        return false;
                }
                 if(this.codePhone==false ||this.codePhone=="" ){
                    this.$message.error({message: '请输入手机验证码',});
                    return false;
                }
                
                getSendOut({phone:this.ruleForm.phone,code:this.codePhone,type:'1'}).then( res => {
                    console.log(res);
                    this.submitForm()
                })

            },
            //移交开始
            transfer(e){
                this.display=1;
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
                console.log(e);
                this.transferNetworkId=e.networkId;
                this.emptyDialogVisible=true;

            },
            // 移交的下一步
            secondChoice(){
                 console.log(this.networkId)
                if(this.ruleForm.networkId==undefined||this.ruleForm.networkId=="" ){
                     this.$message.error({message: '请选择角色',});
                    return false;
                }
                this.codePic="";
                this.codePhone="";
                this.display=2
            },
            //Radio的选择取值
            getRadioVal(e){
                // this.fonetworkId
                this.handoverNetworkId=e.networkId;
                console.log(this.handoverNetworkId)
                this.ruleForm=e
                //   console.log("取到的值是"+JSON.stringify(this.ruleForm));
            },
            //移交完成
            transferOK(){
                console.log("请输入图形验证码")
                if(this.inpCode==false){
                    this.$message.error({message: '请输入正确的图形验证码',});
                    return false;
                }
                if(this.codePhone==false){
                    this.$message.error({message: '请输入手机验证码',});
                    return false;
                }
                putTransfer({transferNetworkId:this.transferNetworkId,handoverNetworkId:this.handoverNetworkId}).then( res => {
                    console.log(res);
                    this.successVisible=true;
                    this.emptyDialogVisible=false;
                    this.msg="移交成功";

                }).catch( err => {
                    console.log('err:'+err);
                    this.$message(err);})
               
            },

            //修改手机号码开始
            updatemobiled(){
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
                this.codePic = "";//图像验证码
                this.codePhone = "";//短信验证码
                this.newPhone = "";//新手机号码
                this.updatePhoneShow = true;
            },
            //确认修改
            updatePhone(){
                console.log("请输入图形验证码")
                if(this.inpCode==false){
                    this.$message.error({message: '请输入正确的图形验证码',});
                    return false;
                }
                if(this.codePhone==false){
                    this.$message.error({message: '请输入验证码',});
                    return false;
                }
                if(this.newPhone==false ){
                    this.$message.error({message: '请输入新手机号码',});
                    return false;
                }
                modifyPhone({id:this.newPhone,merchantId:this.merchantId,phone:this.newPhone,updater:this.userName}).then( res => {
                    console.log(res);
                    this.successVisible=true;
                    this.updatePhoneShow=false;
                    this.msg="手机号码修改成功";

                }).catch( err => {
                    console.log('err:'+err);
                    this.$message(err);})

            },
             ///选择页数
            handleCurrentChange(page) {
                console.log(page)
                this.pageNum=page;
                this.getloaddata({'pageNum':this.pageNum,'pageSize':this.pageSize});
            },

        }
    }
</script>

<style scoped>
    .img_code{ width: 70px; height: 30px;}
    /* .divIdentifyingCode { width: 102px;  height:35px; background: #e2e2e2;margin: 0;} */
  .btn_box{ width:70%; margin: 0px  auto; padding:30px 0; }
  /* .p_30{ padding: 30px 0;} */
  .width100{ width: 100%;}
  .width30{ width: 30%; display: inline-block}
 .pop_center{ padding: 30px 0; width: 100%; text-align: center; font-size:28px;}
 .pop_center i{ color:#0DC63C; margin-right:10px;font-size:40px; vertical-align:middle }
 .color_blue{ color:#409EFF }
 .Verification{  width: 102px;  height:35px; }
 .s-canvas{ height: 30px;  margin-top: -4px;}
</style>
