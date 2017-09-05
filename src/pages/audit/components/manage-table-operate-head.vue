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
                    <input type="text" class="form-input" placeholder="关键信息搜索"
                           v-model="operateData.searchKey"
                           @keyup.enter="sendOperateData"/>
                    
                    <div class="search-icon" @click="sendOperateData"></div>
                </div>
    
                <div class="l-space l-content-right">
                    <v-select-box
                            :w="100"
                            :selectTitle="'全部'"
                            selectValue=""
                            :selectBoxName="'onlineStatus'"
                            v-on:selectBoxBus="getSelectBoxValue"
                            v-bind:options="onlineStatusOperateList">
                    </v-select-box>
                </div>
                <div class="l-space l-content-right">
                    <v-select-box
                            :w="100"
                            :selectTitle="'全部'"
                            selectValue=""
                            :selectBoxName="'auditStatus'"
                            v-on:selectBoxBus="getSelectBoxValue"
                            v-bind:options="auditStatusOperateList">
                    </v-select-box>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="es6">
    /**
     * 该组件主要提供searchKey,onlineStatus,auditStatus,effectiveTime,expireTime
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
                    auditStatus: ''                 //审批状态
                },
                isShow: false,
                keyWord: '',
                onlineStatusOperateList: [
                    {
                        optionText: '全部',
                        optionValue: ''
                    },
                    {
                        optionText: '发布',
                        optionValue: '0'
                    },
                    {
                        optionText: '修改',
                        optionValue: '1'
                    },
                    {
                        optionText: '定价变更',
                        optionValue: '2'
                    },
                    {
                        optionText: '下线',
                        optionValue: '3'
                    },
                    {
                        optionText: '恢复上线',
                        optionValue: '4'
                    }
                ],
                auditStatusOperateList: [
                    {
                        optionText: '全部',
                        optionValue: ''
                    },
                    {
                        optionText: '待审批',
                        optionValue: '-1'
                    },
                    {
                        optionText: '通过',
                        optionValue: '1'
                    },
                    {
                        optionText: '拒绝',
                        optionValue: '0'
                    }
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
                this.$emit('sendAuditDataBus', this.operateData);
            },

            /**
             * 获取下拉框的东西
             * */
            getSelectBoxValue(res){
                this.operateData[res.selectBoxName] = res.selectOption.optionValue;
                this.sendOperateData();
            },


         
        },
        mounted(){}
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
