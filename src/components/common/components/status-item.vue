<template>
    <div>
        <div v-if="status==1">待结算</div>
        <div v-if="status==2">结算中</div>
        <div v-if="status==3">结算完成</div>
        <div v-if="status==4">结算异常</div>
    </div>
</template>

<script>
    export default {
        name: "status_item",
        props: {
            status: ''
        },
        mounted() {
            //console.log(this.status)
        },
        methods: {
            selectItem(item){
                //this.$emit('changeStatusItem',item)
            }
        }
    }
</script>

<style scoped>

</style>
