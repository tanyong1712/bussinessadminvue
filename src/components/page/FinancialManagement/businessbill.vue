<template>
    <div class="">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">财务管理</el-breadcrumb-item>
            <el-breadcrumb-item> 供货商结算单</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="p_30 bg_fff m_top_20">
            <el-form :inline="true" >
                <div class="dis_flx">
                    <el-form-item label="结算单生成日期" class="m_right_30">
                        <el-date-picker  v-model="value1" type="date" placeholder="选择查询日期" class="m_right_30"></el-date-picker>
                    </el-form-item>
                </div>
                <div class="dis_flx m_top_12">

                    <el-form-item>
                        <el-button @click="sendDate" class="m_right_30">查询</el-button>

                        <el-button  icon="el-icon-refresh" @click="clickRefresh" >重置</el-button>
                        <el-button  >导出选中项</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="m_top_20 p_30 bg_fff">
            <tab-item  :tabList="tablist" :hoverItem="hoverItem" @changeTabItem="selectTabItem"></tab-item>
            <!-- 全部结算 -->
            <el-table class="m_top_30"
                      :data="tableData"
                      style="width: 100%"
                      border
                      @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="createTime" label="结算单生成日期"></el-table-column>
                <el-table-column label="订单总额">
                    <el-table-column prop="orderWeChatPay" label="微信支付"></el-table-column>
                    <el-table-column prop="orderAlipayPay" label="支付宝支付"> </el-table-column>
                    <el-table-column prop="orderOtherPay" label="其他支付"> </el-table-column>
                    <el-table-column prop="orderTotalAmount" label="订单合计"></el-table-column>
                </el-table-column>
                <el-table-column label="收入总额">
                    <el-table-column prop="incomeWeChatPay" label="微信支付" ></el-table-column>
                    <el-table-column prop="incomeAlipayPay" label="支付宝支付"></el-table-column>
                    <el-table-column prop="incomeOtherPay" label="其他支付" ></el-table-column>
                    <el-table-column prop="incomeTotalAmount" label="收入合计"></el-table-column>
                </el-table-column>
                <el-table-column prop="costAmount" label="预收款"></el-table-column>
                <el-table-column prop="refundAmount" label="退款金额"> </el-table-column>
                <el-table-column prop="payableAmout" label="应付款"> </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <status-item :status="scope.row.status"></status-item>
                    </template>
                </el-table-column>
                <el-table-column  label="查看">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row, 0)" type="text" size="small">贷款订单</el-button>
                        <el-button @click="handleClick(scope.row, 1)" type="text" size="small">退款订单</el-button>
                    </template>
                </el-table-column>
            </el-table>


            <div class="te_right m_top_30">
                <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalRows"> </el-pagination>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import TabItem from  '../../common/components/tab-item';
    import StatusItem from  '../../common/components/status-item';
    import YesnoItem from  '../../common/components/yesno-item';
    import { truncate } from 'fs';
    import {getplatform} from '../../../service/order';
    export default {
        name: 'businessbill',
        components:{
            TabItem,
            StatusItem,
            YesnoItem
        },
        data() {
            return {

                tablist:[
                    {label:'全部结算单',item:0},
                    {label:'待结算',item:1},
                    {label:'结算中',item:2},
                    {label:'结算完成',item:3},
                    {label:'异常结算单',item:4},
                ],
                pageNum:1,
                pageSize:20,
                pages:1,
                totalRows:1,
                hoverItem:0,
                tableData:[],
                multipleSelection:[],
                ycdilog:false,
                currntstatus:'',
                prestatus:'',
                remark:'',
                currentPage3: 1,
                value1: "",
                value2: "",
                input1: '',
                input2: '',
                seledList: [],
                options: [{
                    value: '',
                    label: '全部'
                }, {
                    value: '1',
                    label: '正常'
                }, {
                    value: '0',
                    label: '异常'
                }],
                value: '',
                forThe: false,          ///待结算标签
                isForThe: false,        ///结算中标签
                forTheError: false,     ///结算异常标签
            }
        },
        created() {
            console.log('created');
            this.getloaddata({'pageNum':this.pageNum,'pageSize':this.pageSize});
        },
        methods: {
            ///进行筛选
            sendDate:function(){
                console.log(this.value1);
                let obj={'pageNum':this.pageNum,'pageSize':this.pageSize};
                if(this.value1){
                    obj.createTime=this.value1;
                }

                // if(this.input1 || this.input2){
                //     obj.searchName=this.input1+' '+this.input2;
                // }
                // if(this.value){
                //     obj.status=this.value;
                // }
                console.log(obj);
                this.getloaddata(obj);
            },

            ///重置筛选条件
            clickRefresh(){
                this.value = '';
                this.value1 = '';
                this.value2 = '';
                this.input1 = '';
                this.input2 = '';
            },
            getloaddata(param){
                getplatform(param).then( res => {
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
            ///选择页数
            handleCurrentChange(page) {
                console.log(page)
                this.pageNum=page;
                this.getloaddata({'pageNum':this.pageNum,'pageSize':this.pageSize});
            },

            ///点击查看
            handleClick(row, tag) {
                console.log(row);
                console.log(tag);
                if(tag == 0){
                    this.$router.push({
                        path:"/pay_order",
                        query:{
                            id: row.id,
                        }
                    });
                }else{
                    this.$router.push({
                        path:"/refund_order",
                        query:{
                            id: row.id,
                        }
                    });
                }
            },

            //选择某一行
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)
            },

            //结算选项卡
            selectTabItem(item){
                console.log(this.hoverItem)
                this.hoverItem = item
                this.getloaddata({'pageNum':this.pageNum,'pageSize':this.pageSize,'status':this.hoverItem});
            },

        },
        computed: {

        }
    }

</script>

<style scoped>
    .m_right_30{ margin-right: 30px!important;}
    .date_btn{border: 1px solid #dcdfe6; color: #606266; font-size: 12px; margin-left: 30px; padding: 0px 15px; line-height: 30px; border-radius: 2px; text-align: center;}
    .tit{ font-size: 16px; font-weight: bold; padding: 20px 0; text-align: center; background:#ebeef5;    border-bottom: 1px solid #ebeef5;}

</style>

