<template>
    <div class="add-step-3">
        <div class="form-wrap ">
            <div class="form-row">
                <div class="row-left">
                    <span class="required">*</span>
                    是否体验产品：
                </div>
                <div class="row-right">
                    <div class="radio-wrap">
                        <label class="radio-module w-70">
                            <input value="1" v-model="formData.free" name="free" type="radio">
                            <span></span>
                            <span class="txt">是</span>
                        </label>
                        <label class="radio-module w-70">
                            <input value="2" v-model="formData.free" name="free" type="radio">
                            <span></span>
                            <span class="txt">否</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="row-left">
                    <span class="required">*</span>
                    体验产品周期：
                </div>
                <div class="row-right">
                    <input class="form-input mr-10" type="text" placeholder="请输入">
                    <div class="layout-inline-middle">
                        <div class="inline-dom">
                            <v-select-box w="110" selectTitle="并且" selectType="1"
                                          v-bind:options="['并且','或者']"></v-select-box>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="row-left">
                    <span class="required">*</span>
                    限制发送提示短信省份：
                </div>
                <div class="row-right">
                    <input class="form-input pointer" @click="showAreaChoseModal" v-model="formData.businessArea" type="text" readonly
                           placeholder="请选择"/>
                    <i class="icon icon-select"></i>
                </div>
            </div>
        </div>
    
        <modal name="AreaChoseModal" :width="800" :height="440" @before-close="beforeClose">
            <t-modal-sub-container :title="'选择业务归属地'" :name="'AreaChoseModal'">
                <area-chose :modal-name="'AreaChoseModal'"></area-chose>
            </t-modal-sub-container>
        </modal>
    </div>
</template>
<script>
    import VSelectBox from '@/components/select-box';
    import TModalSubContainer from "@/components/modal-sub-container";
    import AreaChose from '@/pages/contractProduct/components/area-chose.vue'
    export default{
        data(){
            return {
                formData: {
                    free: 1,
                    businessArea:''
                }
            }
        },
        components: {
            VSelectBox,
            AreaChose,
            TModalSubContainer,
        },
        methods: {
            nextStep(){
                this.bus.$emit('curStep', 3);
                this.$router.push({'name': 'Step3'});
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            },
            /**
             * 显示地方
             * */
            showAreaChoseModal(){
                this.$modal.show('AreaChoseModal');
            },
            beforeClose(){
                
            }
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
    
    .add-step-3 {
        font-size: 14px;
        color: #333333;
        box-sizing: border-box;
        
        .form-wrap {
            padding: 40px 80px;
            .row-left {
                width: 220px;
            }
            .row-right {
                
            }
        }
        
        
        
        .btn-group {
            margin: 100px 0 50px;
            padding-left: 160px;
        }
    }
</style>