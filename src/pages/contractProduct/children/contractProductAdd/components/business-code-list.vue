<template>
    <div class="sms-list">
        <div class="table-wrap">
            <table class="table-module">
                <thead>
                <tr>
                    <td>选择</td>
                    <td>业务代码</td>
                    <td>业务代码名称</td>
                    <td>业务代码描述</td>
                    <td>分成类型</td>
                    <td>资费金额（分）</td>
                    <td>是否管理员专用</td>
                    <td>企业代码</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in businessCodeList" @click="choseBusinessCode(item,index)" >
                    <td>
                        <label class="radio-module radio-single">
                            <input type="radio" :value="index" v-model="businessCodeRadio" name="businessCodeRadio">
                            <span></span>
                        </label>
                    </td>
                    <td>{{item.chargeCode}}</td>
                    <td>{{item.chargeName}}</td>
                    <td>{{item.chargeDesc}}</td>
                    <td>{{item.splitType}}</td>
                    <td>{{item.feeAmount}}</td>
                    <td>{{item.isManagerMember}}</td>
                    <td>{{item.companyCode}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="btn-group btn-group-center">
            <div v-if="ifHasData" class="btn btn-primary btn-middle-100" @click="saveData">确定</div>
            <div v-else class="btn unable btn-primary btn-middle-100" >确定</div>
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
        name: 'BusinessCodeModal',
        props:{modalName: String},
        data(){
            return {
                businessCodeList: [{
                    chargeCode: 10000,
                    chargeName: '呵呵一笑',
                    chargeDesc: '业务代码描述1',
                    splitType: '分成类型1',
                    feeAmount: '100',
                    isManagerMember: '是',
                    companyCode: '10000'
                }, {
                    chargeCode: 10000,
                    chargeName: '呵呵一笑',
                    chargeDesc: '业务代码描述1',
                    splitType: '分成类型1',
                    feeAmount: '100',
                    isManagerMember: '是',
                    companyCode: '10000'
                }],
                chargeCode:'',  //业务代码
                feeAmount:'', //资费金额
                businessCodeData:{
                    feeAmount:'',
                    chargeCode:'',
                    companyCode:'',
                    ifHasData:false
                },
                businessCodeRadio:[],
                ifHasData:false
            }
        },
        components: {
            VPaging
        },
        methods: {
            getBusinessCodeList(){
                this.$http.get(this.api.getBusinessCodeList, {params: {}}).then(response => {
                    let res = response.body;
                    if (res.result.resultCode == '00000000') {
                        //todo:
                        this.businessCodeList = res.data;
                    } else {

                    }

                })
            },
            
            /**
             * 选择业务代码
             * 一旦点下去vm其实已经保存了数据
             * 假如分页后也要保存数据的话，有必要在点击时就保存
             * */
            choseBusinessCode(item,index){
                this.businessCodeData.feeAmount=item.feeAmount;
                this.businessCodeData.companyCode=item.companyCode;
                this.businessCodeData.chargeCode=item.chargeCode;
                this.businessCodeData.ifHasData=true;
                this.businessCodeRadio=index.toString();
                this.ifHasData=true;
            },
            
            /**
             * 保存数据
             * */
            saveData(){
                this.bus.$emit('businessCodeBus',this.businessCodeData);
                this.$modal.hide(this.modalName);
            }
        },
        mounted(){
            this.getBusinessCodeList();
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
            &:nth-child(1){
                padding-left:20px !important;
            }
        }
        tr{
            cursor: pointer;
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