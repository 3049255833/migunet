<template>
    <div class="table-wrap">
        <table class="table-module">
            <thead>
                <tr>
                    <td class="td-pl-68">产品名称</td>
                    <td>产品ID</td>
                    <td>CP／TP ID</td>
                    <td>子产品类型</td>
                    <td>资费(分)</td>
                    <td>业务状态</td>
                    <td>审批状态</td>
                    <td>操作</td>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(cProduct, index) in contractProductList">
                    <td> {{cProduct.contractName}} </td>
                    <td> {{cProduct.contractCode}} </td>
                    <td> {{cProduct.cpCode}} </td>
                    <td> {{cProduct.childProductType}} </td>
                    <td> {{cProduct.fee}} </td>
                    <td> {{cProduct.status}} </td>
                    <td> {{cProduct.approveStatus}} </td>
                    <td>
                        <div class="operate-list">
                            <span @click="showContractProductDetail(cProduct.contractCode)" class="mr-30 pointer cl-blue">详情</span>
                            <span class="mr-30 pointer cl-blue">变更信息</span>

                            <span class="pointer mr-30 cl-blue">
                                更多
                                <i class="icon icon-arrow-down-blue"></i>
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import VSearch from '@/components/search'
    import VPaging from '@/components/paging'
    import axios from 'axios'

    export default {
        name: 'ContractProductTable',
        props:{
            contractProductList: Array,
        },
        components: {
            VSearch,
            VPaging
        },
        data ()
        {
            return {}
        },
        methods:{
            showContractProductDetail(contractCode){
                this.$router.push({'name': 'ContractProductDetail'});

                this.$router.push({'name': 'ContractProductDetail',params:{'contractCode':contractCode}});
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    .table-wrap {
        td:nth-child(1){
            padding-left: 68px!important;
        }
        th:nth-child(1){
            padding-left: 68px!important;
        }
    }
    
</style>
