<template>
    <div class="add-step-3">
        <div class="form-wrap ">
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

                            <div class="second">{{item.id}}</div>
                        </div>
                    </div>

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
                        <div class="btn btn-primary btn-middle" @click="save">完成</div>

                        <div class="btn btn-default btn-middle" >取消</div>
                    </div>
                </div>
            </div>
        </div>

        <modal name="areaChoseModal" :width="800" :height="520" @before-close="beforeClose">
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
<script type="es6">
    import TModalSubContainer from "@/components/modal-sub-container";
    import VSmsList from '@/pages/contractProduct/children/contractProductAdd/components/sms-list';
    import VAreaChose from '@/pages/contractProduct/children/contractProductAdd/components/area-chose.vue'
    import VPaging from '@/components/paging'

    import VProductSelectModal from '../components/product-select-modal'

    export default{
        data(){
            return {
                formData: {
                    limitSmsAreas: '',
                    //limitSmsAreasCode: '',
                    //pdContractProductCodes: '', //第二步添加产品成功返回产品ID，传到第三步。
                    promptSmsCodes: '',
                    recommendCodes: '',
                    mutuallyProductCodes: [],
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
        components: {
            VAreaChose,
            TModalSubContainer,
            VSmsList,
            VPaging,
            VProductSelectModal
        },
        methods: {
            /**
             * 保存数据
             * */
            save(){

                console.log("formata: " + JSON.stringify(this.formData));

                this.$http.post(this.api.saveContractProductThree, this.formData, {emulateJSON: true}).then(
                    res => {

                    }
                );
            },
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
                        areaNameArr.push(item.attributionName);
                        areaCodeArr.push(item.attributionCode);
                    });

                    this.formData.limitSmsAreas = areaNameArr.join(',');
                    //this.formData.limitSmsAreasCode = areaCodeArr.join(',');
                }
            });

            /*
            * 获取选择的短信模板信息
            * */
            this.bus.$on('getSelectSms', res=> {
                if (res) {

                    if(this.smsType === '1') {

                        this.promptSmsItem = res;

                        this.formData.promptSmsCodes = this.promptSmsItem.id;
                    } else {

                        this.recommendSmsItem = res;

                        this.formData.recommendCodes = this.recommendSmsItem.id;
                    }
                    //console.log("List111: " + JSON.stringify(res));
                }
            });

            /*
             * 获取选择的互斥和依赖产品信息
             * */
            this.bus.$on('getSelectProduct', res=> {
                let mutuallys = [];

                if (res) {

                    if(this.productType === '1') {

                        this.mutexProductList = res.data;

                        res.forEach(function (item, index) {

                            mutuallys.push(item.id);
                        });

                        this.formData.mutuallyProductCodes = mutuallys.join('|');

                        console.log("mutuallyProductCodes: " + JSON.stringify(this.formData.mutuallyProductCodes));

                    } else {

                        this.relyProductItem = res.data;

                        this.formData.dependentProductCodes = this.relyProductItem.id;
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

    .mutex-product-item {
        .item {
            >div, hr {
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
