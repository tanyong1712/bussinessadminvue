<template>
    <div>
        <el-breadcrumb separator=">" class="font_14 color_78839A">
            <el-breadcrumb-item>仓库中心</el-breadcrumb-item>
            <el-breadcrumb-item>品牌管理</el-breadcrumb-item>
            <el-breadcrumb-item>品牌详情</el-breadcrumb-item>
        </el-breadcrumb>

         <div class="bg_fff p_30 m_top_20">
            <el-form ref="form"  label-width="120px" class="demo-ruleForm">
                <el-form-item label="品牌ID">52254114</el-form-item>
                 <el-form-item label="品牌名称" style="width:40%;" >
                    232323
                </el-form-item>
                <el-form-item label="品牌英文名" style="width:40%;" >
                    232323
                </el-form-item>
                <el-form-item label="品牌缩略图" style="width:40%;" >
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                   </el-upload>
                    <el-dialog :visible.sync="uploadVisible" size="tiny">
                        <img width="100%" :src="uploadImageUrl" alt="">
                    </el-dialog>
                    <p>建议尺寸800*800像素。</p>
                </el-form-item>
                <el-form-item label="品牌别名" style="width:40%;" >
                    23232
                </el-form-item>
                <el-form-item label="品牌描述" style="width:40%;" >
                    23232
                </el-form-item>
                <el-form-item>
                    <!--<el-button type="primary">保存</el-button>-->
                    <el-button>返回</el-button>
                </el-form-item>
            </el-form>
         </div>

    </div>

</template>

<script>

    export default {
        name: "index",

        data () {
            return {
                //复选框
                 checkbox: false,
                 //图片上传
                 uploadImageUrl: '',
                uploadVisible: false,
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
                    path:`/supplier_add`	//push一个对象，写path路径
                })
            },
            //选项卡
            tabClick(tab, event) {
                console.log(tab, event);
            },
            //图片上传鼠标经过
             handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            //图片上传点击
            handlePictureCardPreview(file) {
                this.uploadImageUrl = file.url;
                this.uploadVisible = true;
            }








        }
    }
</script>

<style scoped>
   .fn_right{ float: right;}
   .pro_img{ width:90px; height:90px;}

</style>
