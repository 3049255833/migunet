<template>
    <div class="add-step-3">
        <div class="form-wrap ">
            <div class="form-row">
                <div class="row-left required">
                    CP/SP ID：
                </div>
                <div class="row-right">
                    <div v-if="false"
                         class="not-allowed textarea-module w-500 pd-10"
                         type="text">
                        <i class="icon icon-select"></i>
                    </div>
                    <div v-else class="textarea-module w-500 pd-10"
                         type="text"
                         @click="chosePlanCode">

                        <table class="table-module" v-if="0>0">
                            <thead>
                              <tr>
                                  <td>企业名称</td>
                                  <td>企业代码</td>
                              </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in planCodeTableData">
                                    <td>{{item.planCode}}</td>
                                    <td>{{item.planName}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <i class="icon icon-select"></i>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">发送平台：</div>
                <div class="row-right">
                    <div class="radio-wrap">
                        <label class="checkbox-module w-70">
                            <input value="0" type="checkbox">
                            <span></span>
                            <span class="txt">彩印</span>
                        </label>

                        <label class="checkbox-module w-70">
                            <input value="1" type="checkbox">
                            <span></span>
                            <span class="txt">彩铃</span>
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
                    <div class="textarea-module"
                         @click="showPromptSmsModal"
                         readonly
                         placeholder="请选择">{{promptSmsItem.templateContent}}
                    </div>
                    <i class="icon icon-select"></i>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left">
                    订购成功下发推荐短信：
                </div>

                <div class="row-right">
                    <div class="textarea-module"
                         @click="showRecommendSmsModal"
                         readonly
                         placeholder="请选择"> {{recommendSmsItem.templateContent}}
                    </div>
                    <i class="icon icon-select"></i>
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
                        <div class="btn btn-default btn-middle" @click="cancel">取消</div>
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

    export default{
        components: {
            VAreaChose,
            TModalSubContainer,
            VSmsList,
            VPaging,
            VProductSelectModal,
            VToast
        },
        data(){
            return {
                addResultMsg:'',
                formData: {
                    limitSmsAreas: '',
                    //limitSmsAreasCode: '',
                    //pdContractProductCodes: '', //第二步添加产品成功返回产品ID，传到第三步。
                    promptSmsCodes: '',
                    recommendCodes: '',
                    mutuallyProductCodes: '',
                    dependentProductCodes: ''
                },
                smsTitle: '',
                productSelectTitle: '',
                productType: '',
                smsType: '',
                promptSmsItem: {},
                recommendSmsItem: {},
                mutexProductList: [],
                relyProductItem: {}
            }
        },
        methods: {
            /**
             * 保存数据
             * */
            save(){
                this.$emit('step3Bus', {
                    step: 3,
                    data: this.formData
                })
            },

            test(){
                this.addResultMsg = '新增成功';
                this.$modal.show('addResultMsgModal');
            },

            /**
             * 取消
             * */
            cancel(){
                this.$router.push({'name': 'ContractProduct'});
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
                    //this.formData.limitSmsAreasCode = areaCodeArr.join(',');
                }
            },

            /**
             * 显示地方
             * */
            showAreaChoseModal(){
                this.$modal.show('areaChoseModal');
            },

            beforeClose(){

            },

            /**
             * 调用订购成功下发提示短信模板弹框
             * */
            showPromptSmsModal(){
                this.smsTitle = '动漫包提示短信模板选择';

                this.smsType = '2';

                this.$modal.show('smsListModal');
            },

            /**
             * 调用订购成功下发推荐短信模板弹框
             * */
            showRecommendSmsModal(){
                this.smsTitle = '动漫包推荐短信模板选择';

                this.smsType = '1';

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
             /*   if (!this.formData.limitSmsAreas) {
                    flag = false
                }

                if (!this.formData.promptSmsCodes) {
                    flag = false
                }

                if (!this.formData.recommendCodes) {
                    flag = false
                }*/

              /*  if (!this.formData.mutuallyProductCodes) {
                    flag = false
                }

                if (!this.formData.dependentProductCodes) {
                    flag = false
                }*/
                return flag
            }
        },
        mounted () {

            /*
             * 获取选择的短信模板信息
             * */
            this.bus.$on('getSelectSms', res => {
                if (res) {

                    if (this.smsType === '1') {

                        this.recommendSmsItem = res;

                        this.formData.recommendCodes = this.recommendSmsItem.id;


                    } else {

                        this.promptSmsItem = res;


                        this.formData.promptSmsCodes = this.promptSmsItem.id;


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
        },
        destroyed(){
            this.bus.$off('getSelectSms');

            this.bus.$off('getSelectProduct');

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
