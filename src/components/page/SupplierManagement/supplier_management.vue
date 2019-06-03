<template>
    <div>
        <el-breadcrumb separator=">" class="font_14 color_78839A">
            <el-breadcrumb-item>供应方列表</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>品牌管理</el-breadcrumb-item>
            <el-breadcrumb-item>品牌详情</el-breadcrumb-item> -->
            <el-button type="primary" class="fn_right" @click = "toAdd()">新增供应方</el-button>
        </el-breadcrumb>

         <div class="bg_fff p_30 m_top_20">
              <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
                    <el-form-item label="供应方名称" prop="name" class="m_right_30">
                        <el-input v-model="ruleForm.supplierName"  ></el-input>
                    </el-form-item>
                     <el-form-item label="供应方类型" prop="region" class="m_right_30">
                        <el-select v-model="ruleForm.supplierType" placeholder="请选择">
                            <el-option label="自营采购" value="1"></el-option>
                            <el-option label="一件代发" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="供应方来源" prop="region" class="m_right_30">
                        <el-select v-model="ruleForm.supplierFrom" placeholder="请选择">
                            <el-option label="自营引进" value="1"></el-option>
                            <el-option label="渠道引进" value="2"></el-option>
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
            <div class="statistics font_13">共<span>{{totalRows}}</span>家供应方</div>
            <div  class="m_top_30">
                <el-table
                    :data="tableData"
                    stripe border
                    style="width:100%">
                    <el-table-column
                        prop="supplierName"
                        label="供应方名称"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="compAddress"
                        label="公司地址"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="connectorName"
                        label="联系人"
                            width="130">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="联系电话"
                        width="130">
                    </el-table-column>
                    <el-table-column
                        prop="supplierType"
                        label="类型"
                        width="130">
                    </el-table-column>
                    <el-table-column
                        prop="supplierStatus"
                        label="状态"
                            width="130"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="settleCycle"
                        label="结算周期"
                        width="130">
                    </el-table-column>
                    <el-table-column
                        prop="fromType"
                        label="来源类型"
                        width="130">
                    </el-table-column>
                    <el-table-column
                        prop="startTime"
                        label="开通时间"
                        width="130">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        >
                        <template slot-scope="scope" v-if="scope.row.id==1">
                            <!--<el-button size="small" @click="toDetails()">详情</el-button>-->
                            <!--<el-button size="small" @click="toEdit" >编辑</el-button>-->
                            <!--<el-button size="small" >冻结</el-button>1:待审核，2:审核通过，3:审核不通过，4:启用，5:冻结-->
                            <el-button size="small"  @click="toDetails(scope.row.id,'view')">详情</el-button>
                            <el-button size="small"  @click="toDetails(scope.row.id,'edit')">编辑</el-button>
                            <el-button size="small"  v-if="scope.row.status==1" @click="toDetails(scope.row.id,'aduit')">审核</el-button>
                            <el-button size="small"  v-if="scope.row.status==5" @click="toDetails(scope.row.id,'4')">启用</el-button>
                            <el-button size="small"  v-if="scope.row.status==4" @click="toDetails(scope.row.id,'5')">冻结</el-button>
                        </template>
                    </el-table-column>
                </el-table>

               
            </div>
            <!-- 分页 -->
             <div class=" m_top_30">
                <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                                :total="totalRows">
                    </el-pagination>
                </div>
            </div>
        </div>
        
    </div>

</template>

<script>
import TabItem from  '../../common/components/tab-item'//选项卡组件引入
import {getsupplier} from '../../../service/supplier';
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
                    {label:'待审核',item:1},
                    {label:'启动',item:4},
                    {label:'冻结',item:5},

                ],
                pageNum:1,
                pageSize:20,
                pages:1,
                totalRows:1,
                hoverItem:0,//选项卡默认选项
                //表格
                tableData: [{


                    },
                ],
               ruleForm: {
                   supplierName: '',
                   supplierType: '',
                   supplierFrom: '',
               },
                rules: {
                    name: [
                        { required: false, message: '请输入活动名称', trigger: 'blur' },
                    ],

                },
            }
        },
        created() {
            console.log('created');
            this.getloaddata({'pageNum':this.pageNum,'pageSize':this.pageSize});
        },
        methods: {
           selectTabItem(item){
               this.hoverItem = item;
               console.log(this.hoverItem);
               this.getloaddata({'pageNum':this.pageNum,'pageSize':this.pageSize});
            },
            handleCurrentChange(page) {
                console.log(page);
                this.pageNum=page;
                this.getloaddata({'pageNum':this.pageNum,'pageSize':this.pageSize});
            },
            getloaddata(param){
               param.status=this.hoverItem;
                getsupplier(param).then( res => {
                    console.log('res:');
                    console.log(res);
                    this.tableData=res.data.list;
                    this.totalRows=res.data.total;
                    this.pages=res.data.pages;
                    console.log(this.tableData);
                }).catch( err => {
                    console.log('err:');
                    this.$message(err);
                })
            },
            //  详情
            toDetails(id,action){
                this.$router.push({
                    path:`/supplier_add?id=`+id+'&action='+action	//push一个对象，写path路径
                })
            },
            onSubmit() {
                console.log('submit!');
                let obj={'pageNum':this.pageNum,'pageSize':this.pageSize};
                if(this.ruleForm.supplierName){
                    obj.supplierName=this.ruleForm.supplierName;
                }
                if(this.ruleForm.supplierFrom){
                    obj.supplierFrom=this.ruleForm.supplierFrom;
                }
                if(this.ruleForm.supplierType){
                    obj.supplierType=this.ruleForm.supplierType;
                }
                console.log(obj);
                this.getloaddata(obj);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }


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
