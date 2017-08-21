<template>
    <div class="contract-product">
        <div class="table-wrapper">
            <v-Search title="合约产品管理"></v-Search>
            <contract-product-table></contract-product-table>
            <v-Paging></v-Paging>
        </div>
    </div>
</template>
<script>
    /*import vTable  from '../common/Table2'
     import calendar from '../common/calendar.vue'
     import vSearch from '../common/Search'
     import vPaging from '../common/Paging'*/

    import ContractProductTable from './components/contract-product-table'
    import VSearch from '@/pages/contractProduct/components/search'
    import VPaging from '@/components/paging'

    export default {
        name: 'ContractProduct',
        components: {
            ContractProductTable,
            VSearch,
            VPaging
        }

    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    
    
    .table-wrapper {
    }
    
    .main-wrapper:after {
        content: '';
        display: block;
        clear: both;
    }
    
   
    .contract-product{
        background-color: white;
        padding-bottom: 50px;
    }
</style>
