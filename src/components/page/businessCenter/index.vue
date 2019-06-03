<template>
    <div>
        <el-breadcrumb separator=">" class="font_14 color_78839A">
            <el-breadcrumb-item class="color_34425E">运营中心</el-breadcrumb-item>
            <el-breadcrumb-item>商户行业分类管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="bg_fff p_30 m_top_20">
            <div class="top font_14 bg_E4E7EE">
                <div class="item">一级分类</div>
                <div class="item">二级分类</div>
                <div class="item">三级分类</div>
                <div class="item">操作</div>
            </div>
            <div v-for="item in list" class="top font_14 ">
                <div class="lie1 po_relative">
                    <span class="color_78839A">{{item.typeName}}</span>
                    <div class="po_absolute icons_right">
                             <span class="cur_pointer p_10" @click="editClasses(item)">
                             <i class="iconfont">&#xe626;</i>
                             </span>
                        <span class="cur_pointer p_10" @click="translateClasses(item,1)">
                             <i class="iconfont">&#xe600;</i>
                        </span>
                    </div>
                </div>
                <div class="lie2">
                    <div class="top" v-for="sec in item.sonList">
                        <div class="lie_2 po_relative">
                            <span class="color_78839A"> {{sec.typeName}} </span>
                            <div class="po_absolute icons_right">
                             <span class="cur_pointer p_10" @click="editClasses(sec)">
                             <i class="iconfont">&#xe626;</i>
                             </span>
                                <span class="cur_pointer p_10" @click="translateClasses(sec,2)">
                             <i class="iconfont">&#xe600;</i>
                        </span>
                            </div>

                        </div>
                        <div class="lie_3">
                            <div class="top" v-if="sec.sonList.length >= 0" v-for="third in sec.sonList">
                                <div class="lie_4 po_relative">
                                    <span class="color_78839A">{{third.typeName}}</span>
                                    <div class="po_absolute icons_right">
                                    <span class="cur_pointer p_10" @click="editClasses(third)">
                                     <i class="iconfont">&#xe626;</i>
                                </span>
                                        <span class="cur_pointer p_10" @click="translateClasses(third,3)">
                                     <i class="iconfont">&#xe600;</i>
                                </span>
                                    </div>
                                </div>
                                <div class="lie_4">
                                    <i class="el-icon-lx-delete color_409eff font_20 cur_pointer"
                                       @click="deleteClasses(third)"></i>
                                    <i class="el-icon-lx-link color_409eff font_20 m_left_16 cur_pointer"
                                       @click="spliceClasses(third)"></i>
                                </div>
                            </div>
                            <div class="top" v-if="sec.sonList.length == 0">
                                <div class="lie_4 color_78839A"> /</div>
                                <div class="lie_4">
                                    <i class="el-icon-lx-delete color_409eff font_20 cur_pointer"
                                       @click="deleteClasses(sec)"></i>
                                    <i class="el-icon-lx-link color_409eff font_20 m_left_16 cur_pointer"
                                       @click="spliceClasses(sec)"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="top font_14 color_445370">
                <div class="lie1 addItem" @click="addClasses(1)">添加一级分类</div>
                <div class="lie2">
                    <div class="top">
                        <div class="lie_2 addItem" @click="addClasses(2)">
                            添加二级分类
                        </div>
                        <div class="lie_3">
                            <div class="top">
                                <div class="lie_4 addItem" @click="addClasses(3)">添加三级分类</div>
                                <div class="lie_4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <add-class v-if="addClassVisible" ref="addClasses" :classType="classType"
                   :classTypeStr="classTypeStr"></add-class>

        <el-dialog :title=" '“'+classTitle + '”' + '变更为'" :visible.sync="editClassVisible" center width="400px">
            <div class="">
                <el-input v-model="className"></el-input>
            </div>
            <span slot="footer" class="dialog-footer te_center m_top_20">
                <el-button @click="editClassVisible = false">取 消</el-button>
                <el-button type="primary" @click="editClassVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog :title=" '“'+classTitle + '”' + '移动至'" :visible.sync="translateClass" center width="500px">
            <div class="al_it_center">
                <div class="dis_flex ju_co_center" v-if="translateType >= 1">
                    <div class="al_slef_center m_right_12">一级分类</div>
                    <el-select v-model="first">
                        <el-option label="haha" value="1"></el-option>
                        <el-option label="haha" value="1"></el-option>
                        <el-option label="haha" value="1"></el-option>
                    </el-select>
                </div>
                <div class="dis_flex ju_co_center m_top_20" v-if="translateType >= 2">
                    <div class="al_slef_center m_right_12">二级分类</div>
                    <el-select v-model="second">
                        <el-option label="haha" value="1"></el-option>
                        <el-option label="haha" value="1"></el-option>
                        <el-option label="haha" value="1"></el-option>
                    </el-select>
                </div>
                <div class="dis_flex ju_co_center m_top_20" v-if="translateType >= 3">
                    <div class="al_slef_center m_right_12">三级分类</div>
                    <el-select v-model="third">
                        <el-option label="haha" value="1"></el-option>
                        <el-option label="haha" value="1"></el-option>
                        <el-option label="haha" value="1"></el-option>
                    </el-select>
                </div>
            </div>
            <span slot="footer" class="dialog-footer te_center m_top_20">
                <el-button @click="translateClass = false">取 消</el-button>
                <el-button type="primary" @click="translateClass = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog :title=" '“'+classTitle + '”' + '合并至'" :visible.sync="spliceClass" center width="500px">
            <div class="al_it_center">
                <div class="dis_flex ju_co_center">
                    <div class="al_slef_center m_right_12">一级分类</div>
                    <el-select v-model="first">
                        <el-option label="haha" value="1"></el-option>
                        <el-option label="haha" value="1"></el-option>
                        <el-option label="haha" value="1"></el-option>
                    </el-select>
                </div>
                <div class="dis_flex ju_co_center m_top_20">
                    <div class="al_slef_center m_right_12">二级分类</div>
                    <el-select v-model="second">
                        <el-option label="haha" value="1"></el-option>
                        <el-option label="haha" value="1"></el-option>
                        <el-option label="haha" value="1"></el-option>
                    </el-select>
                </div>
                <div class="dis_flex ju_co_center m_top_20">
                    <div class="al_slef_center m_right_12">三级分类</div>
                    <el-select v-model="third">
                        <el-option label="haha" value="1"></el-option>
                        <el-option label="haha" value="1"></el-option>
                        <el-option label="haha" value="1"></el-option>
                    </el-select>
                </div>
            </div>
            <span slot="footer" class="dialog-footer te_center m_top_20">
                <el-button @click="spliceClass = false">取 消</el-button>
                <el-button type="primary" @click="spliceClass = false">确 定</el-button>
            </span>
        </el-dialog>

        <!--删除弹框-->
        <el-dialog title=" 删除提示 " :visible.sync="deleteVisible" center width="400px">
            <div class="">
                确定删除该分类？
            </div>
            <span slot="footer" class="dialog-footer te_center m_top_20">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import AddClass from './add-class'
    import {getIndustry} from '../../../service/business-center'
    export default {
        name: "index",
        data() {
            return {
                list: [],
                addClassVisible: false,
                deleteVisible: false,
                classType: 1,
                classTypeStr: '一',
                editClassVisible: false,
                translateClass: false,
                spliceClass: false,
                className: '',
                first: 1,
                second: 1,
                third: 1,
                classTitle: '',
                translateType: 1
            }
        },
        mounted() {
            this.listFetch()
        },
        components: {
            AddClass
        },
        methods: {
            listFetch() {
              // getIndustry().then(res => {
              //   this.list = res.data
              this.list = [
                {
                  "id": 1,            //第一级id
                  "typeName": "小微", //第一级名称
                  "typeGrade": 0,
                  "parentId": null,
                  "createTime": "2019-05-07 10:30:49",
                  "updateTime": "2019-05-07 10:30:53",
                  "sonList": [{
                    "id": 2,   //第二级id
                    "typeName": "餐饮店",//第二级名称
                    "typeGrade": 1,
                    "parentId": 1,
                    "createTime": "2019-05-07 22:05:45",
                    "updateTime": "2019-05-07 22:05:47",
                    "sonList": [{
                      "id": 3,   //第三级id
                      "typeName": "早餐",//第三级名称
                      "typeGrade": 2,
                      "parentId": 2,
                      "createTime": "2019-05-07 22:06:26",
                      "updateTime": "2019-05-07 22:09:31",
                      "sonList": null
                    }]
                  }]
                },{
                  "id": 2,            //第一级id
                  "typeName": "大卫", //第一级名称
                  "typeGrade": 0,
                  "parentId": null,
                  "createTime": "2019-05-07 10:30:49",
                  "updateTime": "2019-05-07 10:30:53",
                  "sonList": [{
                    "id": 22,   //第二级id
                    "typeName": "服装店",//第二级名称
                    "typeGrade": 1,
                    "parentId": 1,
                    "createTime": "2019-05-07 22:05:45",
                    "updateTime": "2019-05-07 22:05:47",
                    "sonList": [{
                      "id": 32,   //第三级id
                      "typeName": "西装",//第三级名称
                      "typeGrade": 2,
                      "parentId": 2,
                      "createTime": "2019-05-07 22:06:26",
                      "updateTime": "2019-05-07 22:09:31",
                      "sonList": null
                    },{
                      "id": 33,   //第三级id
                      "typeName": "礼服",//第三级名称
                      "typeGrade": 2,
                      "parentId": 2,
                      "createTime": "2019-05-07 22:06:26",
                      "updateTime": "2019-05-07 22:09:31",
                      "sonList": null
                    }]
                  }]
                }
              ]
              // })

            },
            addClasses(item) {
                this.classType = item
                if (item == 1) {
                    this.classTypeStr = '一'
                }
                if (item == 2) {
                    this.classTypeStr = '二'
                }
                if (item == 3) {
                    this.classTypeStr = '三'
                }
                this.addClassVisible = true
                this.$nextTick(() => {
                    this.$refs.addClasses.init()
                })
            },
            editClasses(item) {
                this.classTitle = item.typeName
                this.editClassVisible = true
            },
            translateClasses(item, type) {
                console.log(item)
                this.classTitle = item.typeName
                this.translateType = type
                this.translateClass = true
            },
            deleteClasses(item) {
                this.deleteVisible = true
            },
            spliceClasses(item) {
                this.classTitle = item.typeName
                this.spliceClass = true
            }
        }
    }
