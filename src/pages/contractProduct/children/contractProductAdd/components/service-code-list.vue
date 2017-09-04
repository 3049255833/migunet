<template>
    <div class="sms-list">
        <div class="table-wrap">
            <table class="table-module">
                <thead>
                <tr v-show="serviceCodeList.length > 0">
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
                    <tr v-for="(item,index) in serviceCodeList" @click="choseServiceCode(item,index)" >
                        <td>
                            <label class="radio-module radio-single">
                                <input type="radio"
                                       :value="index"
                                       v-model="serviceCodeRadio" name="serviceCodeRadio">
                                <span></span>
                            </label>
                        </td>

                        <td><div class="limit-text-length service-code"
                                 :title="item.serviceCode">{{item.serviceCode}}</div></td>

                        <td><div class="limit-text-length name"
                                 :title="item.serviceName">{{item.serviceName}}</div></td>

                        <td><div class="limit-text-length des"
                                 :title="item.serviceDesc">{{item.serviceDesc}}</div></td>

                        <td>{{item.sharingType}}</td>
                        <td>{{item.feeAmount}}</td>
                        <td>{{item.isManager}}</td>

                        <td><div class="limit-text-length company-code"
                                 :title="item.companyCode">{{item.companyCode}}</div></td>
                    </tr>
                </tbody>
            </table>

            <div v-if="serviceCodeList.length <= 0" class="no-asset-box">
                <v-nolist :text="'暂无数据'"></v-nolist>
            </div>
        </div>
        <div class="btn-group btn-group-center">
            <div v-if="ifHasData" class="btn btn-primary btn-middle-100" @click="saveData">确定</div>
            <div v-else class="btn unable btn-primary btn-middle-100" >确定</div>
            <div class="btn btn-default btn-middle-100" @click="cancel()">取消</div>
        </div>
        <div class="paging-wrap">
            <v-paging :type="'simple'"></v-paging>
        </div>
    </div>
</template>
<script type="es6">
    import VPaging from '@/components/paging'
    import VNolist from '@/components/no-list'
    export default{
        name: 'serviceCodeModal',
        props:{modalName: String},
        data(){
            return {
                serviceCodeList: [{
                    serviceCode: '10000',
                    serviceName: '呵呵一笑a',
                    serviceDesc: '业务代码描述1',
                    sharingType: '分成类型1',
                    feeAmount: '100',
                    isManager: '是',
                    companyCode: '10000'
                }, {
                    serviceCode: '10000',
                    serviceName: '呵呵一笑a',
                    serviceDesc: '业务代码描述1',
                    sharingType: '分成类型1',
                    feeAmount: '100',
                    isManager: '是',
                    companyCode: '10000'
                }],
                // serviceCodeList:[],
                serviceCode:'',  //业务代码
                feeAmount:'', //资费金额
                serviceCodeData:{
                    price:'',
                    serviceCode:'',
                    companyCode:'',
                    ifHasData:false
                },
                serviceCodeRadio:[],
                ifHasData:false
            }
        },
        components: {
            VPaging,
            VNolist
        },
        methods: {
            getServiceCodeList(){
                this.$http.get(this.api.getServiceCodeList, {params: {}}).then(response => {
                    let res = response.body;
                    if (res.result.resultCode == '00000000') {
                        //todo:
                        res.data.forEach(function(item,index){
                                if(item.sharingType==1){
                                    console.log('是')
                                    item.sharingType='分成'
                                }else{
                                    console.log('否')
                                    item.sharingType='买断'
                                }

                                if(item.isManager==1){
                                    item.isManager='专用'
                                }else{
                                    item.isManager='否'
                                }


                        })

                        this.serviceCodeList = res.data;
                    } else {

                    }

                })
            },

            /**
             * cancel
             * */
            cancel(){
                this.$modal.hide(this.modalName)
            },

            /**
             * 选择业务代码
             * 一旦点下去vm其实已经保存了数据
             * 假如分页后也要保存数据的话，有必要在点击时就保存
             * */
            choseServiceCode(item,index){
                this.serviceCodeData.price=item.feeAmount;
                this.serviceCodeData.companyCode=item.companyCode;
                this.serviceCodeData.serviceCode=item.serviceCode;
                this.serviceCodeData.ifHasData=true;
                this.serviceCodeRadio=index.toString();
                this.ifHasData=true;
            },

            /**
             * 保存数据
             * */
            saveData(){
                this.bus.$emit('serviceCodeBus',this.serviceCodeData);
                this.$modal.hide(this.modalName);
            }
        },
        mounted(){
            this.getServiceCodeList();
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

            .service-code,
            .company-code,
            .des,
            .name {
                max-width: 100px;
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
    .no-asset-box{
        margin-top: 85px;
    }
</style>
