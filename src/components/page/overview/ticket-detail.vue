<template>
    <div>
        <el-breadcrumb separator=">" class="font_14 color_78839A">
            <el-breadcrumb-item class="color_34425E">数据中心</el-breadcrumb-item>
            <el-breadcrumb-item>单一票券详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="bg_fff p_30 m_top_20">
        <div class="dis_flex m_bottom_30">
            <div class="item_wid font_12">时间</div>
            <el-date-picker type="date" placeholder="选择日期" v-model="date_time"></el-date-picker>
            <div class="al_slef_center font_12 m_right_12 m_left_24 cur_pointer" @click="clearItem">
                <i class="el-icon-lx-refresh"></i><span class="m_left_5">重置</span>
            </div>
            <el-button>查询</el-button>
        </div>
        <div class="dis_flex">
            <div class="item_wid font_12">颗粒度</div>
            <div class="al_slef_center">
                <el-radio-group v-model="timeType" @change="selectTimeType">
                    <el-radio :label="1">日</el-radio>
                    <el-radio :label="2">周</el-radio>
                    <el-radio :label="3">月</el-radio>
                    <el-radio :label="4">季度</el-radio>
                </el-radio-group>
            </div>
        </div>
        </div>

        <div class="bg_fff p_30 m_top_20">
            <div class="w_80_per m_top_20" id="chart_con" style="border: 1px solid #eeeeee;">
                <div id="main" :style="{width: width+'px', height: '350px'}"></div>
            </div>
            <div class="m_top_20 w_80_per">
                <div class="data_title dis_flex ju_co_between">
                    <el-date-picker type="date" placeholder="选择日期" v-model="date_time"></el-date-picker>
                    <div class="dis_flex">
                        <div class="item_wid font_12">颗粒度</div>
                        <div class="al_slef_center">
                            <el-radio-group v-model="timeType" @change="selectTimeType">
                                <el-radio :label="1">日</el-radio>
                                <el-radio :label="2">周</el-radio>
                                <el-radio :label="3">月</el-radio>
                                <el-radio :label="4">季度</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="color_409eff cur_pointer  m_right_30 font_14">下载表格</div>
                </div>
                <div class="border_DCDFE6 border_t_none">
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        @sort-change="changeBy"
                >
                    <el-table-column
                            prop="date"
                            label="时间">
                    </el-table-column>
                    <el-table-column
                            prop="total"
                            label="总营业额"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="付款订单数"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="商家结算">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="公司收入">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="渠道分润">
                    </el-table-column>
                </el-table>
                <div class="h_50 m_top_20">
                    <el-pagination style="float: right;"
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page.sync="page"
                                   :page-size="10"
                                   layout="prev, pager, next, jumper"
                                   :total="tableData.length">
                    </el-pagination>
                </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import RegionPicker from '../../common/components/region-picker'
    import TabItem from '../../common/components/tab-item'
    import region from '../../common/province'

    export default {
        name: "qudao",
        data() {
            return {
                date_time: '',
                timeType: 1,
                province: [],
                city: [],
                region: [],
                provinceList: region.data,
                cityList: [],
                regionList: [],
                timeType: 1,
                tabList: [
                    {label: '线上商品库', item: 1},
                    {label: '生活服务票券库', item: 2},
                    {label: '畅销商品数据', item: 3},
                    {label: '畅销票券库', item: 4}
                ],
                hoverItem: 1,
                width: 0,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                page: 1
            }
        },
        components: {
            RegionPicker,
            TabItem
        },
        mounted() {
            let chart = document.getElementById('main')
            chart.style.width = document.getElementById('chart_con').offsetWidth + 'px'
            this.echarts.init(chart)
            this.viewChart()
        },
        methods: {
            listFetch() {
                getNetworks().then(resp => {

                }).catch(err => {

                })
            },
            chooseProvince(id) {
                console.log('select       ' + id)
                this.provinceList.forEach(item => {
                    if (item.name == id) {
                        this.cityList = item.children
                    }
                })
            },
            chooseCity(id) {
                console.log('select       ' + id)
                this.cityList.forEach(item => {
                    if (item.name == id) {
                        this.regionList = item.children
                    }
                })
            },
            chooseRegion(id) {
                console.log('select       ' + id)
            },
            clearChooseItem() {
                this.regionList = this.cityList = []
            },
            selectTimeType(item) {
                this.timeType = item
            },
            selectTabItem(item) {
                console.log(this.hoverItem)
                this.hoverItem = item
            },
            viewChart() {
                let dom1 = document.getElementById('main')
                let myChart = this.echarts.init(dom1)
                myChart.setOption({
                    title: {
                        text: '财务总览'
                    },
                    legend: {
                        data: ['邮件营销', '联盟广告', '视频广告', '直接访问']
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '3%',
                        top: '20%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name: '邮件营销',
                        type: 'line',
                        stack: '总量',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                        {
                            name: '联盟广告',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '视频广告',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '直接访问',
                            type: 'line',
                            stack: '总量',
                            data: [320, 332, 301, 334, 390, 330, 320]
                        }]
                });
            },
            changeBy(column, prop, order) {
                console.log(column.prop); //prop标签 => nickname
                console.log(column.order);//descending降序、ascending升序
            },
            handleSizeChange(val) {
                console.log(val)
            },
            handleCurrentChange(val) {
                console.log(val)
            },
            goodDetail(){

            },
            clearItem(){

            }
        }
    }
</script>

<style scoped>
    .active {
        color: #409EFF;
    }
</style>
