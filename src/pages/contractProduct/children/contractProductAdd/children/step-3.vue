<template>
    <div class="add-step-3">
        <div class="form-wrap ">
            <div class="form-row">
                <div class="row-left required">
                    是否体验产品：
                </div>
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
                <div class="row-left required">
                    体验产品周期：
                </div>
                <div class="row-right">
                    <input v-model="formData.experiencePeriodUnitNum"
                           class="form-input vt-middle mr-10 w-80"
                           type="number" placeholder="请选择">

                    <div class="layout-inline-middle">
                        <div class="inline-dom">
                            <v-select-box
                                :w="'105'"
                                :selectTitle="'天'"
                                :selectBoxName="'experienceProductCycle'"
                                v-bind:options="dateUnitList">
                            </v-select-box>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="row-left">
                    限制发送提示短信省份：
                </div>
                <div class="row-right">
                    <input class="form-input pointer w-200"
                           v-model="formData.businessAreaText"
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
                    <textarea class="textarea-module"
                              @click="showPromptSmsModal"
                              placeholder="请选择">
                      {{promptSmsItem.content}}
                    </textarea>

                    <i class="icon icon-select"></i>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left">
                    订购成功下发推荐短信：
                </div>
                <div class="row-right">
                    <textarea class="textarea-module"
                              @click="showRecommendSmsModal"
                              placeholder="请选择">
                      {{recommendSmsItem.content}}
                    </textarea>

                    <i class="icon icon-select"></i>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left">
                    互斥产品添加：
                </div>
                <div class="row-right">
                    <textarea class="textarea-module"
                              placeholder="请选择"
                              @click="showMutexProduct"
                              v-for="item in mutexProductList">
                      {{item.content}}
                    </textarea>

                    <i class="icon icon-select"></i>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left">
                    依赖产品：
                </div>
                <div class="row-right">
                    <input class="form-input w-340"
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
                        <div class="btn btn-primary btn-middle" @click="nextStep" >完成</div>
                        <div class="btn btn-default btn-middle" >取消</div>
                    </div>
                </div>
            </div>
        </div>

        <modal name="areaChoseModal" :width="800" :height="440" @before-close="beforeClose">
            <t-modal-sub-container :title="'选择业务归属地'" :name="'areaChoseModal'">
                <v-area-chose
                    :modal-name="'areaChoseModal'"
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
    </div>
</template>
<script>
    import VSelectBox from '@/components/select-box';
    import TModalSubContainer from "@/components/modal-sub-container";
    import VSmsList from '@/pages/contractProduct/children/contractProductAdd/components/sms-list';
    import VAreaChose from '@/pages/contractProduct/children/contractProductAdd/components/area-chose'
    import VPaging from '@/components/paging'

    import VProductSelectModal from '../components/product-select-modal'

    export default{
        data(){
            return {
                formData: {
                    free: 1,
                    businessAreaText: '',
                    businessCode: '',
                    dateUnit: '0',
                    experiencePeriodUnitNum: ''
                },
                dateUnitList: [
                    {
                        optionText: '天',
                        optionValue: '0'
                    },
                    {
                        optionText: '周',
                        optionValue: '1'
                    },
                    {
                        optionText: '月',
                        optionValue: '2'
                    },
                    {
                        optionText: '年',
                        optionValue: '3'
                    }
                ],
                smsTitle: '',
                productSelectTitle: '',
                productType: '',
                smsType: '',
                promptSmsItem: {},
                recommendSmsItem: {},
                mutexProductList: [{
                    id: '',
                    content: ''
                }],
                relyProductItem: {}
            }
        },
        components: {
            VSelectBox,
            VAreaChose,
            TModalSubContainer,
            VSmsList,
            VPaging,
            VProductSelectModal
        },
        methods: {
            nextStep(){
                this.bus.$emit('curStep', 3);
                this.$router.push({'name': 'Step3'});
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            },
            /**
             * 显示地方
             * */
            showAreaChoseModal(){
                this.$modal.show('areaChoseModal');
            },
            beforeClose(){},

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

                this.smsType = '2';

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

                    this.formData.businessAreaText = areaNameArr.join('|');
                    this.formData.businessCode = areaCodeArr.join('|');
                }
            });

            /**
             * 获取体验产品周期单位下拉框数据
             * */
            this.bus.$on('selectBoxBus',res=>{
                if (res.selectBoxName == 'experienceProductCycle') {
                    this.formData.dateUnit = res.optionValue;
                }
            });

            /*
            * 获取选择的短信模板信息
            * */
            this.bus.$on('getSelectSms', res=> {
                if (res) {

                    if(this.smsType === '1') {

                        this.promptSmsItem = res;
                    } else {

                        this.recommendSmsItem = res;
                    }
                    //console.log("List111: " + JSON.stringify(res));
                }
            });

            /*
             * 获取选择的互斥和依赖产品信息
             * */
            this.bus.$on('getSelectProduct', res=> {
                if (res) {

                    if(this.productType === '1') {

                      this.mutexProductList = res;
                    } else {

                      this.relyProductItem = res;
                    }
                    //console.log("getSelectProduct: " + JSON.stringify(res));
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
</style>
