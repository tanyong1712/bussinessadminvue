<template>
    <el-dialog
            :title=" '新增' + classTypeStr  + '级分类'"
            :visible.sync="visible"
            :close-on-click-modal="false"
            center
            width="400px">
        <div v-if="classType === 1">
            <el-input type="textarea" rows="3" placeholder="可添加多个分类，每个分类一行" v-model="className"></el-input>
        </div>
        <div v-if="classType === 2">
            <el-select v-model="province" placeholder="一级" class="m_bottom_20">
                <el-option key="bbk" label="步步高" value="bbk"></el-option>
                <el-option key="xtc" label="小天才" value="xtc"></el-option>
                <el-option key="imoo" label="imoo" value="imoo"></el-option>
            </el-select>
            <el-input type="textarea" rows="3" placeholder="可添加多个分类，每个分类一行"  v-model="className"></el-input>
        </div>
        <div v-if="classType === 3">
            <div>
                <el-select v-model="province" placeholder="一级" class="m_bottom_20">
                    <el-option key="bbk" label="步步高" value="bbk"></el-option>
                    <el-option key="xtc" label="小天才" value="xtc"></el-option>
                    <el-option key="imoo" label="imoo" value="imoo"></el-option>
                </el-select>
            </div>
            <div>
                <el-select v-model="province" placeholder="二级" class="m_bottom_20">
                    <el-option key="bbk" label="步步高" value="bbk"></el-option>
                    <el-option key="xtc" label="小天才" value="xtc"></el-option>
                    <el-option key="imoo" label="imoo" value="imoo"></el-option>
                </el-select>
            </div>

            <el-input type="textarea" rows="3" placeholder="可添加多个分类，每个分类一行"  v-model="className"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit(this.className)">确定</el-button>
    </span>

    </el-dialog>
</template>

<script>
    export default {
        name: "add-class",
        props: {
            classType: {
                type: Number,
                default: 1,
            },
            classTypeStr: {
                type: String,
                default: '',
            }
        },
        data(){
            return {
                visible: true,
                province:[],
                className:'',
            }
        },
        mounted() {
        },
        methods: {
            init () {
                this.visible = true
            },
            dataFormSubmit(item){
                this.$emit('addGoodClass',item)
            }
        }
    }
</script>

<style scoped>

</style>
