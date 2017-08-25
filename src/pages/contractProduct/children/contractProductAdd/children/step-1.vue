<template>
    <div class="add-step-1">
        <div class="form-wrap ">
            <div class="form-row">
                <div class="row-left required">产品名称（中文）：</div>
                <div class="row-right">
                    <input class=" form-input pointer w-200"
                           v-model="formData.productName" type="text"
                           placeholder="请输入"/>
                </div>
            </div>
            <div class="form-row">
                <div class="row-left">产品描述（中文）：</div>
                <div class="row-right">
                    <textarea class="textarea-module w-340" type="text" v-model="formData.productDesc"
                              placeholder="请输入"></textarea>
                </div>
            </div>
            <div class="form-row">
                <div class="row-left required">
                    搜索关键字：
                </div>
                <div class="row-right">
                    <textarea class="textarea-module w-340" type="text"
                              v-model="formData.searchKey"
                              placeholder="搜索关键字将用于用户搜索功能，请输入断句，逗号 ‘，’隔开，例：‘漫画，青少年’"></textarea>
                </div>
            </div>
            <div class="form-row">
                <div class="row-left required">
                    生效方式：
                </div>
                <div class="row-right">
                    <v-select-box :w="'200'"
                                  :selectTitle="'立即生效'"
                                  :selectValue="''"
                                  :options="selectBoxList.effectiveWayList">
                    </v-select-box>
                </div>
            </div>
            <div class="form-row">
                <div class="required row-left">
                    生效时间：
                </div>
                <div class="row-right">
                    <v-date :class="'w-200'"
                            :dateName="'effectiveTime '"
                            :defaultText="'生效时间'"></v-date>
                </div>
            </div>
            <div class="form-row">
                <div class="required row-left">
                    失效时间：
                </div>
                <div class="row-right">
                    <v-date :class="'w-200'"
                            :dateName="'expireTime '"
                            :defaultText="'失效时间'"></v-date>
                </div>
            </div>
            <div class="form-row">
                <div class="row-left required">
                    业务归属地：
                </div>
                <div class="row-right">
                    <input @click="showBusinessAreaModal "
                           class="form-input w-200 pointer"
                           v-model="formData.attributionText"
                           type="text"
                           readonly
                           placeholder="请输入"/>
                    <i class="icon icon-select"></i>
                </div>
            </div>
            <div class="form-row">
                <div class="row-left required">
                    产品目录：
                </div>
                <div class="row-right">
                    <v-select-box w="200" selectTitle="产品目录" selectType="1"
                                  v-bind:options="['上线报备中','上线报备失败','变更报备中']"></v-select-box>
                </div>
            </div>
            <div class="form-row">
                <div class="row-left required">
                    是否会员产品
                </div>
                <div class="row-right">
                    <div class="radio-wrap">
                        <label class="radio-module w-70">
                            <input value="1" v-model="formData.vipProduct" name="vipProduct" type="radio">
                            <span class="mr-3"></span>
                            <span class="txt">会员</span>
                        </label>
                        <label class="radio-module">
                            <input value="2" v-model="formData.vipProduct" name="vipProduct" type="radio">
                            <span class="mr-3"></span>
                            <span class="txt">非会员</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="row-left required">
                    是否重复订购
                </div>
                <div class="row-right">
                    <div class="radio-wrap">
                        <label class="radio-module w-70">
                            <input value="1" name="repeat" type="radio">
                            <span class="mr-3"></span>
                            <span class="txt">是</span>
                        </label>
                        <label class="radio-module">
                            <input value="2" name="repeat" type="radio">
                            <span class="mr-3"></span>
                            <span class="txt">否</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="row-left required">
                    产品周期
                </div>
                <div class="row-right">
                    <input value="1" type="text" class="mr-10 form-input w-80 vt-middle">
                    <div class="layout-inline-middle">
                        <v-select-box w="110" selectTitle="并且" selectType="1"
                                      v-bind:options="['并且','或者']"></v-select-box>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="row-left required">
                    渠道ID：
                </div>
                <div class="row-right">
                    <input type="text" class="form-input w-200" v-model="formData.channelId" placeholder="请输入"/>
                    <i class="icon icon-close-round" @click="remove('channelId')"></i>
                </div>
            </div>
            <div class="form-row">
                <div class="row-left required">
                    支付方式：
                </div>
                <div class="row-right">
                    <div class="type-area">
                        <div class="item">
                            <div class="item-head ">
                                <label class="checkbox-module">
                                    <input type="checkbox" name="payType">
                                    <span></span>
                                    <span class="txt">话费支付</span>
                                </label>
                                <i class="icon-recommend layout-center-y"></i>
                            </div>
                            <div class="form-wrap">
                                <div class="form-row pb-18">
                                    <div class="row-left w-200 required">使用业务代码：</div>
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
                                    <div class="row-left w-200 required">业务代码选择：</div>
                                    <div class="row-right">
                                        <input class="form-input w-200 pointer" type="text" readonly
                                               placeholder="业务代码选择">
                                        <i class="icon-select icon"></i>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="row-left w-200 required">资费类型</div>
                                    <div class="row-right">
                                        <p class="txt font-14">包月</p>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="row-left w-200 required">是否重复订购</div>
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
                                <div class="form-row ">
                                    <div class="row-left w-200 required">产品周期</div>
                                    <div class="row-right">
                                        <p class="txt font-14">永久有效</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="item-head ">
                                <label class="checkbox-module">
                                    <input type="checkbox" name="payType">
                                    <span></span>
                                    <span class="txt">第三方支付</span>
                                </label>
                            </div>
                            <div class="form-wrap">
                                <div class="form-row">
                                    <div class="row-left w-200 required">资费金额（分）：</div>
                                    <div class="row-right">
                                        <input type="text" class="form-input w-200" v-model="formData.channelId"
                                               placeholder="请输入"/>
                                        <i class="icon icon-close-round" @click="remove('channelId')"></i>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="row-left w-200 required">消费类型：</div>
                                    <div class="row-right">
                                        <p class="txt font-14">点播</p>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="row-left w-200 required">是否重复订购：</div>
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
                                    <div class="row-left w-200 required">是否重复订购</div>
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
                                <div class="form-row ">
                                    <div class="row-left w-200 required">产品周期：</div>
                                    <div class="row-right">
                                        <div class="block-dom pb-20">
                                            <v-select-box w="200" selectTitle="有限" selectType="1"
                                                          v-bind:options="['上线报备中','上线报备失败','变更报备中']"></v-select-box>
                                        </div>
                                        <div class="block-dom ">
                                            <input value="1" type="text" class="mr-10 form-input w-80 vt-middle">
                                            <div class="layout-inline-middle">
                                                <v-select-box w="110" selectTitle="月" selectType="1"
                                                              v-bind:options="['并且','或者']"></v-select-box>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="row-left"></div>
                    <div class="row-right">
                        <div class="btn-group">
                            <div class="btn btn-primary btn-middle" @click="nextStep">下一步</div>
                            <div class="btn btn-default btn-middle">取消</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal name="businessAreaModal" :width="800" :height="440" @before-close="beforeClose">
            <t-modal-sub-container :title="'选择业务归属地'" :name="'businessAreaModal'">
                <area-chose :modal-name="'businessAreaModal'"></area-chose>
            </t-modal-sub-container>
        </modal>
    </div>
