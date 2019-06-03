<template>
    <div class="dis_flex flex_no_wrap">
        <el-select class="m_right_12" v-model="province" placeholder="省" @change="selectProvince" v-if="selectNum>=1">
            <el-option
                    v-for="item in provinceList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
            </el-option>
        </el-select>
        <el-select class="m_right_12" v-model="city" placeholder="市" @change="selectCity"  v-if="selectNum>=2">
            <el-option
                    v-for="item in cityList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
            </el-option>
        </el-select>
        <el-select class="m_right_12" v-model="region" placeholder="区" @change="selectRegion"  v-if="selectNum>=3">
            <el-option
                    v-for="item in regionList"
                    :key="item"
                    :label="item"
                    :value="item">
            </el-option>
        </el-select>
        <div class="al_slef_center font_12 m_right_12 m_left_24 cur_pointer" @click="clearItem">
            <i class="el-icon-lx-refresh"></i><span class="m_left_5">重置</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "region-picker",
        data() {
            return {
                province: '',
                city: '',
                region: '',
            }
        },
        props: {
            provinceList: {
                type: Array,
                default: []
            },
            cityList: {
                type: Array,
                default: []
            },
            regionList: {
                type: Array,
                default: []
            },
            selectNum: {
                type: Number,
                default: 3
            }
        },
        mounted() {
            console.log(this.regionList)
        },
        methods: {
            selectProvince() {
                this.city = ''
                this.region = ''
                this.$emit('selectProvince', this.province)
            },
            selectCity() {
                this.region = ''
                this.$emit('selectCity', this.city)
            },
            selectRegion() {
                this.$emit('selectRegion', this.region)
            },
            clearItem() {
                this.province = this.region = this.city = ''
                this.$emit('clearItem')
            }
        }
    }
</script>

<style scoped>

</style>
