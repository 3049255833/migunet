<template>
    <div class="sms-list">
        <div class="table-wrap">
            <table class="table-module">
                <thead>
                <tr>
                    <td width="15%">选择</td>
                    <td width="20%">计划编码</td>
                    <td>计划名称</td>
                    <td>计划说明</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in planCodeList" @click="">
                    <td>
                        <label class="checkbox-module checkbox-single">
                            <input type="checkbox" :value="index" v-model="planCodeCheckbox">
                            <span></span>
                        </label>
                    </td>
                    <td>{{item.planCode}}</td>
                    <td>{{item.planName}}</td>
                    <td>{{item.planExplain}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="btn-group btn-group-center">
            <div v-if="ifHasData" class="btn btn-primary btn-middle-100" @click="saveData">确定</div>
            <div v-else class="btn unable btn-primary btn-middle-100">确定</div>
            <div class="btn btn-default btn-middle-100">取消</div>
        </div>
        <div class="paging-wrap">
            <v-paging :type="'simple'"></v-paging>
        </div>
    </div>
</template>
<script>
    import VPaging from '@/components/paging'
    export default{
        name: 'planCodeListModal',
        props: {modalName: String},
        data(){
            return {
                planCodeList: [{
                    planCode: '12345678',
                    planName: '老司机计划',
                    planExplain: '三月成为老司机'
                }, {
                    planCode: '12345678',
                    planName: '老司机计划',
                    planExplain: '三月成为老司机'
                }],


                planCodeData: [],

                planCodeCheckbox: []
            }
        },
        components: {
            VPaging
        },
        methods: {
            getPlanCodeList(){
                this.$http.get(this.api.findFeePlan).then(response => {
                    let res = response.body;
                    if (res.result.resultCode == '00000000') {
                        //todo:
                        console.log(res)
                    } else {

                    }

                })
            },


            /**
             * 保存数据
             * */
            saveData(){
                let that = this;
                that.planCodeCheckbox.forEach(function (item, index) {
                    that.planCodeData.push({
                        planCode: that.planCodeList[item].planCode,
                        planName: that.planCodeList[item].planName,
                        planExplain: that.planCodeList[item].planExplain
                    })
                });
                this.bus.$emit('planCodeBus', this.planCodeData);
                this.$modal.hide(this.modalName);
            }
        },
        watch: {},
        computed: {
            ifHasData(){
                return this.planCodeCheckbox.length > 0;
            }
        },
        mounted(){
            this.getPlanCodeList();
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .sms-list {
        position: relative;
        padding: 13px 30px 31px;
        .paging-wrap {
            position: absolute;
            bottom: 32px;
            right: 20px;
        }
    }
    
    .table-wrap {
        height: 400px;
        overflow-y: scroll;
    }
    
    .table-module {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        thead {
            tr {
                width: 100%;
                height: 56px;
                line-height: 56px;
                background: #F2F8FF;
            }
            td {
                color: #6d7684;
                padding: 0 10px;
                
            }
        }
        tbody {
            tr {
                border-bottom: 1px solid #EEEEEE;
                background: white;
                &:hover {
                    background: #f7f7f7;
                }
            }
            td {
                color: #6d7684;
                padding: 18px 10px;
            }
        }
        td {
            text-align: left;
            &:nth-child(1) {
                padding-left: 20px !important;
            }
        }
        tr {
            
        }
    }
    
    .btn-group {
        text-align: center;
        margin-top: 33px;
        .btn:nth-child(1) {
            margin-right: 20px;
        }
    }
</style>