<template>
    <div class="add-step-3">
        <div class="form-wrap ">
            <div class="form-row">
                <div class="row-left">
                    <span class="required">*</span>
                    是否体验产品：
                </div>
                <div class="row-right">
                    <div class="radio-wrapper">
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
                    <input type="text" placeholder="请输入">
                    <div class="inline-dom">
                        <v-select-box w="110" selectTitle="并且" selectType="1"
                                      v-bind:options="['并且','或者']"></v-select-box>
                    </div>
                </div>
            </div>
           
        </div>
    </div>
</template>
<script>
    import VSelectBox from '@/components/select-box';
    export default{
        data(){
            return {
                formData: {
                    free: 1
                }
            }
        },
        components: {
            VSelectBox
        },
        methods: {
            nextStep(){
                this.bus.$emit('curStep', 3);
                this.$router.push({'name': 'Step3'});
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            },
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
        
        .btn-group {
            margin: 100px 0 50px;
            padding-left: 160px;
        }
    }
</style>