<template>
    <div class="" id="bar">
        <div class="dis_flex pro_item po_relative" v-for="(item,index) in progressLabel" v-bind:key="index" :class="progress >index ? 'active_bar': ''">
            <p class="item_tag " :class="progress > index ? 'bar_bg': ''"></p>
            <div class="m_left_16" :class="progress >index ? 'active_bar': ''">
                <p class="font_12 line1"> {{item.time}}</p>
                <p class="font_14 line1 m_top_5">{{item.label}}</p>
            </div>
            <div class="po_absolute bar" v-if="index < (progressLabel.length-1)" :class="progress > (index+1) ? 'bar_bg': ''"></div>
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
       min-height: 75px;

    }
    .item_tag{
        background: #E4E7EE;
        width: 12px;height: 12px;
        line-height: 15px;
        border-radius: 50%;text-align: center;
    }

    #bar .active_bar {
        color: #3F9EFF !important;


    }
    .bar{
        width: 2px;
        background: #E4E7EE;
        height: 52px;
        left: 5px;
        top: 18px;
    }
    .bar_bg{
        background: #3F9EFF;
    }
</style>
