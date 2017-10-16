<template>
    <div class="add-business-code-container">

        <div class="form-wrap">
            <div class="form-row">
                <div class="row-left required">业务代码：</div>

                <div class="row-right">
                    <input class="form-input pointer w-200"
                           type="text"
                           @input="$v.postData.serviceCode.$touch()"
                           :class="{'error':$v.postData.serviceCode.$error, 'error1':isServiceCode}"
                           v-model.trim="postData.serviceCode"
                           maxlength="32"
                           placeholder="请输入"/>

                    <span class="error-msg" v-if="$v.postData.serviceCode.$error || isServiceCode">
                        {{errorMsg.serviceCode}}
                    </span>
                </div>
                <!--<div class="row-right" v-else>
                    <input class="form-input pointer w-200"
                           type="text"
                           @input="$v.postData.serviceCode.$touch()"
                           :class="{'error':$v.postData.serviceCode.$error}"
                           v-model.trim="postData.serviceCode"
                           placeholder="请输入"/>

                    <span class="error-msg" v-if="$v.postData.serviceCode.$error">
                            {{errorMsg.serviceCode}}
                        </span>
                </div>-->
            </div>

            <div class="form-row">
                <div class="row-left required">企业代码：</div>

                <div class="row-right">
                    <input class="form-input pointer w-200"
                           type="text"
                           :class="{'error':$v.postData.companyCode.$error,'error1':isCompanyCode}"
                           @input="$v.postData.companyCode.$touch()"
                           v-model.trim="postData.companyCode"
                           maxlength="32"
                           placeholder="请输入"/>

                    <span class="error-msg" v-if="$v.postData.companyCode.$error || isCompanyCode">
                          {{errorMsg.companyCode}}
                    </span>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">业务代码名称：</div>

                <div class="row-right">
                    <input class="form-input pointer w-200"
                           type="text"
                           :class="{'error1':$v.postData.serviceName.$error,'error':isServiceName}"
                           @input="$v.postData.serviceName.$touch()"
                           v-model.trim="postData.serviceName"
                           maxlength="32"
                           placeholder="请输入"/>

                    <span class="error-msg" v-if="$v.postData.serviceName.$error">
                        {{errorMsg.serviceName}}
                    </span>

                    <span class="error-msg" v-if="isServiceName">
                        {{errorMsg.IllegalCharacter}}
                    </span>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">业务代码描述：</div>

                <div class="row-right">
                    <textarea
                        class="textarea-module w-200"
                        type="text"
                        :class="{'error1':$v.postData.serviceDesc.$error,'error':isServiceDesc}"
                        @input="$v.postData.serviceDesc.$touch()"
                        v-model.trim="postData.serviceDesc"
                        maxlength="256"
                        placeholder="请输入"></textarea>

                    <span class="error-msg" v-if="$v.postData.serviceDesc.$error">
                        {{errorMsg.serviceDesc}}
                    </span>

                    <span class="error-msg" v-if="isServiceDesc">
                        {{errorMsg.IllegalCharacter}}
                    </span>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">资费金额（分）：</div>

                <div class="row-right">
                    <input class="form-input pointer w-200"
                           type="text"
                           :class="{'error':$v.postData.feeAmount.$error,'error1': isFeeAmount}"
                           @input="$v.postData.feeAmount.$touch()"
                           v-model.trim="postData.feeAmount"
                           placeholder="请输入"/>

                    <span class="error-msg" v-if="$v.postData.feeAmount.$error || isFeeAmount">
                        {{errorMsg.feeAmount}}
                    </span>
                </div>
            </div>

            <div class="form-row business-code">
                <div class="row-left required">分成类型：</div>

                <div class="row-right">
                    <v-select-box
                        w="200"
                        :selectTitle="sharingTypeText"
                        :selectValue="'0'"
                        :selectBoxName="'sharingTypeSelectBox'"
                        v-bind:options="selectBoxList.sharingTypeList">
                    </v-select-box>
                </div>
            </div>

            <div class="form-row business-code">
                <div class="row-left required">是否管理员专用：</div>

                <div class="row-right">
                    <v-select-box
                          w="200"
                          :selectTitle="isManagerText"
                          :selectValue="'0'"
                          :selectBoxName="'isManagerSelectBox'"
                          v-bind:options="selectBoxList.isManagerList">
                    </v-select-box>
                </div>
            </div>

            <div class="form-row business-code">
                <div class="row-left required">是否需要二次确认：</div>

                <div class="row-right">
                    <v-select-box
                        w="200"
                        :selectTitle="secondConfirmText"
                        :selectValue="'0'"
                        :selectBoxName="'isSecondConfirmSelectBox'"
                        v-bind:options="selectBoxList.secondConfirmList">
                    </v-select-box>
                </div>
            </div>
        </div>

        <div class="btn-group btn-group-center">
            <div class="btn btn-primary btn-middle-100"
                 v-if="canSave&&$root.ajaxLock"
                 v-bind:class="{unable: isActive}"
                 @click="confirm">确定</div>

            <div class="btn btn-primary btn-middle-100 unable"
                 v-else>确定</div>

            <div class="btn btn-default btn-middle-100" @click="cancel">取消</div>
        </div>
    </div>
</template>