</script>

<style scoped>
    .top {
        width: 100%;
        display: flex;
        flex-direction: row;
        border: 1px solid #e4e7ee;
        text-align: center;
    }

    .item {
        width: 25%;
        text-align: center;
        height: 70px;
        line-height: 70px;
        border-left: 1px solid #e4e7ee;
    }

    .lie1 {
        display: inline-block;
        width: 25%;
        align-content: center;
        align-items: center;
        align-self: center;
    }

    .lie2 {
        display: inline-block;
        width: 75%;
    }

    .lie_2 {
        display: inline-block;
        width: 33%;
        align-content: center;
        align-items: center;
        align-self: center;

    }

    .lie_3 {
        display: inline-block;
        width: 67%;

    }

    .lie_4 {
        display: inline-block;
        width: 50%;
        border-left: 1px solid #e4e7ee;
        height: 60px;
        line-height: 60px;

    }

    .addItem {
        cursor: pointer;
    }

    .lie_1 .top {
        border-bottom: none;
    }

    .lie_2 .top {
        border-bottom: none;
    }

    .lie_3 .top {
        border-bottom: none;
    }

    .icon_btn {
        display: none;
    }

    .lie_4:hover .icon_btn {
        display: inline-block;
    }

    .icons_right {
        display: none;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }

    .lie1:hover .icons_right,.lie_2:hover .icons_right, .lie_4:hover .icons_right {
        display: block;
    }
</style>
