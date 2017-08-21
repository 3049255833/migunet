<template>
    <div class="single-product">
        <div class="table-wrapper">
            <v-search hideBtn="true" title="单品管理"></v-search>
            <single-product-table></single-product-table>
            <v-paging></v-paging>
        </div>
    </div>
</template>
<script>
   
    import Mock from 'mockjs'
    import SingleProductTable from '@/pages/singleProduct/components/single-product-table.vue'
    import VSearch from '@/components/search'
    import VPaging from '@/components/paging'


    export default {
        name: 'Home',
        components: {
            SingleProductTable,
            VSearch,
            VPaging
        }

    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    
    .main-wrapper {
        background: #f4f4f4;
    }
    
    .nav-wrapper {
        float: left;
    }
    
    .table-wrapper {
    }
    
    .main-wrapper:after {
        content: '';
        display: block;
        clear: both;
    }
    
    .date-wrapper {
        
    }
    .single-product{
        background-color: white;
        padding-bottom: 50px;
    }
    input{
        
    }
</style>
