<template>
    <div class="product-catalog-manage">
        <v-table-operate-head
            hideBtn="true"
            v-on:cancelDeletePCMBus="cancelDeletePCM"
            v-on:batchDeletePCMBus="batchDeletePCM"
            title="产品目录管理"></v-table-operate-head>

        <v-product-catalog-manage-table
            :productCatalogList="productCatalogList"
            :pCatalogFlag="pCatalogFlag"></v-product-catalog-manage-table>

        <v-paging></v-paging>

        <modal name="confirmDeleteModal" :width="390" :height="280" @before-close="beforeClose">
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
        data() {
            return {
                pCatalogFlag: false,
                productCatalogList: [
                    {
                        message: "默认",
                        id: '10000'
                    },
                    {
                        message: "漫画类型1",
                        id: '10001'
                    },
                    {
                        message: "漫画类型2",
                        id: '10002'
                    },
                    {
                        message: "漫画类型3",
                        id: '10003'
                    },
                    {
                        message: "漫画类型4",
                        id: '10004'
                    }
                ],
            }
        },
        methods: {
            beforeClose() {},
            cancelDeletePCM(res) {
                this.pCatalogFlag = res;
            },
            batchDeletePCM() {}
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
