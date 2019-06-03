<template>
    <div class="po_relative">
        <el-breadcrumb separator=">" class="font_14 color_78839A">
            <el-breadcrumb-item class="color_34425E">运营中心</el-breadcrumb-item>
            <el-breadcrumb-item>营销管理</el-breadcrumb-item>
            <el-breadcrumb-item>实物拼团发布</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="po_absolute add_top">
            <el-button @click="addOneGood" >实物商品发布</el-button>
        </div>
        <div class="bg_fff p_30 m_top_20">
          <progress-bar class="m_top_20"
                        :progressLabel="progressList"
                        :progress="progress"
          ></progress-bar>
          <div class="te_center m_top_50" v-if="progress == 0" @click="addActivity">
            <el-button class="w_200 h_60" icon="el-icon-plus">添加货品</el-button>
          </div>
        </div>
        <div class="bg_fff p_30 m_top_20"  v-if="progress == 1">
            <el-form :inline="true" ref="ruleForm" :model="ruleForm" class="demo-form-inline ">
                <div class="dis_flex m_bottom_10">
                    <el-form-item label="货品名称" prop="keyword">
                        <el-input v-model="ruleForm.keyword" placeholder="请输入货品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="货品分类" prop="goodsTypeId" class="m_left_20">
                        <el-select v-model="ruleForm.goodsTypeId">
                            <el-option v-for="item in cates" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="品牌" prop="brandId" class="m_left_20">
                        <el-select v-model="ruleForm.brandId">
                            <el-option v-for="item in brands" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="dis_flex m_bottom_10">
                    <el-form-item label="上架时间" prop="up_time">
                        <el-date-picker
                                v-model="up_time"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                @change="selectTime()">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="价格区间" prop="priceArr" class="m_left_20">
                        <div class="dis_flex">
                            <el-input @change="replaceLeft()" v-model="left_num"></el-input>
                            <span class="al_slef_center m_left_10 m_right_10">-</span>
                            <el-input @change="replaceRight()" v-model="right_num"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 0;">
                        <el-button class="h_40 w_100" type="primary" @click="searchSubmit">搜索</el-button>
                        <el-button class="h_40 w_100" @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
          <div class="border_DCDFE6"></div>
        <tab-item class="m_top_20"
                :tabList="tablist"
                :hoverItem="hoverItem"
                @changeTabItem="selectTabItem"
        ></tab-item>
        <div class="border_DCDFE6 border_t_none">
        <el-table class=""
                :data="tableData"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <div class="m_left_30">
                        <div>1111</div>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="货品名称">
                                <span>{{ props.row.goods_name }}</span>
                            </el-form-item>
                            <el-form-item label="商品 ID">
                                <span>{{ props.row.goods_id }}</span>
                            </el-form-item>

                        </el-form>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="货品名称"
                    sortable
                    width="180">
                <template slot-scope="scope">
                    <div class="dis_flex al_it_center">
                        <img class="good_icon" :src="scope.row.goods_pic">
                        <div class="m_left_10">{{ scope.row.goods_name }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="goods_cate_name"
                    label="所属分类">
            </el-table-column>
            <el-table-column
                    prop="goods_status"
                    label="商品状态">
            </el-table-column>
            <el-table-column
                    prop="goods_brand"
                    label="品牌"
            >
            </el-table-column>
            <el-table-column
                    prop="goods_price"
                    label="销售价"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="goods_num"
                    label="总库存"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="goods_deliver"
                    label="发货方式"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="card"
                    label="上架时间"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="card"
                    label="修改时间"
                    width="100">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button>详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="m_top_20 m_left_20">
            <el-button @click="stepTwo">提交</el-button>
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
      <div  class="bg_fff p_30 m_top_20" v-if="progress == 2">
        <div class="font_20 color_445370 m_bottom_30">填写拼团基本信息</div>
        <el-form ref="formData" :model="formData" :rules="rules" label-width="150px" label-position="left">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.name" style="width: 40%;" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="副标题" prop="name_sec">
            <el-input v-model="formData.name_sec" style="width: 40%;" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="拼团标签" prop="labelId">
            <el-input v-model="formData.labelId" style="width: 40%;" placeholder="微信分享好友时会显示，建议36个字以内" maxlength="36"></el-input>
          </el-form-item>
          <el-form-item label="封面图" prop="keywords">
            <el-input v-model="formData.pic" style="display: none;" placeholder="请输入检索关键字"></el-input>

          </el-form-item>
          <el-form-item label="顶部详情图" prop="goodPicUrl">
            <el-input v-model="formData.branerPicUrl" style="display: none;"></el-input>

            <div class="font_12 color_F56C6C">建议尺寸80*80像素，最多可上传9张，可拖拽图片调整顺序。</div>
          </el-form-item>
            <div class="dis_flex">
                <el-form-item label="客服电话" prop="unit">
                    <el-input v-model="formData.servicephone" placeholder="电话" maxlength="2" style="width: 200px;"></el-input>
                </el-form-item>
            </div>
            <div class="dis_flex">
                <el-form-item label="私密拼团" prop="is_sm">
                    <el-switch v-model="formData.is_sm"></el-switch>
                </el-form-item>
            </div>
          <div class="dis_flex">
            <el-form-item label="编辑商品详情">
                <div class="edit_container">
                    <quill-editor v-model="formData.content"  ref="myQuillEditor" class="editer" :options="editorOption"  >
                    </quill-editor>
                </div>
            </el-form-item>
          </div>
            <div class="dis_flex">
                <el-form-item label="允许单购" prop="is_onebuy">
                    <el-switch v-model="formData.is_onebuy"></el-switch>
                </el-form-item>
            </div>

            <el-table class=""
                      :data="tableData"
                      highlight-current-row
                      @current-change="handleCurrentChange"
                      style="width: 100%">
                <el-table-column type="expand">

                </el-table-column>
                <el-table-column
                        label="货品名称"
                        sortable
                        width="180">
                    <template slot-scope="scope">
                        <div class="dis_flex al_it_center">
                            <img class="good_icon" :src="scope.row.goods_pic">
                            <div class="m_left_10">{{ scope.row.goods_name }}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="goods_cate_name"
                        label="所属分类">
                </el-table-column>
                <el-table-column
                        prop="goods_status"
                        label="商品状态">
                </el-table-column>
                <el-table-column
                        prop="goods_brand"
                        label="品牌"
                >
                </el-table-column>
                <el-table-column
                        prop="goods_price"
                        label="销售价"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="goods_num"
                        label="总库存"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="goods_deliver"
                        label="发货方式"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="card"
                        label="上架时间"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="card"
                        label="修改时间"
                        width="100">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button>详情</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="font_20 color_445370 m_bottom_30 m_top_30">设置货品规则</div>
            <div class="dis_flex">
                <el-form-item label="拼团人数" prop="group_users">
                    <el-select v-model="formData.group_users">
                        <el-option v-for="item in groupnumoptiones" :key="item.id" :label="item.name" :value="item.id""></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="dis_flex">
                <el-form-item label="拼团期限" >
                    <el-input v-model="formData.endhour" placeholder="" maxlength="2" style="width: 100px;"></el-input>小时
                    <el-input v-model="formData.endsecond" placeholder="" maxlength="2" style="width: 100px;"></el-input>分
                </el-form-item>
            </div>
            <div class="dis_flex">
                <el-form-item label="是否自动成团" prop="is_onebuy">
                    <el-switch v-model="formData.is_autosuecss"></el-switch>
                </el-form-item>
            </div>
            <div class="dis_flex">
                <el-form-item label="自动成团期限">
                    <el-input v-model="formData.autohour" placeholder="" maxlength="2" style="width: 100px;"></el-input>小时
                    <el-input v-model="formData.autosecond" placeholder="" maxlength="2" style="width: 100px;"></el-input>分
                </el-form-item>
            </div>
            <div class="font_20 color_445370 m_bottom_30 m_top_30">设置上下架条件</div>
            <div class="dis_flex">
                <el-form-item label="自动上架时间">
                    <el-date-picker class="w_200"
                                    v-model="formData.autostarttime"
                                    type="date"
                                    placeholder="">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div class="dis_flex">
                <el-form-item label="开始售卖时间">
                    <el-date-picker class="w_200"
                                    v-model="formData.starttime"
                                    type="date"
                                    placeholder="">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div class="dis_flex">
                <el-form-item label="截止售卖时间">
                    <el-date-picker class="w_200"
                                    v-model="formData.endtime"
                                    type="date"
                                    placeholder="">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div class="dis_flex">
                <el-form-item label="截止售卖即下架">
                    <el-radio-group v-model="formData.notime_status">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
            <div class="dis_flex">
                <el-form-item label="库存售完即下架">
                    <el-radio-group v-model="formData.nogoods_status">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>

          <div class="m_top_20 m_left_20">
            <el-form-item>
                <el-button  @click="stepThree">预览</el-button>
                <el-button type="primary"   @click="submitForm('formData')">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div  class="bg_fff p_30 m_top_20" v-if="progress == 3">
        <div class="font_20 color_445370 m_bottom_30">基本资料</div>
        <div class="font_14 m_bottom_16">商品名称：司法解释的客家话</div>
        <div class="border_DCDFE6 m_bottom_24"></div>
        <div class="dis_flex">
          <div class="w_30_per">
            <img src="https://www.lenuse.cn/images/bg-1.jpg" alt="" style="width: 450px;height: 600px;">
          </div>
          <div class="w_70_per p_left_32">
            <div class="dis_flex m_top_50">
              <div class="w_10_per al_slef_center">预览链接：</div>
              <el-input style="width: 60%;"></el-input>
              <el-button>复制</el-button>
            </div>
            <div class="dis_flex m_top_50">
              <div class="w_10_per">预览二维码：</div>
              <div style="width: 60%;">
                <img src="https://www.lenuse.cn/images/bg-1.jpg" alt="" style="width: 150px;height: 150px;">
              </div>
            </div>
          </div>
        </div>
        <div class="m_top_20 m_left_20">
            <el-button @click="preStep">上一步</el-button>
            <el-button type="primary"  @click="submitForm('formData')">提交</el-button>
        </div>
      </div>

    </div>
</template>

<script>
    import TabItem from '../../common/components/tab-item'
    import PriceSection from '../../common/components/price-section'
    import ProgressBar from '../../common/components/progress-bar'
    import {quillEditor} from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import {addgroup,updategroup,getgroup,getgroupgoods} from '../../../service/group'
    import {getproductcategorys,getbrand} from '../../../service/good'

    export default {
        name: "groupaddupdate",
        components: {
            PriceSection,
            TabItem,
            ProgressBar,
            quillEditor
        },
        data() {
            return {
              formData:{
                  ownerId:1,
                  labelEnabled:true,
                  capacity:1,
                  descriptionEnabled:true,
                  type:1,
                  name:'',
                  name_sec:'',
                  labelId:'',
                  pic:'',
                  branerPicUrl:'',
                  servicephone:'',
                  is_sm:'',
                  content:'',
                  is_onebuy:'',
                  goods_id:'',
                  user_buys:'',
                  is_joinfx:'',
                  group_count:'',
                  price:'',
                  product_price: '',
                  group_users:'',
                  endhour:'',
                  endsecond: '',
                  is_autosuecss: '',
                  autohour: '',
                  autosecond: '',
                  autostarttime: '',
                  starttime: '',
                  endtime: '',
                  notime_status: '',
                  nogoods_status: '',
              },
              rules: {
                name: [
                  { required: true, message: '请输入活动名称', trigger: 'blur' },
                ]
              },
              pid:0,
                cates:[],
                brands:[],
              editorOption: {},
              progressList: [
                {time: '选择货品',label:'1'},
                {time: '拼团详情',label:'2'},
                {time: '预览提审',label:'3'},
              ],
              progress: 0,
                left_num:'',
                right_num:'',
                up_time: [],
                up_time_stamp: [],
                priceArr: ['',''],
                ruleForm: {
                    keyword: '',
                    goodsTypeId: '',
                    brandId: '',
                    startTime:'',
                    endTime:'',
                    lowestPrice:'',
                    highestPrice:'',

                },
                tablist: [
                    {label: '全部', item: 0},
                    {label: '已上架', item:1},
                    {label: '已下架', item: 2},
                ],
                groupnumoptiones:[
                    {id:2,name:'二人成团'},
                    {id:3,name:'三人成团'},
                    {id:4,name:'四人成团'},
                    {id:5,name:'五人成团'},
                    {id:10,name:'十人成团'}
                ],
                hoverItem: 0,
                tableData: [],
                tableData1: [],
              currentRow: null,

            }
        },
        watch:{
            $route:function(value){
                console.log('value:'+value);
                this.getloaddata(this.$route.query.id);
            }
        },
        computed:{
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        created() {
            console.log('created');
            if(this.$route.query.id) {
                this.goodid = this.$route.query.id;
                this.getloaddata(this.goodid);
            }
            getproductcategorys({'pageNum':1,'pageSize':1000}).then( res => {
                console.log('getproductcategorys:');
                console.log(res);
                this.cates=res.data.list;
                console.log(res.data.list);
            }).catch( err => {
                console.log('err:'+err);
                //this.$message(err);
            })
            getbrand({'pageNum':1,'pageSize':1000}).then( res => {
                console.log('getbrand:');
                console.log(res);
                this.brands=res.data.list;
                console.log(res.data.list);
            }).catch( err => {
                console.log('err:'+err);
                //this.$message(err);
            })


        },
        methods: {
            getloaddata(id){
                console.log('id:'+id);
                if(id==0 || id==undefined){
                    this.formData ={};
                }else {
                    getgroup(id).then(res => {
                        console.log('res:');
                        console.log(res);
                        this.formData = res.data;
                    }).catch(err => {
                        console.log('err:' + err);
                        this.$message(err);
                    })
                }
            },
            replaceLeft(){
                this.left_num=this.left_num.replace(/\D/g,'')
                if(this.left_num && this.right_num && this.left_num*1 > this.right_num*1){
                    this.$message.error('请输入正确的价格区间');
                    this.left_num=''
                }
                this.priceArr = [this.left_num,this.right_num]
            },
            replaceRight(){
                this.right_num=this.right_num.replace(/\D/g,'')
                if(this.left_num && this.right_num && this.left_num*1 > this.right_num*1){
                    this.$message.error('请输入正确的价格区间');
                    this.right_num=''
                }
                this.priceArr = [this.left_num,this.right_num]
            },
            selectTabItem(item) {
                this.hoverItem = item
            },


          handleCurrentChange(val) {
            this.currentRow = val;
                console.log(val)
            },
            addOneGood() {
                this.$router.push({path: '/add_update_good'})
            },
            handleSizeChange() {

            },
            searchgoods(param){
                param.status=this.hoverItem;
                param.pageNum=this.pageNum;
                param.pageSize=this.pageSize;
                getgroupgoods(param).then( res => {
                    console.log('res:');
                    console.log(res);
                    this.tableData=res.data.list;
                    this.totalRows=res.data.total;
                    this.pages=res.data.pages;
                    console.log(this.tableData);
                }).catch( err => {
                    console.log('err:'+err);
                    this.$message(err);
                })
            },

            searchSubmit(){
                console.log(this.ruleForm);
                this.searchgoods(this.ruleForm);

            },
            selectTime(){
                let time1 = this.ruleForm.up_time[0] ? this.ruleForm.up_time[0].getTime()/1000 : ''
                let time2 = this.ruleForm.up_time[1] ? this.ruleForm.up_time[0].getTime()/1000 : ''
                this.ruleForm.up_time_stamp = [time1,time2]
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.formData);
                        console.log(this.goodid);
                        if(this.pid>0){
                            //编辑
                            this.formData.shelfMarketingId=this.pid;
                            console.log(this.formData);
                            updategroup(this.formData).then( res => {
                                console.log('res:');
                                console.log(res);
                                this.$message(res.msg);
                                this.$router.push({
                                    path:'/group_buy_manage'	//push一个对象，写path路径
                                });
                            }).catch( err => {
                                console.log('err:'+err);
                                this.$message(err);
                            })
                        }else{
                            //新增

                            addgroup(this.formData).then( res => {
                                console.log('res:');
                                console.log(res);
                                this.pid=res.data;
                                this.$message(res.msg);
                                this.$router.push({
                                    path:'/group_buy_manage'	//push一个对象，写path路径
                                });
                            }).catch( err => {
                                console.log('err:'+err);
                                this.$message(err);
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }

                });

            },
            resetForm(formName){
                this.$refs[formName].resetFields();
                this.ruleForm.up_time = []
                this.left_num = ''
                this.right_num = ''
                console.log(this.ruleForm)
            },
          addActivity(){
              this.progress = 1
          },
          stepTwo(){
              if(this.currentRow){
                this.progress = 2
              }else{
                this.$message({message:'请选择商品',type:'warning'})
              }

            console.log(this.currentRow)
             this.formData.goods_id=this.currentRow.goods_id;
             this.tableData1=[this.currentRow];
          },
          preStep(){
            this.progress = 2
          },
          stepThree(){
            this.progress = 3
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
