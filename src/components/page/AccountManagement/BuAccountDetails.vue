<template>
    <div class="">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>BU账户</el-breadcrumb-item>
            <el-breadcrumb-item>用户详细</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="p_30 bg_fff m_top_20">
            <div class="font_14 "><strong>当前账户</strong></div>
            <div class="color_78839A  m_top_24 dis_flex">
                <div class="font_14 li_he_30">当前余额:</div>
                <div class="m_right_40 li_he_30"><strong>{{bublance}}</strong></div>
                <!--<el-button   type="primary" >BU地址管理</el-button>-->
            </div>
            <el-form :inline="true" class="m_top_24">
                <div class="dis_flx">
                    <el-form-item label="日期" class="m_right_30"> 
                        <el-date-picker  v-model="value1" type="date" placeholder="选择查询日期" class="m_right_30"></el-date-picker>
                    </el-form-item>
                    <el-form-item> <el-button @click="sendDate" class="m_right_30">查询</el-button> </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="m_top_20 p_30 bg_fff">
            <tab-item  :tabList="tablist" :hoverItem="hoverItem" @changeTabItem="selectTabItem"></tab-item>
            <!-- 全部结算 -->
            <div class=" m_top_30">
                <el-table border :data="tableData" style="width: 100%">
                    <el-table-column prop="behaviorName" label="行为名称"></el-table-column>
                    <el-table-column prop="flowTime" label="时间"></el-table-column>
                    <el-table-column prop="buValue" label="BU"> </el-table-column>
                </el-table>
            </div>
            <div class="te_right m_top_30">
                <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalRows"></el-pagination>
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
    import {getbulist,getbu} from '../../../service/bu';
    export default {
        name: 'businessbill',
        components:{
            TabItem,
            StatusItem,
            YesnoItem
        },
        data() {
            return {
                bublance:0,
                tablist:[
                    {label:'全部',item:0},
                    {label:'收入',item:1},
                    {label:'支出',item:2},
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
            this.getloaddata({'pageNo':this.pageNum,'pageSize':this.pageSize});
            this.getloadbu({});
        },
        methods: {
            ///进行筛选
            sendDate:function(){
                console.log(this.value1);
                let obj={'pageNo':this.pageNum,'pageSize':this.pageSize};
                if(this.value1){
                    obj.unixTimestamp=this.value1;
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
                param.userMobile='18716200255';
                param.flag=this.hoverItem;
                getbulist(param).then( res => {
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
            getloadbu(param){
                param.userMobile='18716200255';
                getbu(param).then( res => {
                    console.log('res:');
                    console.log(res);
                    this.bublance=res.data.realBuValue;
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
                this.getloaddata({'pageNo':this.pageNum,'pageSize':this.pageSize});
            },

            ///点击查看
            handleClick(row, tag) {
                console.log(row);
                console.log(tag);

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
                this.getloaddata({'pageNo':this.pageNum,'pageSize':this.pageSize});
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

