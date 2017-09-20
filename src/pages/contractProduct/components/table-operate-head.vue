<template>
    <div>
        <div class="l-content-head">
            <div class="vue-left">
                <div class="l-title">
                    {{title}}
                </div>
                <button class="ml-24 btn btn-add-module-blue" @click="addContractProduct"
                        :class="{addBtn:hideBtn}">新增产品
                </button>
            </div>
            <div class="vue-right">
                <div class="l-space input-wrapper input-wrapper1">
                    <input type="text"
                           placeholder="关键信息搜索"
                           onfocus="this.placeholder=''"
                           onblur="this.placeholder='关键信息搜索'"
                           v-model="operateData.keys"
                           @keyup.enter="cSendOperateData"/>

                    <div class="search-icon" @click="cSendOperateData"></div>
                </div>
                <div class="l-space l-content-right">
                    <v-select-box
                            selectType="1"
                            :selectBoxName="'cStatusSelectBox'"
                            :w="70"
                            :selectTitle="'全部'"
                            :selectValue="'1'"
                            v-on:selectBoxBus="getOnlineStatus"
                            v-bind:options="statusOperateList">
                    </v-select-box>
                </div>
                <div class="l-space l-content-right">
                    <v-select-box
                            selectType="1"
                            :w="90"
                            :selectTitle="'全部'"
                            selectValue="''"
                            :selectBoxName="'contractApproveStatusSelectBox'"
                            v-on:selectBoxBus="getApproveStatus"
                            v-bind:options="approveStatusOperateList">
                    </v-select-box>
                </div>
                <div class="l-space l-content-right" style="display: none">
                    <v-select-box
                            selectType="1"
                            :w="130"
                            :defaultTitle="'产品目录'"
                            :selectBoxName="'contractProductCatalogSelectBox'"
                            :selectValue="''"
                            v-on:selectBoxBus="getProductCatalog"
                            v-bind:options="distOperateList">
                    </v-select-box>
                </div>
                <div class="date-container mr-10">
                    <v-date
                            defaultText="生效时间"
                            :dateName="'effectiveTime'"
                            v-on:dateBus="getTime"
                            startTime="true">
                    </v-date>
                </div>

                <div class="date-container">
                    <v-date
                            defaultText="失效时间"
                            startTime="false"
                            :dateName="'expireTime'"
                            v-on:dateBus="getTime">
                    </v-date>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import VDate from '@/components/new-date'
    import VSelectBox from '@/components/new-select-box'

    export default {
        name: 'hello',
        props: ['hideBtn', 'title'],
        components: {
            VDate,
            VSelectBox
        },
        data () {
            return {
                selected: {
                    selectedItem1: '待报备',
                    selectedItem2: '1'
                },
                isShow: false,
                keyWord: '',
                operateData: {
                    keys: '',                  //关键字
                    onlineStatus: '',         //产品状态
                    detailStatus: '',
                    productCatalog: '1',         //产品目录
                    effectiveTime: '',         //生效时间
                    expireTime: ''             //失效时间
                },
                statusOperateList: [
                    {
                        optionText: '全部',
                        optionValue: ''
                    },
                    {
                        optionText: '草稿',
                        optionValue: '0'
                    },
                    {
                        optionText: '上线',
                        optionValue: '1'
                    },
                    {
                        optionText: '下线',
                        optionValue: '3'
                    },
                    {
                        optionText: '隐藏',
                        optionValue: '2'
                    },
                    {
                        optionText: '注销',
                        optionValue: '4'
                    }
                ],
                approveStatusOperateList: [
                    {
                        optionText: '全部',
                        optionValue: ''
                    },
                    {
                        optionText: '上线审批中',
                        optionValue: '1'
                    },
                    {
                        optionText: '上线审批失败',
                        optionValue: '2'
                    },
                    {
                      optionText: '新增报备中',
                      optionValue: '3'
                    },
                    {
                      optionText: '新增报备失败',
                      optionValue: '4'
                    },
                    {
                        optionText: '变更审批中',
                        optionValue: '5'
                    },
                    {
                        optionText: '变更审批失败',
                        optionValue: '6'
                    },
                    {
                        optionText: '变更报备中',
                        optionValue: '7'
                    },
                    {
                        optionText: '变更报备失败',
                        optionValue: '8'
                    }/*,
                    {
                        optionText: '下线报备中',
                        optionValue: ''
                    },
                    {
                        optionText: '下线报备失败',
                        optionValue: ''
                    }*/
                ],
                distOperateList: [
                    {
                        optionText: '全部',
                        optionValue: ''
                    },
                    {
                        optionText: '目录1',
                        optionValue: ''
                    },
                    {
                        optionText: '目录2',
                        optionValue: ''
                    }

                ]
            }
        },
        methods: {
            /**
             * 触发事件，将封装的数据传给index
             * 该组件内可以调用该方法传数据
             * */
            cSendOperateData(e){
                if (e && e.target) {
                    e.target.blur();
                }

                this.$emit('cSendOperateDataBus', this.operateData);
            },

            /**
             * 新增产品
             * */
            addContractProduct(){
                this.$router.push({'name': 'Step1'});
            },

            /**
             * 获取时间
             * */
            getTime(res){
                this.operateData[res.dateName] = res.dateValue;
                this.cSendOperateData();
            },

            /**
             * 获取状态
             * */
            getOnlineStatus(res){
                this.operateData.onlineStatus = res.selectOption.optionValue;
                this.cSendOperateData();
            },

            /**
             * 获取产品目录
             * */
            getProductCatalog(res){
                this.operateData.productCatalog = res.selectOption.optionValue;
                this.cSendOperateData();
            },

            /**
             * 获取审批状态
             * */
            getApproveStatus(res){
                this.operateData.detailStatus = res.selectOption.optionValue;
                this.cSendOperateData();
            }
        },
        mounted(){

        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    .l-title {
        float: left;
        font-size: 14px;
        color: #292c31;
        line-height: 34px;
    }

    .l-content-head {
        clear: both;
        display: block;
        padding: 13px 20px;
    }

    .l-content-head:after {
        content: '';
        display: block;
        clear: both;
    }

    .l-content-head:after {
        content: '';
        display: block;
        clear: both;
    }

    .l-content-left {
        float: left;
        font-size: 14px;
        color: #666;
        width: 90px;
        height: 40px;
        line-height: 43px;
    }

    .l-content-left2 {
        width: auto;
        margin-right: 20px;
        height: 30px;
        line-height: 34px;
    }

    .StateSelect {
        height: 40px;
        background: #fcf9f9;
        border: 1px solid #e1e1e1;
        color: #999;
        font-size: 14px;
    }

    .StateSelect4 {
        width: 176px;
        height: 30px;
    }

    .l-content-right, .tb-reset {
        float: left;

    }

    .l-content-right {
        height: 32px;
    }

    .l-content-right select {
        width: 150px;
        height: 32px;
        background: #ffffff;
        padding-left: 5px;
        font-size: 12px;
        color: #0c0a0b;
    }

    .tb-reset {
        font-size: 14px;
        color: #46bafe;
        width: 74px;
        height: 32px;
        background: #fff;
        line-height: 32px;
        border: 1px solid #46bafe;
        cursor: default;
        box-sizing: border-box;
        border-radius: 5px;
    }

    /*.tb-reset:hover{

    }*/
    .tb-search {
        background: #46bafe;
        color: #ffffff;
    }

    .l-content-w {
        margin-right: 20px;
    }

    .NewTable2 td, .dialog-ctn, .l-content-button, .nl-table, .tb-reset {
        text-align: center;
    }

    .StateSelect5 {
        width: 124px;
        height: 30px;
    }

    .input-wrapper {
        float: left;
    }

    .input-wrapper input {
        width: 150px;
        height: 34px;
        padding-left: 5px;
        box-sizing: border-box;
        border: solid 1px #d6e1e5;
    }

    .input-wrapper input::-webkit-input-placeholder {
        color: #d6e1e5;
    }

    .input-wrapper1 {
        overflow: hidden;

        input {
            float: left;
            padding-right: 30px;
        }

        .search-icon {
            background: url('../../../assets/search.png') no-repeat 95% 50%;
            float: left;
            width: 15px;
            height: 15px;
            margin-left: -25px;
            margin-top: 10px;
            cursor: pointer;
        }
    }

    .l-space {
        margin-right: 10px;
    }

    .date-wrapper {
        float: left;
        margin-right: 10px;
    }

    .btn-add {
        float: left;
        width: 80px;
        height: 32px;
        padding-left: 6px;
        margin-left: 30px;
        line-height: 32px;
        background-color: #46BAFE;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        .icon-add-white {
            margin-right: 6px;
            background-size: 100% 100%;
        }
    }

    .vue-left {
        float: left;
    }

    .vue-right {
        float: right;
    }

    .date-container {
        position: relative;
        float: left;
        & + .date-container {
        }
    }

    .addBtn {
        display: none;
    }

    input {
        border-radius: 4px;
        &:focus {
            box-shadow: 0 0 3px 2px #EEFAFF;
        }
    }
</style>