</template>
<script>
    import TModalSubContainer from "@/components/modal-sub-container";
    import AreaChose from '@/pages/contractProduct/children/contractProductAdd/components/area-chose.vue'
    import VSelectBox from '@/components/select-box'
    import VDate from '@/components/date'

    export default{
        data(){
            return {
                formData: {
                    productName: '',       //产品名称
                    productDesc: '',       //产品描述
                    searchKey: '',         //搜索关键字
                    effectiveWay: '',      //生效方式
                    effectiveTime:'',      //生效时间
                    expireTime:'',         //失效时间
                    attributionCode:'',    //归属地编码
                    attributionText:'',    //归属地名称


                    channelId: '',
                    businessArea: '',
                    vipProduct: '1',
                    repeatBuy: '1',
                    useCode: '1'
                },
                selectBoxList: {
                    effectiveWayList: [
                        {
                            optionText: '立即生效',
                            optionValue: '1'
                        },
                        {
                            optionText: '下周生效',
                            optionValue: '2'
                        },
                        {
                            optionText: '下月生效',
                            optionValue: '3'
                        }
                    ]
                }
            }
        },
        name: 'AddStep1',
        components: {
            VDate,
            TModalSubContainer,
            AreaChose,
            VSelectBox,

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
                this.$router.push({'name': 'Step2'});
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            },

            /**
             * 显示业务归属地弹框
             * */
            showBusinessAreaModal(){
                this.$modal.show('businessAreaModal');
            },

            /**
             * 清空单项表单
             * */
            remove(item){
                this.formData[item] = '';
            }
        },
        mounted () {
            /**
             * 获取归属地，返回[{areaName:'',areaCode:''}]
             * */
            this.bus.$on('areaChoseBus', res => {
                if (res) {
                    //拼接字符窜
                    let areaNameArr=[];
                    let areaCodeArr=[];
                    res.forEach(function(item,index){
                        areaNameArr.push(item.areaName);
                        areaCodeArr.push(item.areaCode);
                    });
                    this.formData.attributionText=areaNameArr.join('|');
                    this.formData.attributionCode=areaCodeArr.join('|');
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
    
    .add-step-1 {
        font-size: 14px;
        color: #333333;
        box-sizing: border-box;
        
        .form-wrap {
            padding: 40px 110px;
            .form-row {
                padding-bottom: 20px;
            }
            .row-left {
                width: 193px;
            }
            .row-right {
                
            }
            
        }
        
        .type-area {
            width: 700px;
            border: 1px solid #D6E1E5;
            border-radius: 4px;
            .item {
                padding: 16px 19px;
                &:nth-child(1) {
                    border-bottom: 1px solid #d6e1e5;
                }
                .item-head {
                    position: relative;
                }
                .form-wrap {
                    padding: 30px 76px 0;
                    .form-row {
                        padding-bottom: 15px;
                    }
                }
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
            &-recommend {
                position: absolute;
                left: 110px;
                @include bg("icon-recommend.png", 57px, 26px);
            }
        }
        
        .btn-group {
            margin: 25px 0 50px;
        }
    }
</style>