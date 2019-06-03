
<template>
    <div>
         <el-breadcrumb  separator=">" class="font_14 color_78839A">
            <el-breadcrumb-item class="color_34425E">客服中心</el-breadcrumb-item>
            <el-breadcrumb-item>评价管理</el-breadcrumb-item>
        </el-breadcrumb>
         <div class="p_30 bg_fff m_top_20" >
               <el-form :inline="true" :model="ruleForm" class="demo-form-inline ">

                    <el-form-item label="商品名称" prop="order_sn" style="width:296px;">
                        <el-input v-model="ruleForm.order_sn" placeholder="请输入商品名称" class="handle-input " style="width:200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="商家名称" prop="pay_sn"  style="width:296px;">
                        <el-input v-model="ruleForm.pay_sn" placeholder="请输入商家名称" class="handle-input mr10"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名称" prop="consignee_name" style="width:296px;">
                        <el-input v-model="ruleForm.consignee_name" placeholder="请输入用户名称" class="handle-input mr10"></el-input>
                    </el-form-item>
                    <el-form-item label="用户电话" prop="consignee_name" style="width:296px;">
                        <el-input v-model="ruleForm.consignee_name" placeholder="请输入用户电话" class="handle-input mr10"></el-input>
                    </el-form-item></br>

					<el-form-item label="评价星级" prop="select_paymethod" style="width:296px;">
                        <el-select v-model="ruleForm.select_paymethod" placeholder="全部" style="width:200px;">
                            <el-option key="1" label="1星" value="微信"></el-option>
							<el-option key="2" label="2星" value="支付宝"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="评价时间" prop="select_paymethod">
                        <el-date-picker
                                v-model="datetime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期" style="width:350px;">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="状态" prop="select_paymethod" style="width:160px;"  class="m_left_30">
                        <el-select v-model="ruleForm.select_paymethod" placeholder="不限" style="width:90px;">
                            <el-option key="1" label="屏蔽罩" value="1"></el-option>
							<el-option key="2" label="开放中" value="2"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button  class=" " plain @click="searchSubmit">筛选</el-button>
						<el-button  class=" " plain @click="resetForm('ruleForm')">重置</el-button>

                    </el-form-item>
             </el-form>


         </div>
        <div class="m_top_30 bg_fff p_30">
			 <el-table :data="tableData" border ref="multipleTable" @selection-change="handleSelectionChange" class="m_top_20">

                <el-table-column prop="address" align="center" label="商品ID/商品名称" >

                </el-table-column>
                <el-table-column prop="address"align="center" label="订单号" >
                </el-table-column>
                <el-table-column prop="address" align="center"label="商家名称" >
                </el-table-column>
                <el-table-column prop="address" align="center"label="商家电话" >
                </el-table-column>
                <el-table-column prop="address" align="center"label="用户名称" >
                </el-table-column>
                <el-table-column prop="address" align="center"label="用户电话" >
                </el-table-column>
                <el-table-column prop="address" align="center" label="评价星级" >
                </el-table-column>
                <el-table-column prop="address" align="center" label="评价内容" >
                </el-table-column>
                <el-table-column prop="address" align="center" label="评价时间" >
                </el-table-column>
                <el-table-column prop="address" align="center" label="状态" >
                </el-table-column>
                <el-table-column prop="address" align="center" label="操作" >
                </el-table-column>
                <el-table-column align="center" label="查看" >
                    <template slot-scope="scope">
                        <el-button type="danger" plain class="w_80">删除</el-button></br>
                        <el-button  plain class="m_left_0 m_top_16">用户屏蔽</el-button></br>
                        <el-button  type="primary" plain class="m_left_0 m_top_16">用户恢复</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block m_top_30 te_right" >
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
                </el-pagination>
            </div>
        </div>

        <!--//删除评价弹框-->
        <el-dialog
                title="提示"
                :visible.sync="deleteDialogVisible"
                width="300px">
            <span>{{dialogTip}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>

</template>

<script>
    import {hideFullTel} from '../../config/change'
    export default {
        name: "index",
		components:{
        },
        data () {
            return {
               checked: false,
                datetime: [new Date(2019, 4, 10, 10, 10), new Date(2019, 4, 11, 10, 10)],
                //弹框
                recoveryVisible: false,
                suspendVisible: false,
                restartVisible: false,
                deleteDialogVisible: false,
				hoverItem:0,

                //表格
                tableData: [
                      {
                        did: '123',
                        name: 'eee',
                        date: 'ee',
                        address: 'erere',
                        tel: '18791589890',
                        tel1: '18791589893',
                    },
                 ],
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
               ruleForm: {
					pay_at: '',
					order_sn:'',
					pay_sn:'',
					mobile:'',
					select_bus:'',
					consignee_name:'',
					consignee_phone:'',
					select_paymethod: ''
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
                dialogTip:'',
                operationType: 0,
                //选项卡默认message: 'first',
                addClassVisible:false,

            }
        },


        mounted() {
            this.getList()
        },
        methods: {
            getList(){
                this.tableData.forEach(item => {
                    item.tel_hide = hideFullTel(item.tel)
                    item.tel1_hide = hideFullTel(item.tel1)
                })
            },
            //分页
            handleSizeChange(val) {
             console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

            searchSubmit() {
                console.log('submit!');
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            // //表格
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            dateFormatterTel1(row, column) {
                return hideFullTel(row.tel);
            },
            operateMsg(type){
            //    1删除  2隐藏  3恢复
                this.deleteDialogVisible = true
                if(type == 1){
                    this.dialogTip = '您确认要删除这条评价内容吗？'
                    this.operationType = 1
                }
                if(type == 2){
                    this.dialogTip = '您确定要屏蔽该用户的评价功能吗？'
                    this.operationType = 2
                }
                if(type == 3){
                    this.dialogTip = '您确定要恢复该用户的评价功能吗？'
                    this.operationType = 3
                }

            },




        }
    }
</script>

<style scoped>
    .title{ width: 100%; padding-bottom:20px;}
    .lable_tit{ height: 36px; line-height:36px;}
    .w_80{ width: 80px}
    .m_left_0{ margin-left: 0!important;}

</style>
