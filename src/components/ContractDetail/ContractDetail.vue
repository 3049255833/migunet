<template>
  <div class="container">
    <v-Pop></v-Pop>
    <v-Header></v-Header>
    <div class="main-wrapper">
      <div class="nav-wrapper">
        <v-Nav></v-Nav>
      </div>
      <div class="add-product-wrapper">
        <div class="bread-menu">
          <span class="bread-link">产品管理</span>
          >
          <span class="bread-link">合约产品管理</span>
          >
          <span>产品管理新增</span>
        </div>
        <div class="add-main">
          <div class="table-wrapper">
            <div class="add-title">
              产品管理新增
            </div>
            <div class="product-detail-wrapper">
              <div class="pro-three">
                <div class="pro-wrapper">
                  <div class="pro-icon">
                    <img src="../../assets/status-icon.png" alt=""/>
                  </div>
                  <div class="pro-info">
                    <div class="pro-info-title">
                      动漫5元业务包
                      {{item.contractProduct.name}}
                    </div>
                    <div class="pro-info-des">
                      产品名称
                    </div>
                  </div>
                </div>
                <div class="pro-wrapper">
                  <div class="pro-icon">
                    <img src="../../assets/status-icon.png" alt=""/>
                  </div>
                  <div class="pro-info">
                    <div class="pro-info-title">
                      {{item.contractProduct.productID}}
                    </div>
                    <div class="pro-info-des">
                      产品ID
                    </div>
                  </div>
                </div>
                <div class="pro-wrapper">
                  <div class="pro-icon">
                    <img src="../../assets/status-icon.png" alt=""/>
                  </div>
                  <div class="pro-info">
                    <div class="pro-info-title">
                      动漫5元业务包
                    </div>
                    <div class="pro-info-des">
                      产品状态
                    </div>
                  </div>
                </div>
              </div>


              <div class="pro-btn-wrapper">
                <div class="pro-btn">
                  <Confirm-Btn w="80px" text="变更信息"></Confirm-Btn>
                </div>
                <div class="pro-btn pro-btn-another">
                  <Cancel-Btn w="80px" text="下线"></Cancel-Btn>
                </div>
              </div>


            </div>
          </div>
          <div class="lay-wrapper-three">
            <div class="lay-wrapper">
              <div class="lay-title">
                基本信息
              </div>
              <div class="lay-row-area">
                <div class="lay-row-wrapper lay-row-wrapper1">
                  <div  class="lay-row">
                    <span  class="lay-text"> 产品描述：</span>
              <span  class="lay-r">
                {{item.contractProduct.contractDesc}}
              </span>
                  </div>
                  <div  class="lay-row">
                    <span  class="lay-text"> 限定发布平台：</span>
              <span  class="lay-r">
                {{item.contractProduct.platformType}}
              </span>
                  </div>
                  <div  class="lay-row">
                    <span  class="lay-text"> 合作伙伴：</span>
              <span  class="lay-r">
                20990000000921
              </span>
                  </div>
                  <div  class="lay-row">
                    <span  class="lay-text"> 生效时间：</span>
              <span  class="lay-r">
                {{item.contractProduct.startTime}}
              </span>
                  </div>
                  <div  class="lay-row">
                    <span  class="lay-text"> 创建时间：</span>
              <span  class="lay-r">
                {{item.contractProduct.createTime}}
              </span>
                  </div>
                  <div  class="lay-row">
                    <span  class="lay-text"> 创建用户：</span>
              <span  class="lay-r">
                {{item.contractProduct.createUser}}
              </span>
                  </div>
                </div>
                <div class="lay-row-wrapper lay-row-wrapper2">
                  <div  class="lay-row">
                    <span  class="lay-text"> 搜索关键字：</span>
              <span  class="lay-r">
                {{item.contractProduct.keyWords}}
              </span>
                  </div>
                  <div  class="lay-row">
                    <span  class="lay-text"> 归属产品线：</span>
              <span  class="lay-r">
                {{item.contractProduct.productLine}}
              </span>
                  </div>
                  <div  class="lay-row">
                    <span  class="lay-text"> 短信发送时间：</span>
              <span  class="lay-r">
                20990000000921
              </span>
                  </div>
                  <div  class="lay-row">
                    <span  class="lay-text"> 失效时间：</span>
              <span  class="lay-r">
                {{item.contractProduct.endTime}}
              </span>
                  </div>
                  <div  class="lay-row">
                    <span  class="lay-text"> 更新时间：</span>
              <span  class="lay-r">
                {{item.contractProduct.updateTime}}
              </span>
                  </div>
                </div>
              </div>


            </div>
            <div class="lay-wrapper">
              <div class="lay-title">
                资费信息
              </div>
              <div class="lay-row-area">
                <div class="lay-row-wrapper lay-row-wrapper1">
                  <div  class="lay-row">
                    <span  class="lay-text"> BOSS计费代码：</span>
              <span  class="lay-r">
                {{item.contractBossFeeCode.bossFee}}
              </span>
                  </div>
                  <div  class="lay-row">
                    <span  class="lay-text"> 计费类型：</span>
              <span  class="lay-r">
                {{item.contractProduct.chargeType}}
              </span>
                  </div>
                  <div  class="lay-row">
                    <span  class="lay-text"> 计费策略：</span>
              <span  class="lay-r">
                20990000000921
              </span>
                  </div>

                </div>
                <div class="lay-row-wrapper lay-row-wrapper2">
                  <div  class="lay-row">
                    <span  class="lay-text"> 价格（分CN）：</span>
              <span  class="lay-r">
                {{item.contractProduct.fee}}
              </span>
                  </div>
                  <div  class="lay-row">
                    <span  class="lay-text"> 支付方式：</span>
              <span  class="lay-r">
                {{item.contractProduct.payType}}
              </span>
                  </div>

                </div>
              </div>


            </div>
            <div class="lay-wrapper">
              <div class="lay-title">
                渠道信息
              </div>
              <div class="lay-row-area">
                <div class="lay-row-wrapper lay-row-wrapper1">
                  <div  class="lay-row">
                    <span  class="lay-text"> BOSS计费代码：</span>
              <span  class="lay-r">
                {{item.contractBossFeeCode.bossFee}}
              </span>
                  </div>

                </div>
              </div>


            </div>
            <div class="lay-btn">
              <div class="lay-btn-wrapper">
                <Cancel-Btn text="隐藏"></Cancel-Btn>
              </div>
              <div class="lay-btn-wrapper">
                <Cancel-Btn text="注销"></Cancel-Btn>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import vHeader from '../common/Header'
  import vTable  from '../common/Table'
  import vNav from '../common/Nav'
  import Mock from 'mockjs'
  import PickDate from '../PickDate/PickDate'
  import vPop from '../common/Pop'
  import InfoTable from '../common/InfoTable'
  import ConfirmBtn from '../common/Button1'
  import CancelBtn from '../common/Button2'
  import axios from 'axios'

