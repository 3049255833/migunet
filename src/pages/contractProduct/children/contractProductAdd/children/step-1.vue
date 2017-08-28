<template>
    <div class="add-step-1">
        <div class="form-wrap ">
            <!--产品名称-->
            <div class="form-row">
                <div class="row-left required">产品名称（中文）：</div>
                <div class="row-right">
                    <input class=" form-input pointer w-200"
                           :class="{'error':$v.formData.productName.$error}"
                           v-model.trim="formData.productName" type="text"
                           @input="$v.formData.productName.$touch()"
                           placeholder="请输入"/>
                    <span class="error-msg" v-if="$v.formData.productName.$error">{{errorMsg.productName}}</span>
                </div>
            </div>
            <!--产品描述-->
            <div class="form-row">
                <div class="row-left required">产品描述（中文）：</div>
                <div class="row-right">
                    <textarea class="textarea-module w-340"
                              :class="{'error':$v.formData.productDesc.$error}"
                              type="text"
                              v-model.trim="formData.productDesc"
                              @input="$v.formData.productDesc.$touch()"
                              placeholder="请输入"></textarea>
                    <span class="error-msg" v-if="$v.formData.productDesc.$error">{{errorMsg.productDesc}}</span>
                </div>
            </div>
            <!--搜索关键字-->
            <div class="form-row">
                <div class="row-left required">
                    搜索关键字：
                </div>
                <div class="row-right">
                    <textarea class="textarea-module w-340" type="text"
                              :class="{'error':$v.formData.searchKey.$error}"
                              v-model.trim="formData.searchKey"
                              @input="$v.formData.searchKey.$touch()"
                              placeholder="搜索关键字将用于用户搜索功能，请输入断句，逗号 ‘，’隔开，例：‘漫画，青少年’"></textarea>
                    <span class="error-msg" v-if="$v.formData.searchKey.$error">{{errorMsg.searchKey}}</span>
                </div>
            </div>
            <!--生效方式-->
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
            <!--生效时间-->
            <div class="form-row">
                <div class="required row-left">
                    生效时间：
                </div>
                <div class="row-right">
                    <v-date :class="{'w-200':true,'error':$v.formData.effectiveTime.$error}"
                            :dateName="'effectiveTime'"
                            :defaultText="'生效时间'"></v-date>
                    <span class="error-msg" v-if="$v.formData.effectiveTime.$error">{{errorMsg.effectiveTime}}</span>
                </div>
            </div>
            <!--失效时间-->
            <div class="form-row">
                <div class="required row-left">
                    失效时间：
                </div>
                <div class="row-right">
                    <v-date :class="{'w-200':true,'error':$v.formData.expireTime.$error}"
                            :dateName="'expireTime'"
                            :defaultText="'失效时间'"></v-date>
                    <span class="error-msg" v-if="$v.formData.expireTime.$error">{{errorMsg.expireTime}}</span>
                </div>
            </div>
            <!--业务归属地-->
            <div class="form-row">
                <div class="row-left required">
                    业务归属地：
                </div>
                <div class="row-right">
                    <input @click="showBusinessAreaModal "
                           class="form-input w-200 pointer"
                           :class="{'error':$v.formData.attributionText.$error}"
                           v-model="formData.attributionText"
                           type="text"
                           readonly
                           placeholder="请输入"/>
                    <i class="icon icon-select"></i>
                    <span class="error-msg"
                          v-if="$v.formData.attributionText.$error">{{errorMsg.attributionText}}</span>
                </div>
            </div>
            <!--渠道Id-->
            <div class="form-row">
                <div class="row-left required">
                    渠道ID：
                </div>
                <div class="row-right">
                    <input type="text" class="form-input w-200"
                           :class="{'error':$v.formData.channelId.$error}"
                           @input="$v.formData.channelId.$touch()"
                           v-model.trim="formData.channelId" placeholder="请输入"/>
                    <i v-show="formData.channelId" class="icon icon-close-round" @click="remove('channelId')"></i>
                    <span class="error-msg" v-if="$v.formData.channelId.$error">{{errorMsg.channelId}}</span>
                </div>
            </div>
            <div class="form-row">
                <div class="row-left required">
                    产品目录：
                </div>
                <div class="row-right">
                    <v-select-box :w="'200'"
                                  :selectBoxName="'productDistListSelectBox'"
                                  :defaultTitle="'产品目录'"
                                  :options="selectBoxList.productDistList"></v-select-box>
                    <span class="error-msg" v-if="$v.formData.catalogId.$error">{{errorMsg.catalogId}}</span>
                </div>
            </div>
            <div class="form-row">
                <div class="row-left required">
                    是否会员产品：
                </div>
                <div class="row-right">
                    <div class="radio-wrap">
                        <label class="radio-module w-70">
                            <input value="1"
                                   v-model="formData.isMemberProduct"
                                   name="isMemberProduct"
                                   type="radio">
                            <span class="mr-3"></span>
                            <span class="txt">会员</span>
                        </label>
                        <label class="radio-module">
                            <input value="0"
                                   v-model="formData.isMemberProduct"
                                   name="isMemberProduct"
                                   type="radio">
                            <span class="mr-3"></span>
                            <span class="txt">包月</span>
                        </label>
                    </div>
                </div>
            </div>
            <!--是否体验产品-->
            <div class="form-row">
                <div class="row-left required">
                    是否体验产品：
                </div>
                <div class="row-right">
                    <div class="radio-wrap">
                        <label class="radio-module w-70">
                            <input value="1"
                                   v-model="formData.isExperience"
                                   name="isExperience"
                                   type="radio">
                            <span class="mr-3"></span>
                            <span class="txt">是</span>
                        </label>
                        <label class="radio-module">
                            <input value="0"
                                   name="isExperience"
                                   v-model="formData.isExperience"
                                   type="radio">
                            <span class="mr-3"></span>
                            <span class="txt">否</span>
                        </label>
                    </div>
                </div>
            </div>
            <!--体验产品填入-->
            <div class="form-row" v-if="formData.isExperience=='1'">
                <div class="row-left required">
                    体验产品产品周期:
                </div>
                <div class="row-right">
                    <input v-model="formData.experiencePeriodUnitNum"
                           @input="$v.formData.experiencePeriodUnitNum.$touch()"
                           :class="{'error':$v.formData.experiencePeriodUnitNum.$error}"
                           type="number"
                           class="mr-10 form-input w-80 vt-middle">
                    <div class="layout-inline-middle">
                        <v-select-box :w="'110'"
                                      :selectTitle="'天'"
                                      :selectBoxName="'experiencePeriodUnitListSelectBox'"
                                      v-bind:options="selectBoxList.experiencePeriodUnitList"></v-select-box>
                    </div>
                    <span class="error-msg" v-if="$v.formData.experiencePeriodUnitNum.$error">{{errorMsg.experiencePeriodUnitNum}}</span>
                </div>
            </div>
            <!--支付方式 -->
            <div class="form-row">
                <div class="row-left required">
                    支付方式：
                </div>
                <div class="row-right">
                    <div class="type-area">
                        <!--话费支付-->
                        <div class="item">
                            <div class="item-head ">
                                <label class="checkbox-module">
                                    <input type="checkbox" value="1" v-model="formData.payType">
                                    <span></span>
                                    <span class="txt">话费支付</span>
                                </label>
                                <i class="icon-recommend layout-center-y"></i>
                            </div>
                            <div v-if="formData.payType.contains('1')" class="form-wrap">
                                <div class="form-row pb-18">
                                    <div class="row-left w-200 required">使用业务代码：</div>
                                    <div class="row-right">
                                        <div class="radio-wrap">
                                            <label class="radio-module w-70">
                                                <input value="1" v-model="formData.ifUseBusinessCode" type="radio">
                                                <span></span>
                                                <span class="txt">是</span>
                                            </label>
                                            <label class="radio-module w-70">
                                                <input value="0" v-model="formData.ifUseBusinessCode" type="radio">
                                                <span></span>
                                                <span class="txt">否</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="ifUseBusinessCode" class="form-row">
                                    <div class="row-left w-200 required">业务代码选择：</div>
                                    <div class="row-right">
                                        <input class="form-input w-200 pointer"
                                               type="text" readonly
                                               @click="choseBusinessCode"
                                               v-model="formData.chargeCode"
                                               placeholder="业务代码选择">
                                        <i class="icon-select icon"></i>
                                    </div>
                                </div>
                                <div v-if="ifUseBusinessCode&&formData.chargeCode" class="form-row">
                                    <div class="row-left w-200 required">资费金额（分）：</div>
                                    <div class="row-right">
                                        <input class="form-input w-200"
                                               type="text"
                                               disabled
                                               v-model="formData.feeAmount">
                                    </div>
                                </div>
                                <div v-if="ifUseBusinessCode&&formData.chargeCode" class="form-row">
                                    <div class="row-left w-200 required">企业代码：</div>
                                    <div class="row-right">
                                        <input class="form-input w-200"
                                               type="text"
                                               disabled
                                               v-model="formData.companyCode"
                                        >
                                    </div>
                                </div>
                                <div v-if="!ifUseBusinessCode" class="form-row">
                                    <div class="row-left w-200 required">资费金额：</div>
                                    <div class="row-right">
                                        <input class="form-input w-200"
                                               type="text"
                                               v-model="formData.feeAmount"
                                        >
                                        <i v-show="formData.feeAmount" class="icon icon-close-round"
                                           @click="remove('feeAmount')"></i>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="row-left w-200 required">资费类型</div>
                                    <div class="row-right">
                                        <p class="txt font-14">{{feeTypeText}}</p>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="row-left w-200 required">是否重复订购</div>
                                    <div class="row-right">
                                        <div class="radio-wrap">
                                            <label class="radio-module w-70">
                                                <input value="1" v-model="formData.isReorder" type="radio">
                                                <span></span>
                                                <span class="txt">是</span>
                                            </label>
                                            <label class="radio-module w-70">
                                                <input value="0" v-model="formData.isReorder" type="radio">
                                                <span></span>
                                                <span class="txt">否</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row ">
                                    <div class="row-left w-200 required">产品周期</div>
                                    <div class="row-right">
                                        <input class="form-input w-200" disabled value="永久有效">
                                    </div>
                                </div>
                                <div v-if="!ifUseBusinessCode" class="form-row ">
                                    <div class="row-left w-200 required">产品周期</div>
                                    <div class="row-right">
                                        <div class="block-dom pb-20">
                                            <v-select-box w="200"
                                                          :selectTitle="'有限周期'"
                                                          :selectValue="''"
                                                          :selectBoxName="'periodUnitSelectBox'"
                                                          v-bind:options="[{optionText:'有限周期',optionValue:''}]"></v-select-box>
                                        </div>
                                        <div class="block-dom ">
                                            <input class="mr-10 form-input w-80 vt-middle"
                                                   v-model="formData.periodUnitNum"
                                                   type="text">
                                            <div class="layout-inline-middle">
                                                <v-select-box w="110" :selectTitle="'月'"
                                                              :name="'periodUnitListSelectBox'"
                                                              v-bind:options="periodUnitList"></v-select-box>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--第三方支付-->
                        <div class="item">
                            <div class="item-head ">
                                <label class="checkbox-module">
                                    <input type="checkbox" value="2" v-model="formData.payType">
                                    <span></span>
                                    <span class="txt">第三方支付</span>
                                </label>
                            </div>
                            <div v-if="formData.payType.contains('2')" class="form-wrap">
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
            </div>
            <!--支付方式 end-->
            <div class="form-row">
                <div class="row-left"></div>
                <div class="row-right">
                    <div class="btn-group">
                        <div v-if="canSave" class="btn btn-primary btn-middle" @click="nextStep">下一步</div>
                        <div v-else class="btn unable btn-primary btn-middle">下一步</div>
                        <div class="btn btn-default btn-middle">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <!--业务归属地modal-->
        <modal name="businessAreaModal" :width="800" :height="440" @before-close="beforeClose">
            <t-modal-sub-container :title="'选择业务归属地'" :name="'businessAreaModal'">
                <v-area-chose :modal-name="'businessAreaModal'"
                              :selectType="'single'"></v-area-chose>
            </t-modal-sub-container>
        </modal>
        <!--业务代码modal-->
        <modal name="businessCodeModal" :width="870" :height="570" @before-close="beforeClose">
            <t-modal-sub-container :title="'业务代码选择'" :name="'businessCodeModal'">
                <v-business-code-list :modalName="'businessCodeModal'"></v-business-code-list>
            </t-modal-sub-container>
        </modal>
    </div>
