<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">物流订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>物流订单详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="p_30 bg_fff m_top_20">
            <progress-bar
                :progressLabel="progressList"
                :progress="progress"
        ></progress-bar>
        </div>
        <div class="m_top_20 dis_flex">
           <div class="wid33 p_30 bg_fff">
               <div class="font_16 color_445370">订单信息</div>
               <div class="font_14 m_top_30">
                   <div class="dis_flex ">
                       <div class="w_120">内部订单号：</div><div>{{tableData.orderNo}}</div>
                   </div>
                   <div class="dis_flex m_top_16">
                       <div class="w_120">微信订单号：</div><div>{{tableData.payNo}}</div>
                   </div>
                   <div class="dis_flex m_top_16">
                       <div class="w_120">订单状态：</div><div><span class="m_right_30">{{tableData.statusName}}</span> <span class="color_317efc">查看物流</span></div>
                   </div>
                   <div class="dis_flex m_top_16">
                       <div class="w_120">物流单号：</div><div><span>圆通快递</span> <span>3254930459676546</span></div>
                   </div>
                   <div class="dis_flex m_top_16">
                       <div class="w_120">售后状态：</div><div>无售后</div>
                   </div>
               </div>
           </div>
           <div class="wid33 p_30 bg_fff m_left_20">
                <div class="font_16 color_445370">收货人信息</div>
               <div class="font_14 m_top_30">
                   <div class="dis_flex ">
                       <div class="w_120">收货人：</div><div>{{tableData.buyerName}}</div>
                   </div>
                   <div class="dis_flex m_top_16">
                       <div class="w_120">收货地址：</div><div>{{tableData.buyerProvincial}}{{tableData.buyerMunicipal}}{{tableData.buyerAddress}}</div>
                   </div>
                   <div class="dis_flex m_top_16">
                       <div class="w_120">电话：</div><div>{{tableData.buyerPhone}}</div>
                   </div>
                   <div class="dis_flex m_top_16">
                       <div class="w_120">备注：</div><div>请发3号透明哑光请发3号</div>
                   </div>
               </div>
           </div>
           <div class="wid33 p_30 bg_fff m_left_20">
               <div class="font_16 color_445370">收货人信息</div>
               <div class="font_14 m_top_30 color_78839A ">
                   <div class="dis_flex ">
                       <div class="w_120">支付公司：</div><div>银盛支付</div>
                   </div>
                   <div class="dis_flex m_top_16">
                       <div class="w_120">支付方式：</div><div>微信</div>
                   </div>
                   <div class="dis_flex m_top_16">
                       <div class="w_120">商品总额：</div><div>¥{{tableData.orderAmount}}</div>
                   </div>
                   <div class="dis_flex m_top_16">
                       <div class="w_120">账户余额抵扣：</div><div>无</div>
                   </div>
                   <div class="dis_flex m_top_16">
                       <div class="w_120">现金券抵扣：</div><div>无</div>
                   </div>
                   <div class="dis_flex m_top_16">
                       <div class="w_120">BU抵扣：</div><div>无</div>
                   </div>
                   <div class="dis_flex m_top_16">
                       <div class="w_120">优惠：</div><div>无</div>
                   </div>
                   <div class="dis_flex m_top_16">
                       <div class="w_120">实际支付金额：</div><div>¥{{tableData.orderAmount}}</div>
                   </div>
               </div>
           </div>
        </div>
        <div class="p_30 m_top_20 bg_fff dis_flex">
            <div class="w_300">
                <div class="font_16 color_445370">发货物流信息</div>
                <div class="font_14 m_top_30 color_78839A">
                    <div class="dis_flex ">
                       <div class="w_100">物流公司：</div><div>圆通快递</div>
                   </div>
                   <div class="dis_flex m_top_16">
                       <div class="w_100">物流单号：</div><div>3254930459676546</div>
                   </div>
                   <div class="dis_flex m_top_16">
                       <div class="w_100">物流电话：</div><div>400-120-12330</div>
                   </div>
                </div>
            </div>
            <div class="m_left_40">
                <progress-bar-column
                        :progressLabel="postDetailList"
                        :progress="postStatus">
                </progress-bar-column>
            </div>
        </div>
        <div class="p_30 m_top_20 bg_fff">
            <el-table :data="tableData.childrenOrders" border>
                <el-table-column prop="goodsId" align="center" label="商品ID" >
                </el-table-column>
                <el-table-column prop="goodsName"align="center" label="商品名称" >
                </el-table-column>
                <el-table-column prop="goodsSpecification" align="center"label="商品规格" >
                </el-table-column>
                <el-table-column prop="goodsSpecification" align="center"label="商品颜色" >
                </el-table-column>
                <el-table-column prop="goodsSpecification" align="center"label="商品材质" >
                </el-table-column>
                <el-table-column prop="goodsNum" align="center"label="商品数量" >
                </el-table-column>
                <el-table-column prop="goodsPrice" align="center" label="商品价格" >
                </el-table-column>
                <el-table-column prop="goodsSpecification" align="center" label="现金券抵扣" >
                </el-table-column>
                <el-table-column prop="goodsSpecification" align="center" label="BU抵扣">
                </el-table-column>
                <el-table-column prop="goodsSpecification" align="center" label="优惠" >
                </el-table-column>
                <el-table-column prop="goodsPrice" align="center" label="实付金额" >
                </el-table-column>
                <el-table-column prop="goodsSpecification" align="center" label="促销类型" >
                </el-table-column>
                <el-table-column prop="goodsSpecification" align="center" label="促销活动ID" >
                </el-table-column>
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
 import ProgressBar from  '../../common/components/progress-bar'
 import ProgressBarColumn from  '../../common/components/progress-bar-column'
 import {getorder} from '../../../service/order'
    export default {
        name: 'basetable',
         components:{
             ProgressBar,
             ProgressBarColumn,
        },
        data() {
            return {
                url: './vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1,
                //进度条
                 progressList:[
                    {label:'提交订单',time:'2018.12.24 11:23:45'},
                    {label:'付款时间',time:'2018.12.24 11:23:45'},
                    {label:'订单已导出',time:'2018.12.24 11:23:45'},
                    {label:'商品已发货',time:'2018.12.24 11:23:45'},
                    {label:'交易完成',time:'2018.12.24 11:23:45'},
                ],
                progress:1,
                postDetailList:[
                    {label:'订单已导出，交由上海艺冉（供货商名称），待出库。',time:'2018.12.24 11:23:45'},
                    {label:'上海艺冉（供货商名称）已发货，已交付圆通快递，运单号3254930459676546。',time:'2018.12.24 11:23:45'}
                ],
                postStatus:1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {

            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                let id=this.$route.query.id
                getorder(id).then( res => {
                    console.log('orderdetail:');
                    console.log(res);
                    this.tableData=res.data;
                    console.log(this.tableData);
                    this.progressList=[
                        {label:'提交订单',time:this.tableData.orderTime},
                        {label:'付款时间',time:this.tableData.paymentTime},
                         {label:'订单已导出',time:this.tableData.dexcelTime},
                        {label:'商品已发货',time:this.tableData.deliveryTime},
                        {label:'交易完成',time:this.tableData.transactionTime},
                    ]

                }).catch( err => {
                    console.log('err:');
                    this.$message(err);
                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            excelout(){
                const length = this.multipleSelection.length;
                let str = '';
                let ids = '';
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                    ids += this.multipleSelection[i].did + ' ';
                }
                alert(str);
                alert(ids);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }

    .wid33{ width:33%;height:330px;}
   .w_300{ border-right: 1px #BABEC6 dashed;}
   /* .m_top_20 thead.is-group tr:nth-child(even){ display: none!important} */
</style>
