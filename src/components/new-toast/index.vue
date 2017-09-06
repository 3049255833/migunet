<template>
    <div class="operate-success-container clearfix" >
        
        <div class="text">{{toastText}}！</div>
    </div>
</template>

<script type="es6">
    export default {
        name: 'OperateSuccess',
        props: {
            toastText:String,
            toast:Boolean
        },
        watch:{
          
        },
        mounted(){
            //console.log(this.operateType + "," + this.operateType);
            let that=this;
            if(this.toast){
                setTimeout(function(){
                    that.$root.toast=false;
                },2000)
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .operate-success-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        background-color: #fff;
        padding: 12px 50px 10px;
        border-radius: 4px;
        font-size: 14px;
        box-shadow: 1px 1px 10px 2px #d6e1e5;
        -webkit-box-shadow: 1px 1px 10px 2px #d6e1e5;
        -moz-box-shadow: 1px 1px 10px 2px #d6e1e5;
        color: #6d7684;
        
        &.hide {
            display: none;
        }
        
        img, .text {
            float: left;
        }
        
        .text {
            margin-left: 8px;
        }
    }
</style>
