<template>
    <div class="single-product-detail">
        <div class="main-wrapper">
            <div class="add-product-wrapper">
                <div class="add-main">
                    <div class="table-wrapper">
                        <div class="add-title">
                            产品详情
                        </div>
                        <div class="product-detail-head">
                            <div class="item layout-center-y">
                                <div class="item-img"></div>
                                <div class="item-txt">
                                    <p :title="productDetail.productName">
                                        {{productDetail.productName}}</p>
                                    <p>产品名称</p>
                                </div>
                            </div>
                            <div class="item layout-center-y">
                                <div class="item-img"></div>
                                <div class="item-txt">
                                    <p :title="productUniCode">
                                        {{productUniCode}}</p>
                                    <p>产品ID</p>
                                </div>
                            </div>
                            <div class="item layout-center-y">
                                <div class="item-img"></div>
                                <div class="item-txt">
                                    <p v-if="productDetail.onlineStatus != null &&
                                              productDetail.detailStatus == null">
                                      {{productDetail.onlineStatus}} </p>

                                    <p v-else-if="productDetail.onlineStatus == null &&
                                              productDetail.detailStatus != null">
                                        {{productDetail.detailStatus}} </p>

                                    <p v-else-if="productDetail.onlineStatus != null &&
                                              productDetail.detailStatus != null">
                                      {{productDetail.onlineStatus}} （
                                      {{productDetail.detailStatus}} ）</p>

                                    <p v-else></p>

                                    <p>产品状态</p>
                                </div>
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
                                        <span class="row-left">产品状态：</span>
                                        <span class="row-right">
                                            {{productDetail.onlineStatus}}
                                        </span>
                                    </div>
                                    <div class="layout-row" >
                                        <span class="row-left">搜索关键字：</span>
                                        <span class="row-right">{{productDetail.searchKey}}</span>
                                    </div>
                                    <div class="layout-row">
                                      <span class="row-left"> 生效方式：</span>
                                      <span class="row-right"
                                            v-if="productDetail.effectiveWay !=null ">
                                          {{productDetail.effectiveWay}}
                                      </span>
                                      <span class="row-right"
                                            v-else>
                                          立即生效
                                      </span>
                                    </div>

                                    <div class="layout-row ">
                                        <span class="row-left"> 创建时间：</span>
                                        <span class="row-right">
                                           {{productDetail.createTime}}
                                        </span>
                                    </div>

                                    <div class="layout-row">
                                        <span class="row-left"> 生效时间：</span>
                                        <span class="row-right">
                                            {{productDetail.enableTime}}
                                        </span>
                                    </div>

                                    <div class="layout-row no-pb">
                                      <span class="row-left"> 创建用户：</span>
                                      <span class="row-right"
                                            v-if="productDetail.createUser!=null">
                                          {{productDetail.createUser}}
                                      </span>
                                      <span class="row-right"
                                            v-else>
                                          admin
                                      </span>
                                    </div>
                                </div>

                                <div class="fl w-50">
                                    <div class="layout-row">
                                        <span class="row-left">审批状态：</span>
                                        <span class="row-right">
                                           {{productDetail.detailStatus}}
                                        </span>
                                    </div>
                                    <div class="layout-row">
                                        <span class="row-left">产品类型：</span>
                                        <span class="row-right" v-if="productDetail.productType == '0'">
                                              单品
                                        </span>
                                    </div>

                                    <div class="layout-row">
                                      <span class="row-left"> 更新时间：</span>
                                      <span class="row-right">
                                         {{productDetail.updateTime}}
                                      </span>
                                    </div>

                                    <div class="layout-row">
                                        <span class="row-left"> 失效时间：</span>
                                        <span class="row-right">
                                            {{productDetail.disableTime}}
                                        </span>
                                    </div>

                                    <div class="layout-row no-pb">
                                      <span class="row-left"> 合作伙伴：</span>
                                      <span class="row-right"
                                            v-if="productDetail.cpCode !=null && productDetail.cpName !=null">
                                          {{productDetail.cpCode}} | {{productDetail.cpName}}
                                      </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="lay-wrapper">
                            <div class="lay-title">
                                资费信息
                            </div>
                            <div class="layout-row-area">
                                <div class="layout-row-wrapper">
                                    <div class="layout-row">
                                      <span class="row-left">货币类型：</span>
                                      <span class="row-right">
                                          {{productDetail.currencyType}}
                                      </span>
                                    </div>

                                    <div class="layout-row">
                                        <span class="row-left">资费金额（分）：</span>
                                        <span class="row-right">
                                            {{productDetail.productPrice}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="lay-wrapper">
                            <div class="lay-title">
                                渠道信息
                            </div>
                            <div class="layout-row-area">
                                <div class="layout-row-wrapper layout-row-wrapper1">
                                    <div class="layout-row">
                                        <span class="row-left"> 渠道信息：</span>
                                        <span class="row-right"
                                              v-if="productDetail.channelCode !=null && productDetail.channelName !=null">

                                          {{productDetail.channelCode}} | {{productDetail.channelName}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="es6">
    export default {
        name: 'ProductDetail',
        components: {

        },
        data () {
            return {
                productUniCode: this.$route.params.productUniCode,
                productDetail: {
                    // product: '',
                    // channel: '',
                    // serviceCode: '',
                    // productchannel:'',
                }
            }
        },
        created(){
            this.getSingleProductDetail(this.productUniCode);
        },
        methods: {
            /**
             * 获取单品详情
             * @param productUniCode 产品id string
             * */
            getSingleProductDetail(productUniCode){
                this.$http.get(this.api.getSingleProductDetail,{
                    params: {
                        productUniCode: productUniCode || ''
                    },
                    showLoading:true
                }).then(response => {
                    let res = response.body;

                    console.log("SingleProductDetail: " + JSON.stringify(res));

                    if (res.result.resultCode == '00000000') {

                        this.productDetail= res.queryProductInfoRsp;

                        switch (parseInt(this.productDetail.onlineStatus)){

                            case 0:
                                this.productDetail.onlineStatus='草稿';
                                break;
                            case 1:
                                this.productDetail.onlineStatus='上线';
                                break;
                            case 2:
                                this.productDetail.onlineStatus='隐藏';
                                break;
                            case 3:
                                this.productDetail.onlineStatus='下线';
                                break;
                            case 4:
                                this.productDetail.onlineStatus='注销';
                                break;
                            case 5:
                                this.productDetail.onlineStatus='删除';
                                break
                            }
                        switch (parseInt(this.productDetail.detailStatus)){
                            case 0:
                                this.productDetail.detailStatus='上线审批中';
                                break;
                            case 1:
                                this.productDetail.detailStatus='上线审批失败';
                                break;
                            case 2:
                                this.productDetail.detailStatus='隐藏审批中';
                                break;
                            case 3:
                                this.productDetail.detailStatus='隐藏审批失败';
                                break;
                            case 4:
                                this.productDetail.detailStatus='下线审批中';
                                break;
                            case 5:
                                this.productDetail.detailStatus='下线审批失败';
                                break;
                            case 6:
                                this.productDetail.detailStatus='注销审批中';
                                break;
                            case 7:
                                this.productDetail.detailStatus='注销审批失败';
                                break;
                            case 8:
                                this.productDetail.detailStatus='删除审批中';
                                break;
                            case 9:
                                this.productDetail.detailStatus='删除审批失败';
                                break;
                            case 10:
                                this.productDetail.detailStatus='变更审批中';
                                break;
                            case 11:
                                this.productDetail.detailStatus='变更审批失败';
                                break;
                            case 12:
                                this.productDetail.detailStatus='变更报备中';
                                break;
                            case 13:
                                this.productDetail.detailStatus='变更报备失败';
                                break;
                            case 14:
                                this.productDetail.detailStatus='下线报备中';
                                break;
                            case 15:
                                this.productDetail.detailStatus='下线报备失败';
                                break;
                            case 16:
                                this.productDetail.detailStatus='隐藏报备中';
                                break;
                            case 17:
                                this.productDetail.detailStatus='隐藏报备失败';
                                break;
                            case 18:
                                this.productDetail.detailStatus='上线报备中';
                                break;
                            case 19:
                                this.productDetail.detailStatus='上线报备失败';
                                break;
                        }

                        //console.log("productDetail: " + JSON.stringify(this.productDetail));
                    } else {

                    }
                })
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
        line-height: 60px;
        padding-left: 20px;
    }

    .add-main {
        background: #f4f4f4;
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

    .layout-row-wrapper {
        float: left;
    }

    .layout-row-wrapper1 {
    }

    .layout-row-wrapper2 {
        margin-left: 210px;
    }

    .layout-row-area {
        &:after {
            display: block;
            content: '';
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

    .layout-row-area {
        margin-top: 20px;
    }

    .lay-wrapper-three {
        background: #ffffff;
        padding-left: 40px;
        padding-bottom: 30px;
    }

    .single-product-detail {
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
                    width: auto;
                    .item-img{
                        @include bg("item-3.png",40px,40px);
                    }

                    .item-txt {
                      width: auto;
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
                        min-height: 18px;
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
        .info-wrap{
            padding: 30px 0 40px;
            .row-left{
                color: #666666;
            }
            .row-right{
                color: #333333;
            }
        }
    }
</style>
