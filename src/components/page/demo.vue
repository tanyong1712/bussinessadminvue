<template>
    <div>
        <tab-item
                :tabList="tablist"
                :hoverItem="hoverItem"
                @changeTabItem="selectTabItem"
        ></tab-item>
        <region-picker class="m_top_20"
                :provinceList="provinceList"
                :cityList="cityList"
                :regionList="regionList"
                :selectNum="2"
               @selectProvince="chooseProvince"
               @selectCity="chooseCity"
               @selectRegion="chooseRegion"
               @clearItem="clearChooseItem"

        ></region-picker>
        <progress-bar class="m_top_20"
                :progressLabel="progressList"
                :progress="progress"
        ></progress-bar>
    </div>
</template>

<script>
    import RegionPicker from  '../common/components/region-picker'
    import TabItem from  '../common/components/tab-item'
    import ProgressBar from  '../common/components/progress-bar'
    import region from '../common/province'
    export default {
        name: "demo",
        components:{
            ProgressBar,
            RegionPicker,
            TabItem
        },
        data(){
            return {
                provinceList: region.data,
                cityList: [],
                regionList: [],
                province: [],
                city: [],
                region: [],
                tablist:[
                    {label:'线上支付流水',item:1},
                    {label:'线下支付流水',item:2},
                    {label:'生活服务流水',item:3},
                ],
                hoverItem:1,
                progressList:[
                    {label:'审核中',time:'2018.12.24 11:23:45'},
                    {label:'缴费中',time:'2018.12.24 11:23:45'},
                    {label:'验证中',time:'2018.12.24 11:23:45'},
                    {label:'通过',time:'2018.12.24 11:23:45'},
                ],
                progress:2
            }
        },
        methods: {
            chooseProvince(id) {
                console.log('select       ' + id)
                this.provinceList.forEach(item => {
                    if (item.name == id) {
                        this.cityList = item.children
                    }
                })
            },
            chooseCity(id) {
                console.log('select       ' + id)
                this.cityList.forEach(item => {
                    if (item.name == id) {
                        this.regionList = item.children
                    }
                })
            },
            chooseRegion(id) {
                console.log('select       ' + id)
            },
            clearChooseItem() {
                this.regionList = this.cityList = []
            },
            selectTabItem(item){
                console.log(this.hoverItem)
                this.hoverItem = item
            }
        }
    }
</script>

<style scoped>

</style>
