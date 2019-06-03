<template>
    <div class="bg_fff p_30 m_top_20">
        <el-form ref="formData" :model="formData" :rules="rules" label-width="150px">
            <el-form-item label="货品名称：" prop="name">
                <el-input v-model="formData.name" style="width: 50%;" placeholder="请输入货品名称"></el-input>
            </el-form-item>
            <el-form-item label="货品副标题">
                <el-input v-model="formData.sub_title" style="width: 50%;" placeholder="请输入货品名称"></el-input>
            </el-form-item>
            <el-form-item label="分享描述">
                <el-input v-model="formData.share_desc" style="width: 50%;" placeholder="微信分享好友时会显示，建议36个字以内" maxlength="36"></el-input>
            </el-form-item>
            <el-form-item label="检索关键字">
                <el-input v-model="formData.keyword" style="width: 50%;" placeholder="请输入检索关键字"></el-input>
            </el-form-item>
            <el-form-item label="货品头图">

                <div v-if="goods_pic">
                    <img height="148" width="148" :src="goods_pic" />
                </div>
                <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <div>建议尺寸80*80像素，最多可上传9张，可拖拽图片调整顺序。</div>
            </el-form-item>
            <div class="dis_flex">
                <el-form-item label="库存单位">
                    <el-input v-model="formData.goodsnum" placeholder="如：个" maxlength="2"></el-input>
                </el-form-item>
                <el-form-item label="供品重量">
                    <el-input v-model="formData.goodsal" placeholder="如：个" maxlength="2"></el-input>
                </el-form-item>
                <el-form-item label="7天理由退换货">
                    <el-select v-model="is_refund">
                        <el-option label="不支持" value="1"></el-option>
                        <el-option label="支持" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="dis_flex">
                <el-form-item label="货品分类">
                    <el-select v-model="formData.productCategoryId" >
                        <el-option v-for="item in cates" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="货品品牌">
                    <el-select v-model="formData.productBrandId">
                        <el-option v-for="item in brands" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

            </div>
            <div class="dis_flex">
                <el-form-item label="发货方式">
                    <el-select v-model="fhmoethd">
                        <el-option label="供应商发货" value="1"></el-option>
                        <el-option label="自营仓库发货" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="供应方">
                    <el-select v-model="supplier_id">
                        <el-option v-for="item in suppliers" :key="item.id" :label="item.name" :value="item.id""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="划线价">
                    <el-input v-model="formData.mart_price" style="width: 50%;" placeholder="请输入检索关键字"></el-input>
                </el-form-item>
            </div>
            <el-form-item label="包装清单">
                <el-input v-model="formData.noname" style="width: 50%;" placeholder="请输入检索关键字"></el-input>
            </el-form-item>
            <el-form-item label="其他备注">
                <el-input v-model="formData.noname" style="width: 50%;" placeholder="请输入检索关键字"></el-input>
            </el-form-item>
            <el-form-item label="快递运费">
                <div>
                    <el-radio v-model="formData.radio" label="1">统一包邮</el-radio>
                </div>
                <div>
                    <el-radio v-model="formData.radio" label="2">统一运费</el-radio>
                    <el-input v-model="formData.noname" placeholder="请输入邮费" maxlength="2" style="width: 20%;"></el-input>
                </div>
                <div class="dis_flex">
                    <el-radio v-model="formData.radio" label="3">运费模板</el-radio>
                    <el-form-item >
                        <el-select v-model="dtemplate_id">
                            <el-option v-for="item in dtemplate" :key="item.id" :label="item.name" :value="item.id""></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button><router-link :to="{path:'/add_post_model'}">新增运费模板</router-link></el-button>
                </div>
            </el-form-item>
            <el-form-item label="详细描述" >
                <div class="edit_container">
                    <quill-editor v-model="content"  ref="myQuillEditor" class="editer" :options="editorOption"  >
                    </quill-editor>
                </div>
            </el-form-item>

            <el-form-item   v-if="buttonVisible">
                <el-button type="primary" @click="submitForm('formData')">保存</el-button>
                <el-button @click="resetForm('formData')">重置</el-button>
            </el-form-item>
            <div class="border_eee m_bottom_20 m_top_20"></div>
            <!--<div>货品规格信息</div>-->
            <!--<el-form-item label="其他备注">-->
                <!--<el-button @click="addStandard">添加多规格</el-button>-->
                <!--<span class="m_left_10 font_12">如有颜色尺寸等多种规格，请添加商品规格</span>-->
            <!--</el-form-item>-->
            <!--<div class="border_eee m_bottom_20 m_top_20"></div>-->
            <!--<div>单一货品配置</div>-->
            <!--<div class="dis_flex">-->
                <!--<el-form-item label="成本价">-->
                    <!--<el-input v-model="formData.noname" style="width: 80%;" placeholder="请输入成本价"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="成本价">-->
                    <!--<el-input v-model="formData.noname" style="width: 80%;" placeholder="请输入成本价"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="价格区间">-->
                    <!--<el-input v-model="formData.noname" style="width: 80%;" placeholder="请输入成本价"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="库存">-->
                    <!--<el-input v-model="formData.noname" style="width: 80%;" placeholder="请输入成本价"></el-input>-->
                <!--</el-form-item>-->
            <!--</div>-->
            <!--<div class="border_eee m_bottom_20 m_top_20"></div>-->
            <!--<el-form-item>-->
                <!--<el-button type="primary" class="w_100">保存</el-button>-->
                <!--<el-button  class="w_100">返回</el-button>-->
            <!--</el-form-item>-->
        </el-form>

        <el-dialog
                title="多规格编辑"
                :visible.sync="standardDialogVisible"
        >
            <div>
                <el-form ref="standardData" :model="standardData" :rules="standardRules" label-width="150px">
                    <el-form-item label="规格名称：" prop="name">
                        <el-input v-model="standardData.name" style="width: 50%;" placeholder="请输入货品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="规格属性值：" prop="name">
                        <el-tag
                                :key="tag"
                                v-for="tag in standardData.tags"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input
                                style="width: 200px;"
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>

                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {addproduct,updateproduct,getproductcategorys,getbrand,getproduct} from '../../../service/good'
    import {postRateList} from '../../../service/storage-center'
    import {quillEditor} from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    export default {
        name: "add_update_good",
        data(){
            return {
                goodid:0,
                cates:[],
                brands:[],
                suppliers:[
                    {id:'1',name:'商城自营'},
                    {id:'2',name:'上海芬梦'},
                ],
                supplier_id:'1',
                is_refund:'2',
                fhmoethd:'1',
                formData:{
                    name:'',
                    productBrandId:'',
                    productCategoryId:'',
                    ownerId :'1',
                    type :'1',
                    words:'',

                },
                content:'',
                buttonVisible:true,
                dtemplate:[],
                dtemplate_id:'',

                rules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    productBrandId: [
                        { required: true, message: '请选择品牌', trigger: 'blur' }
                    ],
                    productCategoryId: [
                        { required: true, message: '请选择分类', trigger: 'blur' }
                    ]
                },
                standardData:{
                    name:'',
                    goodPicUrl:'',
                    classItem:'1',
                    radio: '1',
                    tags:['标签一', '标签二', '标签三']
                },
                standardRules:{
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]
                },
                dialogVisible:false,
                dialogImageUrl:'',
                standardDialogVisible: false,
                inputVisible: false,
                inputValue: '',
                editorOption: {},
                goods_pic:''

            }
        },
        components: {//使用编辑器
            quillEditor
        },
        watch:{
            $route:function(value){
                console.log('value:'+value);
                console.log(value);
                if(this.$route.query.op=='view'){
                    this.buttonVisible=false;
                }else{
                    this.buttonVisible=true;
                }
                console.log(this.buttonVisible);
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
            if(this.$route.query.op=='view'){
                this.buttonVisible=false;
            }else{
                this.buttonVisible=true;
            }
            console.log(this.buttonVisible);
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
            postRateList({pageNum:1,'pageSize':1000}).then( res => {
                this.dtemplate=res.data.list;
            })
            if(this.$route.query.id) {
                this.goodid = this.$route.query.id;
                this.getloaddata(this.goodid);
            }


        },
        methods: {
            onEditorReady(editor) {
                console.log("---内容改变事件---")
                this.content = editor
                console.log(editor)
            },
            getloaddata(id){
                console.log('id:'+id);
                if(id==0 || id==undefined){
                    this.formData ={};
                    this.content ='';
                    this.goods_pic='';
                }else {
                    getproduct(id).then(res => {
                        console.log('res:');
                        console.log(res);
                        this.formData = res.data;
                        this.content = '<img src="http://umshop.oss-cn-hangzhou.aliyuncs.com/upload/vcetEJlAfVpGJNyZzL6vRHsifP1c7FNi0gooenXf.png">' +
                            '<img src="http://umshop.oss-cn-hangzhou.aliyuncs.com/upload/pdKRGdDkCbdpvGTTPVgp3YQz9ydEdxUDTHOENH15.jpeg">' +
                            '<img src="http://umshop.oss-cn-hangzhou.aliyuncs.com/upload/zoB4ld54fvtCt56RxLO0QbntPA0bw9mEtM8l2tHY.jpeg">' +
                            '<img src="http://umshop.oss-cn-hangzhou.aliyuncs.com/upload/sEb0bUB3VYjujTha4Th7suWwsWx5tEOyM2gIzBEI.jpeg">' +
                            '<img src="http://umshop.oss-cn-hangzhou.aliyuncs.com/upload/9gtCbWTmm5k4DBi9Fhvvv1BrhLhmgGxfiTUGez8S.jpeg">';
                        this.goods_pic = 'http://umshop.oss-cn-hangzhou.aliyuncs.com/upload/image/BoGFzPgS9q05jJ7VlvxCqVQyUi17DIEzCe5o6OvT.jpeg';
                    }).catch(err => {
                        console.log('err:' + err);
                        this.$message(err);
                    })
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.formData);
                        console.log(this.goodid);
                        if(this.goodid>0){
                            //编辑
                            this.formData.id=this.goodid;
                            console.log(this.formData);
                            updateproduct(this.formData).then( res => {
                                console.log('res:');
                                console.log(res);
                                this.$message(res.msg);
                                this.$router.push({
                                    path:'/goodsStorage'	//push一个对象，写path路径
                                });
                            }).catch( err => {
                                console.log('err:'+err);
                                this.$message(err);
                            })
                       }else{
                           //新增

                           addproduct(this.formData).then( res => {
                               console.log('res:');
                               console.log(res);
                               this.goodid=res.data;
                               this.$message(res.msg);
                               this.$router.push({
                                   path:'/goodsStorage'	//push一个对象，写path路径
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            addStandard(){
                this.standardDialogVisible = true
            },
            handleClose(tag) {
                this.standardData.tags.splice(this.standardData.tags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.standardData.tags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        }
    }
</script>

<style scoped>

</style>
