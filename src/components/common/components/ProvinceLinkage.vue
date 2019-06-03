<template>
    <el-form-item label="区域">
        <el-select v-if="linkageLevel >= 1" v-model="province" placeholder="省" @change="selectProvince">
            <el-option v-for="item in provinceList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"
            ></el-option>
        </el-select>
        <el-select v-if="linkageLevel >= 2" v-model="municipal" placeholder="市" @change="selectMunicipal">
            <el-option v-for="item in municipalList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"
            ></el-option>
        </el-select>

        <el-select v-if="linkageLevel === 3" v-model="region" placeholder="区" @change="selectRegion">
            <el-option v-for="item in regionList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"
            ></el-option>
        </el-select>
    </el-form-item>
</template>

<script>
    export default {
        name: "ProvinceLinkage",
        props: {
            provinceList: {
                type: Array,
                default: []
            },
            municipalList: {
                type: Array,
                default: []
            },
            regionList: {
                type: Array,
                default: []
            },
            linkageLevel: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                province: '',
                municipal: '',
                region: '',

            }
        },
        methods: {
            selectProvince() {
                if (this.linkageLevel >= 2) {
                    this.$emit('selectProvince', this.province);
                }
            },
            selectMunicipal() {
                if (this.linkageLevel == 3) {
                    this.$emit('selectMunicipal', this.municipal);
                }
            },
            selectRegion() {
                this.$emit('selectRegion', this.region);
            },
            clearItem() {
                this.province = this.region = this.municipal = '';
                this.$emit('clearItem');
            }
        }
    }
</script>

<style scoped>

</style>