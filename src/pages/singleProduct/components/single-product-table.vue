<template>
    <div class="table-wrap">
        <table class="table-module">
            <thead>
                <tr>
                    <td class="td-pl-68">产品名称</td>
                    <td>产品ID</td>
                    <td>CP／SP ID</td>
                    <td>货币类型</td>
                    <td>资费(分)</td>
                    <td>产品状态</td>
                    <td>审批状态</td>
                    <td>操作</td>
                </tr>
            </thead>
            <tbody>
            <tr v-for="(product,index) in productList">
                <td><div class="limit-text-length name"
                         :title="product.productName">{{product.productName}}</div></td>

                <td><div class="limit-text-length code"
                         :title="product.productUniCode">{{product.productUniCode}}</div></td>

                <td><div class="limit-text-length cp-code"
                         :title="product.cpCode">{{product.cpCode}}</div></td>

                <td><div class="limit-text-length cp-code"
                         :title="product.currencyDesc">{{product.currencyDesc}}</div></td>

                <td><div class="limit-text-length price"
                         :title="product.productPrice">{{product.productPrice}}</div></td>

                <td>{{product.onlineStatus}}</td>
                <td>{{product.detailStatus}}</td>
                <td>
                    <div class="operate-list">
                        <span @click="showSingleProductDetail(product.productUniCode)" class="pointer mr-30 cl-blue">详情</span>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>

        <div v-if="productList.length <= 0" class="no-asset-box">
           <v-nolist :text="'暂无数据'"></v-nolist>
        </div>
    </div>
</template>
<script>
    import VPaging from '@/components/paging'
    import VNolist from '@/components/no-list'
    export default {
        name: 'ContractProductTable',
        props:{
            productList: Array,
        },
        components: {
            VPaging,
            VNolist

        },
        data ()
        {
            return {}
        },

        methods: {
            showSingleProductDetail(productUniCode){
                this.$router.push({'name': 'SingleProductDetail',params:{'productUniCode':productUniCode}});
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
