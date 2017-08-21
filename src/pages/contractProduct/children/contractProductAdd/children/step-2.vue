<template>
    <div class="add-step-2">
        <div class="step-layout">
            <div class="product-txt">
                <p>
                    <span class="left">产品ID：209000000920</span>
                    <span class="middle">|</span>
                    <span class="right">产品名称（中文）：动漫5元包</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default{

}
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
    $image-base-path: '../../../../../assets/';
    @mixin bg($URI, $w: null, $h: null, $x: top, $y: center, $repeat: no-repeat) {
        @if $w and $h {
            width: $w;
            height: $h;
        }
        background: url('#{$image-base-path}#{$URI}') $repeat $x $y;
        background-size: 100% 100%;
    }
    
    .add-step-2 {
        font-size: 14px;
        color: #333333;
        box-sizing: border-box;
        
        .step-layout {
            padding :40px 110px 40px 70px ;
    
           
        }
        
        .product-txt{
            width: 100%;
            height: 54px;
            line-height: 54px;
            padding-left: 18px;
            border: 1px dotted #d6e1e5;
            margin-bottom: 25px;
            p{
                font-size: 14px;
                color: #6d7684;
                span{
                    &.middle{
                        padding: 0 37px;
                    }
                }
            }
        }
        
        
        input {
            &[type='text'] {
                border-radius: 4px;
                color: #333333;
                &:focus {
                    box-shadow: 0 0 3px 2px #EEFAFF;
                }
                border: 1px solid #D6E1E5 !important;
            }
        }
        
        textarea {
            border-radius: 4px;
            color: #333333;
            border: 1px solid #D6E1E5 !important;
            &:focus {
                box-shadow: 0 0 3px 2px #EEFAFF;
            }
        }
        
        select {
            border-radius: 4px;
            border: 1px solid #D6E1E5 !important;
            &:focus {
                box-shadow: 0 0 3px 2px #EEFAFF;
            }
        }
        
        .icon {
            &-select {
                position: absolute;
                right: 7px;
                top: 10px;
                display: inline-block;
                vertical-align: middle;
                width: 20px;
                height: 19px;
                background: url("#{$image-base-path}def.png");
                background-size: 100%;
                cursor: pointer;
            }
            &-close-round {
                position: absolute;
                right: 10px;
                top: 8px;
                display: inline-block;
                vertical-align: middle;
                width: 16px;
                height: 16px;
                background: url("#{$image-base-path}icon-close-round.png");
                background-size: 100%;
                cursor: pointer;
            }
        }
        
        
        .btn-group{
            margin: 100px 0 50px;
        }
    }
</style>