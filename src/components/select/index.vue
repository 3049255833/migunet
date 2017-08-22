<template>
    <div class="s-wrapper" >
        <div class="s-select" @click.stop="showSelect">{{selected}}</div>

        <div class="option-mask" v-bind:class="{opMask:optionWhatStatus}">

            <div class="option-item" @click.stop="selectItem(option)" v-for="option in options">{{option}}</div>

        </div>

    </div>
</template>

<script>
    export default {
        name: 'Select',
        props: ['text', 'w', 'h', 'bg', 'color', 'options','selectType'],
        data ()
        {
            return {
                style: {
                    width: this.w,
                    height: this.h,
                    background: this.bg,
                    lineHeight: this.height,
                    color: this.color,
                    optionData: this.optionData
                },
                isShow:false,
                // options:['上线报备中','上线报备失败','变更报备中'],
                selected:'11',

            }
        }
        ,
        computed:{
            optionWhatStatus(){
                return this.isShow;
            },
        }
        ,
        methods:{
            showSelect(){
                this.isShow=!this.isShow;
                if(this.selectType=='1'){
                    // this.$store.dispatch('shiftState');
                }
                if(this.selectType=='2'){
                    // this.$store.dispatch('changePageOption');
                }

            },
            hideSelect(){
                this.isShow=false;
            },
            selectItem(option){
                this.selected=option;
                this.isShow=false;
                if(this.selectType=='1'){
                    // this.$store.dispatch('setOptionState',false);
                    // this.$store.dispatch('changeWhichStatus',option);
                }
                if(this.selectType=='2'){
                    // this.$store.dispatch('setOptionState',false);
                    // this.$store.dispatch('changePageSize',option);
                }
            },

            documentHideOption(){
                let that=this;
                document.addEventListener('click',function(){
                    that.isShow=false;
                });
            }

        },
        mounted(){
            this.documentHideOption();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/scss">

    @import url("../../less/common.less");

    #select1 {
        width: 200px;
        height: 30px;
        background: #ffffff;
        padding-left: 5px;
        border-radius: 0;
        border: 1px solid #dedede;
        background: url('../../assets/arrow-down.png') no-repeat 95% 11px;
    }

    .s-select {
        width: 100px;
        height: 32px;
        background: #ffffff;
        font-size: 12px;
        color: #0c0a0b;
        box-sizing: border-box;
        border: solid 1px #d6e1e5;
        border-radius: 3px;
        line-height: 28px;
        background: url('../../assets/arrow-down.png') no-repeat 88% 12px;
        cursor: pointer;
        padding-left: 10px;
    }

    .option-mask {
        width: 100px;
        box-sizing: border-box;
        position: relative;
        border: solid 1px #d6e1e5;
        margin-top: 6px;
        border-radius: 3px;
        display: none;
        z-index: 88;
        background: #ffffff;

        &:before {
            position: absolute;
            left: 89%;
            top: -10px;
            content: "";
            border: 5px solid rgba(0, 0, 0, 0);
            border-bottom-color: #d6e1e5;
        }

        &:after {
             position: absolute;
             left: 89%;
             top: -9px;
             content: "";
             border: 5px solid rgba(0, 0, 0, 0);
             border-bottom-color: #fff;
        }
    }

    .option-item {
        text-align: center;
        font-size: 12px;
        color: #0c0a0b;
        line-height: 34px;
        cursor: pointer;

        &:hover {
            color: #ffffff;
            background: @color;
        }
    }

    .opMask{
        display: block;
    }
</style>
