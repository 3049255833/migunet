<template>
    <div class="table-operate-head">
        <div class="l-content-head">
            <div class="vue-left">
                <div class="l-title">
                    {{title}}
                </div>
            </div>
            <div class="vue-right">
                <div class="l-space input-wrapper input-wrapper1">
                    <input type="text" class="form-input"
                           placeholder="关键信息搜索"
                           onfocus="this.placeholder=''"
                           onblur="this.placeholder='关键信息搜索'"
                           v-model="operateData.searchKey"
                           @keyup.enter="sendOperateData"/>

                    <div class="search-icon" @click="sendOperateData"></div>
                </div>
                <div class="l-space l-content-right">
                    <v-select-box
                            :selectBoxName="'onlineStatus'"
                            :w="70"
                            :selectTitle="'全部'"
                            :selectValue="''"
                            v-on:selectBoxBus="getSelectBoxValue"
                            v-bind:options="onlineStatusOperateList">
                    </v-select-box>
                </div>
                <div class="l-space l-content-right">
                    <v-select-box
                            selectType="1"
                            :w="90"
                            :selectTitle="'全部'"
                            selectValue=""
                            :selectBoxName="'detailStatus'"
                            v-on:selectBoxBus="getSelectBoxValue"
                            v-bind:options="detailStatusOperateList">
                    </v-select-box>
                </div>
                <div class="date-container mr-10">
                    <v-date defaultText="生效时间"
                            :dateName="'effectiveTime'"
                            v-on:dateBus="getTime"
                            startTime="true"></v-date>
                </div>
                <div class="date-container">
                    <v-date defaultText="失效时间"
                            :dateName="'expireTime'"
                            v-on:dateBus="getTime"
                            startTime="true"></v-date>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /**
     * 该组件主要提供searchKey,onlineStatus,detailStatus,effectiveTime,expireTime
     *
     * */
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
                operateData: {
                    searchKey: '',                  //关键字
                    onlineStatus: '',                //产品状态
                    detailStatus: '',         //审批状态
                    effectiveTime: '',         //生效时间
                    expireTime: ''             //失效时间
                },
                isShow: false,
                keyWord: '',
                detailStatusOperateList: [
                    {
                      optionText: '全部',
                      optionValue: ''
                    },
                    /*{
                      optionText: '上线审批中',
                      optionValue: '0'
                    },
                    {
                      optionText: '上线审批失败',
                      optionValue: '1'
                    },
                    {
                      optionText: '隐藏审批中',
                      optionValue: '2'
                    },
                    {
                      optionText: '隐藏审批失败',
                      optionValue: '3'
                    },
                    {
                      optionText: '下线审批中',
                      optionValue: '4'
                    },
                    {
                      optionText: '下线审批失败',
                      optionValue: '5'
                    },
                    {
                      optionText: '注销审批中',
                      optionValue: '6'
                    },
                    {
                      optionText: '注销审批失败',
                      optionValue: '7'
                    },
                    {
                      optionText: '删除审批中',
                      optionValue: '8'
                    },
                    {
                      optionText: '删除审批失败',
                      optionValue: '9'
                    },
                    {
                      optionText: '变更审批中',
                      optionValue: '10'
                    },
                    {
                      optionText: '变更审批失败',
                      optionValue: '11'
                    },*/

                    /*{
                      optionText: '下线报备中',
                      optionValue: '14'
                    },
                    {
                      optionText: '下线报备失败',
                      optionValue: '15'
                    },
                    {
                      optionText: '隐藏报备中',
                      optionValue: '16'
                    },
                    {
                      optionText: '隐藏报备失败',
                      optionValue: '17'
                    },*/
                    {
                      optionText: '新增报备中',
                      optionValue: '18'
                    },
                    {
                      optionText: '新增报备失败',
                      optionValue: '19'
                    },
                    {
                      optionText: '变更报备中',
                      optionValue: '12'
                    },
                    {
                      optionText: '变更报备失败',
                      optionValue: '13'
                    }
                ],
                onlineStatusOperateList: [
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
                        optionText: '隐藏',
                        optionValue: '2'
                    },
                    {
                        optionText: '下线',
                        optionValue: '3'
                    },
                    {
                        optionText: '注销',
                        optionValue: '4'
                    }/*,
                    {
                        optionText: '删除',
                        optionValue: '5'
                    },*/

                ]
            }
        },
        methods: {
            /**
             * 触发事件，将封装的数据传给index
             * 该组件内可以调用该方法传数据
             * */
            sendOperateData(e){
                if (e && e.target) {
                    e.target.blur();
                }

                this.$emit('sendSingleOperateDataBus', this.operateData);
            },

            /**
             * 获取下拉框的东西
             * */
            getSelectBoxValue(res){
                this.operateData[res.selectBoxName] = res.selectOption.optionValue;
                this.sendOperateData();
            },

            /**
             * 获取时间
             * */
            getTime(res){
                this.operateData[res.dateName] = res.dateValue;

                this.sendOperateData();
            },


            /**
             * 点击获取状态
             * */
            getOnlineStatus(str){
                this.getSelectOption(str, this).then((res) => {
                    this.operateData.onlineStatus = res.selectOption.optionValue;
                    this.sendOperateData();
                });
            },
            /**
             * 点击获取审批状态
             * */


            /**
             * 新增产品
             * */
            addContractProduct(){
                location.hash = '/contract_product_add'
            }
        },
        mounted(){
            /**
             * promise
             * 获取下拉框的值
             * */
           /* this.$on('selectBoxBus', res => {
                if (res.selectBoxName == 'onlineStatusSelectBox') {

                }
                if (res.selectBoxName == 'detailStatusSelectBox') {
                    this.operateData.detailStatus = res.selectOption.optionValue;
                    this.sendOperateData();
                }
            });*/



            this.bus.$on('singleExpireTimeBus', res => {
                this.operateData.expireTime = res.dateValue;
                this.sendOperateData();
            });
        }
    }
</script>
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
        height: 34px;
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
