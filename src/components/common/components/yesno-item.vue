<template>

    <div>
        <div v-if="status==1">正常</div>
        <div v-else="status==1">不正常</div>
    </div>
</template>

<script>
    export default {
        name: "yesno_item",
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
