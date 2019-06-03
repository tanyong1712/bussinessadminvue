<template>
    <div>
        <el-breadcrumb separator=">" class="font_14 color_78839A">
            <el-breadcrumb-item>仓库中心</el-breadcrumb-item>
            <el-breadcrumb-item>货品品牌列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="po_absolute add_top">
            <el-button @click="toAdd" type="primary">新增品牌</el-button>
        </div>
         <div class="bg_fff p_30 m_top_20">
         <div class="">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="品牌名称" style="margin-bottom: 0;">
                    <el-input  placeholder="请输入品牌名称"></el-input>
                </el-form-item>
                <el-form-item label="品牌ID"  style="margin-bottom: 0;">
                    <el-input  placeholder="请输入品牌ID"></el-input>
                </el-form-item>
                <el-form-item  style="margin-bottom: 0;">
                    <el-button type="primary">查询</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
         </div>
         </div>
         <div class="bg_fff p_30 m_top_20">
             <tab-item
                     :tabList="tablist"
                     :hoverItem="hoverItem"
                     @changeTabItem="selectTabItem"
             ></tab-item>
             <div class="border_DCDFE6 m_top_20">
                     <el-table
                        :data="tableData"
                        stripe
                        style="width:100%">
                         <el-table-column
                            width="50">
                            <template slot-scope="scope">
                               <el-checkbox v-model="checkbox"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="brandID"
                            label="品牌ID">
                        </el-table-column>
                        <el-table-column
                            prop="brandName"
                            label="品牌名字">
                        </el-table-column>

                        <el-table-column
                            prop="englishName"
                            label="品牌英文名">
                        </el-table-column>
                        <el-table-column
                            prop="brandState"
                            label="状态">
                        </el-table-column>
                        <el-table-column
                            prop="image"
                            label="品牌缩略图">
                             <template slot-scope="scope">
                                <div class="dis_flex al_it_center">
                                    <img class="pro_img" :src="scope.row.image">
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="contName"
                            label="品牌别名">
                        </el-table-column>
                        <el-table-column
                            prop="operator"
                            label="最近操作人">
                        </el-table-column>
                        <el-table-column
                            prop="modifyTime"
                            label="修改时间">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            >
                            <template slot-scope="scope">
                                 <el-button size="small" @click="toDetails()">详情</el-button>
                                 <el-button size="small" @click="toEdit()">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
             </div>
             <div class="h_50 m_top_20 te_center">
                 <el-pagination
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :page-size="10"
                         layout="prev, pager, next, jumper"
                         :total="100">
                 </el-pagination>
             </div>
         </div>

    </div>

</template>

<script>
    import TabItem from '../../common/components/tab-item'
    export default {
        name: "index",
        components: {
            TabItem
        },
        data () {
            return {
                tablist: [
                    {label: '全部', item: 1},
                    {label: '启用', item: 2},
                    {label: '停用', item: 3},
                ],
                hoverItem: 1,
                //复选框
                 checkbox: false,
                //选项卡默认
                activeName: 'all',

                //表格
                tableData: [{
                        brandID: 'A00012568',
                        brandName: '唐人福即食早餐燕麦片',
                        englishName: 'May',
                        brandState:'启用',
                        image:'http://umshop.oss-cn-hangzhou.aliyuncs.com/upload/image/kfMTQmY93j2kQ2OVB7ObtkyC6tRNzz2So0zUnLrh.jpeg',
                        contName:'唐人福即食早餐燕麦片(袋装)唐人福即食早餐燕麦片(袋装)',
                        operator:'admin',
                        modifyTime:'2019.05.06',


                    },
                ],

            }
        },
        methods: {
             //新增品牌
            toAdd(){
                this.$router.push({
                    path:`/product_add`	//push一个对象，写path路径
                })
            },
            //品牌详情
            toDetails(){
                this.$router.push({
                    path:`/product_details`	//push一个对象，写path路径
                })
            },
             //品牌编辑
            toEdit(){
                this.$router.push({
                    path:`/product_edit`	//push一个对象，写path路径
                })
            },
            //选项卡
            tabClick(tab, event) {
                console.log(tab, event);
            },
            selectTabItem(item) {
                this.hoverItem = item
            },

            handleSizeChange() {

            },
            handleCurrentChange() {

            }






        }
    }
</script>

<style scoped>
   .fn_right{ float: right;}
   .pro_img{ width:90px; height:90px;}
   .add_top {
       right: 0;
       top: -10px;
   }
</style>
