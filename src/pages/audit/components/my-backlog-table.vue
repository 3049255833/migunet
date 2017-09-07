<template>
    <div class="table-wrap">
        <table class="table-module">
            <thead>
            <tr>
                <td class="pl-30" v-if="auditFlag">
                    <label class="checkbox-module checkbox-single">
                        <input type="checkbox" :value="1" v-model="ifAuditAll">
                        <span></span>
                    </label>
                    全选
                </td>
                <td>产品名称</td>
                <td>产品编码</td>
                <td>申请类型</td>
                <td>申请人</td>
                <td>申请时间</td>
                <td>状态</td>
                <td>操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(product,index) in contractAuditList">
                <td v-if="auditFlag" class="pl-30">
                    <label class="checkbox-module checkbox-single">
                        <input type="checkbox" :value="index" v-model="auditCheckbox">
                        <span></span>
                    </label>
                </td>
                <td>
                    <div class="limit-text-length name"
                         :title="product.productName">{{product.productName}}
                    </div>
                </td>
                <td>
                    <div class="limit-text-length code"
                         :title="product.productCode">{{product.productCode}}
                    </div>
                </td>
                <td>
                    <div class="limit-text-length type"
                         :title="'product.targetStatus'">{{product.targetStatus}}
                    </div>
                </td>
                <td>{{product.createUser}}</td>
                <td>{{product.createTime}}</td>
                <td>
                    <div class="limit-text-length type"
                         :title="product.auditStatus">{{product.auditStatus}}
                    </div>
                </td>
                <td>
                    <div class="operate-list">
                        <span @click="getAuditDetail(product.productCode,
                        product.targetStatusNum, product.statusId, product.id)"
                              class="pointer mr-30 cl-blue">审批</span>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <div v-if="contractAuditList.length <= 0" class="no-asset-box">
            <v-nolist :text="'暂无数据'"></v-nolist>
        </div>
    </div>
</template>
<script>
    import VSearch from '@/components/search'
    import VPaging from '@/components/paging'
    import axios from 'axios'
    // zqy
    import VNolist from '@/components/no-list'
    export default {
        name: 'ContractProductTable',
        props: {
            contractAuditList: Array,
            auditFlag: Boolean
        },
        components: {
            VSearch,
            VPaging,
            // zqy
            VNolist

        },
        data ()
        {
            return {
                auditCheckbox: [],
                ifAuditAll:[]
            }
        },

        watch:{
            //监听全选
            'ifAuditAll'(a,b){
                if(a.length>0){
                    let _length=this.contractAuditList.length;
                    for(let i=0;i<_length;i++){
                        this.auditCheckbox.push(i);
                    }
                }else{
                    this.auditCheckbox=[];
                }
            }
        },

        methods: {
            getAuditDetail(productCode, targetStatus, statusId, id){
                this.$router.push({'name': 'AuditDetail', params: {'productCode': productCode, 'targetStatus': targetStatus, 'statusId': statusId,'id': id}});

                console.log("statusId: " + statusId);
                console.log("targetStatus: " + targetStatus);
                console.log("id: " + id);
            }
        },
        mounted(){

        }

    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    .table-wrap {
        td:nth-child(1) {
            padding-left: 68px;
        }
        th:nth-child(1) {
            padding-left: 68px !important;
        }

        td {
            .name {
                max-width: 250px;
            }
            .code {
                max-width: 150px;
            }
            .cp-code {
                max-width: 150px;
            }
            .price {
                max-width: 80px;
            }
        }
    }

    .no-asset-box {
        text-align: center;
        margin-top: 85px;
    }
</style>
