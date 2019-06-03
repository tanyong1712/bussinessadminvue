<template>
    <div class="dis_flex">
        <el-input @change="replaceInput(1)" v-model="left_num"></el-input>
        <span class="al_slef_center m_left_10 m_right_10">-</span>
        <el-input @change="replaceInput(2)" v-model="right_num"></el-input>
    </div>
</template>

<script>
    export default {
        name: "price-section",
        props: {
            priceArr:{
                type:Array,
                default:[],
            }
        },
        data(){
            return {
                left_num:'',
                right_num:'',
            }
        },
        mounted() {

        },
        methods: {
            replaceInput(type){
                this.left_num=this.left_num.replace(/\D/g,'')
                this.right_num=this.right_num.replace(/\D/g,'')
                if(this.left_num && this.right_num && this.left_num*1 > this.right_num*1){
                    this.$message.error('请输入正确的价格区间');
                    type == 1 ? (this.left_num='') : (this.right_num='')
                }
                let num_arr = [this.left_num,this.right_num]
                this.$emit('change',num_arr)
            }
        }
    }
</script>

<style scoped>

</style>
