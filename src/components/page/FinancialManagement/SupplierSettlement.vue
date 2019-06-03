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
                    <el-form-item label="结算账期"  class="m_right_30">
                        <el-input v-model="value2" placeholder="结算账期"></el-input>
                    </el-form-item>
                    <el-form-item label=" 供货商名称/ID"  class="m_right_30">
                       <el-input v-model="input1" placeholder="输入 供货商名称/ID"></el-input>
                    </el-form-item>
                </div>
                <div class="dis_flx m_top_12">
                   <el-form-item label=" 供货商手机号"  class="m_right_30">
                        <el-input v-model="input2" placeholder=" 供货商在平台的注册手机号"></el-input>
                    </el-form-item>
                     <el-form-item label="状态" class="m_right_30">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
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
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="createTime" label="结算单生成日期"></el-table-column>
                <el-table-column prop="settlementTime" label="结算账期"></el-table-column>
                <el-table-column prop="supplierName" label=" 供货商名称/ID"> </el-table-column>
                <el-table-column prop="phone" label="注册手机号"> </el-table-column>
                <el-table-column prop="companyName" label="公司名称"></el-table-column>
                <el-table-column prop="creditCode" label="信用代码" ></el-table-column>
                <el-table-column prop="payee" label="收款人"></el-table-column>
                <el-table-column prop="bankAccountNo" label="银行卡号" ></el-table-column>
                <el-table-column prop="bankBranch" label="开户支行"></el-table-column>
                <el-table-column prop="costAmount" label="商品成本"></el-table-column>
                <el-table-column prop="logisticsAmount" label="物流费用"></el-table-column>
                <el-table-column prop="refundAmount" label="退款金额"> </el-table-column>
                <el-table-column prop="payableAmout" label="应付款"> </el-table-column>
                <el-table-column prop="status" label="结算结果">
                    <template slot-scope="scope">
                        <status-item :status="scope.row.status"></status-item>
                    </template>
                </el-table-column>
                <el-table-column prop="invalid" label="状态">
                    <template slot-scope="scope">
                        <yesno-item :status="scope.row.invalid"></yesno-item>
                    </template>
                </el-table-column>
                <el-table-column  label="查看">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row, 0)" type="text" size="small">贷款订单</el-button>
                        <el-button @click="handleClick(scope.row, 1)" type="text" size="small">退款订单</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="m_top_30">
                <div v-if="hoverItem==1">
                    <el-button @click="aduitstatus(hoverItem,2)">选中项通过审核</el-button>
                    <el-button @click="aduitallstatus(hoverItem,2)">全部通过审核</el-button>
                    <el-button @click="disycdolog(hoverItem,4)">标记为异常</el-button>
                </div>
                <div v-if="hoverItem==2">
                    <el-button @click="aduitstatus(hoverItem,3)">选中项打款完成</el-button>
                    <el-button @click="aduitallstatus(hoverItem,3)">全部打款完成</el-button>
                    <el-button @click="disycdolog(hoverItem,4)">标记为异常</el-button>
                </div>
                <div v-if="hoverItem==4">
                    <el-button @click="aduitstatus(hoverItem,3)">选中项结算成功</el-button>
                </div>

            </div>
            <div class="te_right m_top_30">
                <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                                   :total="totalRows">
                    </el-pagination>
                </div>
            </div>
        </div>

        <el-dialog :visible.sync="ycdilog" title="标记为异常">
            <div class="dis_flex flex_no_wrap font_w_600 m_bottom_20">
                <div class="w_100_per">原因</div>
            </div>
            <div class="dis_flex flex_no_wrap m_bottom_20">

                <div class="w_100_per">
                    <el-input v-model="remark" ></el-input>

                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ycdilog = false">取消</el-button>
                <el-button type="primary" @click="ycaduitstatus(currntstatus,prestatus)">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import TabItem from  '../../common/components/tab-item';
    import StatusItem from  '../../common/components/status-item';
    import YesnoItem from  '../../common/components/yesno-item';
    import { truncate } from 'fs';
    import {getsuppliers,updatesuppliers} from '../../../service/order';
    export default {
        name: 'tabs',
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
                console.log(this.value2);
                console.log(this.input1);
                console.log(this.input2);
                console.log(this.value);
                let obj={'pageNum':this.pageNum,'pageSize':this.pageSize};
                if(this.value1){
                    obj.createTime=this.value1;
                }
                if(this.value2){
                    obj.settlementTime=this.value2;
                }
                if(this.value1){
                    obj.createTime=this.value1;
                }
                if(this.input1 || this.input2){
                    obj.searchName=this.input1+' '+this.input2;
                }
                if(this.value){
                    obj.status=this.value;
                }
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
                getsuppliers(param).then( res => {
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

            ///选择某一行
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)
            },

            ///结算选项卡
            selectTabItem(item){
                console.log(this.hoverItem)
                this.hoverItem = item
                this.getloaddata({'pageNum':this.pageNum,'pageSize':this.pageSize,'status':this.hoverItem});
            },
            //异常弹框
            disycdolog(s1,s2){
                this.currntstatus=s1;
                this.prestatus=s2;
                this.ycdilog=true;

            },
            //审核接口
            postsupplier(param){
                updatesuppliers(param).then( res => {
                    console.log('res:');
                    console.log(res);
                    this.$message('成功');
                }).catch( err => {
                    console.log('err:');
                    this.$message(err);
                })
            },
            //审核
            ycaduitstatus(s1,s2){

                for (let elem of this.multipleSelection.values()) {
                    console.log(elem.id);
                    let obj={
                        id:elem.id,
                        status:s2,
                        abnormal:this.remark
                    };
                    this.postsupplier(obj);
                    this.ycdilog=false;
                }

            },
            //审核
            aduitstatus(s1,s2){

                for (let elem of this.multipleSelection.values()) {
                    console.log(elem.id);
                    let obj={
                        id:elem.id,
                        status:s2,
                    };
                    this.postsupplier(obj);
                }

            },
            //全部审核
            aduitallstatus(s1,s2){

                for (let elem of this.tableData.values()) {
                    console.log(elem.id);
                    let obj={
                        id:elem.id,
                        status:s2,
                    };
                    this.postsupplier(obj);

                }

            }
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

