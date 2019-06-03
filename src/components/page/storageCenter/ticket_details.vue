<template>
    <div>
         
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">票券管理</el-breadcrumb-item>
            <el-breadcrumb-item>票券库详情</el-breadcrumb-item>
        </el-breadcrumb>
         <div class="font_14 p_top_30"><strong>基本信息</strong></div>

         <div class="dis_flex flex_no_wrap ">
            <div class="wid_50 dis_flex flex_no_wrap">
                <div class="  font_14 m_right_16 li_he_100">票券名称：</div>
                <div class="  font_14 li_he_100">重庆金窝窝网络科技有限公司团购票券 </div>
            </div>
           <div class="wid_50 dis_flex flex_no_wrap">
                <div class=" font_14 m_right_16 li_he_100">票券LOGO：</div>
                <div class="  font_14 h_100 li_he_100 w_100"><img class="w_100 h_100" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555388562136&di=05d3d7338bfc917b719dbd1c54bb14e4&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F36%2F91%2F15D58PICsXW.jpg"></img></div>
            </div>
         </div>

         <div class="dis_flex flex_no_wrap m_bottom_10">
            <div class="wid_50 dis_flex flex_no_wrap">
                <div class="  font_14 m_right_16">票券类型： </div>
                <div class="  font_14">团购券 </div>
            </div>
           <div class="wid_50 dis_flex flex_no_wrap">
                <div class=" font_14 m_right_16">票券码型：</div>
                <div class=" font_14">二维码 </div>
            </div>
         </div>

          <div class="dis_flex flex_no_wrap m_bottom_10">
            <div class="wid_50 dis_flex flex_no_wrap ">
                <div class="  font_14 m_right_16">票券颜色： </div>
                <div class="  font_14">红色 </div>
            </div>
           <div class="wid_50 dis_flex flex_no_wrap ">
                <div class=" font_14 m_right_16">票券使用：</div>
                <div class=" font_14">请展示二维码销核销 </div>
            </div>
         </div>

          <div class="dis_flex flex_no_wrap m_bottom_10">
            <div class="wid_50 dis_flex flex_no_wrap ">
                <div class="  font_14 m_right_16">启用时间： </div>
                <div class="  font_14">2019.01.06 </div>
            </div>
           <div class="wid_50 dis_flex flex_no_wrap ">
                <div class=" font_14 m_right_16">结束时间：</div>
                <div class=" font_14">2019.12.09 </div>
            </div>
         </div>

         <div class="dis_flex flex_no_wrap  m_bottom_10">
            <div class="wid_50 dis_flex flex_no_wrap">
                <div class="  font_14 m_right_16">使用日期： </div>
                <div class="  font_14">2019.01.06 </div>
            </div>
           <div class="wid_50 dis_flex flex_no_wrap ">
                <div class=" font_14 m_right_16">结束有效日期：</div>
                <div class="  font_14">2019.12.09 </div>
            </div>
         </div>

          <div class="dis_flex flex_no_wrap  border_bottom ">
            <div class=" dis_flex flex_no_wrap ">
                <div class=" font_14 m_right_16">商品信息：</div>
                <div class=" font_14">商家的名字商家的名字商家的名字商家的名字商家的名字商家的名字商家的名字</div>
            </div>
         </div>

          
          <div class="dis_flex flex_no_wrap m_bottom_10 ">
                <div class="wid_50 dis_flex flex_no_wrap">
                <div class="  font_14 m_right_16">生成票券方： </div>
                <div class="  font_14">总部</div>
            </div>
           <div class="wid_50 dis_flex flex_no_wrap ">
                <div class=" font_14 m_right_16">参与城市运营：</div>
                <div class="  font_14">5 </div>
            </div>
         </div>

          <div class="dis_flex flex_no_wrap m_bottom_10 ">
                <div class="wid_50 dis_flex flex_no_wrap">
                    <div class="  font_14 m_right_16">剩余总量： </div>
                    <div class="  font_14">5555</div>
                </div>
                <div class="wid_50 dis_flex flex_no_wrap ">
                    <div class=" font_14 m_right_16">销售总量：</div>
                    <div class="  font_14">5 </div>
                </div>
         </div>
         <div class="dis_flex flex_no_wrap  border_bottom">
                <div class="wid_50 dis_flex flex_no_wrap">
                    <div class="  font_14 m_right_16">审核总量： </div>
                    <div class="  font_14">5555</div>
                </div>
                <div class="wid_50 dis_flex flex_no_wrap ">
                    <div class=" font_14 m_right_16">过期总量：</div>
                    <div class="  font_14">5 </div>
                </div>
         </div>

         <div class="dis_flex flex_no_wrap m_bottom_10 ">
                <div class="  font_14 li_he_32">城市运营商名字 </div>
                <div class="m_left_16"><el-input v-model="input" placeholder="请输入票务券名称"></el-input></div>
                <div class="m_left_40"><el-button type="primary" icon="el-icon-search">搜索</el-button><el-button >重置</el-button></div>
           
         </div>
          <el-table
                        :data="tableData"
                        stripe
                        style="width:100%">
                        <el-table-column
                            prop="name"
                            label="城市运营商名称">
                        </el-table-column>
                        <el-table-column
                            prop="dataTime"
                            label="参与时间"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="totalSurplus"
                            label="剩余总数量">
                            <template slot-scope="scope">
                                 <el-progress :percentage="70"></el-progress>
                            </template>
                            
                        </el-table-column>
                        <el-table-column
                            prop="totalSale"
                            label="销售总量">
                        </el-table-column>
                        <el-table-column
                            prop="totalOffs"
                            label="核销总量">
                        </el-table-column>
                        <el-table-column
                            prop="totalOverdue"
                            label="过期总量">
                        </el-table-column>
                    </el-table>
         <div class="block p_top_40 te_right">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
        
        
    </div>
   
</template>

<script>
// import AddClass from './add-class'
    export default {
        name: "index",
        data () {
            return {
                input:"",
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                tableData: [{
                        name: '金窝窝开票券',
                        dataTime:'2018.05.01',
                        totalSurplus:'2255',
                        totalSale:'2255',
                        totalOffs :'55',
                        totalOverdue:'2',

                    },
                ],
            }
        },

        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }

            
        }
    }
</script>

<style scoped>
    .title{ width: 100%; padding-bottom:20px;}
    .lable_tit{ height: 36px; line-height:36px;}
    .wid_50{ width: 50%; line-height: 40px;}
    .border_bottom{ border-bottom:2px  #e4e7ed solid; padding-bottom: 30px;  margin-bottom:20px}
</style>
