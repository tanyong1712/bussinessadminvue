<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right ">
            <el-breadcrumb-item :to="{ path: '/' }" class="li_he_32">供货方审核列表</el-breadcrumb-item>
            <el-button type="primary" class="fn_right" @click = "toAdd()">新增供货方</el-button>
            
        </el-breadcrumb>
         <div class="p_30 bg_fff">
              <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
                    <el-form-item label="供货方名称" prop="name" style="width:20%;">
                        <el-input v-model="ruleForm.name"  ></el-input>
                    </el-form-item>
                     <el-form-item label="供货方类型" prop="region" style="width:20%;;">
                        <el-select v-model="ruleForm.region" placeholder="请选择" style="width:80%;">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="供货方来源" prop="region" style="width:20%;">
                        <el-select v-model="ruleForm.region" placeholder="请选择" style="width:80%;">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item>
                        <el-button type="primary" @click="onSubmit">搜索</el-button><el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
             </el-form>
             
         </div>
        <div class="po_relative p_30 bg_fff m_top_20">
            <tab-item
                :tabList="tablist"
                :hoverItem="hoverItem"
                @changeTabItem="selectTabItem"
        	>
            </tab-item>
             <div class="statistics font_13">共<span>32</span>家供货方</div>
            <div v-if="hoverItem==0" class="m_top_30">
                <el-table border
                    :data="tableData"
                    stripe
                    style="width:100%">
                    <el-table-column
                        prop="name"
                        label="供货方名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="公司地址"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="contacts"
                        label="管理员"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="telephone"
                        label="管理员账号"
                         >
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="类型"
                         >
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        label="状态"
                             
                        >
                    </el-table-column>
                    <el-table-column
                        prop="cycle"
                        label="结算方式"
                         >
                    </el-table-column>
                    <el-table-column
                        prop="typeSource"
                        label="来源类型"
                         >
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="开通时间"
                        width="140">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        >
                        <template slot-scope="scope">
                                <el-button size="small" @click="toDetails()">详情</el-button><el-button size="small" >审核</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-if="hoverItem==1" class="m_top30">审核中 </div>
            <div v-if="hoverItem==2" class="m_top30">审核通过</div>
        </div>
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
                    {label:'全部',item:0},
                    {label:'审核中',item:1},
                    {label:'审核未通过',item:2},

                ],
                //选项卡默认选项
                hoverItem:0,
                //表格
                tableData: [{
                        name: '金窝窝开票券',
                        address: '渠道引进',
                        contacts: '张三',
                        telephone:'13274985985',
                        type:'一件代发',
                        cycle:'30天',
                        state:'启用',
                        typeSource  :'总部引进',

                        time:'2019.02.02',
                        totalSurplus:'2255',
                        totalSale:'2255',
                        totalOffs :'55',
                        totalOverdue:'2',

                    },
                ],
               ruleForm: {
                    name: '',
                    region: '',
               },
                rules: {
                    name: [
                        { required: false, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ], 
                    region: [
                        { required: false, message: '请选择活动区域', trigger: 'change' }
                    ],
                   
                },
            }
        },

        methods: {
           
            // 新增供货方
            toAdd(){
                this.$router.push({
                    path:`/supplier_add`	//push一个对象，写path路径
                })
            },
            //  详情
            toDetails(){
                this.$router.push({
                    path:`/supplier_audit_details`	//push一个对象，写path路径
                })
            },


            onSubmit() {
                console.log('submit!');
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //选项卡
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
    .fn_right{ float: right;}
     .statistics{ position: absolute;right:30px;top:30px;}
    .m_right_30{ margin-right: 30px!important;}
</style>
