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
            <div class="strategy-type-content">
                <h3><span class="required">*</span>批假策略类型</h3>
                <div class="type-list">
                    <article class="item">
                        <div class="item-add-del-group">
                            <div>
                                <i class="icon icon-add-blue"></i>
                            </div>
                            <div>
                                <i class="icon icon-del-blue"></i>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="row-left"><span class="required"></span>是否免费：</div>
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
                            <div class="row-left"><span class="required"></span>资费计划：</div>
                            <div class="row-right">
                                <textarea placeholder="请选择" readonly></textarea>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="row-left"><span class="required"></span>条件选择：</div>
                            <div class="row-right">
                                <div class="select-group-item">
                                    <div class="inline-dom mr-10">
                                        <v-select-box w="60" selectTitle="并且" selectType="1"
                                                      v-bind:options="['并且','或者']"></v-select-box>
                                    </div>
                                    <div class="inline-dom">
                                        <v-select-box w="200" selectTitle="内容类型" selectType="1"
                                                      v-bind:options="['上线报备中','上线报备失败','变更报备中']"></v-select-box>
                                    </div>
                                    <span class="row-text">等于</span>
                                    <div class="inline-dom">
                                        <v-select-box w="200" selectTitle="请选择" selectType="1"
                                                      v-bind:options="['上线报备中','上线报备失败','变更报备中']"></v-select-box>
                                    </div>
                                    <div class="inline-dom">
                                        <i class="icon icon-add-blue"></i>
                                        <i class="icon icon-del-blue"></i>
                                    </div>
                                </div>
                                <div class="select-group-item">
                                    <div class="inline-dom mr-10">
                                        <v-select-box w="60" selectTitle="并且" selectType="1"
                                                      v-bind:options="['并且','或者']"></v-select-box>
                                    </div>
                                    <div class="inline-dom">
                                        <v-select-box w="200" selectTitle="内容类型" selectType="1"
                                                      v-bind:options="['上线报备中','上线报备失败','变更报备中']"></v-select-box>
                                    </div>
                                    <span class="row-text">等于</span>
                                    <div class="inline-dom">
                                        <v-select-box w="200" selectTitle="请选择" selectType="1"
                                                      v-bind:options="['上线报备中','上线报备失败','变更报备中']"></v-select-box>
                                    </div>
                                    <div class="inline-dom">
                                        <i class="icon icon-add-blue"></i>
                                        <i class="icon icon-del-blue"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article class="item">
                        <div class="form-row">
                            <div class="row-left"><span class="required"></span>是否免费：</div>
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
                            <div class="row-left"><span class="required"></span>资费计划：</div>
                            <div class="row-right">
                                <textarea placeholder="请选择" readonly></textarea>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="row-left"><span class="required"></span>条件选择：</div>
                            <div class="row-right">
                                <div class="select-group-item">
                                    <div class="inline-dom mr-10">
                                        <v-select-box w="60" selectTitle="并且" selectType="1"
                                                      v-bind:options="['并且','或者']"></v-select-box>
                                    </div>
                                    <div class="inline-dom">
                                        <v-select-box w="200" selectTitle="内容类型" selectType="1"
                                                      v-bind:options="['上线报备中','上线报备失败','变更报备中']"></v-select-box>
                                    </div>
                                    <span class="row-text">等于</span>
                                    <div class="inline-dom">
                                        <v-select-box w="200" selectTitle="请选择" selectType="1"
                                                      v-bind:options="['上线报备中','上线报备失败','变更报备中']"></v-select-box>
                                    </div>
                                    <div class="inline-dom">
                                        <i class="icon icon-add-blue"></i>
                                        <i class="icon icon-del-blue"></i>
                                    </div>
                                </div>
                                <div class="select-group-item">
                                    <div class="inline-dom mr-10">
                                        <v-select-box w="60" selectTitle="并且" selectType="1"
                                                      v-bind:options="['并且','或者']"></v-select-box>
                                    </div>
                                    <div class="inline-dom">
                                        <v-select-box w="200" selectTitle="内容类型" selectType="1"
                                                      v-bind:options="['上线报备中','上线报备失败','变更报备中']"></v-select-box>
                                    </div>
                                    <span class="row-text">等于</span>
                                    <div class="inline-dom">
                                        <v-select-box w="200" selectTitle="请选择" selectType="1"
                                                      v-bind:options="['上线报备中','上线报备失败','变更报备中']"></v-select-box>
                                    </div>
                                    <div class="inline-dom">
                                        <i class="icon icon-add-blue"></i>
                                        <i class="icon icon-del-blue"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <div class="btn-group">
                        <div class="btn btn-primary btn-middle" @click="nextStep" >下一步</div>
                        <div class="btn btn-default btn-middle" >取消</div>
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
        components:{
            VSelectBox
        },
        methods:{
            nextStep(){
                this.bus.$emit('curStep', 3);
                this.$router.push({ 'name': 'Step3' });
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
    
    .add-step-2 {
        font-size: 14px;
        color: #333333;
        box-sizing: border-box;
        
        .step-layout {
            padding: 40px 87px 40px 70px;
            
        }
        
        .product-txt {
            height: 54px;
            line-height: 54px;
            padding-left: 18px;
            border: 1px dotted #d6e1e5;
            margin-bottom: 25px;
            p {
                font-size: 14px;
                color: #6d7684;
                span {
                    &.middle {
                        padding: 0 37px;
                    }
                }
            }
        }
        
        .strategy-type-content {
            h3 {
                margin-bottom: 8px;
                color: #333;
                font-size: 14px;
            }
            .type-list {
                .item {
                    position: relative;
                    height: auto;
                    padding: 29px 61px;
                    border: 1px solid #d6e1e5;
                    border-top: 4px solid #46BAFE;
                    border-radius: 6px;
                    font-size: 12px;
                    margin-bottom: 20px;
                }
                .select-group-item{
                    margin-bottom: 25px;
                    &:last-child{
                        margin-bottom: 0;
                    }
                }
                .item-add-del-group{
                    position: absolute;
                    bottom: 2px;
                    right: -40px;
                    &>div{
                        width: 38px;
                        height: 38px;
                        border: 1px solid #D6E1E5;
                        border-left: none;
                        background-color: #F2F8FF;
                        text-align: center;
                        line-height: 38px;
                        &:nth-child(2){
                            margin-top: 10px;
                        }
                    }
                }
                span{
                    &.row-text{
                        padding: 0 20px;
                    }
                }
                textarea {
                    width: 465px;
                    height: 74px;
                    padding: 9px;
                    cursor: pointer;
                }
                input {
                    
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
            &-add-blue{
                margin: 0 10px;
            }
        }
        
        .btn-group {
            margin: 100px 0 50px;
            padding-left: 160px;
        }
    }
</style>