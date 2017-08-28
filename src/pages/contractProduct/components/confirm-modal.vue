<template>
    <div class="confirm-modal-container">
        <div class="text">是否确定撤销，撤销后产品记录删除?</div>

        <button type="button">确认</button>

        <button type="button">取消</button>
    </div>
</template>

<script type="es6">
    import VPaging from '@/components/paging'

    export default {
        name: 'ContractProduct',
        components: {
            VPaging
        },
        data() {
            return{
                postData:{

                }
            }
        },
        created(){

            /**
             * 接收来自操作头部的信息
             * */
            this.bus.$on('cSendOperateDataBus', res => {
                this.postData.keys = res.keys;
                this.postData.onlineStatus = res.onlineStatus;
                this.postData.detailStatus = res.detailStatus;
                this.postData.productCatalog = res.productCatalog;
                this.postData.effectivetime = res.effectivetime;
                this.postData.expiretime = res.expiretime;

                console.log("postData: " + JSON.stringify(this.postData));

                this.getContractProductList();
            });
        },
        methods: {

        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

</style>
