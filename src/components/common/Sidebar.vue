<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#19243B"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-time',
                        index: 'businesses',
                        title: '运营中心',
                        subs: [
                            {
                                index: 'ywgl',
                                title: '营销管理',
                                subs: [
                                    {
                                        index: 'group_buy_manage',
                                        title: '拼团管理',
                                    },
                                    {
                                        index: 'business_good_manage',
                                        title: '商品管理',
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-rank',
                        index: 'logistics',
                        title: '物流订单管理',
                        subs: [
                            {
                                index: 'logistics',
                                title: '订单列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-goods',
                        index: 'goodsStorage',
                        title: '实物货品管理',
                        subs: [
                            {
                                index: 'goodsStorage',
                                title: '实物货品库',
                            },
                            {
                                index: 'post_model',
                                title: '运费模板管理',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-s-marketing\n',
                        index: '/supplier_management',
                        title: '供应方管理',
                        subs: [
                            {
                                index: 'supplier_management',
                                title: '供应方列表',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-c-scale-to-original',
                        index: '/supplier_settlement',
                        title: '财务管理',
                        subs: [

                            {
                                index: 'supplier_settlement',
                                title: '供应商结算'
                            },
                            {
                                index: 'businessbill',
                                title: '平台结算'
                            },
                            // {
                            //     index: 'pay_order',
                            //     title: '货款订单'
                            // },
                            // {
                            //     index: 'refund_order',
                            //     title: '退款订单'
                            // }

                        ]
                    },
                    {
                        icon: 'el-icon-user-solid',
                        index: '/account_management',
                        title: '系统管理',
                        subs: [

                            {
                                index: 'account_management',
                                title: '账号管理'
                            }

                        ]
                    },
                    {
                        icon: 'el-icon-s-check',
                        index: 'bu_account_details',
                        title: 'BU账号',
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
