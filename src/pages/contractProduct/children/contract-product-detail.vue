<template>
    <div class="contract-product-detail">
        <div class="main-wrapper">
            <div class="add-product-wrapper">
                <div class="add-main">
                    <div class="review-flow-box">
                        <div class="add-title">审批工作流</div>
                        <table class="table-module">
                            <thead>
                            <tr>
                                <td width="240">提交时间</td>
                                <td>提交人</td>
                                <td>申请类型</td>
                                <td>审批结果</td>
                                <td>审批失败原因</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>2017/08/22 09:30</td>
                                <td>21222222</td>
                                <td>变更审批</td>
                                <td>
                                    <div class=" review-fail-pass">
                                        <i class="icon icon-fail-pass mr-5"></i>
                                        <span class="cl-fail-pass vt-middle">不通过</span>
                                    </div>
                                </td>
                                <td>价格高于审批价格</td>
                            </tr>
                            <tr>
                                <td>2017/08/22 09:30</td>
                                <td>21222222</td>
                                <td>变更审批</td>
                                <td>
                                    <div class=" review-pass">
                                        <i class="icon icon-pass mr-5"></i>
                                        <span class="cl-pass vt-middle">通过</span>
                                    </div>
                                </td>
                                <td>价格高于审批价格</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="table-wrapper">
                        <div class="add-title">
                            产品管理新增
                        </div>
                        <div class="product-detail-head">
                            <div class="item layout-center-y">
                                <div class="item-img"></div>
                                <div class="item-txt">
                                    <p>
                                        {{product.productName}}
                                    </p>
                                    <p>
                                        产品名称
                                    </p>
                                </div>
                            </div>
                            <div class="item layout-center-y">
                                <div class="item-img"></div>
                                <div class="item-txt">
                                    <p>
                                        {{product.id}}
                                    </p>
                                    <p>
                                        产品ID
                                    </p>
                                </div>
                            </div>

                            <div class="item layout-center-y">
                                <div class="item-img"></div>
                                <div class="item-txt">
                                    <p>
                                        {{product.status}}
                                    </p>
                                    <p>
                                        产品状态
                                    </p>
                                </div>
                            </div>

                            <div class="btn-group layout-center-y">
                                <button class="btn btn-primary btn-middle"
                                  @click="revocation">撤销</button>

                                <button class="btn-default btn btn-middle"
                                  @click="offline">下线</button>
                            </div>
                        </div>
                    </div>
                    <div class="lay-wrapper-three">
                        <div class="lay-wrapper">
                            <div class="lay-title">
                                基本信息
                            </div>

                            <div class="info-wrap clearfix">
                                <div class="fl w-50">
                                    <div class="layout-row">
                                        <span class="row-left"> 产品描述：</span>
                                        <span class="row-right">
                                            {{product.productDesc}}
                                        </span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left"> 生效时间：</span>
                                        <span class="row-right">{{product.createTime}}</span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left"> 业务归属地：</span>
                                        <span class="row-right">
                                            中国移动
                                        </span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left"> 是否会员产品：</span>
                                        <span class="row-right">
                                            非会员
                                        </span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left"> 是否体检产品：</span>
                                        <span class="row-right">

                                        </span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left"> 创建用户：</span>
                                        <span class="row-right">
                                            {{product.createUser}}
                                        </span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left"> 限定短信发送省份：</span>
                                        <span class="row-right">
                                            江苏省、浙江省
                                        </span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left"> 订购成功下发送推荐短信：</span>
                                        <span class="row-right">
                                            2017/08/21 16:00
                                        </span>
                                    </div>
                                    <div class="layout-row  no-pb">
                                        <div class="row-left"> 互斥产品：</div>
                                        <div class="row-right">
                                            <div>动漫5元包 | 200192938</div>
                                            <div>南京2017音乐包合集 | 2039338228</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="fl w-50">
                                    <div class="layout-row">
                                        <span class="row-left"> 搜索关键字：</span>
                                        <span class="row-right">

                                        </span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left"> 失效时间：</span>
                                        <span class="row-right">

                                        </span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left"> 产品目录：</span>
                                        <span class="row-right">
                                            目录名称(日本漫画)
                                        </span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left"> 是否重复订购：</span>
                                        <span class="row-right">
                                            是
                                        </span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left"> 体验产品周期：</span>
                                        <span class="row-right">

                                        </span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left"> 创建时间：</span>
                                        <span class="row-right">

                                        </span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left"> 订购成功下发提示短信：</span>
                                        <span class="row-right">
                                            恭喜您，成功订购每日一笑业务！
                                        </span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left"> 合作伙伴：</span>
                                        <span class="row-right">

                                        </span>
                                    </div>
                                    <div class="layout-row no-pb">
                                        <span class="row-left"> 依赖产品：</span>
                                        <span class="row-right">
                                            动漫5元 | 2091272726626
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="lay-wrapper">
                            <div class="lay-title">
                                资费信息
                            </div>
                            <div class="info-wrap clearfix">
                                <div class="fl w-50">
                                    <div class="layout-row">
                                        <span class="row-left"> BOOS计费代码 ：</span>
                                        <span class="row-right">

                                        </span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left"> 计费类型 ：</span>
                                        <span class="row-right">

                                        </span>
                                    </div>
                                    <div class="layout-row scheme-list">
                                        <div class="row-left"> 计费策略 ：</div>
                                        <div class="row-right">
                                            <div class="scheme-item">
                                                <h4>方案一</h4>

                                                <div class="item">
                                                    <span class="left"> 资费ID ：</span>
                                                    <span class="right">
                                                        E1020293873
                                                    </span>
                                                </div>

                                                <div class="item">
                                                    <span class="left"> 计划名称 ：</span>
                                                    <span class="right">
                                                        E1020293873
                                                    </span>
                                                </div>

                                                <div class="item">
                                                    <span class="left"> 计划说明 ：</span>
                                                    <span class="right">
                                                        白金会员折后优惠：满足，会员级别与(1,2,3)并且,公司级别等于(5)后者，消费金额大于300 满足条件：内容类型=漫画 并且 产品编号等于漫画（100929828）
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="scheme-item">
                                                <h4>方案二</h4>

                                                <div class="item">
                                                    免费
                                                </div>

                                                <div class="item">
                                                    <span class="left"> 满足条件 ：</span>
                                                    <span class="right">
                                                        内容类型=漫画 并且 产品编号等于漫画（100929828）
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="fl w-50">
                                    <div class="layout-row">
                                        <span class="row-left"> 价格(分CN) ：</span>
                                        <span class="row-right">

                                        </span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left"> 支付方式 ：</span>
                                        <span class="row-right">

                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="lay-wrapper">
                            <div class="lay-title" >
                                渠道信息
                            </div>
                            <div class="layout-row-area">
                                <div class="layout-row-wrapper layout-row-wrapper1">
                                    <div class="layout-row">
                                        <span class="row-left"> BOOS计费代码：</span>
                                        <span class="row-right">
                                            BOOS计费代码
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="button-box">
                            <button class="btn btn-default btn-middle"
                                    @click="hide">隐藏</button>
                            <button class="btn-default btn btn-middle"
                                    @click="logout">注销</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <v-confirm-popover-modal
            :confirmInfo="confirmInfo"
            :isHideConfim="isHideConfim"
            details="details"
            v-bind:style="styleComfirm">
        </v-confirm-popover-modal>

        <v-operate-success-modal
            :isHideOperateModal="isHideOperateModal"
            :operateInfo="operateInfo"
            v-bind:style="styleOperateSuccess">
        </v-operate-success-modal>
    </div>
