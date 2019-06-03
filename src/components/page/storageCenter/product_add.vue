<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">仓库中心</el-breadcrumb-item>
            <el-breadcrumb-item>品牌管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增品牌</el-breadcrumb-item>
        </el-breadcrumb>
         
         <div class="m_bottom_20 p_top_20">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px" class="demo-ruleForm">
                <el-form-item label="品牌名称" prop="brandName" style="width:40%;" >
                    <el-input v-model="ruleForm.brandName" placeholder="请选输入品牌名称"></el-input>
                </el-form-item>
                <el-form-item label="品牌英文名" prop="englishName" style="width:40%;" >
                    <el-input  v-model="ruleForm.englishName" placeholder="请选输入品牌英文名"></el-input>
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
                <el-form-item label="品牌别名" prop="contName" style="width:40%;" >
                    <el-input v-model="ruleForm.contName" placeholder="请选输入品牌名称"></el-input>
                </el-form-item>
                <el-form-item label="品牌描述" prop="desc" style="width:40%;" >
                    <el-input v-model="ruleForm.desc" type="textarea"></el-input>
                </el-form-item>
                <el-form-item> 
                    <el-form-item>
                        <el-button type="primary">保存</el-button>
                        <el-button >取消</el-button>
                    </el-form-item>
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
                ruleForm: {
                    brandName: '',
                    englishName: '',
                    image: '',
                    contName:'',
                    desc:'',
                },
                rules: {
                    brandName: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 1, max: 25, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    englishName: [
                        { required: true, message: '请输入英文名', trigger: 'blur' },
                        { min: 1, max: 25, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    contName: [
                        { required:false, message: '请输入上传缩略图', trigger: 'blur' },
                        { min: 1, max: 25, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                     desc: [
                        { required:false, message: '请输入上传缩略图', trigger: 'blur' },
                        { min: 1, max: 25, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                
                }
                









               
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