var jsonData1 = Mock.mock('http:www.migunet.com',{
  "status": 200,
  "error": "成功",
  "message": "操作成功",
  "data": {
    "contractProduct": {
      "productID": 1009920391324,
      "productDirID": 112233,
      "name": "产品名称",
      "auditStatus": "上线(变更审批)",
      "contractDesc": "全职高手",
      "keyWords": "动漫、漫画、青少年、日本、宫崎骏",
      "cpID": "cp标识",
      "productLine": "产品归属线",
      "status": "产品状态",
      "chargeType": "计费类型",
      "payType": "支付方式",
      "platformType": "不限定发布平台",
      "bossID": null,
      "productType": null,
      "productObjType": null,
      "fee": null,
      "feeType": null,
      "testTag": null,
      "testProductID": null,
      "cycleUnit": null,
      "cycleUnitNum": null,
      "enableType": null,
      "unsubscribeType": null,
      "refillType": null,
      "startTime": null,
      "endTime": null,
      "createTime": null,
      "createUser": null,
      "updateTime": null
    },
    "contractBossFeeCode": null,
    "contractChannelProduct": null
  }

});
  
  export default {
    name: 'AddContractProduct',
    components: {
      vHeader,
      vTable,
      vNav,
      PickDate,
      vPop,
      InfoTable,
      ConfirmBtn,
      CancelBtn

    },
    data ()
  {
    return {}
  }
  ,
  computed:{
    item(){
      return this.$store.getters.getDetailData;
    }
  },
  methods:{
    initPage(){
      this.$store.dispatch('loadDetailData');
    }
  },
  mounted(){
    this.initPage();
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

@import url('../../less/common.less');
  .info {
    width: 808px;
    padding: 20px 0;
    border: solid 1px #d6e1e5;
    position: relative;
    margin-top: 10px;
  }

  /*.info:before{*/
  /*content: '';*/
  /*position: absolute;*/
  /*left: 20px;*/
  /*top: -10px;*/
  /*width: 0;*/
  /*height: 0;*/
  /*border-style: solid;*/
  /*border-width: 0 9.5px 19px 9.5px;*/
  /*border-color: transparent transparent #ffffff transparent*/

  /*}*/
  .info:before {
    content: '';
    position: absolute;
    left: 80px;
    top: -9px;
    width: 20px;
    height: 10px;
    background: url("../../assets/arrow-up.png") #ffffff no-repeat;
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
    width: 1196px;

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
    /*float: left;*/
    /*margin-left: 20px;*/
    /*width: 1050px;*/
    background: #ffffff;
    margin-top: 20px;
    padding-bottom: 30px;
  }

  /*.main-wrapper:after{
    content: '';
    display: block;
    clear: both;
  }*/
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
    width: 200px;
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
    background: url("../../assets/def.png") no-repeat 97% 7px;
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
    padding: 0 20px;
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
    background: url('../../assets/arrow-down.png') no-repeat 95% 11px;
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
    background: url('../../assets/edit.png') transparent no-repeat 17px 3px;
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

  .lay-row-wrapper{
    float: left;
  }
  .lay-row-wrapper1{
  }
  .lay-row-wrapper2{
    margin-left: 210px;
  }
  .lay-row-area{
    .clearfix();
  }
.lay-title{
  font-size: 14px;
    color: #292c31;
    font-weight: bold;
    line-height: 50px;
    border-bottom:solid 1px #d6e1e5;
}
.lay-row-area{
  margin-top: 20px;
}
  .lay-wrapper-three{
    background: #ffffff;
    padding-left: 40px;
    padding-bottom: 30px;
  }

  .lay-btn{
    text-align: right;
    margin-right: 40px;
    margin-top: 20px;
  }
  .lay-btn-wrapper{
    display: inline-block;
    margin-left: 16px;

  }
</style>
