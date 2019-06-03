<template>
    <div class="po_relative">
        <el-breadcrumb separator=">" class="font_14 color_78839A">
            <el-breadcrumb-item class="color_34425E">实物货品管理</el-breadcrumb-item>
            <el-breadcrumb-item>实物货品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="po_absolute add_top">
            <el-button @click="addOneGood" type="primary">新增货品</el-button>
        </div>
        <div class="bg_fff p_30 m_top_20">
            <div class="dis_flex m_bottom_30">
                <div class="dis_flex">
                    <div class="item_wid font_14" style="width: 120px;">货品名称或ID</div>
                    <el-date-picker type="date" placeholder="请输入货品名称或ID" v-model="goodName"></el-date-picker>
                </div>
                <div class="dis_flex m_left_30">
                    <div class="item_wid font_14">货品分类</div>
                    <el-select v-model="goodClass">
                        <el-option key="bbk" label="步步高" value="bbk"></el-option>
                        <el-option key="xtc" label="小天才" value="xtc"></el-option>
                        <el-option key="imoo" label="imoo" value="imoo"></el-option>
                    </el-select>
                </div>
                <div class="dis_flex m_left_30">
                    <div class="item_wid font_14">品牌</div>
                    <el-select v-model="goodClass">
                        <el-option key="bbk" label="步步高" value="bbk"></el-option>
                        <el-option key="xtc" label="小天才" value="xtc"></el-option>
                        <el-option key="imoo" label="imoo" value="imoo"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="dis_flex m_bottom_30">
                <div class="dis_flex">
                    <div class="item_wid font_14">上架时间</div>
                    <el-date-picker
                            v-model="value3"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="dis_flex m_left_30">
                    <div class="item_wid font_14">价格区间</div>
                    <price-section :priceArr="priceArr" @change="GetPriceArr"></price-section>
                </div>
            </div>
            <div class="dis_flex m_left_80">
                <el-button class="w_100"  type="primary">搜索</el-button>
                <el-button class="w_100">重置</el-button>
            </div>
        </div>
        <div class="bg_fff p_30 m_top_20">
            <tab-item :tabList="tablist"  :hoverItem="hoverItem" @changeTabItem="selectTabItem"></tab-item>
            <div class="">
                <el-table class="m_top_30" border   :data="tableData" style="width: 100%"  @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column prop="name" label="货品名称"> </el-table-column>
                    <el-table-column prop="productCategoryName" label="所属分类"></el-table-column>
                    <el-table-column prop="stauts" label="商品状态"></el-table-column>
                    <el-table-column prop="productBrandName" label="品牌" width="100"></el-table-column>
                    <el-table-column prop="goodsPrice" label="指导价" width="100"></el-table-column>
                    <el-table-column prop="goodsnum" label="总库存" width="100"></el-table-column>
                    <el-table-column prop="fh" label="发货方式" width="100"></el-table-column>
                    <el-table-column prop="createTime" label="上架时间" width="100"></el-table-column>
                    <el-table-column prop="updateTime" label="修改时间" width="100"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope" v-if="scope.row.id==1">
                            <!--<el-button  @click="viewGoods(scope.row.id)">详情</el-button>-->
                            <el-button  @click="changeGoods(scope.row.id)">编辑</el-button>
                            <el-button @click="changeGoodsStorage(scope.row.id)">库存调整</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>    
            <div class="m_top_20 m_bottom_20 dis_flex ju_co_between">
                <div class="m_top_20 m_left_20 w_375">
                    <el-button @click="uppershelf">上架</el-button>
                    <el-button @click="lowershelf">下架</el-button>
                </div>
                <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                                :total="totalRows">
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="goodChangeTo" title="货品拨划">
            <div class="dis_flex flex_no_wrap font_w_600 m_bottom_20">
                <div class="w_100_per">货品名称</div>
                <div class="w_100_per">货品规格名称</div>
                <div class="w_100_per">现有可用库存</div>
                <div class="w_100_per">划拨库存</div>
            </div>
            <div class="dis_flex flex_no_wrap m_bottom_20">
                <div class="w_100_per">天然凉席三件套</div>
                <div class="w_100_per">红色-中号-竹</div>
                <div class="w_100_per">350</div>
                <div class="w_100_per">
                    <el-input v-model="goodsnum"  class="handle-input mr10"></el-input>
                </div>
            </div>
            <div class="dis_flex flex_no_wrap m_bottom_20">
                <div class="w_100_per">天然凉席三件套</div>
                <div class="w_100_per">红色-中号-竹</div>
                <div class="w_100_per">350</div>
                <div class="w_100_per">
                    <el-input></el-input>
                </div>
            </div>
            <div class="dis_flex flex_no_wrap m_bottom_20">
                <div class="w_100_per">天然凉席三件套</div>
                <div class="w_100_per">红色-中号-竹</div>
                <div class="w_100_per">350</div>
                <div class="w_100_per">
                    <el-input></el-input>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="goodChangeTo = false">取 消</el-button>
                <el-button type="primary" @click="goodChangeTo = false">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="adjustVisible" title="库存调整">
            <div class="dis_flex flex_no_wrap font_w_600 m_bottom_20">
                <!--<div class="w_100_per">货品名称</div>-->
                <!--<div class="w_100_per">货品规格名称</div>-->
                <!--<div class="w_100_per">总库存</div>-->
                <!--<div class="w_100_per">锁定库存</div>-->
                <!--<div class="w_100_per">可用库存</div>-->
                <!--<div class="w_100_per">调整类型</div>-->
                <div class="w_100_per">调整数量</div>
            </div>
            <div class="dis_flex flex_no_wrap m_bottom_20">
                <!--<div class="w_100_per">天然凉席三件套</div>-->
                <!--<div class="w_100_per">红色-中号-竹</div>-->
                <!--<div class="w_100_per">350</div>-->
                <!--<div class="w_100_per">350</div>-->
                <!--<div class="w_100_per">350</div>-->
                <!--<div class="w_100_per">-->
                    <!--<el-select v-model="changeType">-->
                        <!--<el-option v-for="item in options"-->
                                   <!--:key="item.value"-->
                                   <!--:label="item.label"-->
                                   <!--:value="item.value"></el-option>-->
                    <!--</el-select>-->
                <!--</div>-->
                <div class="w_100_per">
                    <el-input-number v-model.number="goodsnum" ></el-input-number>

                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="adjustVisible = false">取 消</el-button>
                <el-button type="primary" @click="adjustgoodsnum">调 整</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import TabItem from '../../common/components/tab-item'
    import PriceSection from '../../common/components/price-section'
    import {hideFullCard} from '../../config/change'
    import {getproducts,upperproduct,lowerproduct} from '../../../service/good'

    export default {
        name: "goodsStorage",
        components: {
            PriceSection,
            TabItem
        },
        data() {
            return {
                hoverItem: 1,
                pageNum:1,
                pageSize:20,
                pages:1,
                totalRows:1,
                tableData: [
                ],
                tablist: [
                    {label: '全部', item: 1},
                    {label: '已上架', item: 2},
                    {label: '已下架', item: 3},
                    {label: '审核中', item: 4},
                ],
                crrentgid:0,
                goodsnum:'',
                goodName: '',
                goodClass: '',
                value3: [new Date(2019, 4, 10, 10, 10), new Date(2019, 4, 11, 10, 10)],
                priceArr: [0, 0],
                tableData: [],
                multipleSelection: [],
                goodChangeTo: false,
                adjustVisible: false,
                options: [{
                    value: '1',
                    label: '增加'
                }, {
                    value: '2',
                    label: '减少'
                }],
                changeType: ''
            }
        },
        created() {
            console.log('created');
            this.getloadproduct();
        },
        methods: {
            getloadproduct(){

                getproducts({'pageNum':this.pageNum,'pageSize':this.pageSize,'status':this.hoverItem}).then( res => {
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
            selectTabItem(item) {
                this.hoverItem = item;
                this.getloadproduct();
            },
            GetPriceArr(value) {
                console.log(value)
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            hideFullCard1(value, row) {
                console.log(row)
                return hideFullCard(row.card);
            },
            dateFormatter(row, column) {
                return hideFullCard(row.card);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)
            },
            addOneGood() {
                this.$router.push({path: '/add_update_good'})
                // let condition = 1
                // let href = this.$router.resolve({
                //     path: '/add_update_good',
                //     query: {
                //         id: condition
                //     }
                // })
                // window.open(href.href, '_blank')
            },
            viewGoods(id) {
                console.log(id)
                this.$router.push({path: '/add_update_good?op=view&id='+id})
            },
            changeGoods(id) {
                console.log(id)
                this.$router.push({path: '/add_update_good?op=edit&id='+id})
            },
            changeGoodsStorage(id) {
                this.adjustVisible = true
                this.crrentgid=id;
                console.log(id)

            },
            handleSizeChange() {

            },
            handleCurrentChange(page) {
                console.log(page)
                this.pageNum=page;

                this.getloadproduct();
            },
            adjustgoodsnum(){
                //编辑库存
                console.log(this.crrentgid)
                console.log(this.goodsnum);
                this.adjustVisible=false;
            },
            uppershelf(){
                //上架
                for (let elem of this.multipleSelection.values()) {
                    console.log(elem.id);
                    upperproduct(elem.id).then( res => {
                        console.log('upperproduct:');
                        console.log(res);
                        this.$message('ok');
                    }).catch( err => {
                        console.log('err:'+err);
                        this.$message(err);
                    })
                }
            },
            lowershelf(){
                //下架
                for (let elem of this.multipleSelection.values()) {
                    console.log(elem.id);
                    lowerproduct(elem.id).then( res => {
                        console.log('lowerproduct:');
                        console.log(res);
                        this.$message('ok');
                    }).catch( err => {
                        console.log('err:'+err);
                        this.$message(err);
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .good_icon {
        width: 80px;
        height: 60px;
    }

    .add_top {
        right: 0;
        top: -10px;
    }
</style>
