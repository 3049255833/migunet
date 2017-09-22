<template>
    <div class="update-sms-template-container">

        <div class="form-wrap">

            <div class="form-row" v-if="cmd == 'edit'">
                <div class="row-left required">短信模板ID：</div>

                <div class="row-right">
                    <input class="form-input pointer w-200 unable"
                         type="text"
                         v-model.trim="postData.id"
                         placeholder="请输入"/>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">短信模板名称：</div>

                <div class="row-right">
                    <input class="form-input pointer w-200"
                           type="text"
                           :class="{'error':$v.postData.smsName.$error, 'error1': isSmsName}"
                           @input="$v.postData.smsName.$touch()"
                           v-model.trim="postData.smsName"
                           placeholder="请输入"/>

                    <span class="error-msg" v-if="$v.postData.smsName.$error">
                        {{errorMsg.smsName}}
                    </span>

                    <span class="error-msg" v-if="isSmsName">
                        {{errorMsg.IllegalCharacter}}
                    </span>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">模板类型：</div>

                <div class="row-right">
                    <v-select-box :w="'200'"
                        :selectTitle="smsTypeText"
                        :selectValue="'1'"
                        :selectBoxName="'smsTemplateType'"
                        :options="selectBoxList.smsTemplateTypeList"></v-select-box>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">短信模板描述：</div>

                <div class="row-right">
                    <textarea
                        class="textarea-module w-200"
                        type="text"
                        :class="{'error':$v.postData.smsDesc.$error}"
                        @input="$v.postData.smsDesc.$touch()"
                        v-model.trim="postData.smsDesc"
                        placeholder="请输入"></textarea>

                    <span class="error-msg" v-if="$v.postData.smsDesc.$error">
                          {{errorMsg.smsDesc}}
                    </span>

                    <span class="error-msg" v-if="isSmsDesc">
                        {{errorMsg.IllegalCharacter}}
                    </span>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">短信模板内容：</div>

                <div class="row-right">
                    <textarea
                        class="textarea-module w-200"
                        type="text"
                        :class="{'error':$v.postData.templateContent.$error}"
                        @input="$v.postData.templateContent.$touch()"
                        v-model.trim="postData.templateContent"
                        placeholder="请输入"></textarea>

                    <span class="error-msg" v-if="$v.postData.templateContent.$error">
                        {{errorMsg.templateContent}}
                    </span>

                    <span class="error-msg" v-if="isTemplateContent">
                        {{errorMsg.IllegalCharacter}}
                    </span>
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
    import VSelectBox from '@/components/select-box'

    import {required, between} from 'vuelidate/lib/validators';

    export default {
        name: 'UpdateSmsTemplate',
        props: {
            modalName: String,
            passModal: Object,
            cmd: String
        },
        data() {
            return {
                postData: {
                    id: '',
                    smsType: '1',
                    smsName: '',
                    smsDesc: '',
                    templateContent: ''
                },
                errorMsg: {
                    smsName: '请输入短信模板名称',
                    smsDesc: '请输入短信模板描述',
                    templateContent: '请输入短信模板内容',
                    IllegalCharacter: '输入内容含有非法字符'
                },
                selectBoxList: {
                    smsTemplateTypeList: [
                        {
                            optionText: '订购成功短信模板',
                            optionValue: '1'
                        },
                        {
                            optionText: '到期提醒短信模板',
                            optionValue: '2'
                        },
                        {
                            optionText: '推荐短信模板',
                            optionValue: '3'
                        }
                    ]
                },
                isActive: false,
                smsTypeText: '订购成功短信模板',
                isSmsName: false,
                isSmsDesc: false,
                isTemplateContent: false
            }
        },
        validations: {
            postData: {
                smsName: {
                    required
                },
                smsDesc: {
                    required
                },
                templateContent: {
                    required
                }
            },
            validationGroup: [
                'postData.smsName',
                'postData.smsDesc',
                'postData.templateContent'
            ]
        },
        components: {
            VSelectBox
        },
        watch: {
            'postData.smsName'(a, b){
                let rule = /[`~!\#$%^+*&/?|'=()]+/g;

                if (rule.test(a)) {
                    this.isSmsName = true;
                } else {
                    this.isSmsName = false;
                }
            },
            'postData.smsDesc'(a, b){
                let rule = /[`~!\#$%^+*&/?|'=()]+/g;

                if (rule.test(a)) {
                    this.isSmsDesc = true;
                } else {
                    this.isSmsDesc = false;
                }
            },
            'postData.templateContent'(a, b){
                let rule = /[`~!\#$%^+*&/?|'=()]+/g;

                if (rule.test(a)) {
                    this.isTemplateContent = true;
                } else {
                    this.isTemplateContent = false;
                }
            }
        },
        methods: {
            cancel() {
                this.$modal.hide(this.modalName);
            },
            confirm() {
                console.log("postData: " + JSON.stringify(this.postData));

                this.isActive = true;

                if(this.cmd == 'edit') {

                    this.$http.post(this.api.updateSmsTemplate, this.postData).then(
                        response => {
                            let res = response.body;

                            console.log("updateSmsTemplate: " + JSON.stringify(res));

                            if(res.resultCode == '00000000') {

                                this.$root.toastText = '编辑成功';
                            } else {
                                this.$root.toastText = '编辑失败';
                            }
                            this.$root.toast = true;

                            this.$modal.hide(this.modalName);
                        }
                    );
                } else {
                    this.$http.post(this.api.addSmsTemplate, this.postData).then(
                        response => {
                            let res = response.body;

                            if(res.resultCode == '00000000') {

                                this.$root.toastText = '添加成功';

                            } else {
                                this.$root.toastText = '添加失败';
                            }

                            this.$root.toast = true;

                            this.$modal.hide(this.modalName);
                        }
                    );
                }
            }
        },
        created () {
            /**
             * 获取下拉框的值
             * */
            this.bus.$on('selectBoxBus', res => {
                /*获取短信模板类型*/
                if (res.selectBoxName == 'smsTemplateType') {

                    this.postData.smsType = res.selectOption.optionValue;
                }
            });

            if(this.cmd == 'edit') {

                this.postData = this.passModal;

                if(this.postData.smsType == '1') {

                    this.smsTypeText = '订购成功短信模板';

                } else if(this.postData.smsType == '0') {

                    this.smsTypeText = '到期提醒短信模板';

                } else if(this.postData.smsType == '0') {

                    this.smsTypeText = '推荐短信模板';
                }
            }
        },
        computed: {
            canSave(){

                if (!this.$v.validationGroup.$error && !this.$v.validationGroup.$invalid &&
                    !this.isSmsName && !this.isSmsDesc && !this.isTemplateContent) {

                    return true;
                } else {

                    return false;
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

    .update-sms-template-container {
        font-size: 14px;
        color: #333333;
        box-sizing: border-box;

        .form-wrap {
            padding: 20px 80px;
            max-height: 380px;
            overflow-y: auto;

            .form-row {
                padding-bottom: 12px;
            }
            .row-left {
                width: 162px;
            }
            .row-right {
                .error-msg {
                    margin-top: 8px;
                }

                input.unable {
                    border: none!important;
                    pointer-events: none;
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
