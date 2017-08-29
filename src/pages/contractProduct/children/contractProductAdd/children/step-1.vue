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
                <div class="row-left">产品描述（中文）：</div>
                <div class="row-right">
                    <textarea class="textarea-module w-340"
                              type="text"
                              v-model.trim="formData.productDesc"
                              placeholder="请输入"></textarea>
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
                                  :selectValue="'1'"
                                  :selectBoxName="'effectiveWaySelectBox'"
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
                    <input type="text" class="form-input w-200 pointer"
                           readonly
                           @click="choseChannelId"
                           v-model.trim="formData.channelIds" placeholder="请输入"/>
                    <i class="icon icon-select"></i>
                    <span class="error-msg" v-if="$v.formData.channelIds.$error">{{errorMsg.channelIds}}</span>
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
                                   v-model="formData.isVip"
                                   name="isVip"
                                   type="radio">
                            <span class="mr-3"></span>
                            <span class="txt">会员</span>
                        </label>
                        <label class="radio-module">
                            <input value="0"
                                   v-model="formData.isVip"
                                   name="isVip"
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
                    体验产品产品周期：
                </div>
                <div class="row-right">
                    <input v-model="formData.expCycleUnitNum"
                           @input="$v.formData.expCycleUnitNum.$touch()"
                           :class="{'error':$v.formData.expCycleUnitNum.$error}"
                           type="number"
                           class="mr-10 form-input w-80 vt-middle">
                    <div class="layout-inline-middle">
                        <v-select-box :w="'110'"
                                      :selectTitle="'月'"
                                      :selectBoxName="'expCycleUnitListSelectBox'"
                                      v-bind:options="selectBoxList.expCycleUnitList"></v-select-box>
                    </div>
                    <span class="error-msg"
                          v-if="$v.formData.expCycleUnitNum.$error">{{errorMsg.expCycleUnitNum}}</span>
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
                                                <input value="1" v-model="formData.ifUseServiceCode" type="radio">
                                                <span></span>
                                                <span class="txt">是</span>
                                            </label>
                                            <label class="radio-module w-70">
                                                <input value="0" v-model="formData.ifUseServiceCode" type="radio">
                                                <span></span>
                                                <span class="txt">否</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="ifUseServiceCode" class="form-row">
                                    <div class="row-left w-200 required">业务代码选择：</div>
                                    <div class="row-right">
                                        <input class="form-input w-200 pointer"
                                               type="text" readonly
                                               @click="choseServiceCode"
                                               v-model="payType1.serviceCode"
                                               placeholder="业务代码选择">
                                        <i class="icon-select icon"></i>
                                    </div>
                                </div>
                                <div v-if="ifUseServiceCode&&payType1.serviceCode" class="form-row">
                                    <div class="row-left w-200 required">资费金额（分）：</div>
                                    <div class="row-right">
                                        <input class="form-input w-200"
                                               type="text"
                                               disabled
                                               v-model="payType1.price">
                                    </div>
                                </div>
                                <div v-if="ifUseServiceCode&&payType1.serviceCode" class="form-row">
                                    <div class="row-left w-200 required">企业代码：</div>
                                    <div class="row-right">
                                        <input class="form-input w-200"
                                               type="text"
                                               disabled
                                               v-model="payType1.companyCode"
                                        >
                                    </div>
                                </div>
                                <div v-if="!ifUseServiceCode" class="form-row">
                                    <div class="row-left w-200 required">资费金额：</div>
                                    <div class="row-right">
                                        <input class="form-input w-200"
                                               type="text"
                                               :class="{'error':$v.payType1.price.$error}"
                                               v-model.trim="payType1.price"
                                               @input="$v.payType1.price.$touch()"
                                        >
                                        <i v-show="payType1.price" class="icon icon-close-round"
                                           @click="remove('price','payType1')"></i>
                                        <span class="error-msg"
                                              v-if="$v.payType1.price.$error">{{errorMsg.payType1.price}}</span>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="row-left w-200 required">资费类型：</div>
                                    <div class="row-right">
                                        <p class="txt font-14">{{feeTypeText}}</p>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="row-left w-200 required">是否重复订购：</div>
                                    <div class="row-right">
                                        <div class="radio-wrap">
                                            <label class="radio-module w-70">
                                                <input value="1" v-model="payType1.isReorder" type="radio">
                                                <span></span>
                                                <span class="txt">是</span>
                                            </label>
                                            <label class="radio-module w-70">
                                                <input value="0" v-model="payType1.isReorder" type="radio">
                                                <span></span>
                                                <span class="txt">否</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="ifUseServiceCode" class="form-row ">
                                    <div class="row-left w-200 required">产品周期：</div>
                                    <div class="row-right">
                                        <input class="form-input w-200" disabled value="永久有效">
                                    </div>
                                </div>
                                <div v-if="!ifUseServiceCode" class="form-row ">
                                    <div class="row-left w-200 required">产品周期：</div>
                                    <div class="row-right">
                                        <div class="block-dom pb-20">
                                            <v-select-box w="200"
                                                          :selectTitle="'有限周期'"
                                                          :selectValue="'0'"
                                                          :selectBoxName="'payType1UnitSelectBox'"
                                                          v-bind:options="[{optionText:'有限周期',optionValue:'0'},{optionText:'永久有效',optionValue:'1'}]"></v-select-box>
                                        </div>
                                        <div class="block-dom " v-if="this.payType1.cycleUnitSelect=='0'">
                                            <input class="mr-10 form-input w-80 vt-middle"
                                                   v-model="payType1.cycleUnitNum"
                                                   @input="$v.payType1.cycleUnitNum.$touch()"
                                                   :class="{'error':$v.payType1.cycleUnitNum.$error}"
                                                   type="text">
                                            <div class="layout-inline-middle">
                                                <v-select-box w="110" :selectTitle="'月'"
                                                              :selectBoxName="'payType1CycleUnitListSelectBox'"
                                                              v-bind:options="selectBoxList.cycleUnitList"></v-select-box>
                                            </div>
                                            <span class="error-msg"
                                                  v-if="$v.payType1.cycleUnitNum.$error">{{errorMsg.payType1.cycleUnitNum}}</span>
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
                                        <input type="text"
                                               class="form-input w-200" v-model="payType2.price"
                                               :class="{'error':$v.payType2.price.$error}"
                                               v-model.trim="payType2.price"
                                               @input="$v.payType2.price.$touch()"
                                               placeholder="请输入"/>
                                        <i v-show="payType2.price" class="icon icon-close-round"
                                           @click="remove('price','payType2')"></i>
                                        <span class="error-msg"
                                              v-if="$v.payType2.price.$error">{{errorMsg.payType1.price}}</span>
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
                                                <input value="1" v-model="payType2.isReorder" type="radio">
                                                <span></span>
                                                <span class="txt">是</span>
                                            </label>
                                            <label class="radio-module w-70">
                                                <input value="0" v-model="payType2.isReorder" type="radio">
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
                                            <v-select-box w="200" :selectTitle="'有限周期'"
                                                          :selectValue="'0'"
                                                          :selectBoxName="'payType2UnitSelectBox'"
                                                          v-bind:options="[{optionText:'有限周期',optionValue:'0'},{optionText:'永久有效',optionValue:'1'}]"></v-select-box>
                                            </v-select-box>
                                        </div>
                                        <div class="block-dom" v-if="this.payType2.cycleUnitSelect=='0'">
                                            <input class="mr-10 form-input w-80 vt-middle"
                                                   v-model="payType2.cycleUnitNum"
                                                   @input="$v.payType2.cycleUnitNum.$touch()"
                                                   :class="{'error':$v.payType2.cycleUnitNum.$error}"
                                                   type="text">
                                            <div class="layout-inline-middle">
                                                <v-select-box w="110" :selectTitle="'月'"
                                                              :selectBoxName="'payType2CycleUnitListSelectBox'"
                                                              v-bind:options="selectBoxList.cycleUnitList"></v-select-box>
                                            </div>
                                            <span class="error-msg"
                                                  v-if="$v.payType2.cycleUnitNum.$error">{{errorMsg.payType2.cycleUnitNum}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--资费计划-->
            <div class="form-row">
                <div class="row-left required">
                    资费计划：
                </div>
                <div class="row-right">
                    <div class="textarea-module w-700 pd-10" type="text"
                         @click="chosePlanId">
                        <table class="table-module" v-if="planIdTableData.length>0">
                            <thead>
                            <tr>
                                <td>计划id</td>
                                <td>计划名称</td>
                                <td>计划内容</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in planIdTableData">
                                <td>{{item.planId}}</td>
                                <td>{{item.planName}}</td>
                                <td>{{item.planExplain}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <i class="icon icon-select"></i>
                    </div>
                </div>
            </div>
            <!--btn-group-->
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
        <modal name="serviceCodeModal" :width="870" :height="570" @before-close="beforeClose">
            <t-modal-sub-container :title="'业务代码选择'" :name="'serviceCodeModal'">
                <v-service-code-list :modalName="'serviceCodeModal'"></v-service-code-list>
            </t-modal-sub-container>
        </modal>
        <!--渠道Idmodal-->
        <modal name="channelIdListModal" :width="870" :height="570" @before-close="beforeClose">
            <t-modal-sub-container :title="'渠道Id选择'" :name="'channelIdListModal'">
                <v-channel-id-list :modalName="'channelIdListModal'"></v-channel-id-list>
            </t-modal-sub-container>
        </modal>
        <!--资费计划id modal-->
        <modal name="planIdListModal" :width="870" :height="570" @before-close="beforeClose">
            <t-modal-sub-container :title="'选择资费计划'" :name="'planIdListModal'">
                <v-plan-id-list :modalName="'planIdListModal'"></v-plan-id-list>
            </t-modal-sub-container>
        </modal>
    </div>
</template>
<script>
    import TModalSubContainer from "@/components/modal-sub-container";
    import VAreaChose from '@/pages/contractProduct/children/contractProductAdd/components/area-chose.vue'
    import VSelectBox from '@/components/select-box'
    import VDate from '@/components/date'
    import VServiceCodeList from  '@/pages/contractProduct/children/contractProductAdd/components/service-code-list.vue'
    import VChannelIdList from  '@/pages/contractProduct/children/contractProductAdd/components/channel-id-list.vue'
    import VPlanIdList from  '@/pages/contractProduct/children/contractProductAdd/components/plan-id-list.vue'
    //表单注入
    import {required, minLength, maxLength, numeric, between} from 'vuelidate/lib/validators';

    export default{
        props: ['productDistList'],
        data(){
            return {
                formData: {
                    productName: '',        //产品名称
                    productDesc: '',        //产品描述
                    searchKey: '',          //搜索关键字
                    effectiveWay: '1',       //生效方式    默认立即生效
                    effectiveTime: '',       //生效时间
                    expireTime: '',          //失效时间
                    attributionCode: '',     //归属地编码
                    attributionText: '',     //归属地名称
                    channelIds: '',           //渠道Id
                    catalogId: '1111',            //目录Id
                    isVip: '1',     //是否会员 1：会员 0 ：包月
                    isExperience: '1',         //是否体验产品 1：是 0 ：正式产品
                    expCycleUnitNum: '1',  //体验产品周期数
                    expCycleUnit: '2', //体验产品周期单位 0：天 1：周 2：月 3：年
                    payType: [], //支付方式 1：话费支付 2：第三方支付
                    pts: [],
                    ifUseServiceCode: '1',     //是否使用业务代码,

                    planIds: '',              //资费计划
                },
                payType1: {    //接收不了嵌套验证，单独提取出来，最后再添加进去
                    serviceCode: '',
                    price: '',
                    payType: '1',
                    companyCode: '',
                    feeType: '1',
                    isReorder: '0',
                    cycleUnitNum: '-1',
                    cycleUnit: '2',     //默认月 ：2
                    cycleUnitSelect: '0'
                },
                payType2: {
                    payType: '2',
                    price: '',
                    feeType: '2',
                    isReorder: '0',
                    cycleUnitNum: '1',
                    cycleUnit: '2',
                    cycleUnitSelect: '0'

                },       //接收不了嵌套验证，单独提取出来，最后再添加进去
                planIdTableData:[],
                errorMsg: {
                    productName: '请输入产品名',
                    searchKey: '请输入搜索关键字',
                    effectiveTime: '请输入生效时间',
                    expireTime: '请输入失效时间',
                    attributionText: '请输入业务归属地',
                    channelIds: '请输入渠道Id',
                    catalogId: '请选择产品目录',
                    expCycleUnitNum: '请输入体验产品周期数',
                    payType1: {
                        price: '请输入数字类型的金额',
                        cycleUnitNum: '请输入产品周期'
                    },
                    payType2: {
                        price: '请输入数字类型的金额',
                        cycleUnitNum: '请输入产品周期'
                    }
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
                    expCycleUnitList: [
                        {
                            optionText: '天', optionValue: '0'
                        }, {
                            optionText: '周', optionValue: '1'
                        }, {
                            optionText: '月', optionValue: '2'
                        }, {
                            optionText: '年', optionValue: '3'
                        }
                    ],
                    cycleUnitList: [
                        {
                            optionText: '天', optionValue: '0'
                        }, {
                            optionText: '周', optionValue: '1'
                        }, {
                            optionText: '月', optionValue: '2'
                        }, {
                            optionText: '年', optionValue: '3'
                        }
                    ]
                }
            }
        },
        validations: {
            formData: {
                //产品名称
                productName: {
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
                channelIds: {
                    required
                },
                //目录Id
                catalogId: {
                    required
                },
                //体验产品周期数
                expCycleUnitNum: {
                    required,
                    numeric
                },
                //支付方式
                payType: {
                    required
                },
                //支付数组
                pts: {},
                //资费计划
                planIds:{
                    required
                }
                
                
                
                /*   catalogId: '',           //目录Id
                 isVip: '1',    //是否会员 1：会员 0 ：包月
                 isExperience: '1',       //是否体验产品 1：是 0 ：正式产品
                 expCycleUnitNum: '', //体验产品周期数
                 expCycleUnit: '0', //体验产品周期单位 0：天 1：周 2：月 3：年
                 payType: [],               //支付方式 1：话费支付 2：第三方支付
                 ifUseServiceCode: '1',     //是否使用业务代码,
                 serviceCode: '',         //计费代码？业务代码
                 companyCode: '',        //企业code
                 price: '',          //资费金额
                 feeType: '1',           //资费类型  1：包月 2：点播
                 isReorder: '0',         //是否重复订购
                 cycleUnitNum: '',        //周期单位数 -1：永久有效
                 cycleUnit: '',            // 周期单位 0：天 1：周 2：月 3：年
                 
                 
                 businessArea: '',
                 vipProduct: '1',
                 repeatBuy: '1',
                 useCode: '1'*/
            },
            payType1: {
                price: {
                    required,
                    numeric
                },
                cycleUnitNum: {
                    required
                },
            },
            payType2: {
                price: {
                    required,
                    numeric
                },
                cycleUnitNum: {
                    required
                },
            },

            validationGroup: ['formData.productName', 'formData.searchKey',
                 'formData.effectiveTime','formData.expireTime','formData.attributionText','formData.channelIds','formData.catalogId', 'formData.payType','formData.planIds']
        },
        computed: {
            ifUseServiceCode(){
                return this.formData.ifUseServiceCode == '1';
            },
            feeType(){
                return this.formData.ifUseServiceCode == '1' ? '1' : '2';
            },
            feeTypeText(){
                return this.formData.ifUseServiceCode == '1' ? '包月' : '点播';
            },
            showCycleUnitNumBox(){
                return this.formData.ifUseServiceCode == '1';
            },
            canSave(){
                var flag = true;
                if (!this.$v.validationGroup.$error && !this.$v.validationGroup.$invalid) {  //经过第一层的表单验证
                    if (this.formData.isExperience == '1') {
                        //体验产品
                        flag = this.formData.expCycleUnitNum.length >= 1
                    }

                    if (this.formData.payType.contains('1')) {      //选择了话费支付         金额,业务代码，产品周期数必须存在

                        if (!/^\d+$/g.test(this.payType1.price)) {
                            flag = false
                        }

                        //使用了业务代码
                        if (this.formData.ifUseServiceCode == '1') {
                            if (!this.payType1.serviceCode.length >= 1) {
                                flag = false
                            }
                        } else {
                            if (!/^\d+|-\d+$/g.test(this.payType1.cycleUnitNum)) flag = false
                        }
                    }

                    if (this.formData.payType.contains('2')) {
                        if (!/^\d+|-\d+$/g.test(this.payType2.price)) {
                            flag = false
                        }
                        if (!/^\d+|-\d+$/g.test(this.payType2.cycleUnitNum)) {
                            flag = false
                        }
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
            VServiceCodeList,
            VChannelIdList,
            VPlanIdList
        },
        methods: {
            /**
             * 保存数据
             * */
            save(){
                if(this.formData.payType.contains('1')){
                    this.formData.pts.push(this.payType1)
                }
                if(this.formData.payType.contains('2')){
                    this.formData.pts.push(this.payType2)
                }
                
                this.$http.post(this.api.saveContractProductOne, this.formData, {emulateJSON: true}).then(
                    res => {
                        
                    }
                );
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
            choseServiceCode(){
                this.$modal.show('serviceCodeModal')
            },

            /**
             * 选择渠道id
             * */
            choseChannelId(){
                this.$modal.show('channelIdListModal');
            },

            /**
             * 选择资费计划
             * */
            chosePlanId(){
                this.$modal.show('planIdListModal');
            },

            /**
             * 跳到下一步
             * */
            nextStep(){
              /*  this.bus.$emit('curStep', 2);
                this.$router.push({'name': 'Step2'});*/

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
            remove(item, itemPre){
                if (itemPre) {
                    this[itemPre][item] = '';
                }
            }
        },
        //watch 不要用箭头函数的写法
        watch: {
            /**
             * 监听资费类型
             * a=='0' 不使用业务代码，清空数据重新填
             * a=='1' 使用业务代码
             * */
            'formData.ifUseServiceCode'(a, b) {
                if (a == '1') {    //使用业务代码
                    this.payType1.feeType = '1';             //重置资费类型
                    this.payType1.price = '';                //重置金额
                    this.payType1.serviceCode = '';             //重置业务代码
                    this.formData.cycleUnitNum = '-1';       //重置产品周期数：默认永久有效-1
                    this.formData.cycleUnit = '';                 //重置产品周期单位
                } else {
                    this.formData.serviceCode = '';       //重置业务代码
                    this.payType1.feeType = '2';          //重置资费类型
                    this.payType1.feeType = '2';           //重置资费类型
                    this.payType1.price = '';             //重置资费金额
                    this.payType1.companyCode = '';      //重置企业代码
                    this.payType1.cycleUnitNum = '1';     //重置产期周期默认1
                    this.payType1.periodUnit = '2';        //默认月是2
                }
            },
            'formData.isExperience'(a, b){
                this.formData.expCycleUnitNum = '';
                if (a == '1') {  //是
                    this.formData.expCycleUnit = '2';
                    this.formData.expCycleUnitNum = '1';
                } else {
                    this.formData.expCycleUnit = '';
                }
            },
            'formData.payType'(a, b){
                if (a.contains('1')) {       //如果包含话费支付

                } else {

                }
                if (a.contains('2')) {        //如果包含第三方支付

                } else {

                }

            },
            'payType1.cycleUnitSelect'(a, b){
                if (a == 0) {               //有限周期
                    this.payType1.cycleUnitNum = '1';
                } else {
                    this.payType1.cycleUnitNum = '-1';
                }
            },
            'payType2.cycleUnitSelect'(a, b){
                if (a == 0) {               //有限周期
                    this.payType2.cycleUnitNum = '1';    //重置初始
                } else {
                    this.payType2.cycleUnitNum = '-1';    //重置初始-1
                }
            }
        },
        mounted () {
            let that = this;
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
             * 获取下拉框的值
             * */
            this.bus.$on('selectBoxBus', res => {
                if (res.selectBoxName == 'productDistListSelectBox') {
                    this.formData.expCycleUnit = res.selectOption.optionValue;
                }
                if (res.selectBoxName == 'expCycleUnitListSelectBox') {
                    this.formData.catalogId = res.selectOption.optionValue;
                }
                if (res.selectBoxName == 'effectiveWaySelectBox') {
                    this.formData.effectiveWay = res.selectOption.optionValue;
                }

                if (res.selectBoxName == 'payType1UnitSelectBox') {               //获取支付方式1 的产品周期
                    this.payType1.cycleUnitSelect = res.selectOption.optionValue;
                }

                if (res.selectBoxName == 'payType1CycleUnitListSelectBox') {     //获取支付方式1 单位表
                    this.payType1.cycleUnit = res.selectOption.optionValue;
                }

                if (res.selectBoxName == 'payType2UnitSelectBox') {              //获取支付方式2 的产品周期
                    this.payType2.cycleUnitSelect = res.selectOption.optionValue;

                }

                if (res.selectBoxName == 'payType2CycleUnitListSelectBox') {     //获取支付方式2 的 单位表
                    this.payType2.cycleUnit = res.selectOption.optionValue;
                }
            });


            /**
             * promise
             * 获取日历的值
             * */
            this.bus.$on('dateBus', res => {
                if (res.dateName == 'effectiveTime') {
                    this.formData.effectiveTime = res.dateValue;
                }
                if (res.dateName == 'expireTime') {
                    this.formData.expireTime = res.dateValue;
                }
            });

            /**
             * 获取业务代码的值
             * */
            this.bus.$on('serviceCodeBus', res => {
                //有数据传过来
                if (res || res.ifHasData) {
                    this.payType1.serviceCode = res.serviceCode;
                    this.payType1.price = res.price;
                    this.payType1.companyCode = res.companyCode;
                }
            });

            /**
             * 获取渠道id的值
             * */
            this.bus.$on('channelIdBus', res => {
                //有数据传过来
                let channelIdArr = [];
                if (res) {
                    res.forEach(function (item, index) {
                        channelIdArr.push(item.channelId);
                    });
                    this.formData.channelIds = channelIdArr.join('|');
                }
            })

            /**
             * 获取资费计划id的值
             * */
            this.bus.$on('planIdBus', res => {
                //有数据传过来
                let planIdArr = [];
                if (res) {
                    res.forEach(function (item, index) {
                        planIdArr.push(item.planId);
                    });
                    this.formData.planIds = planIdArr.join('|');
                    this.planIdTableData=res;
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