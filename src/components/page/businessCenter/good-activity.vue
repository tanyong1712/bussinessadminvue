<template>
  <div class="po_relative">
    <el-breadcrumb separator=">" class="font_14 color_78839A">
      <el-breadcrumb-item class="color_34425E">运营中心</el-breadcrumb-item>
      <el-breadcrumb-item>营销管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="po_absolute add_top">
      <el-button @click="addOneGood" type="primary">实物商品发布</el-button>
      <!--<el-button @click="addOneGood" type="primary">票券商品发布</el-button>-->
    </div>
    <div class="bg_fff p_30 m_top_20">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" class="demo-form-inline ">
        <div class="dis_flex m_bottom_10">
          <el-form-item label="商品名称/ID" prop="good_id">
            <el-input v-model="ruleForm.good_id" placeholder="请输入商品名称或ID"></el-input>
          </el-form-item>
          <el-form-item label="发起方" prop="good_class" class="m_left_20">
            <el-input v-model="ruleForm.good_id" placeholder="请输入名称或ID"></el-input>
          </el-form-item>
        </div>
        <div class="dis_flex m_bottom_10">
          <el-form-item label="创建时间" prop="up_time_stamp">
            <el-date-picker
              v-model="ruleForm.up_time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="售卖时间" prop="up_time_stamp">
            <el-date-picker
              v-model="ruleForm.up_time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="m_left_24">
            <el-button class=" w_100" type="primary" @click="searchSubmit">搜索</el-button>
            <el-button class=" w_100" @click="resetForm('ruleForm')">重置</el-button>
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
        <div class="p_20 bd_b p_left_16">
          <!--<el-radio v-model="ac_type" label="1">全部</el-radio>-->
          <el-radio v-model="ac_type" label="2">实物商品</el-radio>
          <!--<el-radio v-model="ac_type" label="3">票券商品</el-radio>-->
        </div>
        <!--<div class="h_50 li_he_50 border_DCDFE6 p_left_16">-->
          <!--&lt;!&ndash;<el-radio v-model="origin" label="1">运营商发起</el-radio>&ndash;&gt;-->
          <!--<el-radio v-model="origin" label="2">供应商发起</el-radio>-->
          <!--&lt;!&ndash;<el-radio v-model="origin" label="3">商家发起</el-radio>&ndash;&gt;-->
        <!--</div>-->
        <div class="p_20 bd_b dis_flex ju_co_between">
          <div class="fontt_14">共搜索出3条记录</div>
          <div class="m_right_16">
            <el-button type="primary" class="h_30 al_slef_center">导出报表</el-button>
          </div>
        </div>
        <el-table class="" border 
                  :data="tableData"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column
            label="标题"
            width="280">
            <template slot-scope="scope">
              <div class="dis_flex al_it_center">
                <img class="good_icon" :src="scope.row.picUrl">
                <div class="m_left_10">{{scope.row.name}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="creater"
            label="发起方">
          </el-table-column>
          <el-table-column
            prop="gys"
            label="供应商/商家"
            width="100">
          </el-table-column>
          <el-table-column
            prop="crettime"
            label="创建时间"
            width="100">
          </el-table-column>
          <el-table-column
            prop="saletime"
            label="销售时间"
            width="100">
          </el-table-column>
          <el-table-column
            prop="salenum"
            label="收货"
            width="100">
          </el-table-column>

          <el-table-column
            prop="hasnum"
            label="收货额"
            width="100">
          </el-table-column>
          <el-table-column
                  prop="salenum"
                  label="销量"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="hasnum"
                  label="销量额"
                  width="100">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button size="small"  type="text">详情</el-button>
              <!--<el-button size="small"  type="text">推荐</el-button>-->
              <el-button size="small"  type="text">上/下架</el-button>
              <el-button size="small"  type="text">编辑</el-button>
              <el-button size="small"  type="text">暂停/恢复销售</el-button>
            </template>
          </el-table-column>
        </el-table>
        

        <div class="m_top_20 m_bottom_20 dis_flex ju_co_between">
            <div class="m_top_20 m_left_20">
              <el-button>上架</el-button>
              <el-button>下架</el-button>
            </div>
            <div class="pagination  p_right_20">
              <el-pagination background 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
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
  import TabItem from '../../common/components/tab-item'
  import PriceSection from '../../common/components/price-section'
  import {hideFullCard} from '../../config/change'

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
          good_id: '',
          good_class: '',
          good_brand: '',
          up_time: '',
          up_time_stamp: [],
          priceArr: ['', ''],
        },
        tablist: [
          {label: '全部', item: 1},
          {label: '已上架', item: 2},
          {label: '待上架', item: 3},
          {label: '已下架', item: 4},
          {label: '未通过', item: 5},
          {label: '待审核', item: 6},
          {label: '审核未通过', item: 7},
        ],
        hoverItem: 1,
        tableData: [{
          name:'花印（日本原装进口）水漾润颜补水化妆水190ml',
          pqId:'P10090110',
          creater:'重庆i生活',
          gys:'重庆百事多',
          pqname:'0.99元秒杀华为',
          price:'0.99元',
          salenum:281090,
          type:'实物商品',
          hasnum:28,
          hxnum:120,
          buy:'70%',
          crettime:'2016-05-04',
          saletime:'2016-05-12',
          status:'已上架',
          picUrl:'http://www.lenuse.cn/gas/images/0001.jpeg'
        },{
          name:'百草味 山药片45g*4袋 办公室膨化食品休闲零食薯片特产小吃 MJ 香葱味',
          pqId:'P10090110',
          creater:'重庆i生活',
          gys:'重庆优优商户',
          pqname:'0.99元秒杀华为',
          price:'0.99元',
          salenum:281090,
          type:'实物商品',
          hasnum:28,
          hxnum:120,
          buy:'70%',
          crettime:'2016-05-04',
          saletime:'2016-05-12',
          status:'已上架',
          picUrl:'http://www.lenuse.cn/gas/images/0003.jpg'
        }, {
          name:'舒客 舒克益生菌清新牙膏120g*2支',
          pqId:'P10090110',
          creater:'重庆i生活',
          pqname:'0.99元秒杀华为',
          gys:'重百新世纪',
          price:'0.99元',
          salenum:281090,
          type:'票券商品',
          hasnum:28,
          hxnum:120,
          buy:'70%',
          crettime:'2016-05-04',
          saletime:'2016-05-12',
          status:'已下架',
          picUrl:'http://www.lenuse.cn/gas/images/0002.jpg'
        }],
        multipleSelection: [],
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
    methods: {
      replaceLeft() {
        this.left_num = this.left_num.replace(/\D/g, '')
        if (this.left_num && this.right_num && this.left_num * 1 > this.right_num * 1) {
          this.$message.error('请输入正确的价格区间');
          this.left_num = ''
        }
        this.ruleForm.priceArr = [this.left_num, this.right_num]
      },
      replaceRight() {
        this.right_num = this.right_num.replace(/\D/g, '')
        if (this.left_num && this.right_num && this.left_num * 1 > this.right_num * 1) {
          this.$message.error('请输入正确的价格区间');
          this.right_num = ''
        }
        this.ruleForm.priceArr = [this.left_num, this.right_num]
      },
      selectTabItem(item) {
        this.hoverItem = item
      },
      GetPriceArr(value) {
        // this.ruleForm.priceArr = value
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
        this.$router.push({path: '/release_good_activity'})
      },

      handleSizeChange() {

      },
      handleCurrentChange() {

      },
      searchSubmit() {
        console.log(this.ruleForm)
      },
      selectTime() {
        let time1 = this.ruleForm.up_time[0] ? this.ruleForm.up_time[0].getTime() / 1000 : ''
        let time2 = this.ruleForm.up_time[1] ? this.ruleForm.up_time[0].getTime() / 1000 : ''
        this.ruleForm.up_time_stamp = [time1, time2]
      },
      resetForm(formName) {
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
.bd_b{ border-bottom:1px #DCDFE6 solid}
  .good_icon {
    width: 80px;
    height: 60px;
  }

  .add_top {
    right: 0;
    top: -10px;
  }
</style>
