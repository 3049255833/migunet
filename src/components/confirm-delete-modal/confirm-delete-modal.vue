<template>
    <div class="confirm-delete-modal-container clearfix" :class="{hide: hideModal}">
        <div class="text">{{confirmInfo}}?</div>

        <div class="btn-group btn-group-center">
            <div class="btn btn-primary btn-middle-100" @click="confirm">确定</div>

            <div class="btn btn-default btn-middle-100" @click="cancel">取消</div>
        </div>
    </div>
</template>

<script type="es6">
    export default {
        name: 'ConfirmDeleteModal',
        props: {
            confirmInfo: String,
            hideModal: Boolean,
            index: Number,
            functionType: String
        },
        methods: {
            confirm() {
                if(this.functionType === 'productCatalogManage') {

                    this.bus.$emit('productCatalogManageConfirmBus');

                } else if(this.functionType === 'batchDeleteSmsTemplate') {

                    this.bus.$emit('batchDeleteSmsTemplateComfirmBus');

                } else if(this.functionType === 'singleDeleteSmsTemplate') {

                    this.bus.$emit('singleDeleteSmsTemplateConfirmBus');
                }else if(this.functionType === 'contractProductListConfirmModal') {

                    this.bus.$emit('contractProductListConfirmModalBus');
                } else if(this.functionType === 'contractProductDetailsConfirmModal') {

                    this.bus.$emit('contractProductDetailsConfirmModalBus');
                }

                event.stopPropagation();
            },
            cancel() {
                if(this.functionType === 'productCatalogManage') {

                    this.$modal.hide('confirmDeleteModal');

                } else if(this.functionType === 'batchDeleteSmsTemplate') {

                    this.$modal.hide('confirmBatchDeleteSmsTModal');

                } else if(this.functionType === 'singleDeleteSmsTemplate') {

                    this.$modal.hide('confirmSingleDeleteSmsTModal');
                } else if(this.functionType === 'contractProductListConfirmModal') {

                    this.$modal.hide('contractProductListConfirmModal');
                } else if(this.functionType === 'contractProductDetailsConfirmModal') {

                    this.$modal.hide('contractProductDetailsConfirmModal');
                }

                event.stopPropagation();
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .confirm-delete-modal-container {
        color: #6d7684;

        &.hide {
            display: none;
        }

        .text {
            padding: 20px 30px;
        }

        .btn-group-center {
            margin-top: 25px;
        }
    }
</style>
