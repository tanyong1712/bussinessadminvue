<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>物流订单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="p_30 bg_fff m_top_20">
            <el-form :inline="true" ref="ruleForm" :model="ruleForm" class="demo-form-inline ">
                <div class="dis_flex m_bottom_10">
                    <el-form-item label="交易时间" prop="pay_at">
                        <el-date-picker class="w_200"
                                        v-model="ruleForm.pay_at"
                                        type="date"
                                        placeholder="下单或支付时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="内部订单号" prop="order_sn" class="m_left_20">
                        <el-input v-model="ruleForm.order_sn" placeholder="内部订单号" class="handle-input"></el-input>
                    </el-form-item>
                    <el-form-item label="支付单号" prop="pay_sn" class="m_left_20">
                        <el-input v-model="ruleForm.pay_sn" placeholder="支付单号" class="handle-input mr10"></el-input>
                    </el-form-item>
                    <el-form-item label="用户手机号" prop="mobile" class="m_left_20">
                        <el-input v-model="ruleForm.mobile" placeholder="用户手机号" class="handle-input mr10"></el-input>
                    </el-form-item>

                </div>
                <div class="dis_flex m_bottom_10">
                    <el-form-item label="支付方式" prop="select_paymethod" class="m_left_20">
                        <el-select v-model="ruleForm.select_paymethod" placeholder="请选择">
                            <el-option key="1" label="微信" value="微信"></el-option>
                            <el-option key="2" label="支付宝" value="支付宝"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收货人姓名" prop="consignee_name" class="m_left_20">
                        <el-input v-model="ruleForm.consignee_name" placeholder="收货人姓名"
                                  class="handle-input mr10"></el-input>
                    </el-form-item>
                    <el-form-item label="收货人电话" prop="consignee_phone" class="m_left_20">
                        <el-input v-model="ruleForm.consignee_phone" placeholder="收货人电话"
                                  class="handle-input mr10"></el-input>
                    </el-form-item>
                    <el-form-item label="供货商" prop="select_bus" class="m_left_20">
                        <el-select v-model="ruleForm.select_bus" placeholder="筛选供货商">
                            <el-option key="1" label="1" value="1"></el-option>
                            <el-option key="2" label="2" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <el-form-item style="margin-bottom: 0;">
                    <el-button class="h_40 w_100" plain @click="searchSubmit">筛选</el-button>
                    <el-button plain icon="delete" class="handle-del mr1 h_40 w_100" @click="excelout">导出订单</el-button>
                    <el-button plain icon="delete" class="handle-del mr10 h_40" @click="excelin">批量导入发货</el-button>
                    <el-button class="h_40 w_100" plain @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="m_top_30 bg_fff p_30">
            <tab-item
                    :tabList="tablist"
                    :hoverItem="hoverItem"
                    @changeTabItem="selectTabItem"
            ></tab-item>
            <div class="border_DCDFE6 m_top_30 font_14">
                <div class="font_14 list_top_content bg_E4E7EE border_none dis_flex">
                    <div class="w_50_per dis_flex ju_co_around al_it_center">
                        <div class="w_55_per "></div><div class="w_55_per "></div><div class="w_55_per "></div><div class="w_55_per "></div><div class="w_55_per "></div>
                        <div class="w_55_per ">商品信息</div>
                        <div class="w_55_per "></div><div class="w_55_per "></div><div class="w_55_per "></div><div class="w_55_per "></div>
                        <div class="w_15_per ">商品价格</div>
                        <div class="w_15_per ">商品数量</div>
                        <div class="w_15_per ">售后状态</div>
                    </div>
                    <div class="w_35_per dis_flex">
                        <div class="w_30_per p_left_12">邮费</div>
                        <div class="w_20_per">实付金额</div>
                        <div class="w_30_per">支付方式</div>
                        <div class="w_20_per">订单状态</div>
                    </div>
                    <div class="w_15_per dis_flex">
                        <div class="w_100_per">操作</div>
                    </div>
                </div>
                <div class="w_100_per"  v-for="item in tableData">
                    <div class="dis_flex m_top_20 list_top_content bg_F4F5F7">
                        <div class="w_50_per dis_flex font_12">
                            <div class="m_left_10">内部订单号：{{item.id}}</div>
                            <div class="m_left_10">微信交易单号：{{item.orderNo}}</div>
                            <div class="m_left_10">下单时间：{{item.orderTime}}</div>
                            <div class="m_left_10">支付时间：{{item.paymentTime}}</div>
                        </div>
                        <div class="w_50_per te_right" @click="kefu(item.buyerId)">联系用户</div>
                    </div>
                    <div class="dis_flex">
                        <div class="w_50_per dis_flex" style="border-right: 1px solid #DCDFE6;">
                            <div class="w_100_per">

                                <div class="w_100_per dis_flex" style="border-bottom:1px solid #DCDFE6; "
                                     v-for="i in item.detailVos">
                                    <div class="w_55_per">
                                        <div class="dis_flex p_20">
                                            <el-checkbox style="margin-right: 10px;"></el-checkbox>
                                            <img :src="i.good_pic" class="good_pic"/>
                                            <div class="font_14 m_left_12">
                                                <p>{{i.goodsName}}</p>
                                                <p class="color_78839A m_top_15">规格： {{i.goodsSpecification}}</p>
                                                <p class="color_78839A">商品ID：{{i.id}}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w_15_per dis_flex flex_dir_cloumn ju_co_center">
                                        <div class="">￥{{i.goodsPrice}}</div>
                                    </div>
                                    <div class="w_15_per dis_flex flex_dir_cloumn ju_co_center">*{{i.goodsNum}}</div>
                                    <div class="w_15_per dis_flex flex_dir_cloumn ju_co_center">{{i.afterSalesStatus}}</div>
                                </div>

                            </div>
                        </div>
                        <div class="w_35_per dis_flex border_b_DCDFE6" style="border-right: 1px solid #DCDFE6;">
                            <div class="w_30_per dis_flex flex_dir_cloumn ju_co_center p_left_12">{{item.freight}}</div>
                            <div class="w_20_per dis_flex flex_dir_cloumn ju_co_center">{{item.orderAmount}}</div>
                            <div class="w_30_per dis_flex flex_dir_cloumn ju_co_center">{{item.paymentMethod}}</div>
                            <div class="w_20_per dis_flex flex_dir_cloumn ju_co_center">{{item.statusName}}</div>
                        </div>
                        <div class="w_15_per dis_flex dis_flex flex_dir_cloumn ju_co_center border_b_DCDFE6">
                            <div class="">
                                <el-button @click="toDetails(item.id)">查看详情</el-button>
                                <el-button @click="closeorder(item.id)">关闭订单</el-button>
                                <el-button @click="viewPostMsg(item.id)">查看物流</el-button>
                                <el-button @click="viewBeizhuMsg(item.id)">修改备注</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                               :total="totalRows">
                </el-pagination>
            </div>
        </div>

        <!-- 查看物流 -->
        <el-dialog title="物流信息" :visible.sync="postVisible" width="700px" center>
            <div class="li_he_30">
                <div>物流公司：圆通快递</div>
                <div>物流公司：35465765864567</div>
                <div>物流公司：400-120-12200</div>
            </div>

            <div class="border_DCDFE6 line_border m_top_30 m_bottom_30" ></div>
            <progress-bar-column
                    :progressLabel="postDetailList"
                    :progress="postStatus">
            </progress-bar-column>
        </el-dialog>
        <!-- 查看备注 -->
        <el-dialog title="修改备注" :visible.sync="beizhuVisible" width="400px" center>
            <el-form ref="form" label-width="50px">
                <el-form-item label="备注">
                    <el-input v-model="order_remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer te_center m_top_20">
                <el-button @click="beizhuVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateorderremark">确 定</el-button>
            </span>

        </el-dialog>

        <!-- 发货 -->
        <el-dialog title="发货" :visible.sync="fahuoVisible" width="400px" center>
            <el-form ref="form" label-width="80px">

                <el-form-item label="物流公司"  class="m_left_20">
                    <el-select v-model="select_excode" placeholder="请选择">
                        <el-option key="1" label="微信" value="微信"></el-option>
                        <el-option key="2" label="支付宝" value="支付宝"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物流单号"  class="m_left_20">
                    <el-input v-model="order_remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer te_center m_top_20">
                <el-button @click="fahuoVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateorderremark">确 定</el-button>
            </span>

        </el-dialog>
    </div>
