<template>
    <div class="sms-list">
        <div class="list-modal-head">
            <div class="search-wrap" >
                <input class="form-input  w-150 radius-2 mr-6" type="text" v-model.trim="condition"
                       @keyup.enter="getPlanCodeListByCondition" placeholder="关键信息搜索">
                <div @click="getPlanCodeListByCondition" class="pointer search vt-middle">
                    <i class="icon icon-search"></i>
                </div>
            </div>
        </div>
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
                <tr v-for="(item,index) in planCodeList" >
                    <td>
                        <label class="radio-module checkbox-single" v-if="radioType">
                            <input type="radio" :value="index" v-model="planCodeRadio">
                            <span></span>
                        </label>
                        <label class="checkbox-module checkbox-single" v-else>
                            <input type="checkbox" :value="index" v-model="planCodeCheckbox">
                            <span></span>
                        </label>
                    </td>
                    <td>{{item.planCode}}</td>
                    <td>{{item.planName}}</td>
                    <td>{{item.planDesc}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="btn-group btn-group-center">
            <div v-if="ifHasData" class="btn btn-primary btn-middle-100" @click="saveData">确定</div>
            <div v-else class="btn unable btn-primary btn-middle-100">确定</div>
            <div class="btn btn-default btn-middle-100" @click="cancel()">取消</div>
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
        props: ['modalName', 'index', 'type'],
        data(){
            return {
                condition: '',
                planCodeList: [{
                    planCode: '12345678',
                    planName: '老司机计划',
                    planDesc: '三月成为老司机'
                }, {
                    planCode: '12345678',
                    planName: '老司机计划',
                    planDesc: '三月成为老司机'
                }],


                planCodeData: [],

                planCodeCheckbox: [],

                planCodeRadio: ''
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
                        this.planCodeList = res.data;
                    } else {

                    }

                })
            },

            cancel(){
                this.$modal.hide(this.modalName);
            },

            getPlanCodeListByCondition(e){
                if (e && e.target) {
                    e.target.blur();
                }

                this.$http.get(this.api.findPdFeePlanByCondition, {
                    params: {
                        condition: this.condition
                    },
                    showLoading: true
                }).then(response => {
                    let res = response.body;
                    if (res.result.resultCode == '00000000') {
                        //todo:
                        this.planCodeList = res.data;
                        this.planCodeCheckbox=[];
                    } else {

                    }

                })
            },

            /**
             * 保存数据
             * */
            saveData(){
                let that = this;
                if (this.radioType) {
                    that.planCodeData.push({
                        planCode: that.planCodeList[parseInt(this.planCodeRadio)].planCode,
                        planName: that.planCodeList[parseInt(this.planCodeRadio)].planName,
                        planDesc: that.planCodeList[parseInt(this.planCodeRadio)].planDesc
                    });
                    this.$emit('planCodeBus', {index: this.index, planCodeData: this.planCodeData});
                    this.$modal.hide(this.modalName);
                } else {
                    that.planCodeCheckbox.forEach(function (item, index) {
                        that.planCodeData.push({
                            planCode: that.planCodeList[item].planCode,
                            planName: that.planCodeList[item].planName,
                            planDesc: that.planCodeList[item].planDesc
                        })
                    });
                    this.$emit('planCodeBus', {index: this.index, planCodeData: this.planCodeData});
                    this.$modal.hide(this.modalName);
                }

            }
        },
        watch: {},
        computed: {
            ifHasData(){
                return this.planCodeCheckbox.length > 0 || this.planCodeRadio || this.planCodeRadio == '0';
            },
            radioType(){
                return this.type == 'radio'
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
    
    .list-modal-head {
        padding-bottom: 13px;
        
        .search {
            display: inline-block;
            width: 34px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            border-radius: 3px;
            background: #46BAFE;
        }
    }
    
    .table-wrap {
        height: 350px;
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