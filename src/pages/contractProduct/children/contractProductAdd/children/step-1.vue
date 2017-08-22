<template>
    <div class="add-step-1">
        <div class="input-area">
            <div class="input-row">
                <span class="input-text"> <span class="required">*</span> 产品名称（中文）：</span>
                <span class="row-wrapper">
              <input type="text" placeholder="请输入"/>
            </span>
            </div>
            <div class="input-row">
                <span class="input-text">  产品描述（中文）：</span>
                <span class="row-wrapper row-wrapper-ta">
              <textarea placeholder="请输入"></textarea>
            </span>
            </div>
            <div class="input-row">
                <span class="input-text"> <span class="required">*</span>搜索关键字：</span>
                <span class="row-wrapper row-wrapper-ta">
              <textarea placeholder="请输入"></textarea>
            </span>
            </div>
            <div class="input-row">
                <span class="input-text"> <span class="required">*</span>生效时间：</span>
                <span class="row-wrapper">
              <pick-date></pick-date>
            </span>
            </div>
            <div class="input-row">
                <span class="input-text"> <span class="required">*</span>失效时间：</span>
                <span class="row-wrapper">
              <pick-date></pick-date>
            </span>
            </div>
            <div class="input-row">
                <span class="input-text"> <span class="required">*</span>业务归属地：</span>
                <div class="row-wrapper row-wrapper-new">
                    <input @click="showBusinessAreaModal" v-model="formData.businessArea" type="text" readonly
                           placeholder="请输入"/>
                    <i class="icon icon-select"></i>
                </div>
            </div>
            <div class="input-row">
                <span class="input-text"> <span class="required">*</span> 渠道ID：</span>
                <span class="row-wrapper">
              <input type="text" v-model="formData.channelId" placeholder="请输入"/>
                    <i class="icon icon-close-round" @click="remove('channelId')"></i>
            </span>
            </div>
            <div class="input-row">
                <span class="input-text"> <span class="required">*</span> 产品目录：</span>
                <div class="row-wrapper row-wrapper-new">
                    <v-select-box w="200" selectTitle="产品目录" selectType="1"
                                  v-bind:options="['上线报备中','上线报备失败','变更报备中']"></v-select-box>
                </div>
            </div>
            <div class="input-row">
                <span class="input-text"> <span class="required">*</span> 是否会员产品：</span>
                <div class="radio-wrap">
                    <label class="radio-module">
                        <input value="1" v-model="formData.vipProduct" name="vipProduct" type="radio">
                        <span></span>
                        <span class="txt">会员</span>
                    </label>
                    <label class="radio-module">
                        <input value="2" v-model="formData.vipProduct" name="vipProduct" type="radio">
                        <span></span>
                        <span class="txt">非会员</span>
                    </label>
                </div>
            </div>
            <div class="input-row">
                <span class="input-text"> <span class="required">*</span> 是否重复订购：</span>
                <div class="radio-wrap">
                    <label class="radio-module">
                        <input value="1" v-model="formData.repeatBuy" name="repeatBuy" type="radio">
                        <span></span>
                        <span class="txt">是</span>
                    </label>
                    <label class="radio-module">
                        <input value="2" v-model="formData.repeatBuy" name="repeatBuy" type="radio">
                        <span></span>
                        <span class="txt">否</span>
                    </label>
                </div>
            </div>
            <div class="input-row">
                <span class="input-text"> <span class="required">*</span> 产品周期：</span>
                <div class="row-wrapper row-wrapper-new">
                    <v-select-box selectType="1" w="200" selectTitle="有效周期"
                                  v-bind:options="['上线报备中','上线报备失败','变更报备中']"></v-select-box>
                </div>
            </div>
            <div class="input-row">
                <span class="input-text"></span>
                <div class="row-wrapper row-wrapper-w">
                    <div class="inline-dom mr-10">
                        <v-select-box selectType="1" w='80' selectTitle="默认1"
                                      v-bind:options="['上线报备中','上线报备失败','变更报备中']"></v-select-box>
                    </div>
                    <div class="inline-dom">
                        <v-select-box selectType="1" w="110" selectTitle="默认月"
                                      v-bind:options="['上线报备中','上线报备失败','变更报备中']"></v-select-box>
                    </div>
                </div>
            </div>
            <div class="input-row">
                <span class="input-text"> <span class="required">*</span> 是否使用业务代码：</span>
                <div class="radio-wrap">
                    <label class="radio-module">
                        <input value="1" v-model="formData.useCode" name="useCode" type="radio">
                        <span></span>
                        <span class="txt">是</span>
                    </label>
                    <label class="radio-module">
                        <input value="2" v-model="formData.useCode" name="useCode" type="radio">
                        <span></span>
                        <span class="txt">否</span>
                    </label>
                </div>
            </div>
            <div class="input-row">
                <span class="input-text"> <span class="required">*</span> 业务代码选择：</span>
                <div class="row-wrapper row-wrapper-new">
                    <v-select-box selectType="1" w="200" selectTitle="业务代码选择"
                                  v-bind:options="['上线报备中','上线报备失败','变更报备中']"></v-select-box>
                </div>
            </div>
            <div class="input-row btn-group">
                <span class="input-text">&nbsp;</span>
                <span class="row-wrapper row-wrapper-no">
              <span class="tb-reset l-content-w tb-search" @click="nextStep">下一步</span>
              <span class="tb-reset l-content-w">取消</span>
            </span>
            </div>
        </div>
        <modal name="businessArea" :width="800" :height="440" @before-close="beforeClose">
            <t-modal-sub-container :title="'选择业务归属地'" :name="'businessArea'">
                <area-chose :modal-name="'businessArea'"></area-chose>
            </t-modal-sub-container>
        </modal>
    </div>
