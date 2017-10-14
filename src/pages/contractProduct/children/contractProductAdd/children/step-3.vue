<template>
    <div class="add-step-3">
        <div class="form-wrap ">
            <!--CP/SP ID-->
            <div class="form-row">
                <div class="row-left required">
                  CP/SP ID：
                </div>
                <div class="row-right">
                    <input class="form-input pointer w-340"
                         type="text"
                         readonly
                         v-model.trim="formData.cpName"
                         @click="showCPSPIDModal"/>

                        <i class="icon icon-select"></i>
                </div>
            </div>

            <!--发送平台-->
            <div class="form-row">
                <div class="row-left">
                  发送平台：
                </div>
                <div class="row-right">
                    <div class="radio-wrap">
                        <label
                            class="checkbox-module w-70"
                            v-if="item.dictionary_code != '0'"
                            v-for="(item, index) in sendPlatform">
                            <input :value="item.dictionary_code"
                                   v-model="formData.sendPlatform"
                                   name="isGive"
                                   type="checkbox">
                            <span class="mr-3"></span>
                            <span class="txt">{{item.dictionary_desc}}</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left">
                    限制发送提示短信省份：
                </div>
                <div class="row-right">
                    <input class="form-input pointer w-200"
                           v-model="formData.limitSmsAreas"
                           type="text"
                           @click="showAreaChoseModal"
                           readonly
                           placeholder="请选择"/>
                    <i class="icon icon-select"></i>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left">
                    订购成功下发提示短信：
                </div>
                <div class="row-right">
                    <input class="form-input pointer w-340"
                           type="text"
                           @click="showPromptSmsModal"
                           readonly
                           v-model="promptSmsItem.templateContent"
                           placeholder="请选择"/>
                    <i class="icon icon-select"></i>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left">
                    订购成功下发推荐短信：
                </div>
                <div class="row-right">
                    <input class="form-input pointer w-340"
                         @click="showRecommendSmsModal"
                         readonly
                         v-model="recommendSmsItem.templateContent"
                         placeholder="请选择"/>
                    <i class="icon icon-select"></i>
                </div>
            </div>

            <!--到期提醒短信模板-->
            <div class="form-row">
                <div class="row-left">
                    到期提醒短信模板：
                </div>

                <div class="row-right">
                    <input class="form-input pointer w-340"
                         @click="showRemindSmsModal"
                         readonly
                         v-model="RemindSmsItem.templateContent"
                         placeholder="请选择"/>
                    <i class="icon icon-select"></i>
                </div>
            </div>

            <!--到期提醒提前天数-->
            <div class="form-row" v-if="RemindSmsItem.templateContent != null">
                <div class="row-left required">
                  到期提醒提前天数：
                </div>

                <div class="row-right">
                    <input class=" form-input pointer w-200"
                         v-model.trim="formData.remindDays"
                         @input="$v.formData.remindDays.$touch()"
                         :class="{'error':$v.formData.remindDays.$error,'error1':isRemindDays}"
                         type="text"
                         placeholder="请输入天数"/>

                    <span class="error-msg"
                          v-if="$v.formData.remindDays.$error || isRemindDays">

                        {{errorMsg.remindDays}}
                    </span>
                </div>
            </div>

            <div class="form-row mutex-product-item">
                <div class="row-left">
                    互斥产品添加：
                </div>
                <div class="row-right">
                    <div class="textarea-module"
                         placeholder="请选择"
                         @click="showMutexProduct">
                        <div v-for="item in mutexProductList" class="item clearfix">
                            <div class="first">{{item.content}}</div>
                            <hr/>
                            <div class="second">{{item.productCode}}</div>
                        </div>
                    </div>
                    <i class="icon icon-select"></i>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left">
                    依赖产品添加：
                </div>
                <div class="row-right">
                    <input class="form-input w-340 pointer"
                           placeholder="请选择"
                           v-model="relyProductItem.content"
                           @click="showRelyProduct"
                           readonly>
                    <i class="icon icon-select"></i>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left"></div>
                <div class="row-right">
                    <div class="btn-group">
                        <div class="btn btn-primary btn-middle"
                             v-if="canSave&&this.$parent.step1Flag&&this.$parent.step2Flag&&$root.ajaxLock"  @click="save">完成</div>
                        <div class="btn btn-primary btn-middle unable" v-else >完成</div>
                        <div class="btn btn-default btn-middle" @click="forwardStep">上一步</div>
                    </div>
                </div>
            </div>
        </div>

        <modal name="areaChoseModal" :width="800" :height="520" @before-close="beforeClose">
            <t-modal-sub-container :title="'选择业务归属地'" :name="'areaChoseModal'">
                <v-area-chose
                        :modal-name="'areaChoseModal'"
                        v-on:areaChoseBus="getArea"
                        :selectType="'single'">
                </v-area-chose>
            </t-modal-sub-container>
        </modal>

        <modal name="smsListModal" :width="870" :height="570" @before-close="beforeClose">
            <t-modal-sub-container :title="smsTitle" :name="'smsListModal'">
                <v-sms-list :modal-name="'smsListModal'" :smsType="smsType"></v-sms-list>
            </t-modal-sub-container>
        </modal>

        <modal name="productSelectModal"
               :width="870" :height="570" @before-close="beforeClose">
            <t-modal-sub-container :title="productSelectTitle" :name="'productSelectModal'">
                <v-product-select-modal
                        :modal-name="'productSelectModal'"
                        :productType="productType"></v-product-select-modal>
            </t-modal-sub-container>
        </modal>

        <!--CP/SP ID list-->
        <modal name="cpSPListModal"
               :width="870"
               :height="570"
               @before-close="beforeClose">

            <t-modal-sub-container :title="'CP/SP ID 选择'" :name="'cpSPListModal'">

                <v-cp-sp-modal></v-cp-sp-modal>

            </t-modal-sub-container>
        </modal>

        <!-- 操作结果modal start -->
        <modal name="addResultMsgModal" :draggable="true" :width="200" :height="80">
            <v-toast :name="'addResultMsgModal'" >{{addResultMsg}}</v-toast>
        </modal>

    </div>
