<template>
<div class="dis_flex flex_no_wrap dis_in_flex font_14" :class="border=='border' ? 'border_eee' : 'border_none'">
    <div v-for="i in tabList" class="item" :class="i.item == hoverItem ? 'active' : ''" @click="selectItem(i.item)">
        {{i.label}}
    </div>
</div>
</template>

<script>
    export default {
        name: "tab-item",
        props: {
            tabList:{
                type:Array,
                default:[]
            },
            hoverItem: {
                type:Number,
                default: 0
            },
            border: {
                type:String,
                default: 'border'
            }
        },
        mounted() {
            console.log(this.border)
        },
        methods: {
            selectItem(item){
                this.$emit('changeTabItem',item)
            }
        }
    }
</script>

<style scoped>
.item{
    height: 44px;
    line-height: 44px;
    padding: 0 42px;
    cursor: pointer;
}
    .active{
        border-bottom: 2px solid #409EFF;
    }
    .dis_in_flex{
        display: inline-flex;
    }

    .border_eee{
        border:1px solid rgb(220,223,230);
        border-radius: 4px;
    }

    .border_eee .active{
        border-bottom: none;
        color: #409EFF;
    }
    .item{
        border-right: 1px solid rgb(220,223,230);
    }

    .item:last-child{
        border-right: none;
    }
    .border_none .active {
        border-bottom: 2px solid #409EFF;
    }
.border_none .item{
    border-right: none;
}
</style>
