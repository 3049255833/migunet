<template>
    <div class="add-success-modal">
        <div class="content">
            <img src="../../../../../assets/success.png">
            <p>产品新增成功</p>
            <p>您可以去产品中心查看产品信息</p>
        </div>
        <div class="btn-group btn-group-center">
            <div  class="btn btn-primary btn-middle-100" @click="confirm">确定</div>
            <div class="btn btn-default btn-middle-100" @click="next">继续新增</div>
        </div>
    </div>
</template>

<script>
export default{
    props:['modalName'],
    name:'AddSuccessModal',
    methods:{
        confirm(){
            this.$modal.hide(this.modalName);
        },
        next(){
            //因为不刷新页面，得清楚数据
            this.$parent.step1PostData={};
            this.$parent.step2PostData={};
            this.$parent.step3PostData={};
            this.$parent.step3PostData={};
            this.$parent.step3Flag=false;
            this.$parent.step1Flag=false;
            this.$parent.step2Flag=false;
            this.$modal.hide(this.modalName);
            location.hash='/contract_product/contract_product_add/step1';
        }
    }
}
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
    .add-success-modal{
        text-align: center;
        padding-top: 20px;
        img{
            width: 48px;
            height: 48px;
            display: inline-block;
        }
        p{
            &:nth-of-type(1){
                font-size: 16px;
                color: #333333;
                padding-top:23px;
            }
            &:nth-of-type(2){
                font-size: 12px;
                color: #666;
                padding: 9px 0 40px;
            }
        }
    }
</style>