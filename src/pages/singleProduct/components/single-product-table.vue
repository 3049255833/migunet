<template>
    <div class="table-wrap">
        <table class="table-module">
            <thead>
            <tr>
                <td class="td-pl-68">产品名称</td>
                <td>产品ID</td>
                <td>CP／TP ID</td>
                <td>资费(分)</td>
                <td>业务状态</td>
                <td>审批状态</td>
                <td>操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(product,index) in productList">
                <td>{{product.productName}}</td>
                <td>{{product.productCode}}</td>
                <td>{{product.cpCode}}</td>
                <td>{{product.contentPrice}}</td>
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

        <div v-if="productList.length <= 0" class="no-asset-box">
           <v-nolist :text="'ceshi'"></v-nolist>
        </div>
    </div>
</template>
<script>
    import VSearch from '@/components/search'
    import VPaging from '@/components/paging'
<<<<<<< HEAD
    // zqy
    import VNolist from '@/components/no-list'

    import axios from 'axios'
=======
>>>>>>> 09da590e0407b903f42ef35b767e7a782c498cde


    export default {
        name: 'ContractProductTable',
        props:{
            productList: Array,
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
    }

    .no-asset-box {
        text-align: center;
        margin-top: 85px;
    }
</style>
