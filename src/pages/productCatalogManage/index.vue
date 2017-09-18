<template>
    <div class="product-catalog-manage">
        <v-table-operate-head hideBtn="true" title="产品目录管理"></v-table-operate-head>
        <v-product-catalog-manage-table></v-product-catalog-manage-table>
        <v-paging></v-paging>

        <modal name="confirmDeleteModal" :width="390" :height="200" @before-close="beforeClose">
            <t-modal-sub-container :title="'是否确认删除？'" :name="'confirmDeleteModal'">
                <v-confirm-delete-modal
                  :functionType="'productCatalogManage'"
                  :confirmInfo="'删除后，目录下的合约产品将移至“默认”目录，不可恢复！'">
                </v-confirm-delete-modal>
            </t-modal-sub-container>
        </modal>
    </div>
</template>

<script>
    import VProductCatalogManageTable from '@/pages/productCatalogManage/components/product-catalog-manage-table'
    import VPaging from '@/components/paging'
    import VTableOperateHead from '@/pages/productCatalogManage/components/table-operate-head'
    import VConfirmDeleteModal from '@/components/confirm-delete-modal/confirm-delete-modal'
    import TModalSubContainer from "@/components/modal-sub-container"

    export default {
        name: 'productCatalogManage',
        components: {
            VProductCatalogManageTable,
            VTableOperateHead,
            VPaging,
            TModalSubContainer,
            VConfirmDeleteModal
        },
        methods: {
            beforeClose() {}
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
