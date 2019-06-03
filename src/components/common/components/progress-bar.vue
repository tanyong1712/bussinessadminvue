<template>
    <div class="dis_flex ju_co_between flex_no_wrap" id="bar">
        <div class="dis_flex flex_dir_cloumn pro_item po_relative" v-for="(item,index) in progressLabel" v-bind:key="index" :class="progress >index ? 'active_bar': ''">
            <p class="al_slef_center font_14 line1">{{item.label}}</p>
            <p class="al_slef_center item_tag m_top_10" :class="progress > index ? 'bar_bg': ''"></p>
            <p class="al_slef_center font_12 m_top_10 line1"> {{item.time}}</p>
            <div class="po_absolute bar al_slef_center" v-if="index > 0" :class="progress > index ? 'bar_bg': ''"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "progress-bar",
        data() {
            return {
                width:0
            }
        },
        props: {
            progress: {
                type: Number,
                default: 0
            },
            progressLabel: {
                type: Array,
                default: []
            }
        },
        mounted(){
            let bar = document.getElementById('bar').offsetWidth
            this.width = bar / this.progress
        }

    }
</script>

<style scoped>
    .pro_item {
        width:min-content;
        width: 800px;
    }
    .item_tag{
        background: #78839A;
        width: 12px;height: 12px;
        line-height: 15px;
        border-radius: 50%;text-align: center;
    }

    .active_bar {
        color: #3F9EFF;


    }
    .bar{
        width: 92%;
        background: #78839A;
        height: 2px;
        top: 50%;
        left: -46%;
    }
    .bar_bg{
        background: #3F9EFF;
    }
</style>
