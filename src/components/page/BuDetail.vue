<template>
    <div>
        <el-breadcrumb separator=">" class="font_14 color_78839A">
            <el-breadcrumb-item class="color_34425E">客服中心</el-breadcrumb-item>
            <el-breadcrumb-item>用户查询</el-breadcrumb-item>
            <el-breadcrumb-item>用户详细</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="bg_fff p_30 m_top_20">
            <div class="font_16 color_445370">账号信息</div>
            <div class="color_78839A font_14 m_top_24">
                <span>BU账号:</span>
                <span class="m_left_16">132231213213</span>
            </div>
        </div>
        <div class="bg_fff p_30 m_top_20">
            <tab-item
                    :tabList="tablist"
                    :hoverItem="hoverItem"
                    @changeTabItem="selectTabItem"
            ></tab-item>
            <el-form class="m_top_20">
                <el-form-item label="按时间查询">
                    <el-col :span="11" style="width: 200px;margin-right: 10px">
                        <el-date-picker type="month" placeholder="选择月" v-model="dateTime1"
                                        style="width: auto;"></el-date-picker>
                    </el-col>
                    <el-button @click="getDataList()">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="border_DCDFE6 m_top_30">
                <el-table
                        :data="dataList1"
                        style="width: 100%">
                    <el-table-column
                            prop="realname"
                            label="事件">
                    </el-table-column>
                    <el-table-column
                            prop="reg_time"
                            label="获取时间">
                    </el-table-column>
                    <el-table-column
                            prop="id_card"
                            label="获得BU">
                    </el-table-column>
                    <el-table-column
                            prop="nickname"
                            label="备注">
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination class="te_right m_top_15" style="text-align: right;"
                           @size-change="sizeChangeHandle1"
                           @current-change="currentChangeHandle1"
                           :current-page="pageIndex1"
                           :page-sizes="[10, 20, 50, 100]"
                           :page-size="pageSize1"
                           :total="totalPage1"
                           layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    import TabItem from '../../common/components/tab-item'
    export default {
        data() {
            return {
                status: 0,
                activeName: 'first',
                dateTime1: '',
                dataList1: [
                    {
                        id: 1,
                        mobile: '13524564565',
                        nickname: '每日签到',
                        realname: '签到',
                        rec_mobile: 1321312312,
                        channel: '老用户转化',
                        id_card: 5,
                        reg_time: '2018-02-23 22:10:11',
                        status: 1
                    },
                    {
                        id: 2,
                        mobile: '13245465456',
                        nickname: '对应单号782321312',
                        realname: '消费',
                        rec_mobile: 1321312312,
                        channel: '商户推荐',
                        id_card: 10,
                        reg_time: '2018-02-23 22:10:11',
                        status: 0
                    },
                    {
                        id: 2,
                        mobile: '13245465456',
                        nickname: '对应单号782312311',
                        realname: '评论',
                        rec_mobile: 1321312312,
                        channel: '商户推荐',
                        id_card: 30,
                        reg_time: '2018-02-23 22:10:11',
                        status: 0
                    },
                    {
                        id: 2,
                        mobile: '13245465456',
                        nickname: 'xx任务',
                        realname: '任务',
                        rec_mobile: 1321312312,
                        channel: '商户推荐',
                        id_card: 20,
                        reg_time: '2018-02-23 22:10:11',
                        status: 0
                    },
                ],
                pageIndex1: 1,
                pageSize1: 10,
                totalPage1: 4,
                dateTime2: '',
                dataList2: [
                    {
                        id: 1,
                        mobile: '13524564565',
                        nickname: '兑换卡卷',
                        realname: '兑换卡卷',
                        rec_mobile: 1321312312,
                        channel: '老用户转化',
                        id_card: 5,
                        reg_time: '2018-02-23 22:10:11',
                        status: 1
                    },
                    {
                        id: 2,
                        mobile: '13245465456',
                        nickname: '抽奖',
                        realname: '抽奖',
                        rec_mobile: 1321312312,
                        channel: '商户推荐',
                        id_card: 100,
                        reg_time: '2018-02-23 22:10:11',
                        status: 0
                    },
                ],
                pageIndex2: 1,
                pageSize2: 10,
                totalPage2: 2,
                tablist: [
                    {label: 'BU获取明细', item: 1},
                    {label: 'BU消费明细', item: 2},
                ],
                hoverItem: 1,
            };
        },
        components: {
            TabItem
        },
        methods: {
            getDataList(){

            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            sizeChangeHandle1(val) {
                this.pageSize1 = val
                this.pageIndex1 = 1
            },
            // 当前页
            currentChangeHandle1(val) {
                this.pageIndex1 = val
            },
            sizeChangeHandle2(val) {
                this.pageSize2 = val
                this.pageIndex2 = 1
            },
            // 当前页
            currentChangeHandle2(val) {
                this.pageIndex2 = val
            },
            // 更改状态
            changeStatus() {
                let that = this;
                let status = that.status;
                let tip = status == 0 ? '解冻' : '冻结';
                this.$confirm('确定' + tip + '此账号?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // this.$http({
                    //   url: this.$http.adornUrl('/sys/user/delete'),
                    //   method: 'post',
                    //   data: this.$http.adornData(userIds, false)
                    // }).then(({data}) => {
                    //   if (data && data.code === 0) {
                    //     this.$message({
                    //       message: '操作成功',
                    //       type: 'success',
                    //       duration: 1500,
                    //       onClose: () => {
                    //         this.getDataList()
                    //       }
                    //     })
                    //   } else {
                    //     this.$message.error(data.msg)
                    //   }
                    // })
                }).catch(() => {
                })
            },
            selectTabItem(item) {
                console.log(this.hoverItem)
                this.hoverItem = item
            },
        }
    }
</script>

<style scoped>
    .account_info {
        float: left;
        margin: 2px 0px;
    }

    .account_info label {
        margin-left: 30px;
    }
</style>