</template>
<script type="es6">
    import TModalSubContainer from "@/components/modal-sub-container";
    import VSmsList from '@/pages/contractProduct/children/contractProductAdd/components/sms-list';
    import VAreaChose from '@/pages/contractProduct/children/contractProductAdd/components/area-chose.vue'
    import VPaging from '@/components/paging'
    import VToast from '@/components/toast'
    import VProductSelectModal from '../components/product-select-modal'
    import VCpSpModal from '../components/cp-sp-modal.vue'

    //表单注入
    import {required} from 'vuelidate/lib/validators';

    export default{
        components: {
            VAreaChose,
            TModalSubContainer,
            VSmsList,
            VPaging,
            VProductSelectModal,
            VToast,
            VCpSpModal
        },
        data(){
            return {
                addResultMsg:'',
                formData: {
                    limitSmsAreas: '',
                    limitSmsAreasCode: '',
                    //pdContractProductCodes: '', //第二步添加产品成功返回产品ID，传到第三步。
                    promptSmsCodes: '',
                    recommendCodes: '',
                    remindCodes: '',       //到期提醒短信
                    mutuallyProductCodes: '',
                    dependentProductCodes: '',
                    remindDays: '5',  //到期提醒提前天数
                    sendPlatform: [], //发送平台,
                    cpCode: '',        //CP/SP code,
                    cpName: ''
                },
                errorMsg: {
                    remindDays: '请输入到期提醒提前天数'
                },
                smsTitle: '',
                productSelectTitle: '',
                productType: '',
                smsType: '',
                promptSmsItem: {},
                recommendSmsItem: {},
                RemindSmsItem: {},
                mutexProductList: [],
                relyProductItem: {},
                cPSPIDList: {},
                sendPlatform: [],
                postData: {
                    limitSmsAreas: '',
                    promptSmsCodes: '',
                    recommendCodes: '',
                    remindCodes: '',
                    mutuallyProductCodes: '',
                    dependentProductCodes: '',
                    remindDays: '',
                    cpCode:'',
                    sendPlatform: ''
                },
                isRemindDays: false // 判断请输入到期提醒天数为非法字符
            }
        },
        validations: {
            formData: {
                cpCode: {
                    required
                },
                remindDays: {
                    required
                }
            },
            validationGroup: ['formData.cpCode','formData.remindDays']
        },
        created(){
            this.getSendPlatform();
        },
        watch:{
            'formData.sendPlatform'(a,b) {

                console.log("sendPlatform: " + JSON.stringify(this.formData.sendPlatform));
            },
            'formData.remindDays'(a, b){
                let rule = /[^0-9]/g;

                if (rule.test(a)) {

                  this.isRemindDays = true;

                  this.errorMsg.remindDays = '请输入数字';

                } else {
                    this.isRemindDays = false;
                    this.errorMsg.remindDays = '请输入到期提醒天数';
                }
            },
        },
        methods: {
            /*获取发送平台*/
            getSendPlatform() {
                this.$http.get(this.api.findDictionaryType,
                  {params: {type: 'SEND_PLATFORM'}, showLoading: true}).then(

                    response => {
                        let res = response.body;

                        if (res.result.resultCode == '00000000') {

                            this.sendPlatform = res.data;

                            console.log("sendPlatform: " + JSON.stringify(this.sendPlatform));
                        } else {

                            console.log("res: " + JSON.stringify(res));
                        }
                    }
                );
            },

            /*显示CP/SP ID modal*/
            showCPSPIDModal() {
                this.$modal.show('cpSPListModal');
            },

            /**
             * 保存数据
             * */
            save(){

                /*this.postData.pdContract.remindDays = this.formData.remindDays;
                this.postData.pdContract.sendPlatform=(this.formData.sendPlatform).join(',');
                this.postData.pdContract.cpCode = this.formData.cpCode;*/

                this.postData.limitSmsAreas = this.formData.limitSmsAreasCode;
                //this.postData.limitSmsAreasCode = this.formData.limitSmsAreasCode;
                this.postData.promptSmsCodes = this.formData.promptSmsCodes;
                this.postData.recommendCodes = this.formData.recommendCodes;
                this.postData.remindCodes = this.formData.remindCodes;
                this.postData.mutuallyProductCodes = this.formData.mutuallyProductCodes;
                this.postData.dependentProductCodes = this.formData.dependentProductCodes;
                this.postData.remindDays = this.formData.remindDays;
                this.postData.sendPlatform=(this.formData.sendPlatform).join(',');
                this.postData.cpCode = this.formData.cpCode;

                this.$emit('step3Bus', {
                    step: 3,
                    data: this.postData
                });

                console.log("postData3: " + JSON.stringify(this.postData));
            },

            test(){
                this.addResultMsg = '新增成功';
                this.$modal.show('addResultMsgModal');
            },

            /**
             * 取消
             * */
            forwardStep(){
                this.$router.push({'name': 'Step2'});
            },

            /**
             * 获取地区
             * */
            getArea(res){
                if (res) {
                    //拼接字符窜
                    let areaNameArr = [];
                    let areaCodeArr = [];
                    res.forEach(function (item, index) {
                        areaNameArr.push(item.attributionName);
                        areaCodeArr.push(item.attributionCode);
                    });

                    this.formData.limitSmsAreas = areaNameArr.join(',');
                    this.formData.limitSmsAreasCode = areaCodeArr.join(',');

                    //console.log("code: " + this.formData.limitSmsAreasCode);
                }
            },

            /**
             * 显示地方
             * */
            showAreaChoseModal(){
                this.$modal.show('areaChoseModal');
            },

            beforeClose(){},

            /**
             * 调用到期提醒短信模板
             * */
            showRemindSmsModal(){
              this.smsTitle = '到期提醒短信模板';

              this.smsType = '2';

              this.$modal.show('smsListModal');
            },

            /**
             * 调用订购成功下发提示短信模板弹框
             * */
            showPromptSmsModal(){
                this.smsTitle = '动漫包提示短信模板选择';

                this.smsType = '1';

                this.$modal.show('smsListModal');
            },

            /**
             * 调用订购成功下发推荐短信模板弹框
             * */
            showRecommendSmsModal(){
                this.smsTitle = '动漫包推荐短信模板选择';

                this.smsType = '3';

                this.$modal.show('smsListModal');
            },

            /**
             * 互斥产品添加模板弹框
             * */
            showMutexProduct(){
                this.productSelectTitle = '互斥产品选择';
                this.productType = '1';
                this.$modal.show('productSelectModal');
            },

            /**
             * 依赖产品添加模板弹框
             * */
            showRelyProduct(){
                this.productSelectTitle = '依赖产品选择';
                this.productType = '2';
                this.$modal.show('productSelectModal');
            }
        },
        computed: {
            canSave(){
                let flag = true;

                if (!this.$v.validationGroup.$error && !this.$v.validationGroup.$invalid && !this.isRemindDays) {

                } else {
                    flag=false
                }
                return flag
            }
        },
        mounted () {

            /*
             * 获取选择的短信模板信息
             * */
            this.bus.$on('getSelectSms', res => {
                if (res) {

                    if (this.smsType === '3') {

                        this.recommendSmsItem = res;

                        this.formData.recommendCodes = this.recommendSmsItem.id;

                    } else if(this.smsType === '1') {

                        this.promptSmsItem = res;

                        this.formData.promptSmsCodes = this.promptSmsItem.id;

                    } else if(this.smsType === '2') {

                        this.RemindSmsItem = res;

                        this.formData.remindCodes = this.RemindSmsItem.id;
                    }
                }
                this.$modal.hide('smsListModal');
            });

            /*
             * 获取选择的互斥和依赖产品信息
             * */
            this.bus.$on('getSelectProduct', res => {
                let mutuallys = [];

                if (res) {

                    if (this.productType === '1') {

                        this.mutexProductList = res.data;

                        res.data.forEach(function (item, index) {

                            mutuallys.push(item.productCode);
                        });

                        this.formData.mutuallyProductCodes = mutuallys.join('|');


                    } else {

                        this.relyProductItem = res.data;

                        this.formData.dependentProductCodes = this.relyProductItem.productCode;
                    }

                }
            });

            /*获取选择的CP/SP 列表*/
            this.bus.$on('selectCpSpListBus', res => {
                if (res) {

                    this.cPSPIDList = res;

                    this.formData.cpCode = this.cPSPIDList.cpCode;

                    this.formData.cpName = this.cPSPIDList.cpName;
                }

                console.log("CPSP: " + JSON.stringify(res));

                this.$modal.hide('cpSPListModal');
            });
        },
        destroyed(){
            this.bus.$off('getSelectSms');

            this.bus.$off('getSelectProduct');

            this.bus.$off('selectCpSpListBus');

            this.bus.$off('step3Bus');
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
            margin: 25px 0 50px;
        }
    }

    .mutex-product-item {
        .item {
            > div, hr {
                float: left;
            }

            hr {
                width: 0;
                height: 10px;
                padding: 0;
                margin: 5px 5px 0 8px;
            }
        }
    }
</style>
