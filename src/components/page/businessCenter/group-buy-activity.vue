<template>
  <div class="po_relative">
    <el-breadcrumb separator=">" class="font_14 color_78839A">
      <el-breadcrumb-item class="color_34425E">运营中心</el-breadcrumb-item>
      <el-breadcrumb-item>营销管理</el-breadcrumb-item>
      <el-breadcrumb-item>拼团管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="po_absolute add_top">
      <el-button @click="releaseActivity" type="primary">发布实物拼团</el-button>
      <!--<el-button @click="releaseTicketActivity" type="primary">发布票券拼团</el-button>-->
    </div>
    <div class="bg_fff p_30 m_top_20">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" class="demo-form-inline ">
        <div class="dis_flex m_bottom_10">
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="发起方" prop="creator" class="m_left_20">
            <el-input v-model="ruleForm.creator" placeholder="请输入发起方"></el-input>
          </el-form-item>
          <el-form-item label="销量" prop="priceArr" class="m_left_20">
            <div class="dis_flex">
              <el-input @change="replaceLeft()" v-model="left_num"></el-input>
              <span class="al_slef_center m_left_10 m_right_10">-</span>
              <el-input @change="replaceRight()" v-model="right_num"></el-input>
            </div>
          </el-form-item>
        </div>
        <div class="dis_flex m_bottom_10">
          <el-form-item label="创建时间" prop="created">
            <el-date-picker
              v-model="ruleForm.created"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="m_left_24">
            <el-button class="w_100" type="primary" @click="searchSubmit">搜索</el-button>
            <el-button class="w_100" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>

      </el-form>
    </div>
    <div class="bg_fff p_30 m_top_20">
      <tab-item
        :tabList="tablist"
        :hoverItem="hoverItem"
        @changeTabItem="selectTabItem"
      ></tab-item>
      <div class="border_DCDFE6 m_top_40">
        <div class=" p_20 bd_b">
          <!--<el-radio v-model="ac_type" label="0" @change="selectType()">全部</el-radio>-->
          <el-radio v-model="ac_type" label="1" @change="selectType()">实物拼团</el-radio>
          <!--<el-radio v-model="ac_type" label="2" @change="selectType()">票券拼团</el-radio>-->
        </div>
        <!--<div class="h_50 li_he_50  p_left_16">-->
          <!--&lt;!&ndash;<el-radio v-model="origin" label="1">运营商发起</el-radio>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-radio v-model="origin" label="2">商家发起</el-radio>&ndash;&gt;-->
          <!--<el-radio v-model="origin" label="2">供应商发起</el-radio>-->
        <!--</div>-->
        <div class="p_20 dis_flex ju_co_between">
          <div>共搜索出{{totalRows}}条记录</div>
          <div class="m_right_16">
            <el-button type="primary" class="h_30 al_slef_center">导出报表</el-button>
          </div>
        </div>
        <el-table class="" border 
                  :data="tableData"
                  style="width: 100%">

          <el-table-column
            label="标题"
            width="400">
            <template slot-scope="scope">
              <div class="dis_flex al_it_center" >
                <img class="good_icon" :src="scope.row.pic">
                <div class="m_left_10 w_300">{{scope.row.name}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="statusName"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="creator"
            label="发起方">
          </el-table-column>
          <el-table-column
            prop="business"
            label="参与商家"
            width="120">
          </el-table-column>
          <el-table-column
            prop="created"
            label="创建时间"
            width="200">
          </el-table-column>
          <el-table-column
            prop="sales"
            label="销售量"
            width="150">
          </el-table-column>

          <el-table-column
            prop="sale_amount"
            label="销售额"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作"
          width="200">
            <template slot-scope="scope">
              <el-button size="small"  type="text">详情</el-button>
              <!--<el-button size="small"  type="text">推荐</el-button>-->
              <el-button size="small"  type="text" >暂停/回复销售</el-button>
              <el-button size="small"  type="text" >上/下架</el-button>
              <el-button size="small"  type="text">编辑</el-button>
              <!--<el-button size="small"  type="text">审核</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="m_top_30">
        <div class="pagination ">
          <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalRows"></el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import TabItem from '../../common/components/tab-item'
  import PriceSection from '../../common/components/price-section'
  import {hideFullCard} from '../../config/change'
  import {getGroupReview} from '../../../service/business-center'
  import {getgroups} from '../../../service/group'

  export default {
    name: "goodsStorage",
    components: {
      PriceSection,
      TabItem
    },
    data() {
      return {
        ac_type: '1',
        origin: '',
        left_num: '',
        right_num: '',
        ruleForm: {
          name: '',
          creator: '',
          left_num:'',
          right_num:'',
          created: '',
          status: '',
        },
        tablist: [
          {label: '全部', item: 1},
          {label: '待审核', item: 2},
          {label: '待上架', item: 3},
          {label: '已上架', item: 4},
          {label: '已下架', item: 5},
        ],
        hoverItem: 1,
        tableData: [],
          pageNum:1,
          pageSize:20,
          pages:1,
          totalRows:1,


      }
    },
    mounted(){
        this.getloaddata({});
    },
    created() {
        console.log('created');

    },
    methods: {
        getloaddata(param){
            param.status=this.hoverItem;
            param.pageNum=this.pageNum;
            param.pageSize=this.pageSize;
            getgroups(param).then( res => {
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
        getList(param){

          // getGroupReview(param).then(res => {
        //   this.tableData = res.data
        // })
      },
      replaceLeft() {
        this.left_num = this.left_num.replace(/\D/g, '')
        if (this.left_num && this.right_num && this.left_num * 1 > this.right_num * 1) {
          this.$message.error('请输入正确的数值区间');
          this.left_num = ''
        }
        this.ruleForm.left_num = this.left_num
      },
      replaceRight() {
        this.right_num = this.right_num.replace(/\D/g, '')
        if (this.left_num && this.right_num && this.left_num * 1 > this.right_num * 1) {
          this.$message.error('请输入正确的数值区间');
          this.right_num = ''
        }
        this.ruleForm.left_num = this.right_num
      },
      selectTabItem(item) {
        this.hoverItem = item
        this.ruleForm.status = item-1
        this.searchSubmit(this.ruleForm)
      },
      selectType(){
        console.log(this.ac_type)
        this.ruleForm.type = this.ac_type
        this.searchSubmit(this.ruleForm)
      },


      releaseActivity() {
        this.$router.push({path: '/release_group_activity'})
      },
      releaseTicketActivity(){

      },

      handleSizeChange() {

      },
      handleCurrentChange(page) {
          console.log(page);
          this.pageNum=page;
          this.getloaddata({});
      },
      searchSubmit() {
        console.log(this.ruleForm)
          this.pageNum=1;
          this.getloaddata(this.ruleForm)
      },
      selectTime() {

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.left_num = '';
        this.right_num = '';
        console.log(this.ruleForm);
        this.pageNum=1;
        this.getloaddata(this.ruleForm);
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
  .bd_b{ border-bottom:1px #DCDFE6 solid}
  .p_25{ padding:25px;}
  .w_300{ width: 300px;}
</style>