</template>
<script type="es6">
    import vNav from "@/components/common/Nav"
    import vPop from "@/components/common/Pop"
    import InfoTable from "@/components/common/InfoTable"
    import ConfirmBtn from "@/components/common/Button1"
    import CancelBtn from "@/components/common/Button2"
    import VConfirmPopoverModal from '@/components/confim-modal/confirm-popover-modal'
    import VOperateSuccessModal from '@/components/operate-modal/operate-success-modal'

    export default {
        name: 'Review',
        components: {
            vPop,
            ConfirmBtn,
            CancelBtn,
            VConfirmPopoverModal,
            VOperateSuccessModal
        },
        data (){
            return {
                productCode: this.$route.params.productCode,
                product: {},
                payTypes: [],
                serviceCodes: [],
                confirmInfo: '',
                isHideConfim: true,
                isHideOperateModal: true,
                operateInfo: '',
                styleComfirm: {
                    top: '19.5%',
                    right: '2%'
                },
                styleOperateSuccess: {
                  top: '18%',
                  right: '50%'
                }
            }
        },
        created(){
            this.getContractProductDetail(this.productCode);

            /**
             * 接收来自确认modal框的信息
             * */
            this.bus.$on('sendDetailsConfirmInfo', res => {
                this.isHideConfim = true;

                this.operateInfo = '操作成功';

                this.isHideOperateModal = false;

                if(this.confirmInfo === '是否撤销该产品' || this.confirmInfo === '是否下线该产品') {

                    this.styleOperateSuccess.top = '18%';
                } else {

                    this.styleOperateSuccess.top = '85%';
                }

                let that = this;

                setTimeout(function () {

                  that.isHideOperateModal = true;

                }, 3000);
            });

            /**
             * 接收来自取消modal框的信息
             * */
            this.bus.$on('sendDetailsCancelInfo', res => {
                this.isHideConfim = true;
            });
        },
        methods: {
            /**
             * 获取单品详情
             * @param productCode 产品 string
             * */
            getContractProductDetail(productCode) {
                console.log("productCode: " + productCode);

                this.$http.get(this.api.getContractProductDetail,
                    {
                        params: {
                          productCode: productCode || ''
                        }
                    }).then(response => {

                        let res = response.body;

                        if (res.result.resultCode == '00000000') {
                            //todo: 注意，返回的字段这里list小写
                            this.product = res.product;

                            this.payTypes = res.product.paytypes;

                            this.serviceCodes = res.product.serviceCodes;

                            //console.log("res: " + JSON.stringify(this.paytypes));

                            //console.log("product: " + JSON.stringify(this.product));

                        } else {

                        }
                })
            },

            offline() {
                this.isHideConfim = false;

                this.styleComfirm.top = '19.5%';

                this.styleComfirm.right = '3.5%';

                this.confirmInfo = "是否下线该产品";
            },

            revocation() {
                this.isHideConfim = false;

                this.styleComfirm.top = '19.5%';

                this.styleComfirm.right = '12.5%';

                this.confirmInfo = "是否撤销该产品";
            },

            hide() {
                this.isHideConfim = false;

                this.styleComfirm.top = '91%';

                this.styleComfirm.right = '10.5%';

                this.confirmInfo = "是否隐藏该产品";
            },

            logout() {
                this.isHideConfim = false;

                this.styleComfirm.top = '91%';

                this.styleComfirm.right = '0.6%';

                this.confirmInfo = "是否注销该产品";
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    $image-base-path: '../../../assets/';
    @mixin bg($URI, $w: null, $h: null, $x: top, $y: center, $repeat: no-repeat) {
        @if $w and $h {
            width: $w;
            height: $h;
        }
        background: url('#{$image-base-path}#{$URI}') $repeat $x $y;
        background-size: 100% 100%;
    }

    .review-flow-box {
        background-color: #fff;

        .review-list {
            width: 100%;
        }
    }

    .button-box {
        text-align: right;

        button {
            margin-right: 20px;
        }
    }

    .scheme-list {
        overflow: hidden;

        h4 {
            font-weight: 600;
        }

        .row-left {
            float: left;
        }

        .row-right {
            float: left;
            width: 370px;

            .scheme-item:last-child {
                margin-top: 25px;
            }

            .item {
                margin: 5px 0;
            }

            .scheme-item:first-child {
                .item:last-child {
                    letter-spacing: 1.2px;
                    line-height: 16px;
                }
            }

            .scheme-item {
                color: #333;
            }
        }
    }

    .info {
        width: 808px;
        padding: 20px 0;
        border: solid 1px #d6e1e5;
        position: relative;
        margin-top: 10px;
    }

    .info:before {
        content: '';
        position: absolute;
        left: 80px;
        top: -9px;
        width: 20px;
        height: 10px;
        background: url("../../../assets/arrow-up.png") #ffffff no-repeat;
    }

    .lable1 {
        width: 30px;
        display: inline;
        margin-right: 20px;
    }

    .lable1 > input {
        display: inline-block;
        width: 15px;
        height: 15px;
        box-sizing: border-box;
    }

    .tb-reset {
        display: inline-block;
        font-size: 14px;
        color: #46bafe;
        width: 74px;
        height: 32px;
        background: #fff;
        line-height: 32px;
        border: 1px solid #46bafe;
        cursor: default;
        box-sizing: border-box;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
    }

    /*.tb-reset:hover{

    }*/
    .tb-search {
        background: #46bafe;
        color: #ffffff;
    }

    .l-content-w {
        margin-right: 20px;
    }

    .step-wrapper {
        padding: 20px 0;
        background: #f2f8ff;
    }

    .step {
        width: 483px;
        margin: 0 auto;
        position: relative;
    }

    .step:before {
        content: '';
        width: 420px;
        display: block;
        height: 1px;
        background: #d6e1e5;
        position: absolute;
        left: 30px;
        top: 23px;
    }

    .step:after {
        content: '';
        clear: both;
        display: block;
    }

    .step-item {
        float: left;
    }

    .step-item + .step-item {

        margin-left: 145px;
    }

    .step-text {
        text-align: center;
        color: #171717;
        font-size: 12px;
        margin-top: 8px;
    }

    .step-circle {
        width: 45px;
        height: 45px;
        border: solid 1px #d6e1e5;
        position: relative;
        border-radius: 50%;
        margin: 0 auto;
        background: #f2f8ff;
    }

    .step-circle:after {
        content: '';
        position: absolute;
        width: 24px;
        height: 24px;
        background: #d6e1e5;
        left: 50%;
        top: 50%;
        margin-left: -12px;
        margin-top: -12px;
        border-radius: 50%;
    }

    .step-circle.active:after {
        background: #46bafe;
    }

    .add-product-wrapper {
        float: left;
        width: 100%;
    }

    .bread-menu {
        font-size: 12px;
        color: #666666;
        padding: 16px 0 20px 16px;
        background: #ffffff;
    }

    .container {
        width: 100%;
    }

    .main-wrapper {
        background: #f4f4f4;
    }

    .nav-wrapper {
        float: left;
    }

    .table-wrapper {
        background: #ffffff;
        margin-top: 20px;
        padding-bottom: 30px;
    }

    .main-wrapper:before,
    .main-wrapper:after {
        content: " ";
        display: table;
    }

    .main-wrapper:after {
        clear: both;
    }

    .date-wrapper {

    }

    .bread-link:hover {
        color: #46bafe;
        cursor: pointer;
    }

    .input-row + .input-row {
        margin-top: 18px;
    }

    .row-wrapper {
        display: inline-block;
        width: 200px;
        background: #ffffff;
        line-height: 32px;
    }

    .lay-r {
        display: inline-block;
        width: 290px;
        line-height: 32px;
    }

    .row-wrapper-ta {
        width: 340px;
        height: 80px;
    }

    .row-wrapper textarea {
        width: 340px;
        height: 80px;
        box-sizing: border-box;
    }

    .row-wrapper > input {
        width: 200px;
        height: 32px;
        padding-left: 5px;
        box-sizing: border-box;
        border: solid 1px #d6e1e5;
    }

    .input-text {
        width: 185px;
        display: inline-block;
        line-height: 32px;
        margin-right: 30px;
        text-align: right;
        vertical-align: top;
    }

    .lay-text {
        width: 170px;
        display: inline-block;
        line-height: 32px;
        /*margin-right: 30px;*/
        text-align: left;
        vertical-align: top;
    }

    .des-left {
        width: 165px;
        display: inline-block;
        margin-right: 30px;
        text-align: right;
        vertical-align: top;
        line-height: 18px;
    }

    .des-right {
        display: inline-block;
        vertical-align: top;
        width: 500px;
        line-height: 18px;
    }

    .required {
        color: red;
    }

    #city-select {
        background: #ffffff;
        width: 200px;
        height: 32px;
        padding-left: 5px;
        box-sizing: border-box;
        border: solid 1px #d6e1e5;
        background: url("../../../assets/def.png") no-repeat 97% 7px;
        border-radius: 0;
    }

    .row-wrapper-no {
        background: transparent;
        margin-top: 10px;
    }

    .add-title {
        font-size: 14px;
        color: #292c31;
        font-weight: bold;
        line-height: 50px;
        padding-left: 20px;
    }

    .add-main {
        background: #f4f4f4;
        padding-bottom: 20px;
    }

    .input-area {
        margin-top: 30px;
        padding-left: 40px;
    }

    .typeSelect {
        width: 200px;
        height: 30px;
        background: #ffffff;
        padding-left: 5px;
        border-radius: 0;
        border: 1px solid #dedede;
        background: url('../../../assets/arrow-down.png') no-repeat 95% 11px;
    }

    .info-left {
        display: inline-block;
    }

    .info-right {
        display: inline-block;
    }

    .modify {
        border-radius: 2px;
        color: #46bafe;
        font-size: 12px;
        padding-right: 6px;
        padding-left: 46px;
        background: url('../../../assets/edit.png') transparent no-repeat 17px 3px;
        cursor: pointer;
        margin-left: 20px;
        width: 190px;
        line-height: 32px;
        box-sizing: border-box;
        border: solid 1px #d6e1e5;
        margin-bottom: 20px;
    }

    .des-area {
        color: #6d7684;
        font-size: 12px;
    }

    .modify-wrapper {
        background: #f2f8ff;
        margin-top: 20px;
        padding-top: 10px;
        padding-bottom: 30px;
        margin-bottom: 20px;
    }

    .input-feel {
        line-height: 19px;
        text-align: center;
        width: 165px;
        padding-left: 15px;
    }

    .input-text-new {
        width: 150px;
    }

    .input-row-spa {
        margin-top: 50px !important;
    }

    .info-head {
        padding-left: 20px;
    }

    .pro-info-title {
        font-size: 18px;
        color: #6d7684;
    }

    .pro-info-des {
        font-size: 12px;
        color: #999999;
        margin-top: 8px;
    }

    .pro-icon {
        width: 40px;
        height: 40px;
        display: inline-block;
        vertical-align: top;
    }

    .pro-info {
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
    }

    .pro-wrapper {
        display: inline-block;
        margin-left: 42px;
    }

    .pro-btn {
        display: inline-block;
    }

    .pro-btn-another {
        margin-left: 10px;
    }

    .product-detail-wrapper:after {
        content: '';
        display: block;
        clear: both;
    }

    .product-detail-wrapper {
        padding: 30px 0;
        background: #f2f8ff;

        .pro-three {
            float: left;
        }

        .pro-btn-wrapper {
            float: right;
            margin-right: 40px;
        }

    }

    .lay-row-wrapper {
        float: left;
    }

    .lay-row-wrapper1 {
    }

    .lay-row-wrapper2 {
        margin-left: 210px;
    }

    .lay-row-area {
        &:after {
            content: '';
            display: block;
            clear: both;
        }
    }

    .lay-title {
        font-size: 14px;
        color: #292c31;
        font-weight: bold;
        line-height: 50px;
        border-bottom: solid 1px #d6e1e5;
    }

    .lay-row-area {
        margin-top: 20px;
    }

    .lay-wrapper-three {
        background: #ffffff;
        padding-left: 40px;
        padding-bottom: 30px;
    }

    .lay-btn {
        text-align: right;
        margin-right: 40px;
        margin-top: 20px;
    }

    .lay-btn-wrapper {
        display: inline-block;
        margin-left: 16px;

    }

    .contract-product-detail {
        .table-module {
            td:nth-child(1) {
                padding-left: 70px;
            }
        }
    }

    .layout-row-area {
        margin-top: 30px;
    }

    .contract-product-detail {
        position: relative;

        .confirm-modal-container {
            &:before {
              right: 40px;
              top: 32px;
            }
        }

        .product-detail-head {
            position: relative;
            width: 100%;
            height: 110px;
            padding: 30px 0;
            background: #f2f8ff;
            .item {
                width: 224px;
                .item-img{
                    margin-right: 10px;
                    display: inline-block;
                    vertical-align: middle;
                }
                &:nth-child(1) {
                    left: 40px;
                    .item-img{
                        @include bg("item-1.png",40px,40px);
                    }
                }
                &:nth-child(2) {
                    left: 264px;
                    .item-img{
                        @include bg("item-2.png",40px,40px);
                    }
                }
                &:nth-child(3) {
                    left: 495px;
                    .item-img{
                        @include bg("item-3.png",40px,40px);
                    }
                }
                .item-txt{
                    display: inline-block;
                    vertical-align: middle;
                    width: 165px;
                    p{
                        width: 100%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    p:nth-child(1){
                        font-size: 18px;
                        margin-bottom: 11px;
                        color: #6d7684;
                    }
                    p:nth-child(2){
                        font-size: 12px;
                        color: #999;
                    }
                }
            }
            .btn-group{
                right: 40px;
            }
        }

        .layout-row.no-pb {
            .row-left{
                float: left;
            }

            .row-right{
                float: left;

                >div {
                    margin-bottom: 10px;
                }
            }
        }

        .info-wrap{
            padding: 30px 0 40px;

            .row-left{
                color: #666666;
                width: 145px;
            }

            .row-right{
                color: #333333;
            }
        }
    }
</style>
