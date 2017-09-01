<template>
    <div class="s-wrapper">
        <div class="select-show" :class="{'active':isShow,'error':error}" :style="{width:this.w+'px'}"
        >
            <span class="select-show-txt" v-if="selectText">{{selectText}}</span>
            <span class="select-show-txt default-text" v-else>{{defaultText}}</span><i class="icon layout-center-y icon-arrow-down"></i>
        </div>
        <div class="option-mask" :style="{minWidth:this.w+'px'}" :class="{opMask:optionWhatStatus}">
            <div class="option-item" @click.stop="selectItem(option)" v-for="(option,index) in options">
                {{option.fieldDesc}}
            </div>
        </div>
    </div>
    </select>
    <!-- <select v-model="$store.state.selected">
    <option v-for="option in $store.state.options" v-bind:value="option.value">
      {{option.text }}
    </option>
  </select> -->
</template>
<script type="es6">
    /**
     * 下拉框组件
     * 对内传入selectBoxName string 作为下拉框的名字，在监听数据的时候，通过name来触发
     * 对内传入selectTitle：默认的选项文案，selectValue：默认的选项的值（包括任何id或者code）
     * 对外输出selectOption 对象，可获取到文案和value
     * 需诸如 ref 子组件名
     * 通过vm.$ref.selectName.selectOption获取值
     * */

    export default {
        name: 'Select',
        props: ['selectTitle', 'selectBoxName', 'w','defaultTitle', 'options', 'error','pmListIndex'],
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
                selectText:this.selectTitle,
                defaultText: this.defaultTitle,
                selectOption: {
                    fieldDesc:this.selectTitle,
                    optionValue:this.selectValue,
                    tableName:this.tableName,
                    fieldName:this.fieldName,
                    valueType:this.valueType,
                }
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
        },
        methods: {
            showSelect(e){

            },
            hideSelect(){
                this.isShow = false;
            },
            /**
             * 将获取的选项暴露出去
             * */
            selectItem(option){
                this.selectText = option.fieldDesc;
                this.isShow = false;
                this.selectOption = option;

                this.bus.$emit('contentLimitSelectBoxBus', {
                    pmListIndex:this.pmListIndex,
                    selectOption: this.selectOption
                })
            },

            documentHideOption(){
                let that = this;
                document.addEventListener('click', function (e) {
                    if (!that.$el.contains(e.target)) {
                        that.isShow = false;
                    } else {

                        that.isShow = !that.isShow
                    }
                });

            }

        },
        watch:{
            'options'(a,b){
            },
            'selectTitle'(a,b){
                this.selectText=this.selectTitle;
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
        background: url('./arrow-down.png') no-repeat 90% 11px;
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
        padding-right: 9px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .default-text {
            color: #d6e1e5;
        }
        .icon {
            right: 8px;
        }
        &.error {
            color: #f84545;
            border: 1px solid #f84545;
            box-shadow: 0 0 3px 2px #f84545;
        }
        &.active {
            box-shadow: 0 0 4px 3px #EEFAFF;
        }
        transition: all .3s ease;
    }
    
    .option-mask {
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
        padding-right: 10px;
        
        &:hover {
            color: #ffffff;
            background: #46bafe;
        }
    }
    
    .opMask {
        display: block;
    }
</style>
