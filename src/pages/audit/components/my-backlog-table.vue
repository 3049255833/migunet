<template>
    <div class="table-wrap">
        <table class="table-module">
            <thead>
            <tr>
                <td >产品名称</td>
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

                <td><div class="limit-text-length cp-code"
                         :title="product.cpCode">{{product.cpCode}}</div></td>

                <td><div class="limit-text-length price"
                         :title="product.contentPrice">{{product.contentPrice}}</div></td>

                <td>{{product.onlineStatus}}</td>
                <td>{{product.detailStatus}}</td>
                <td>
                    <div class="operate-list">
                        <span @click="showSingleProductDetail(product.productCode)" class="pointer mr-30 cl-blue">详情</span>
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
        props:{
            contractAuditList: Array,
        },
        components: {
            VSearch,
            VPaging,
            // zqy
            VNolist

        },
        data ()
        {
            return {}
        },

        methods: {
            showSingleProductDetail(productCode){
                this.$router.push({'name': 'SingleProductDetail',params:{'productCode':productCode}});
                /*this.$router.push({name: 'ContactList', params: {'id': cache.userInfo.data.enterpriseId}});*/
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
