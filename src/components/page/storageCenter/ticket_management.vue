<template>
    <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">票券管理</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
            <el-breadcrumb-item>供应商添加</el-breadcrumb-item> -->
        </el-breadcrumb>
        <div class="p_30 bg_fff">
            <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
                    <el-form-item label="票务名称" prop="name"  class="m_right_30">
                        <el-input v-model="ruleForm.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域" prop="region"  class="m_right_30">
                        <el-select v-model="ruleForm.region" placeholder="请选择活动区域" >
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="启动时间" prop="region" class="m_right_30">
                        <el-form-item prop="date1" >
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"></el-date-picker>
                        </el-form-item>
                    </el-form-item>
                     <el-form-item label="结束时间" prop="region" class="m_right_30">
                        <el-form-item prop="date2" >
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"></el-date-picker>
                        </el-form-item>
                    </el-form-item></br>
                     <el-form-item label="票务券码" prop="region2">
                        <el-select v-model="ruleForm.region" placeholder="请选择" style="width:80%;">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="生成票券方" prop="name">
                        <el-input v-model="ruleForm.name" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchSubmit">搜索</el-button><el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                    
             </el-form>
        </div>
        
        <div class="p_30 bg_fff">
            <tab-item
                :tabList="tablist"
                :hoverItem="hoverItem"
                @changeTabItem="selectTabItem"
        	>
            </tab-item>
            <!-- 待开始 -->
            <div v-if="hoverItem==0"  class="m_top_30">
                <el-table :data="tableData" border   style="width:100%">
                    <el-table-column 
                        prop="type"
                        label="票券名称">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="票券码型">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="票券类型">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="启动时间">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="结束时间">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="生成票券方">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="参与运营商">
                    </el-table-column>
                    <el-table-column prop="total" label="库存总数量" width="180"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                                <el-button size="small" @click="toDetails()">详情</el-button> <el-button size="small" @click="suspendVisible = true">暂停</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 进行中 -->
            <div v-if="hoverItem==1"  class="m_top_30">蓄势待发v</div>
            <div v-if="hoverItem==2"  class="m_top_30">地方吧</div>
            <div v-if="hoverItem==3"  class="m_top_30">迭代</div>
        </div>
        <!-- 暂停弹框内容 -->
        <el-dialog
            title="暂停原因"
            :visible.sync="suspendVisible"
            width="30%"
            center>
            <div>
               <el-form >
                   <!-- ref="form" :model="form" -->
                    <el-form-item >
                        <el-input type="textarea" ></el-input>
                    </el-form-item>
                    <el-form-item class="te_center">
                        <el-button @click="suspendVisible = false">取 消</el-button>
                        <el-button type="primary"  @click="suspendVisible = false">确 定</el-button>
                    </el-form-item>
                    
                </el-form>
              
            </div>
        </el-dialog>
         <!-- 恢复弹框内容 -->
        <el-dialog
            title="恢复票券"
            :visible.sync="recoveryVisible"
            width="30%"
            center>
            <div class="te_center ">
               <div class="p_bottom_30">是否确认恢复该票券业务    </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="recoveryVisible = false">取 消</el-button>
                    <el-button type="primary" @click="recoveryVisible = false">确 定</el-button>
                </span>
            </div>
        </el-dialog>
         <!-- 重启弹框内容 -->
        <el-dialog
            title="重启票券"
            :visible.sync="restartVisible"
            width="45%"
            center>
            <div class="te_center " >
               <el-form :inline="true" class="demo-form-inline te_left"label-width="140px"  style=" margin-left:7%;"  >
                    <el-form-item label="票券名称：" style="width:100%">票券名称 </el-form-item>
                    <el-form-item label="票券型码：" style="width:45%">二维码 </el-form-item>
                    <el-form-item label="票券类型：" style="width:45%;">团购券 </el-form-item>
                    <el-form-item label="启动时间：" style="width:45%;">
                        <el-date-picker type="date" placeholder="选择日期" style="width:200px;"></el-date-picker>
                    </el-form-item>
                   <el-form-item label="结束时间：" style="width:45%;">
                        <el-date-picker type="date" placeholder="选择日期" style="width:200px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="参与运营商数量：" style="width:45%;">1 </el-form-item>
                    <el-form-item label="个体券运营商数量：" style="width:45%;"> 
                        <el-input v-model="ruleForm.supplierName" placeholder="请输入供应商名称"></el-input> 
                     </el-form-item>
               </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="restartVisible = false">取 消</el-button>
                    <el-button type="primary" @click="restartVisible = false">确 定</el-button>
                </span>
            </div>
        </el-dialog>
    </div>
   
</template>

<script>
import TabItem from  '../../common/components/tab-item'//选项卡组件引入
    export default {
        name: "index",
        components:{
            TabItem
        },
        data () {
            return {
                //选项卡
                tablist:[
                    {label:'待开始',item:0},
                    {label:'进行中',item:1},
                    {label:'暂停中',item:2},
					{label:'已结束',item:3},

                ],
                //选项卡默认选项
                hoverItem:0,
                //弹框
                recoveryVisible: false,
                suspendVisible: false,
                restartVisible: false,
                //表格
                tableData: [{
                        name: '金窝窝开票券',
                        code: '渠道引进',
                        type: '省级中心',
                        startTime:'2018.05.01',
                        endTime:'2018.05.01',
                        generate:'总部',
                        cityNumber :'1',
                        total:'2255',
                        totalSurplus:'2255',
                        totalSale:'2255',
                        totalOffs :'55',
                        totalOverdue:'2',

                    },
                ],
              
               ruleForm: {
                    name: '',
                    region: '',
                     region2: '',
                    date1: '',
                    date2: '',
                   
                },
                rules: {
                    name: [
                        { required: false, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ], 
                    region: [
                        { required: false, message: '请选择活动区域', trigger: 'change' }
                    ],
                     region2: [
                        { required: false, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: false, message: '请选择时间', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: false, message: '请选择时间', trigger: 'change' }
                    ],
                    
                   
                },
                
                addClassVisible:false,
            }
        },

        methods: {
            //选项卡
            handleClick(tab, event) {
                console.log(tab, event);
            },
            searchSubmit() {
                console.log('submit!');
            },
            
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
           
            toDetails(){
                this.$router.push({
                    path:`/ticket_details/`	//push一个对象，写path路径
                })
            },
			selectTabItem(item){
                this.hoverItem = item
				console.log(this.hoverItem)
            },
        }
    }
</script>

<style scoped>
    .title{ width: 100%; padding-bottom:20px;}
    .lable_tit{ height: 36px; line-height:36px;}
    .m_right_30{ margin-right: 30px!important;}
</style>
