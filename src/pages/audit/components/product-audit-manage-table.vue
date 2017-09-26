<template>
    <div class="table-wrap">
        <table class="table-module">
            <thead>
            <tr>
                <td>产品名称</td>
                <td>产品ID</td>
                <td>CP／SP ID</td>
                <td>申请类型</td>
                <td>申请人</td>
                <td>申请时间</td>
                <td>状态</td>
                <td>操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(product,index) in contractAuditList">
                <td><div class="limit-text-length name"
                         :title="product.productName">{{product.productName}}</div></td>

                <td><div class="limit-text-length code"
                         :title="product.productCode">{{product.productCode}}</div></td>
                 <td><div class="limit-text-length code"
                         :title="'product.cpCode'">{{product.cpCode}}</div></td>

                <td><div class="limit-text-length type"
                         :title="'product.targetStatus'">{{product.targetStatus}}</div></td>



                <td>{{product.createUser}}</td>
                <td>{{product.createTime}}</td>

                <td><div class="limit-text-length type"
                         :title="product.auditStatus">{{product.auditStatus}}</div></td>

                <td>
                    <div class="operate-list">
                        <span v-if="product.auditStatus=='待审批'"
                              @click="auditProduct(product.productCode,
                        product.targetStatus, product.statusId, product.id)"
                              class="pointer mr-30 cl-blue">审批</span>
                        <span v-else
                              @click="getAuditDetail(product.productCode,
                        product.targetStatus, product.statusId, product.id)"
                              class="pointer mr-30 cl-blue">详情</span>
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
    import VPaging from '@/components/paging'
    import axios from 'axios'
    // zqy
    import VNolist from '@/components/no-list'
    export default {
        name: 'ProductAuditManageTable',
        props:{
            contractAuditList: Array,
        },
        components: {
            VPaging,
            // zqy
            VNolist
        },
        data ()
        {
            return {}
        },

        methods: {
            /*审批*/
            auditProduct(productCode, targetStatus, statusId, id){
                if(targetStatus == '发布') {
                    targetStatus = '0';

                } else if(targetStatus == '修改') {

                    targetStatus = '1';
                } else if(targetStatus == '定价变更') {

                    targetStatus = '2';
                } else if(targetStatus == '下线') {

                    targetStatus = '3';
                } else if(targetStatus == '恢复上线') {

                    targetStatus = '4';
                }

                this.$router.push({'name': 'ProductAuditManageDetail', params: {'productCode': productCode, 'targetStatus': targetStatus, 'statusId': statusId,'id': id}});
            },

            /*详情*/
            getAuditDetail(productCode, targetStatus, statusId, id){
                if(targetStatus == '发布') {
                    targetStatus = '0';

                } else if(targetStatus == '修改') {

                    targetStatus = '1';
                } else if(targetStatus == '定价变更') {

                    targetStatus = '2';
                } else if(targetStatus == '下线') {

                    targetStatus = '3';
                } else if(targetStatus == '恢复上线') {

                    targetStatus = '4';
                }

                this.$router.push({'name': 'ProductAuditManageDetail',params:{'productCode': productCode, 'targetStatus': targetStatus, 'statusId': statusId,'id': id}});
            }
        }

    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    .table-wrap {
        td:nth-child(1) {
            padding-left: 68px !important;
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
