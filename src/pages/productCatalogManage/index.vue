<template>
    <div class="product-catalog-manage">
        <v-table-operate-head hideBtn="true" title="产品目录管理"></v-table-operate-head>
        <v-product-catalog-manage-table></v-product-catalog-manage-table>
        <v-paging></v-paging>
    </div>
</template>
<script>
    import VProductCatalogManageTable from '@/pages/productCatalogManage/components/product-catalog-manage-table'
    import VPaging from '@/components/paging'
    import VTableOperateHead from '@/pages/productCatalogManage/components/table-operate-head'

    export default {
        name: 'productCatalogManage',
        components: {
            VProductCatalogManageTable,
            VTableOperateHead,
            VPaging
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .product-catalog-manage {
        background-color: #fff;

        .pageNum {
            margin:  0;
            padding: 25px 0;
        }
    }

</style>
