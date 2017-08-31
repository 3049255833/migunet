<template>
    <div class="add-business-code-container">

        <div class="form-wrap">
            <div class="form-row">
                <div class="row-left required">业务代码ID：</div>

                <div class="row-right">
                    <input class="form-input pointer w-200"
                           type="text"
                           @input="$v.postData.serviceCode.$touch()"
                           :class="{'error':$v.postData.serviceCode.$error}"
                           v-model.trim="postData.serviceCode"
                           placeholder="请输入"/>

                    <span class="error-msg" v-if="$v.postData.serviceCode.$error">
                        {{errorMsg.serviceCode}}
                    </span>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">企业代码：</div>

                <div class="row-right">
                    <input class="form-input pointer w-200"
                           type="text"
                           :class="{'error':$v.postData.companyCode.$error}"
                           @input="$v.postData.companyCode.$touch()"
                           v-model.trim="postData.companyCode"
                           placeholder="请输入"/>

                    <span class="error-msg" v-if="$v.postData.companyCode.$error">
                          {{errorMsg.companyCode}}
                    </span>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">业务代码名称：</div>

                <div class="row-right">
                    <input class="form-input pointer w-200"
                           type="text"
                           :class="{'error':$v.postData.serviceName.$error}"
                           @input="$v.postData.serviceName.$touch()"
                           v-model.trim="postData.serviceName"
                           placeholder="请输入"/>

                    <span class="error-msg" v-if="$v.postData.serviceName.$error">
                        {{errorMsg.serviceName}}
                    </span>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">业务代码描述：</div>

                <div class="row-right">
                    <textarea
                        class="textarea-module w-200"
                        type="text"
                        :class="{'error':$v.postData.serviceDesc.$error}"
                        @input="$v.postData.serviceDesc.$touch()"
                        v-model.trim="postData.serviceDesc"
                        placeholder="请输入"></textarea>

                    <span class="error-msg" v-if="$v.postData.serviceDesc.$error">
                        {{errorMsg.serviceDesc}}
                    </span>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">资费金额（分）：</div>

                <div class="row-right">
                    <input class="form-input pointer w-200"
                           type="number"
                           :class="{'error':$v.postData.feeAmount.$error}"
                           @input="$v.postData.feeAmount.$touch()"
                           v-model.trim="postData.feeAmount"
                           placeholder="请输入"/>

                    <span class="error-msg" v-if="$v.postData.feeAmount.$error">
                        {{errorMsg.feeAmount}}
                    </span>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">分成类型：</div>

                <div class="row-right">
                    <v-select-box
                        w="200"
                        selectTitle="分成"
                        :selectValue="'0'"
                        :selectBoxName="'sharingTypeSelectBox'"
                        v-bind:options="selectBoxList.sharingTypeList">
                    </v-select-box>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">是否管理员专用：</div>

                <div class="row-right">
                    <v-select-box
                          w="200"
                          selectTitle="是"
                          :selectValue="'Y'"
                          :selectBoxName="'isManagerSelectBox'"
                          v-bind:options="selectBoxList.isManagerList">
                    </v-select-box>
                </div>
            </div>
        </div>

        <div class="btn-group btn-group-center">
            <div class="btn btn-primary btn-middle-100"
                 v-if="canSave"
                 @click="confirm">确定</div>

            <div class="btn btn-primary btn-middle-100 unable"
                 v-else
                 @click="confirm">确定</div>

            <div class="btn btn-default btn-middle-100">取消</div>
        </div>
    </div>
</template>

<script>
    import Bus from './bus';
    import VSelectBox from '@/components/select-box'

    import {required, numeric, between} from 'vuelidate/lib/validators';

    export default {
        name: 'AddBusinessCode',
        props: {
            modalName: String
        },
        data() {
            return {
                postData: {
                    serviceCode: '',
                    companyCode: '',
                    serviceName: '',
                    serviceDesc: '',
                    sharingType: '0',
                    feeAmount: '',
                    isManager: 'Y'
                },
                errorMsg: {
                    serviceCode: '请输入业务代码ID',
                    companyCode: '请输入企业代码',
                    serviceName: '请输入业务代码名称',
                    serviceDesc: '请输入业务代码描述',
                    feeAmount: '请输入资费金额'
                },
                selectBoxList: {
                    isManagerList: [
                        {
                            optionText: '是',
                            optionValue: 'Y'
                        },
                        {
                          optionText: '否',
                          optionValue: 'N'
                        },
                    ],
                    sharingTypeList: [
                        {
                            optionText: '分成',
                            optionValue: '0'
                        },
                        {
                            optionText: '买断',
                            optionValue: '1'
                        }
                    ]
                }
            }
        },
        validations: {
            postData: {
                serviceCode: {
                    required
                },
                companyCode: {
                    required
                },
                serviceName: {
                    required
                },
                serviceDesc: {
                    required
                },
                feeAmount: {
                    required,
                    numeric
                }
            },
            validationGroup: [
                'postData.serviceCode',
                'postData.companyCode',
                'postData.serviceName',
                'postData.serviceDesc',
                'postData.feeAmount'
            ]
        },
        components: {
            VSelectBox
        },
        methods: {
            confirm() {
                console.log("postData: " + JSON.stringify(this.postData));

                this.$http.post(this.api.addBossInfo, this.postData).then(
                    response => {
                        let res = response.body;

                        console.log("res: " + res);

                        this.$modal.hide(this.modalName);
                    }
                );
            }
        },
        mounted () {
            /**
             * 获取下拉框的值
             * */
            this.bus.$on('selectBoxBus', res => {
                if (res.selectBoxName == 'isManagerSelectBox') {

                    this.postData.isManager = res.selectOption.optionValue;
                }

                if (res.selectBoxName == 'sharingTypeSelectBox') {

                    this.postData.sharingType = res.selectOption.optionValue;
                }
            });
        },
        computed: {
            canSave(){
                var flag = true;

                if (!this.$v.validationGroup.$error && !this.$v.validationGroup.$invalid) {

                    return flag
                } else {

                    return false
                }
            }
        },
        watch: {
            /**
             * 监听资费类型
             * a=='0' 不使用业务代码，清空数据重新填
             * a=='1' 使用业务代码
             * */
            'formData.ifUseServiceCode'(a, b) {
                if (a == '1') {

                    this.formData.cycleUnit = '';
                } else {

                    this.paytype1.periodUnit = '2';
                }
            }
        }
    }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
    $image-base-path: '../../../assets/';
    @mixin bg($URI, $w: null, $h: null, $x: top, $y: center, $repeat: no-repeat) {
        @if $w and $h {
            width: $w;
            height: $h;
        }
        background: url('#{$image-base-path}#{$URI}') $repeat $x $y;
        background-size: 100% 100%;
    }

    .add-business-code-container {
        font-size: 14px;
        color: #333333;
        box-sizing: border-box;

        .form-wrap {
            padding: 30px 80px 25px;

            .form-row {
                padding-bottom: 20px;
            }
            .row-left {
                width: 162px;
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
            margin: 0 0 50px;
        }
    }
</style>
