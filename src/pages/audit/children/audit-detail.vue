<template>
  <div class="product-detail">
      <div class="review-flow-box">
          <div class="add-title">审批工作流</div>

          <table class="table-module">
                  <thead>
                      <tr>
                          <td width="240">提交时间</td>
                          <td>提交人</td>
                          <td>申请类型</td>
                          <td>审核时间</td>
                          <td>审核人</td>
                          <td>审批结果</td>
                          <td>审批失败原因</td>
                      </tr>
                  </thead>

                  <tbody>
                      <tr>
                          <td>2017/08/22 09:30</td>
                          <td>21222222</td>
                          <td>变更审批</td>
                          <td>2017/08/22 09:30</td>
                          <td>小三</td>
                          <td>
                              <div class=" review-fail-pass">
                                  <i class="icon icon-fail-pass mr-5"></i>
                                  <span class="cl-fail-pass vt-middle">
                                    不通过</span>
                              </div>
                          </td>
                          <td>价格高于审批价格</td>
                      </tr>

                      <tr>
                          <td>2017/08/22 09:30</td>
                          <td>21222222</td>
                          <td>变更审批</td>
                          <td>2017/08/22 09:30</td>
                          <td>小三</td>
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

      <div class="product-manage-new-add table-wrapper">
              <div class="add-title">
                产品管理新增
              </div>

              <div class="list">
                  <div class="item">
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

                  <div class="item">
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

                  <div class="item">
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

                  <div class="review-mark item" v-if="true">
                      <img src="../../../assets/review-pass.png">
                  </div>

                  <div class="review-mark item" v-else>
                      <img src="../../../assets/review-reject.png">
                  </div>
              </div>
          </div>

      <div class="info-container">
              <div class="base-info info-list">
                  <div class="info-title">
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
                              <span class="row-right">
                                {{product.createTime}}
                              </span>
                          </div>

                          <div class="layout-row">
                              <span class="row-left"> 业务归属地：</span>
                              <span class="row-right"> 中国移动 </span>
                          </div>

                          <div class="layout-row">
                              <span class="row-left"> 是否会员产品：</span>
                              <span class="row-right"> 非会员 </span>
                          </div>

                          <div class="layout-row">
                              <span class="row-left"> 是否体检产品：</span>
                              <span class="row-right"></span>
                          </div>

                          <div class="layout-row">
                              <span class="row-left"> 创建用户：</span>
                              <span class="row-right">
                                {{product.createUser}}
                              </span>
                          </div>

                          <div class="layout-row">
                              <span class="row-left"> 限定短信发送省份：</span>
                              <span class="row-right"> 江苏省、浙江省 </span>
                          </div>

                          <div class="layout-row">
                              <span class="row-left">
                                  订购成功下发送推荐短信：
                              </span>
                              <span class="row-right">2017/08/21 16:00</span>
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
                              <span class="row-right"></span>
                          </div>

                          <div class="layout-row">
                              <span class="row-left"> 失效时间：</span>
                              <span class="row-right"></span>
                          </div>

                          <div class="layout-row">
                              <span class="row-left"> 产品目录：</span>
                              <span class="row-right">目录名称(日本漫画)</span>
                          </div>

                          <div class="layout-row">
                              <span class="row-left"> 是否重复订购：</span>
                              <span class="row-right">是 </span>
                          </div>

                          <div class="layout-row">
                              <span class="row-left"> 体验产品周期：</span>
                              <span class="row-right"></span>
                          </div>

                          <div class="layout-row">
                              <span class="row-left"> 创建时间：</span>
                              <span class="row-right"></span>
                          </div>

                          <div class="layout-row">
                              <span class="row-left">订购成功下发提示短信</span>
                              <span class="row-right">
                                恭喜您，成功订购每日一笑业务！
                              </span>
                          </div>

                          <div class="layout-row">
                              <span class="row-left"> 合作伙伴：</span>
                              <span class="row-right"></span>
                          </div>

                          <div class="layout-row no-pb">
                              <span class="row-left"> 依赖产品：</span>
                              <span class="row-right"> 动漫5元 | 2091272</span>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="charges-info info-list">
                  <div class="info-title">
                      资费信息
                  </div>

                  <div class="info-wrap clearfix">
                      <div class="fl w-50">
                          <div class="layout-row">
                            <span class="row-left"> BOOS计费代码 ：</span>
                            <span class="row-right"></span>
                          </div>

                          <div class="layout-row">
                              <span class="row-left"> 计费类型 ：</span>
                              <span class="row-right"></span>
                          </div>

                          <div class="layout-row scheme-list">
                              <div class="row-left"> 计费策略 ：</div>

                              <div class="row-right">
                                  <div class="scheme-item">
                                      <h4>方案一</h4>

                                      <div class="item">
                                          <span class="left"> 资费ID ：</span>
                                          <span class="right">E1020293873</span>
                                      </div>

                                      <div class="item">
                                        <span class="left"> 计划名称 ：</span>
                                        <span class="right">E1020293873</span>
                                      </div>

                                      <div class="item">
                                          <span class="left"> 计划说明 ：</span>
                                          <span class="right">白金会员折后优惠：满足，会员级别与(1,2,3)并且,公司级别等于(5)后者，消费金额大于300 满足条件：内容类型=漫画 并且 产品编号等于漫画（100929828</span>
                                      </div>
                                  </div>

                                  <div class="scheme-item">
                                      <h4>方案二</h4>

                                      <div class="item">免费</div>

                                      <div class="item">
                                          <span class="left"> 满足条件 ：</span>
                                          <span class="right">内容类型=漫画 并且 产品编号等于漫画（100929828）</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div class="fl w-50">
                          <div class="layout-row">
                              <span class="row-left"> 价格(分CN) ：</span>
                              <span class="row-right"></span>
                          </div>

                          <div class="layout-row">
                              <span class="row-left"> 支付方式 ：</span>
                              <span class="row-right"></span>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="channel-info info-list">
                  <div class="info-title" >
                      渠道信息
                  </div>

                  <div class="layout-row-area">
                      <div class="layout-row-wrapper layout-row-wrapper1">
                          <div class="layout-row">
                              <span class="row-left"> BOOS计费代码：</span>
                              <span class="row-right">BOOS计费代码</span>
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

  .product-detail {
      background: #f4f4f4;

      .add-title {
          font-size: 14px;
          color: #292c31;
          font-weight: bold;
          line-height: 50px;
          padding-left: 20px;
      }

      .review-flow-box {
          background-color: #fff;

          .review-list {
              width: 100%;
          }
      }

      .product-manage-new-add {
          background: #ffffff;
          margin-top: 20px;
          padding-bottom: 30px;

          .add-title {
              font-size: 14px;
              color: #292c31;
              font-weight: bold;
              line-height: 50px;
              padding-left: 20px;
          }

          .list {
              width: 100%;
              height: 110px;
              padding: 30px 0;
              background: #f2f8ff;
              overflow: hidden;

              .item {
                  float: left;
                  margin-left: 40px;

                  .item-img {
                      margin-right: 10px;
                      display: inline-block;
                      vertical-align: middle;
                  }

                .item-txt {
                  display: inline-block;
                  vertical-align: middle;
                  width: 165px;

                  p {
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }

                  p:nth-child(1) {
                    font-size: 18px;
                    margin-bottom: 11px;
                    color: #6d7684;
                  }

                  p:nth-child(2) {
                    font-size: 12px;
                    color: #999;
                  }
                }

                &:nth-child(1) {
                  .item-img {
                    @include bg("item-1.png", 40px, 40px);
                  }
                }

                &:nth-child(2) {
                  .item-img {
                    @include bg("item-2.png", 40px, 40px);
                  }
                }

                &:nth-child(3) {
                  .item-img {
                    @include bg("item-3.png", 40px, 40px);
                  }
                }
              }

              .review-mark {
                  float: right;
                  margin: -18px 20px 0 0;
              }
          }
      }

      .info-container {
          background: #ffffff;
          padding-left: 40px;
          padding-bottom: 30px;

          .info-list {
              .info-title {
                  margin-bottom: 30px;
                  font-size: 14px;
                  color: #292c31;
                  font-weight: bold;
                  line-height: 50px;
                  border-bottom: solid 1px #d6e1e5;
              }

              .info-wrap{
                  .layout-row.no-pb {
                      overflow: hidden;

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

                  .row-left{
                      color: #666666;
                      width: 145px;
                  }

                  .row-right{
                      color: #333333;
                  }
              }
          }

          .base-info {
              margin-bottom: 38px;
          }

          .charges-info {
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
          }
      }
  }
</style>