</template>

<script>

    import TabItem from '../../common/components/tab-item'
    import ProgressBarColumn from  '../../common/components/progress-bar-column'
    import {getapiorders} from '../../../service/order'

    export default {
        name: "index",
        components: {
            TabItem,
            ProgressBarColumn
        },
        data() {
            return {
                //弹框
                recoveryVisible: false,
                suspendVisible: false,
                restartVisible: false,
                beizhuVisible:false,
                fahuoVisible:false,
                order_remark:'',
                order_id:0,
                select_excode:'',
                hoverItem: 0,
                pageNum:1,
                pageSize:20,
                pages:1,
                totalRows:1,
                tablist: [
                    {label: '全部订单', item: 0},
                    {label: '待付款', item: 1},
                    {label: '待发货', item: 2},
                    {label: '已出库', item: 3},
                    {label: '已发货', item: 4},
                    {label: '交易成功', item: 5},
                    {label: '交易关闭', item: 6},
                    {label: '订单关闭', item: 7},

                ],
                //表格
                tableData: [

                ],

                ruleForm: {
                    pay_at: '',
                    order_sn: '',
                    pay_sn: '',
                    mobile: '',
                    select_bus: '',
                    consignee_name: '',
                    consignee_phone: '',
                    select_paymethod: ''
                },
                rules: {
                    name: [
                        {required: false, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: false, message: '请选择活动区域', trigger: 'change'}
                    ],
                    region2: [
                        {required: false, message: '请选择活动区域', trigger: 'change'}
                    ],
                    date1: [
                        {type: 'date', required: false, message: '请选择时间', trigger: 'change'}
                    ],
                    date2: [
                        {type: 'date', required: false, message: '请选择时间', trigger: 'change'}
                    ],


                },
                //选项卡默认
                activeName: 'first',

                //选项卡默认message: 'first',
                addClassVisible: false,
                postVisible:false,
                postDetailList:[
                    {label:'订单已导出，交由XXX（供货商名称），待出库。',time:'2018.12.24 11:23:45'},
                    {label:'XXX（供货商名称）已发货，已交付圆通快递，运单号5534655476457。',time:'2018.12.24 11:23:45'}
                ],
                postStatus:1
            }
        },
        created() {
            console.log('created');
            getapiorders({'pageNum':this.pageNum,'pageSize':this.pageSize}).then( res => {
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
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            },
            // 确定删除
            deleteRow() {
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            //选项卡
            handleClick(tab, event) {
                console.log(tab, event);
            },
            selectTabItem(item) {
                this.hoverItem = item
                console.log(this.hoverItem)
            },
            searchSubmit() {
                console.log('submit!');
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            toDetails(id) {
                console.log(id)
                this.$router.push({
                    path: "/logistics_detail",
                    query:{id:id}
                })
            },
            excelout() {

            },
            excelin() {

            },
            viewPostMsg(){
                this.postVisible = true
            },
            viewPostMsg(){
                this.postVisible = true
            },
            updateorderremark(){
                //提交修改备注信息

            },
            kefu(userid){
                //联系客户

            },
            closeorder(orderid){
                //关闭订单
            }

        }
    }
</script>

<style scoped>

    .good_pic {
        width: 90px;
        height: 90px;
        border-radius: 4px;
    }
    .w_15_per{ text-align: center}

</style>
