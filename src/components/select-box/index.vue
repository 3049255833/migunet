<template>
    <div class="s-wrapper">
        <div class="select-show" :class="{'active':isShow}" :style="{width:this.w+'px'}" @click.stop="showSelect">{{selected}}<i class="icon layout-center-y icon-arrow-down"></i></div>
        <div class="option-mask" :style="{width:this.w+'px'}" v-bind:class="{opMask:optionWhatStatus}">
            <div class="option-item" @click.stop="selectItem(option)" v-for="option in options">{{option}}</div>
            <!--<div class="option-item">222</div>-->
            <!--<div class="option-item">333</div>-->
        </div>
    </div>
    </select>
    <!-- <select v-model="$store.state.selected">
    <option v-for="option in $store.state.options" v-bind:value="option.value">
      {{option.text }}
    </option>
  </select> -->
</template>
<script>
    export default {
        name: 'Select',
        props: ['selectTitle','text', 'w', 'h', 'bg', 'color', 'options', 'selectType'],
        data ()
        {
            return {
                style: {
                    width: this.w + 'px',
                    height: this.h + 'px',
                    background: this.bg,
                    lineHeight: this.height,
                    color: this.color,
                    optionData: this.optionData
                },
                isShow: false,
                // options:['上线报备中','上线报备失败','变更报备中'],
                selected:this.selectTitle,
            }
        }
        ,
        computed: {
            optionWhatStatus(){
                return this.isShow;
            },
            selectStyle(){
                return {}
            }
        }
        ,
        methods: {
            showSelect(){
                this.isShow = !this.isShow;
                if (this.selectType == '1') {
                    // this.$store.dispatch('shiftState');
                }
                if (this.selectType == '2') {
                    // this.$store.dispatch('changePageOption');
                }

            },
            hideSelect(){
                this.isShow = false;
            },
            selectItem(option){
                this.selected = option;
                this.isShow = false;
                if (this.selectType == '1') {
                    // this.$store.dispatch('setOptionState',false);
                    // this.$store.dispatch('changeWhichStatus',option);
                }
                if (this.selectType == '2') {
                    // this.$store.dispatch('setOptionState',false);
                    // this.$store.dispatch('changePageSize',option);
                }


            },

            documentHideOption(){
                let that = this;
                document.addEventListener('click', function () {
                    that.isShow = false;
                });
            }

        },
        mounted(){
            this.documentHideOption();
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    #select1 {
        width: 200px;
        height: 30px;
        background: #ffffff;
        padding-left: 5px;
        border-radius: 0;
        border: 1px solid #dedede;
        background: url('../../assets/arrow-down.png') no-repeat 90% 11px;
    }
    
    .select-show {
        position: relative;
        box-sizing: border-box;
        width: 150px;
        height: 34px;
        padding-left: 10px;
        background: #ffffff;
        font-size: 12px;
        color: #333;
        border: solid 1px #d6e1e5;
        border-radius: 3px;
        line-height: 32px;
        cursor: pointer;
        .icon{
            right: 8px;
        }
        &.active{
            box-shadow: 0 0 3px 2px #EEFAFF;
        }
        transition: all .3s ease ;
    }
    
    .option-mask {
        width: 150px;
        box-sizing: border-box;
        position: absolute;
        border: solid 1px #d6e1e5;
        margin-top: 12px;
        border-radius: 3px;
        display: none;
        z-index: 88;
        background: #ffffff;
        
        &:before {
            position: absolute;
            right: 8px;
            top: -11px;
            content: "";
            border: 5px solid rgba(0, 0, 0, 0);
            border-bottom-color: #d6e1e5;
        }
        
        &:after {
            position: absolute;
            right: 8px;
            top: -10px;
            content: "";
            border: 5px solid rgba(0, 0, 0, 0);
            border-bottom-color: #fff;
        }
    }
    
    .option-item {
        text-align: left;
        font-size: 12px;
        padding-left: 10px;
        color: #0c0a0b;
        line-height: 34px;
        cursor: pointer;
        
        &:hover {
            color: #ffffff;
            background: #46bafe;
        }
    }
    
    .opMask {
        display: block;
    }
</style>
