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
                           v-model="operateData.keys"
                           @keyup.enter="sendOperateData"/>
                </div>
                <div class="l-space l-content-right">
                    <v-select-box
                          :selectBoxName="'statusSelectBox'"
                          :w="70"
                          :selectTitle="'全部'"
                          :selectValue="'1'"
                          v-bind:options="statusOperateList">
                    </v-select-box>
                </div>
                <div class="l-space l-content-right">
                    <v-select-box
                          selectType="1"
                          :w="90"
                          :selectTitle="'全部'"
                          selectValue="''"
                          :selectBoxName="'approveStatusSelectBox'"
                          v-bind:options="approveStatusOperateList">
                    </v-select-box>
                </div>
                <div class="date-container mr-10">

                    <v-date :dateName="'effectivetime'" defaultText="生效时间" startTime="true"></v-date>
                </div>
                <div class="date-container">
                    <v-date :dateName="'expiretime'" defaultText="失效时间" startTime="false"></v-date>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
    /**
     * 该组件主要提供keys,status,approveStatus,effectivetime,expiretime
     *
     * */
    import VDate from '@/components/date'
    import VSelectBox from '@/components/select-box'

    export default {
        name: 'hello',
        props: ['hideBtn', 'title'],
        components: {
            VDate,
            VSelectBox
        },
        data () {
            return {
                operateData:{
                    keys:'',                  //关键字
                    status:'1',                //产品状态
                    approveStatus:'1',         //审批状态
                    effectivetime:'',         //生效时间
                    expiretime:''             //失效时间
                },
                isShow: false,
                keyWord: '',
                approveStatusOperateList: [
                    {
                        optionText: '全部',
                        optionValue: '1'
                    },
                    {
                        optionText: '上线审批中',
                        optionValue: ''
                    },
                    {
                        optionText: '上线审批失败',
                        optionValue: ''
                    },
                    {
                        optionText: '变更审批中',
                        optionValue: ''
                    },
                    {
                        optionText: '变更审批失败',
                        optionValue: ''
                    },
                    {
                        optionText: '变更报备中',
                        optionValue: ''
                    },
                    {
                        optionText: '变更报备失败',
                        optionValue: ''
                    },
                    {
                        optionText: '下线报备报备中',
                        optionValue: ''
                    },
                    {
                        optionText: '下线报备失败',
                        optionValue: ''
                    }
                ],
                statusOperateList: [
                    {
                        optionText: '全部',
                        optionValue: '1'
                    },
                    {
                        optionText: '草稿',
                        optionValue: ''
                    },
                    {
                        optionText: '上线',
                        optionValue: ''
                    },
                    {
                        optionText: '下线',
                        optionValue: ''
                    },
                    {
                        optionText: '隐藏',
                        optionValue: ''
                    },
                    {
                        optionText: '注销',
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
            sendOperateData(e){
                if (e.target){
                    e.target.blur();
                }
                this.bus.$emit('sendOperateDataBus',this.operateData);
            },

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
            this.getSelectOption('statusSelectBox',this).then((res)=>{
                this.operateData.status=res.selectOption.optionValue;
                this.sendOperateData();
            });
            this.getSelectOption('approveStatusSelectBox',this).then((res)=>{
                this.operateData.approveStatus=res.selectOption.optionValue;
                this.sendOperateData();
            });
            /**
             * promise
             * 获取日历的值
             * */
            this.getDate('effectivetime',this).then((res)=>{
                this.operateData.effectivetime=res.dateValue;
                this.sendOperateData();
            });
            this.getDate('expiretime',this).then((res)=>{
                this.operateData.expiretime=res.dateValue;
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

    .input-wrapper1 input {
        background: url('../../../assets/search.png') no-repeat 95% 50%;
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
        & + .date-container { }
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
