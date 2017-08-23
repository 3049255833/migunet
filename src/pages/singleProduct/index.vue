<template>
    <div class="single-product">
        <div class="table-wrapper">
            <v-table-operate-head hideBtn="true" title="单品管理"></v-table-operate-head>
            <v-single-product-table></v-single-product-table>
            <v-paging></v-paging>
        </div>
    </div>
</template>
<script>
    
    import VSingleProductTable from '@/pages/singleProduct/components/single-product-table.vue'
    import VPaging from '@/components/paging'
    import VTableOperateHead from '@/pages/singleProduct/components/table-operate-head'
    export default {
        name: 'Home',
        components: {
            VSingleProductTable,
            VTableOperateHead,
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
