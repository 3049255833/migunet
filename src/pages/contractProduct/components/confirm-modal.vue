<template>
    <div class="confirm-modal-container clearfix" :class="{'hide': isHideConfim}">
        <div class="text">是否确定{{operateType}}，{{operateType}}后产品记录删除?</div>

        <div class="confirm cl-blue pointer" @click="confirm">确认</div>

        <div class="cancel cl-blue pointer" @click="cancel">取消</div>
    </div>
</template>

<script type="es6">
    export default {
        name: 'ConfirmModal',
        props: {
            operateType: String,
            isHideConfim: Boolean,
            index: Number
        },
        mounted(){
            //console.log(this.operateType + "," + this.operateType);
        },
        created(){},
        methods: {
            confirm() {

                this.bus.$emit('sendConfirmInfo', this.index);
            },
            cancel() {
                //this.$modal.hide(this.ConfirmModal);

                this.bus.$emit('sendCancelInfo', this.index);
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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

        .confirm {

        }

        .cancel {

        }
    }
</style>
