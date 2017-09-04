<template>
    <nav class="sidebar">
        <div class="nav-area" v-for="(menu,index) in menus" :key="menu.title1">
            <div v-if="menu.haveChildrens" class="nav-title1" @click="controlState(menu)" :class="{'active':menu.isSubShow}">
                <div class="nav-title-icon">
                    <img v-show="menu.isSubShow" src="../../assets/t1.png" alt="">
                    <img v-show="!menu.isSubShow" src="../../assets/t2.png" alt="">
                </div>

                <div class="title-text">
                    {{menu.title}}
                </div>
            </div>
            <div v-else class="nav-title1">
                <router-link v-bind:to="menu.url" tag="a">
                    <div class="nav-title-icon">
                        <img v-show="menu.isSubShow" src="../../assets/t1.png" alt="">
                        <img v-show="!menu.isSubShow" src="../../assets/t2.png" alt="">
                    </div>

                    <div class="title-text">
                        {{menu.title}}
                    </div>
                </router-link>
            </div>

            <div class="nav-row-wrapper" :class="{'active':menu.isSubShow}">
                <div class="nav-row" v-for="childMenu in menu.childrens" :class="{'active':isShow}">
                    <router-link v-bind:to="childMenu.link" tag="a">
                        <span class="nav-circle"></span>

                        <div class="nav-title2" :class="{active:childMenu.isActive}">
                            {{childMenu.name}}
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'sideBar',
        data () {
            return {
                isShow: true,
                menus: [{
                    "isSubShow": true,
                    "title": "产品管理",
                    "haveChildrens": true,
                    "childrens": [
                        {
                            name: '合约产品管理',
                            link: '/contract_product',
                            isActive: false
                        },
                        {
                            name: '单品管理',
                            link: '/single_product',
                            isActive: false
                        },
                    ]
                },
                    /*{
                        "isSubShow": false,
                        "title": "产品目录表",
                        "haveChildrens": false,
                        "url": "/product_catalog_manage"
                    },*/
                    {
                        "isSubShow": false,
                        "title": "业务代码配置",
                        "haveChildrens": false,
                        "url": "/business_code_config"
                    },
                    {
                        "isSubShow": false,
                        "title": "我的待办",
                        "haveChildrens": false,
                        "url": "/audit/my_backlog"
                    },
                    {
                        "isSubShow": false,
                        "title": "产品审批管理",
                        "haveChildrens": false,
                        "url": "/audit/product_audit_manage"
                    }
                ],
                titleState: true,
                ShowWrapper: true
            }
        },
        methods: {
            showNav: function () {
                this.isShow = 'none';
            },
            controlState: function (menu) {
                return menu.isSubShow = !menu.isSubShow;
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/scss">
    nav {
        position: absolute;
        top: 0;
        left: 0;
        width: 170px;
        height: 700px;
        background: #e5e6e8;
    }

    .nav-row {
        font-size: 14px;
        color: #333333;
        line-height: 38px;
        position: relative;
        cursor: pointer;
        text-align: left;
        padding-left: 30px;
    }

    .nav-area {
        border-bottom: solid 1px #dcdcdc;
    }

    .nav-title1 {
        font-size: 14px;
        position: relative;
        height: 46px;
        background: #e5e6e8;
        padding-left: 20px;
        cursor: pointer;
    }

    .nav-title1.active {
        background: #46bafe;
    }

    .nav-title1.active {
        color: #ffffff;
    }

    .nav-row-wrapper {
        display: none;
    }

    .nav-row-wrapper.active {
        display: block;
    }

    .router-link-active {
        .nav-title2 {
            color: #46bafe;
        }

        .nav-circle {
            background: #46bafe;
        }

        .title-text {
            color: #46bafe;
        }
    }

    .nav-title2 {
        display: inline-block;
        vertical-align: middle;
    }

    .nav-title-icon {
        float: left;
        margin-top: 12px;
        margin-right: 12px;
    }

    .title-text {
        float: left;
        line-height: 46px;
    }

    .nav-title1:after {
        content: '';
        display: block;
        clear: both;
    }

    .nav-circle {
        display: inline-block;
        width: 4px;
        height: 4px;
        background: #666666;
        margin-right: 5px;
        vertical-align: middle;
    }

    .nav-title1.active:after {
        margin-top: -7px;
        width: 12px;
        height: 8px;
        background: url('../../assets/arrow.png') no-repeat;
        position: absolute;
        right: 10px;
        top: 24px;
    }

    .nav-row-wrapper {
        background: #ececec;
    }




</style>