<script type="es6">
    import Bus from './bus';
    import VSelectBox from '@/components/select-box'

    import {required, between} from 'vuelidate/lib/validators';

    export default {
        name: 'AddBusinessCode',
        props: {
            modalName: String,
            passModal: Object,
            cmd: String
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
                    isManager: '1',
                    secondConfirm: '0',
                    serviceStatus: '1' //李俊益要求添加字段
                },
                errorMsg: {
                    serviceCode: '请输入业务代码ID',
                    companyCode: '请输入企业代码',
                    serviceName: '请输入业务代码名称',
                    serviceDesc: '请输入业务代码描述',
                    feeAmount: '请输入资费金额',
                    IllegalCharacter: '输入内容含有非法字符'
                },
                isServiceName: false,
                isServiceDesc: false,
                isServiceCode: false,
                isCompanyCode: false,
                isFeeAmount: false,
                selectBoxList: {
                    isManagerList: [
                        {
                            optionText: '是',
                            optionValue: '1'
                        },
                        {
                          optionText: '否',
                          optionValue: '0'
                        },
                    ],
                    secondConfirmList: [
                        {
                            optionText: '是',
                            optionValue: '1'
                        },
                        {
                            optionText: '否',
                            optionValue: '0'
                        }
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
                },
                isActive: false,
                sharingTypeText: '分成',
                isManagerText: '否',
                secondConfirmText: '否'
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
                    required
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
            cancel() {
                this.$modal.hide(this.modalName);
            },
            confirm() {
                console.log("postData: " + JSON.stringify(this.postData));

                let that = this;

                this.isActive = true;

                if(this.cmd == 'edit') {

                    this.$http.post(this.api.updateBossInfo, this.postData).then(
                        response => {
                            let res = response.body;

                            console.log("Edit res: " + JSON.stringify(res));

                            if(res.result.resultCode == '00000000') {

                                this.$root.toastText = '编辑成功';
                            } else {
                                this.$root.toastText = '编辑失败';
                            }
                            this.$root.toast = true;

                            this.$modal.hide(this.modalName);
                        }
                    );
                } else {
                    this.$http.post(this.api.addBossInfo, this.postData).then(
                        response => {
                            let res = response.body;

                            if(res.result.resultCode == '00000000') {

                                this.$root.toastText = '添加成功';

                            } else {
                                this.$root.toastText = '添加失败';
                            }

                            this.$root.toast = true;

                            this.$modal.hide(this.modalName);
                        }
                    );
                }

                setTimeout(function () {
                  that.bus.$emit('sendAddAndEditInfo');
                }, 2000);
            }
        },
        created () {
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

                if(res.selectBoxName == 'isSecondConfirmSelectBox') {

                    this.postData.secondConfirm = res.selectOption.optionValue;
                }
            });

            if(this.cmd == 'edit') {

                this.postData = this.passModal;

                if(this.postData.sharingType == '1') {
                    this.sharingTypeText = '买断';
                } else if(this.postData.sharingType == '0') {
                    this.sharingTypeText = '分成';
                }

                if(this.postData.isManager == '1') {
                    this.isManagerText = '是';
                } else if(this.postData.isManager == '0') {
                    this.isManagerText = '否';
                }

                if(this.postData.secondConfirm == '1') {
                    this.secondConfirmText = '是'
                } else if(this.postData.secondConfirm == '0') {
                    this.secondConfirmText = '否';
                }
                //console.log("passModal: " + JSON.stringify(this.postData));
            }
        },
        computed: {
            canSave(){
                if (!this.$v.validationGroup.$error &&
                    !this.$v.validationGroup.$invalid  &&
                    !this.isServiceName && !this.isServiceDesc) {

                    return true;
                } else {

                    return false;
                }
            }
        },
        watch: {
            'postData.serviceName'(a, b){
                let rule = /[`~!\#$%^+*&/?|'=()]+/g;

                if(rule.test(a)) {
                    this.isServiceName = true;
                } else {
                    this.isServiceName = false;
                }
            },
            'postData.serviceDesc'(a, b){
                let rule = /[`~!\#$%^+*&/?|'=()]+/g;

                if(rule.test(a)) {
                    this.isServiceDesc = true;
                } else {
                    this.isServiceDesc = false;
                }
            },
            'postData.serviceCode'(a, b){
                let rule = /[^0-9]/g;

                if (rule.test(a)) {

                    this.isServiceCode = true;

                    this.errorMsg.serviceCode = '请输入数字';

                } else {

                    this.isServiceCode = false;

                    this.errorMsg.serviceCode = '请输入业务代码ID';
                }
            },
            'postData.companyCode'(a, b){
                let rule = /[^0-9]/g;

                if (rule.test(a)) {

                    this.isCompanyCode = true;

                    this.errorMsg.companyCode = '请输入数字';

                } else {
                    this.isCompanyCode = false;
                    this.errorMsg.companyCode = '请输入企业代码';
                }
            },
            'postData.feeAmount'(a, b){
                let rule = /[^0-9]/g;

                if (rule.test(a)) {

                    this.isFeeAmount = true;

                    this.errorMsg.feeAmount = '请输入数字';

                } else {
                    this.isFeeAmount = false;

                    this.errorMsg.feeAmount = '请输入资费金额';
                }
            }
        },
        destroyed (){
            this.bus.$off('selectBoxBus');
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
            max-height: 460px;
            overflow-y: auto;

            .form-row {
                padding-bottom: 10px;
            }
            .row-left {
                width: 162px;
            }
            .row-right {

                .error-msg {
                    margin-top: 8px;
                }
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

            .unable {
                pointer-events: none;
            }
        }
    }
</style>
