<template>
    <div class="confirm-modal-container clearfix" :class="{hide: isHideConfim}">
        <div class="text">{{confirmInfo}}?</div>

        <div class="confirm cl-blue pointer" @click="confirm">确定</div>

        <div class="cancel cl-blue pointer" @click="cancel">取消</div>
    </div>
</template>

<script type="es6">
    export default {
        name: 'ConfirmModal',
        props: {
            confirmInfo: String,
            isHideConfim: Boolean,
            index: Number,
            details: String
        },
        methods: {
            confirm() {
                if(this.details === 'contractProductDetails') {

                    this.bus.$emit('contractProductDetailsConfirmInfoBus', this.index);

                } else if(this.details === 'businessCodeAdmin') {

                    this.bus.$emit('businessCodeAdminConfirmInfoBus', this.index);

                } else if(this.details === 'auditDetails') {

                    this.bus.$emit('auditDetailsComfirmInfoBus', this.index);

                } else if(this.details === 'smsTemplate') {

                    //this.bus.$emit('smsTemplateComfirmInfoBus', this.index);

                } else {
                    //合约产品列表页
                    this.bus.$emit('sendConfirmInfo', this.index);
                }

                event.stopPropagation();
            },
            cancel() {
                if(this.details === 'contractProductDetails') {

                    this.bus.$emit('contractProductDetailsCancelInfoBus', this.index);

                } else if(this.details === 'auditDetails') {

                    this.bus.$emit('auditDetailsCancelInfoBus', this.index);
                } else {

                    this.bus.$emit('sendCancelInfo', this.index);
                }

                event.stopPropagation();
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .confirm-modal-container {
        text-align: center;
        position: absolute;
        top: -24px;
        background-color: #fff;
        padding: 10px 14px;
        border-radius: 4px;
        right: 0;
        z-index: 88;
        box-shadow: 1px 1px 10px 2px #d6e1e5;
        -webkit-box-shadow: 1px 1px 10px 2px #d6e1e5;
        -moz-box-shadow: 1px 1px 10px 2px #d6e1e5;
        color: #6d7684;

        &:before {
            position: absolute;
            right: 150px;
            top: 32px;
            content: "";
            border: 8px solid transparent;
            border-top-color: #fff;
        }

        &:after {
            position: absolute;
            right: 90px;
            top: 30px;
            content: "";
            border: 8px solid rgba(0, 0, 0, 0);
            border-bottom-color: #fff;
        }

        &.hide {
            display: none;
        }

        .text {
            margin-right: 5px;
        }

        .confirm,
        .cancel,
        .text {
            display: inline-block;
        }
    }
</style>
