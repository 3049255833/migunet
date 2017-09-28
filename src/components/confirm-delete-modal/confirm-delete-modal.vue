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
                }else if(this.functionType === 'contractProductListConfirmInfo') {

                    this.bus.$emit('contractProductListConfirmInfoBus');
                } else if(this.functionType === 'contractProductDetailsConfirmInfo') {

                    this.bus.$emit('contractProductDetailsConfirmModalBus');
                } else if(this.functionType === 'batchDeleteSmsTemplateConfirmInfo') {

                    this.bus.$emit('batchDeleteSmsTemplateConfirmBus');
                } else if(this.functionType === 'myBackLogOneKeyPassComfirmInfo') {

                    this.bus.$emit('myBackLogOneKeyPassComfirmInfoBus');
                } else if(this.functionType === 'auditDetailsPassConfirmInfo') {

                    this.bus.$emit('auditDetailsPassConfirmInfoBus');
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
                } else if(this.functionType === 'contractProductListConfirmInfo') {

                    this.$modal.hide('contractProductListConfirmModal');
                } else if(this.functionType === 'contractProductDetailsConfirmInfo') {

                    this.$modal.hide('contractProductDetailsConfirmModal');
                } else if(this.functionType === 'batchDeleteSmsTemplateConfirmInfo') {

                    this.$modal.hide('confirmBatchDeleteSmsTModal');
                } else if(this.functionType === 'myBackLogOneKeyPassComfirmInfo') {

                    this.$modal.hide('myBackLogComfirmModal');
                } else if(this.functionType === 'auditDetailsPassConfirmInfo') {

                    this.$modal.hide('auditDetailsConfirmModal');
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
