<template>
    <nav class="sidebar">
        <div class="nav-area" v-for="(menu,index) in menus" :key="menu.title1">
            <div class="nav-title1" @click="controlState(menu)" :class="{'active':menu.isSubShow}">
                <div class="nav-title-icon">
                    <img v-show="menu.isSubShow" src="../../../images/t1.png" alt="">
                    <img v-show="!menu.isSubShow" src="../../../images/t2.png" alt="">
                </div>
                <div class="title-text">
                    {{menu.title1}}
                </div>
            </div>
            <div class="nav-row-wrapper" :class="{'active':menu.isSubShow}">
                <div class="nav-row" v-for="childMenu in menu.title2" :class="{'active':isShow}">
                    <router-link v-bind:to="childMenu.link" tag="div">
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
    import Mock from 'mockjs'
    import axios from 'axios'
    var data = Mock.mock('http://address:port/menus', {
        "menus": [{
            "isSubShow": true,
            "title1": "产品管理",
            // "title2":["合约产品管理 ","单品管理"]},
            "title2": [
                {
                    name: '合约产品管理',
                    link: '/',
                    isActive: false
                },
                {
                    name: '单品管理',
                    link: 'Product',
                    isActive: false
                },
            ]
        },
            {
                "isSubShow": false,
                "title1": "产品目录管理",
                // "title2":["合约产品管理 ","单品管理"]},
                "title2": [
                    {
                        name: '合约产品管理',
                        link: 'ContractProduct1',
                        isActive: false
                    },
                    {
                        name: '单品管理',
                        link: 'Product2',
                        isActive: false
                    },
                ]
            },
            {
                "isSubShow": false,
                "title1": "BOSS计费代码",
                // "title2":["合约产品管理 ","单品管理"]},
                "title2": [
                    {
                        name: '合约产品管理',
                        link: 'ContractProduct1',
                        isActive: false
                    },
                    {
                        name: '单品管理',
                        link: 'Product2',
                        isActive: false
                    },
                ]
            },
        ]
    })

    export default {
        name: 'nav',
        data ()
        {
            return {
                isShow: false,
                menus: [],
                titleState: true,
                ShowWrapper: true
            }
        },
        created(){
            axios.get('http://address:port/menus').then((res) => {
                // console.log(res.bodyText);
                var res = res.data;
                this.menus = res.menus;

            })
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
    
    .nav-title2 {
        display: inline-block;
        vertical-align: middle;
        
    }
    
    .nav-title2:before {
        /* content: '';
         display: block;
         clear: both;
         width: 6px;
         height: 6px;
         left: 0px;
         top: 0px;
         background: #666666;
         border-radius:50%;*/
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
        background: url('../../../images/arrow.png') no-repeat;
        position: absolute;
        right: 10px;
        top: 24px;
    }
    
    .nav-row-wrapper {
        background: #ececec;
    }
    
    /* .router-link-exact-active {*/
    
    .nav-circle {
        background: #46bafe;
    }
    
    .nav-title2 {
        color: #46bafe;
    }


</style>
