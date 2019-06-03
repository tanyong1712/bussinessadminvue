<template>
    <div class="po_relative">
        <el-breadcrumb separator=">" class="font_14 color_78839A">
            <el-breadcrumb-item class="color_34425E" ><router-link :to="{path:'/goodsStorage'}">实物货品管理</router-link></el-breadcrumb-item>
            <el-breadcrumb-item>运费模板管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="po_absolute add_top">
            <el-button @click="addOneGood" type="primary">新建运费模版</el-button>
        </div>
        <div class="bg_fff p_30 m_top_20">
            <el-form :inline="true" ref="ruleForm" :model="ruleForm" class="demo-form-inline ">
                <div class="dis_flex m_bottom_10">
                    <el-form-item label="模板名称" prop="good_id">
                        <el-input v-model="ruleForm.good_id" placeholder="请输入货品名称或ID"></el-input>
                    </el-form-item>
                </div>
                <el-form-item style="margin-bottom: 0;">
                    <el-button class="h_40 w_100" type="primary" @click="searchSubmit">搜索</el-button>
                    <el-button class="h_40 w_100" @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="bg_fff p_30 m_top_20">
        <div class="border_DCDFE6">
        <el-table class=""
                :data="dataList"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="运费模板名称">
            </el-table-column>
            <el-table-column
                    prop="usageAmount"
                    label="货品关联使用">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="最后编辑时间">
            </el-table-column>
            <el-table-column
                    prop="updater"
                    label="编辑人"
                    width="100">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="copyModel(scope.row.id)">复制模板</el-button>
                    <el-button @click="editModel(scope.row)">修改</el-button>
                    <el-button @click="deleteModel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        </div>
        <div class="h_50 m_top_20 te_center" v-if="dataList.length > 0">
            <el-pagination

                    @current-change="handleCurrentChange"
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>

        </div>
    </div>
</template>

<script>
    import TabItem from '../../common/components/tab-item'
    import PriceSection from '../../common/components/price-section'
    import {hideFullCard} from '../../config/change'
    import {postRateList, copyPosterModel, deletePost} from '../../../service/storage-center'

    export default {
        name: "goodsStorage",
        components: {
            PriceSection,
            TabItem
        },
        data() {
            return {
                left_num:'',
                right_num:'',
                ruleForm: {
                    good_id: '',
                    good_class: '',
                    good_brand: '',
                    up_time: [],
                    up_time_stamp: [],
                    priceArr: ['',''],
                },
                tablist: [
                    {label: '全部', item: 1},
                    {label: '已上架', item: 2},
                    {label: '审核中', item: 3},
                    {label: '已下架', item: 4},
                    {label: '审核未通过', item: 5},
                ],
                hoverItem: 1,
                dataList: [],
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
                changeType: '',
              total:0
            }
        },
      mounted(){
          this.getPostList({pageNum:1})
      },
        methods: {

          getPostList(params) {
            postRateList(params).then( res => {
              this.dataList = res.data.list ||[]
              this.total = res.data.total
            })
          },

            copyModel(id){
              copyPosterModel({id:id}).then( res => {
                this.$notify({
                  title: '',
                  message: '复制成功',
                  type: 'success'
                });
              })

            },
            editModel(item){
                console.log(item)
                this.$router.push({
                    path: '/add_post_model',
                    query:{
                        id:item.id
                    }
                })
            },
            deleteModel(id){
            deletePost({id:id}).then( res => {
              this.$notify({
                title: '',
                message: '删除成功',
                type: 'success'
              });
            }).catch( err => {
              this.$notify({
                title: '',
                message: err.message,
                type: 'warning'
              });
            })

            },



            filterTag(value, row) {
                return row.tag === value;
            },
            hideFullCard1(value, row) {
                console.log(row)
                return hideFullCard(row.card);
            },
            addOneGood() {
                this.$router.push({path: '/add_post_model'})
            },

            handleSizeChange() {

            },
            handleCurrentChange(val) {
              this.getPostList({pageNum:val})
            },
            searchSubmit(){
                console.log(this.ruleForm)
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
                this.ruleForm.up_time = []
                this.left_num = ''
                this.right_num = ''
                console.log(this.ruleForm)
            }
        }
    }
</script>

<style scoped>
    .add_top {
        right: 0;
        top: -10px;
    }
</style>
