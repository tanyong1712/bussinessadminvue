<template>
  <div class="po_relative">
    <el-breadcrumb separator=">" class="font_14 color_78839A">
      <el-breadcrumb-item class="color_34425E" ><router-link :to="{path:'/post_model'}">运费模板管理</router-link></el-breadcrumb-item>
      <el-breadcrumb-item>添加运费模板</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bg_fff p_30 m_top_20">
      <el-form :inline="true" ref="ruleForm"  class="demo-form-inline ">
        <div class="dis_flex m_bottom_10">
          <el-form-item label="模板名称" prop="good_id">
            <el-input v-model="name" placeholder="请输入货品名称或ID"></el-input>
          </el-form-item>
        </div>
        <!--<el-form-item style="margin-bottom: 0;">-->
        <!--<el-button class="h_40 w_100" type="primary" @click="searchSubmit">搜索</el-button>-->
        <!--<el-button class="h_40 w_100" @click="resetForm('ruleForm')">重置</el-button>-->
        <!--</el-form-item>-->
      </el-form>
    </div>
    <div class="bg_fff p_30 m_top_20">

      <div class="dis_flex h_50 li_he_50 bg_E4E7EE border_DCDFE6">
        <div class="w_50_per p_left_10">可配送区域</div>
        <div class="w_10_per">首件数量</div>
        <div class="w_10_per">首件价格</div>
        <div class="w_15_per">续件数量</div>
        <div class="w_15_per">续件价格</div>
      </div>
      <div class="">
        <div class="dis_flex li_he_50 border_DCDFE6">
          <div class="w_50_per p_left_10 po_relative font_14" v-if="areas_str">
            <div class="w_80_per li_he_24 m_top_15">{{this.areas_str}}</div>
            <div class="po_absolute texts">
              <span class="font_14 color_409eff cur_pointer" @click="editAreas">修改</span>
              <span class="font_14 color_409eff m_left_16 cur_pointer" @click="deleteAreas">删除</span>
            </div>
          </div>
          <div class="w_50_per p_left_10 po_relative font_14" v-if="areas_str == ''">
            <span class="color_78839A">暂无数据</span>
          </div>
          <div class="w_10_per font_14">
            <el-input style="width: 60%"  v-model="firstItem"></el-input>
          </div>
          <div class="w_10_per font_14">
            <el-input style="width: 60%" v-model="firstPrice"></el-input>
          </div>
          <div class="w_15_per font_14">
            <el-input style="width: 60%" v-model="superimposedItem"></el-input>
          </div>
          <div class="w_15_per font_14">
            <el-input style="width: 60%" v-model="superimposedPrice"></el-input>
          </div>
        </div>
        <div class="m_top_20">
          <el-button @click="selectDistrict">指定可配送区域与运费</el-button>
        </div>

        <div class="m_top_30">
          <el-button type="primary" @click="addPostSubmit">保存</el-button>
          <el-button>返回</el-button>
        </div>
      </div>

    </div>

    <el-dialog title="选择区域" :visible.sync="districtVisible">
      <div>
        <div>指定调用范围
          <el-checkbox class="m_left_20" :indeterminate="isIndeterminate" v-model="checkAll"
                       @change="handleCheckAllChange">全选
          </el-checkbox>
        </div>
        <div class="m_top_20 dis_flex flex_no_wrap" v-for="item in dis">
          <div class="w_10_per">{{item.regionName}}</div>
          <div class="w_80_per">
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <span v-for="(i,index) in item.child" class="m_right_30">
                                <el-checkbox :label="i.areaName" :key="index" :value="i">{{i.areaName}}</el-checkbox>
                            </span>
            </el-checkbox-group>
          </div>
        </div>
        <div class="te_center m_top_30">
          <el-button type="primary" @click="selectDisSubmit">确认</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog  title="删除提示" :visible.sync="deleteVisible" width="340px">
      <div>确定删除该区域？</div>
      <div class="m_top_20 te_center">
        <el-button @click="deleteVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteSubmit">删除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {addPostModel, getAreaList, getAreaByRegion,updatePostModel,getPostModel} from '../../../service/storage-center'
  export default {
    name: "goodsStorage",
    components: {

    },
    data() {
      return {
          pid:0,
          name: '',
        firstItem: '',
        firstPrice: '',
        superimposedItem: '',
        superimposedPrice: '',
        areas: [],
        areas_str: '',
        areaIds: '',
        districtVisible: false,
        deleteVisible: false,
        ruleForm: {
          good_id: '',
          good_class: '',
          good_brand: '',
          up_time: [],
          up_time_stamp: [],
          priceArr: ['', ''],
        },
        multipleSelection: [],
        dis: [],
        disId: [],
        isIndeterminate: false,
        checkAll: false,
        checkedCities: [],
      }
    },
    mounted() {
      this.getAreaList()
    },
    created(){
        console.log(this.pid);
        if(this.$route.query.id) {
            this.pid = this.$route.query.id;
            console.log(this.pid);
            this.gettemplate(this.pid);
        }
    },
    methods: {
        gettemplate(id){
            //获取模板信息
            getPostModel(id).then( res => {
                console.log('获取模板信息')
                console.log(res.data)
                //this.checkedCities=["北京市","辽宁省"];
                this.areas_str=res.data.areas;
                this.checkedCities=this.areas_str.split(',');
                console.log(this.checkedCities)
                this.firstItem=res.data.firstItem;
                this.firstPrice=res.data.firstPrice;
                this.name=res.data.name;
                this.superimposedItem=res.data.superimposedItem;
                this.superimposedPrice=res.data.superimposedPrice;

            })

        },
        getAreaList(){
        getAreaList().then( res => {
          this.dis = res.data
            console.log('dis:')
            console.log(this.dis)
          this.dis.forEach( item => {
            console.log(item)
            getAreaByRegion({regionId : item.regionId }).then( res => {
              item.child = res.data
            })
          })
        })
      },
      getAreasList(){
        this.disId = []
        this.dis.forEach(item => {
          if (item.child) {
            item.child.forEach(i => {
              this.disId.push(i.areaId)
            })
          }
        })
          console.log('disId:')
          console.log(this.disId)
      },
      selectDisSubmit() {
        let arr = []
        let arr1 = []
          console.log(this.dis)
        this.dis.forEach(item => {
          if (item.child.length > 0) {
            arr = [...arr, ...item.child]
          }
        })
        arr.forEach(item => {
          this.areas.forEach(i => {
            if (item.areaName == i) {
              arr1.push(item.areaName)
            }
          })
        })
        console.log(arr1)
        this.areas_str = arr1.join(',')
        this.areaIds = this.areas.join(',')
        this.districtVisible = false
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.disId : [];
        this.isIndeterminate = false;
        this.areas = this.checkedCities
        console.log(this.checkedCities)
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.disId.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.disId.length;
        this.areas = value;
          console.log(this.areas);
      },
      selectDistrict() {
        this.districtVisible = true
        this.getAreasList()
      },


      searchSubmit() {
        console.log(this.ruleForm)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm.up_time = []
        console.log(this.ruleForm)
      },
      editAreas(){
        this.districtVisible = true
      },
      deleteAreas(){
        this.deleteVisible = true
      },
      deleteSubmit(){
        this.deleteVisible = false
      },
      addPostSubmit(){
        let obj = {
          areas: this.areas_str,
          firstItem: this.firstItem,
          firstPrice: this.firstPrice,
          name: this.name,
          ownerId: 22,
          remark: '',
          superimposedItem: this.superimposedItem,
          superimposedPrice: this.superimposedPrice,
        }
        if(this.pid>0){
            obj.id=this.pid;
            updatePostModel(obj).then( res => {

            })
        }else{
          addPostModel(obj).then( res => {

          })
        }
      }
    }
  }
</script>

<style scoped>
  .texts {
    top: 0;
    right: 10px;
  }
</style>
