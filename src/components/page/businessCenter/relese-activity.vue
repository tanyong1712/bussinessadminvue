<template>
    <div class="po_relative">
        <el-breadcrumb separator=">" class="font_14 color_78839A">
            <el-breadcrumb-item class="color_34425E">运营中心</el-breadcrumb-item>
            <el-breadcrumb-item>业务管理</el-breadcrumb-item>
            <el-breadcrumb-item>实物商品发布</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="po_absolute add_top">
            <el-button @click="addOneGood" type="primary">实物商品发布</el-button>
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
                  <el-option key="0" label="全部" value="0"></el-option>
                  <el-option key="1" label="一级分类" value="1"></el-option>
                  <el-option key="2" label="二级分类" value="2"></el-option>
                  <el-option key="3" label="三级分类" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="品牌" prop="brandId" class="m_left_20">
                <el-select v-model="ruleForm.brandId">
                  <el-option key="bbk" label="步步高" value="bbk"></el-option>
                  <el-option key="xtc" label="小天才" value="xtc"></el-option>
                  <el-option key="imoo" label="imoo" value="imoo"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="dis_flex m_bottom_10">
              <el-form-item label="上架时间" prop="up_time_stamp">
                <el-date-picker
                  v-model="ruleForm.up_time"
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
                            <el-form-item label="商品名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="商品 ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="商品描述">
                                <span>{{ props.row.desc }}</span>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="日期"
                    sortable
                    width="180">
                <template slot-scope="scope">
                    <div class="dis_flex al_it_center">
                        <img class="good_icon" :src="scope.row.picUrl">
                        <div class="m_left_10">hahah</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="日期">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
            >
            </el-table-column>
            <el-table-column
                    prop="card"
                    label="标签"
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
            <el-button type="primary" @click="stepTwo">提交</el-button>
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
        <div class="font_20 color_445370 m_bottom_30">填写商品基本信息</div>
        <el-form ref="formData" :model="formData" :rules="rules" label-width="150px" label-position="left">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="formData.name" style="width: 40%;" placeholder="请输入货品名称"></el-input>
          </el-form-item>
          <el-form-item label="副标题" prop="name_sec">
            <el-input v-model="formData.name_sec" style="width: 40%;" placeholder="请输入货品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品标签" prop="share_des">
            <el-input v-model="formData.share_des" style="width: 40%;" placeholder="微信分享好友时会显示，建议36个字以内" maxlength="36"></el-input>
          </el-form-item>
          <el-form-item label="商品封面图" prop="keywords">
            <el-input v-model="formData.keywords" style="width: 40%;" placeholder="请输入检索关键字"></el-input>
          </el-form-item>
          <el-form-item label="顶部详情图" prop="goodPicUrl">
            <el-input v-model="formData.goodPicUrl" style="display: none;"></el-input>
            <!--<el-upload-->
              <!--:limit="9"-->
              <!--:accept="accept"-->
              <!--list-type="picture-card"-->
              <!--:before-upload="beforeUpload"-->
              <!--:on-preview="handlePictureCardPreview"-->
              <!--:on-remove="handleRemove"-->
              <!--:on-success="handleAvatarSuccess">-->
              <!--<i class="el-icon-plus"></i>-->
            <!--</el-upload>-->
            <!--<el-dialog :visible.sync="dialogVisible" size="tiny">-->
              <!--<img width="100%" :src="dialogImageUrl" alt="">-->
            <!--</el-dialog>-->
            <div class="font_12 color_F56C6C">建议尺寸80*80像素，最多可上传9张，可拖拽图片调整顺序。</div>
          </el-form-item>
          <div class="dis_flex">
            <el-form-item label="编辑商品详情" prop="unit">
              <el-input v-model="formData.unit" placeholder="如：个" maxlength="2" style="width: 200px;"></el-input>
            </el-form-item>
          </div>
          <div class="m_top_20 m_left_20">
            <el-form-item>
            <el-button type="primary" @click="stepThree">下一步</el-button>
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
            <el-button type="primary">提交</el-button>
        </div>
      </div>

    </div>
</template>

<script>
    import TabItem from '../../common/components/tab-item'
    import PriceSection from '../../common/components/price-section'
    import ProgressBar from '../../common/components/progress-bar'
    import  {getgroupgoods}  from '../../../service/group'

    export default {
        name: "goodsStorage",
        components: {
            PriceSection,
            TabItem,
          ProgressBar
        },
        data() {
            return {
              formData:{
                name:'',
                name_sec:'',
                share_des:'',
                keywords:'',
                goodPicUrl:'',
                unit:'',
                weight:'',
                returns:'',
                classItem:'',
                classBrand:'',
                supplier:'',
                send:'',
                price:'',
                packList:'',
                marks:'',
                useScope:'',
                radio: '',
                fare: '1',
                content: ''
              },
              rules: {
                name: [
                  { required: true, message: '请输入活动名称', trigger: 'blur' },
                  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
              },
              progressList: [
                {time: '选择货品',label:'1'},
                {time: '商品详情',label:'2'},
                {time: '销售推广',label:'3'},
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
                    {label: '全部', item: 1},
                    {label: '已上架', item: 2},
                    {label: '已下架', item: 3},
                ],
                hoverItem: 1,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    tag: '家',
                    card: '612401199098902345',
                    picUrl: 'https://www.lenuse.cn/images/bg-1.jpg'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    tag: '公司',
                    card: '612401199098902345',
                    picUrl: 'https://www.lenuse.cn/images/bg-1.jpg'
                }],
              currentRow: null,

            }
        },
        methods: {
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

          handleCurrentChange(val) {
            this.currentRow = val;
                console.log(val)
            },
            addOneGood() {
                this.$router.push({path: '/add_update_good'})
            },
            handleSizeChange() {

            },

            searchSubmit(){
                console.log(this.ruleForm)
            },
            selectTime(){
                let time1 = this.up_time[0] ? this.up_time[0].getTime()/1000 : ''
                let time2 = this.ruleForm.up_time[1] ? this.up_time[0].getTime()/1000 : ''
                this.up_time_stamp = [time1,time2]
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
                this.up_time = []
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