</template>
<script>
    import TModalSubContainer from "@/components/modal-sub-container";
    import VAreaChose from '@/pages/contractProduct/children/contractProductAdd/components/area-chose.vue'
    import VSelectBox from '@/components/select-box'
    import VDate from '@/components/date'
    import VBusinessCodeList from  '@/pages/contractProduct/children/contractProductAdd/components/business-code-list.vue'
    //表单注入
    import {required, minLength, maxLength, numeric, between} from 'vuelidate/lib/validators';

    export default{
        props: ['productDistList', 'experiencePeriodUnitList', 'periodUnitList'],
        data(){
            return {
                formData: {
                    productName: '',       //产品名称
                    productDesc: '',       //产品描述
                    searchKey: '',         //搜索关键字
                    effectiveWay: '',      //生效方式
                    effectiveTime: '',      //生效时间
                    expireTime: '',         //失效时间
                    attributionCode: '',    //归属地编码
                    attributionText: '',    //归属地名称
                    channelId: '',         //渠道Id
                    catalogId: '',           //目录Id
                    isMemberProduct: '1',    //是否会员 1：会员 0 ：包月
                    isExperience: '1',       //是否体验产品 1：是 0 ：正式产品
                    experiencePeriodUnitNum: '', //体验产品周期数
                    experiencePeriodUnit: '0', //体验产品周期单位 0：天 1：周 2：月 3：年
                    payType: [],               //支付方式 1：话费支付 2：第三方支付
                    ifUseBusinessCode: '1',     //是否使用业务代码,
                    chargeCode: '',         //计费代码？业务代码
                    companyCode: '',        //企业code
                    feeAmount: '',          //资费金额
                    feeType: '1',           //资费类型  1：包月 2：点播
                    isReorder: '0',         //是否重复订购
                    periodUnitNum: '',        //周期单位数 -1：永久有效
                    periodUnit: '',            // 周期单位 0：天 1：周 2：月 3：年


                    businessArea: '',
                    vipProduct: '1',
                    repeatBuy: '1',
                    useCode: '1'
                },
                errorMsg: {
                    productName: '请输入产品名',
                    productDesc: '请输入产品描述',
                    searchKey: '请输入搜索关键字',
                    effectiveTime: '请输入生效时间',
                    expireTime: '请输入失效时间',
                    attributionText: '请输入业务归属地',
                    channelId: '请输入渠道Id',
                    catalogId: '请选择产品目录',
                    experiencePeriodUnitNum: '请输入体验产品周期数'
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
                    ],
                    productDistList: this.productDistList,
                    experiencePeriodUnitList: this.experiencePeriodUnitList
                }
            }
        },
        validations: {
            formData: {
                //产品名称
                productName: {
                    required
                },
                //产品描述
                productDesc: {
                    required
                },
                //搜索关键字
                searchKey: {
                    required
                },
                //生效时间
                effectiveTime: {
                    required
                },
                //失效时间
                expireTime: {
                    required
                },
                //归属地编码
                attributionCode: {
                    required
                },
                //业务归属地文案
                attributionText: {
                    required
                },
                //渠道Id
                channelId: {
                    required
                },
                //目录Id
                catalogId: {
                    required
                },
                //体验产品周期数
                experiencePeriodUnitNum: {
                    required
                }
                /*   catalogId: '',           //目录Id
                 isMemberProduct: '1',    //是否会员 1：会员 0 ：包月
                 isExperience: '1',       //是否体验产品 1：是 0 ：正式产品
                 experiencePeriodUnitNum: '', //体验产品周期数
                 experiencePeriodUnit: '0', //体验产品周期单位 0：天 1：周 2：月 3：年
                 payType: [],               //支付方式 1：话费支付 2：第三方支付
                 ifUseBusinessCode: '1',     //是否使用业务代码,
                 chargeCode: '',         //计费代码？业务代码
                 companyCode: '',        //企业code
                 feeAmount: '',          //资费金额
                 feeType: '1',           //资费类型  1：包月 2：点播
                 isReorder: '0',         //是否重复订购
                 periodUnitNum: '',        //周期单位数 -1：永久有效
                 periodUnit: '',            // 周期单位 0：天 1：周 2：月 3：年
                 
                 
                 businessArea: '',
                 vipProduct: '1',
                 repeatBuy: '1',
                 useCode: '1'*/
            },

            validationGroup: [/*'formData.productName', 'formData.productDesc', 'formData.searchKey',
             'formData.effectiveTime','formData.attributionText','formData.channelId','formData.catalogId'*/]
        },
        computed: {
            ifUseBusinessCode(){
                return this.formData.ifUseBusinessCode == '1';
            },
            feeType(){
                return this.formData.ifUseBusinessCode == '1' ? '1' : '2';
            },
            feeTypeText(){
                return this.formData.ifUseBusinessCode == '1' ? '包月' : '点播';
            },
            showPeriodUnitNumBox(){
                return this.formData.ifUseBusinessCode == '1';
            },
            canSave(){
                var flag = true;
                if (!this.$v.validationGroup.$error && !this.$v.validationGroup.$invalid) {  //经过第一层的表单验证
                    if (this.formData.isExperience == '1') {   //体验产品
                        flag=this.formData.experiencePeriodUnitNum.length >= 1
                    }
                    return flag
                } else {
                    return false
                }
            }

        },
        name: 'AddStep1',
        components: {
            VDate,
            TModalSubContainer,
            VAreaChose,
            VSelectBox,
            VBusinessCodeList

        },
        methods: {
            /**
             * 保存数据
             * */
            save(){
              console.log(this.formData);
            },
            /**
             * 当变量canHideModal为false时，无法关闭弹框
             * */
            beforeClose (event) {
                //todo:
            },

            /**
             * 选择业务代码
             * */
            choseBusinessCode(){
                this.$modal.show('businessCodeModal')
            },

            /**
             * 跳到下一步
             * */
            nextStep(){
                this.bus.$emit('curStep', 2);
                this.$router.push({'name': 'Step2'});
                
                this.save();
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
        //watch 不要用箭头函数的写法
        watch: {
            /**
             * 监听资费类型
             * a=='0' 不使用业务代码，清空数据重新填
             * a=='1' 使用业务代码
             * */
            'formData.ifUseBusinessCode'(a, b) {
                if (a == '1') {   //使用业务代码
                    this.formData.feeType = '1';
                    this.formData.periodUnitNum = '-1';       //产品周期数：默认永久有效-1
                } else {
                    this.formData.chargeCode = '';       //业务代码
                    this.formData.feeType = '2';         //资费类型
                    this.formData.feeAmount = '';        //资费金额
                    this.formData.companyCode = '';      //企业代码
                    this.formData.periodUnitNum = '';
                }

            },
            'formData.isExperience'(a, b){
                this.formData.experiencePeriodUnitNum='';
                if(a=='1'){
                    this.formData.experiencePeriodUnit='0';
                }else{
                    this.formData.experiencePeriodUnit='';
                }
            }
        },
        mounted () {
            /**
             * 获取归属地，返回[{areaName:'',areaCode:''}]
             * */
            this.bus.$on('areaChoseBus', res => {
                if (res) {
                    //拼接字符窜
                    let areaNameArr = [];
                    let areaCodeArr = [];
                    res.forEach(function (item, index) {
                        areaNameArr.push(item.areaName);
                        areaCodeArr.push(item.areaCode);
                    });
                    this.formData.attributionText = areaNameArr.join('|');
                    this.formData.attributionCode = areaCodeArr.join('|');
                }

            });
      
            /**
             * 获取产品目录下拉框的值
             * */
            this.getSelectOption('productDistListSelectBox', this, function (res) {
                this.formData.experiencePeriodUnit = res.selectOption.optionValue;
            });

            /**
             * 获取体验周期下拉框的值
             * */
            this.getSelectOption('experiencePeriodUnitListSelectBox', this, function (res) {
                this.formData.catalogId = res.selectOption.optionValue;
            });

            /**
             * 获取体验产品周期单位下拉框数据
             * */
            this.getSelectOption('experiencePeriodUnitListSelectBox', this, function (res) {
                alert(this)
                this.formData.experiencePeriodUnit = res.optionValue;
            });
            /**
             * 获取周期单位下拉框数据
             * */
            this.getSelectOption('periodUnitListSelectBox', this, function (res) {
                this.formData.periodUnit = res.optionValue;
            });

            /**
             * promise
             * 获取日历的值
             * */
            this.getDate('effectiveTime', this, function (res) {
                this.formData.effectiveTime = res.dateValue;
            });

            this.getDate('expireTime', this, function (res) {
                this.formData.expireTime = res.dateValue;
            });

            /**
             * 获取业务代码的值
             * */
            this.bus.$on('businessCodeBus', res => {
                //有数据传过来
                if (res || res.ifHasData) {
                    this.formData.chargeCode = res.chargeCode;
                    this.formData.feeAmount = res.feeAmount;
                    this.formData.companyCode = res.companyCode;
                }
            })
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