</template>
<script>
    import PickDate from '@/components/PickDate/PickDate'
    import TModalSubContainer from "@/components/modal-sub-container";
    import AreaChose from '@/pages/contractProduct/components/area-chose.vue'
    import VSelectBox from '@/components/select-box'

    export default{
        data(){
            return {
                formData: {
                    channelId: '',
                    businessArea: '',
                    vipProduct: '1',
                    repeatBuy: '1',
                    useCode:'1'
                }
            }
        },
        name: 'AddStep1',
        components: {
            PickDate,
            TModalSubContainer,
            AreaChose,
            VSelectBox
        },
        methods: {
            /**
             * 当变量canHideModal为false时，无法关闭弹框
             * */
            beforeClose (event) {
                //todo:
            },
            
            /**
             * 跳到下一步
             * */
            nextStep(){
                this.bus.$emit('curStep', 2);
                this.$router.push({ 'name': 'Step2' });
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            },

            /**
             * 显示业务归属地弹框
             * */
            showBusinessAreaModal(){
                this.$modal.show('businessArea');
            },

            /**
             * 清空单项表单
             * */
            remove(item){
                /*this.formData[item]='';
                 console.log(item)*/
                this.formData[item] = '';

            }
        },
        mounted () {

            this.bus.$on('getBusinessArea', res => {

                if (res) {
                    this.formData.businessArea = res;
                }

            });
        }
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
    
    .tb-reset {
        display: inline-block;
        font-size: 14px;
        color: #46bafe;
        width: 74px;
        height: 32px;
        background: #fff;
        line-height: 32px;
        border: 1px solid #46bafe;
        box-sizing: border-box;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
    }
    
    /*.tb-reset:hover{
      
    }*/
    .l-content-w {
        margin-right: 20px;
    }
    
    .tb-search {
        background: #46bafe;
        color: #ffffff;
    }
    
    .table-wrapper {
        /*float: left;*/
        /*margin-left: 20px;*/
        /*width: 1050px;*/
        background: #ffffff;
        padding-bottom: 30px;
    }
    
    /*.main-wrapper:after{
      content: '';
      display: block;
      clear: both;
    }*/
    .main-wrapper:before,
    .main-wrapper:after {
        content: " ";
        display: table;
    }
    
    .main-wrapper:after {
        clear: both;
    }
    
    .date-wrapper {
        
    }
    
    .bread-link:hover {
        color: #46bafe;
        cursor: pointer;
    }
    
    .input-row {
        position: relative;
    }
    
    .input-row + .input-row {
        margin-top: 18px;
    }
    
    .row-wrapper {
        position: relative;
        display: inline-block;
        width: 200px;
        background: #ffffff;
        &.row-wrapper-w{
            width: auto;
        }
    }
    
    .row-wrapper-ta {
        width: 340px;
        height: 80px;
    }
    
    .row-wrapper textarea {
        width: 340px;
        height: 80px;
        box-sizing: border-box;
    }
    
    .row-wrapper input[type='text'] {
        width: 200px;
        height: 32px;
        padding-left: 5px;
        box-sizing: border-box;
        border: solid 1px #d6e1e5;
    }
    
    .input-text {
        width: 165px;
        display: inline-block;
        line-height: 32px;
        margin-right: 20px;
        text-align: left;
        vertical-align: top;
        padding-left: 40px;
    }
    
    .required {
        color: #C0262C;
    }
    
    #city-select {
        background: #ffffff;
        width: 200px;
        height: 32px;
        padding-left: 5px;
        box-sizing: border-box;
        border: solid 1px #d6e1e5;
        background: url("#{$image-base-path}def.png") no-repeat 97% 7px;
        border-radius: 0;
    }
    
    .row-wrapper-no {
        background: transparent;
        margin-top: 10px;
    }
    
    .add-title {
        font-size: 14px;
        color: #292c31;
        font-weight: bold;
        line-height: 50px;
        padding-left: 20px;
    }
    
    .add-main {
        background: #f4f4f4;
    }
    
    .input-area {
        margin-top: 30px;
        padding-left: 40px;
    }
    
    .add-step-1 {
        font-size: 14px;
        color: #333333;
        .inline-dom{
            display: inline-block;
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