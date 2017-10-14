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
                  <tr v-for="(item, index) in audit">
                      <td>{{item.createTime}}</td>
                      <td>{{item.createUser}}</td>
                      <td v-if="item.targetStatus == '1'">
                        上线审批
                      </td>
                      <td v-else-if="item.targetStatus == '2'">
                        隐藏审批
                      </td>
                      <td v-else-if="item.targetStatus == '3'">
                        下线审批
                      </td>
                      <td v-else-if="item.targetStatus == '4'">
                        注销审批
                      </td>
                      <td v-else-if="item.targetStatus == '5'">
                        删除审批
                      </td>
                      <td v-else-if="item.targetStatus == '6'">
                        变更审批
                      </td>
                      <td v-else></td>

                      <td>{{item.auditTime}}</td>
                      <td>{{item.auditPerson}}</td>
                      <td>
                          <div class=" review-fail-pass" v-if="item.auditStatus == '-1'">
                              <span class="cl-fail-pass vt-middle">待审核</span>
                          </div>

                          <div class=" review-fail-pass" v-else-if="item.auditStatus == '1'">
                              <i class="icon icon-pass mr-5"></i>
                              <span class="cl-pass vt-middle">通过</span>
                          </div>

                          <div class=" review-fail-pass" v-else-if="item.auditStatus == '0'">
                              <i class="icon icon-fail-pass mr-5"></i>
                              <span class="cl-fail-pass vt-middle">拒绝</span>
                          </div>
                      </td>
                      <td>{{item.auditOpinion}}</td>
                  </tr>
              </tbody>
          </table>

          <div v-if="audit.length <= 0" class="no-asset-box">
            <v-nolist :text="'暂无数据'"></v-nolist>
          </div>
      </div>

      <div class="product-manage-new-add">
          <div class="add-title">
            产品详情
          </div>

          <div class="list">
              <div class="item">
                  <div class="item-img"></div>
                  <div class="item-txt">
                      <p>
                          {{cProduct.productName}}
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
                          {{cProduct.productCode}}
                      </p>
                      <p>
                          产品ID
                      </p>
                  </div>
              </div>

              <div class="item">
                  <div class="item-img"></div>

                  <div class="item-txt status">
                      <p>
                          <span v-if="cpOnlineStatus != '' && cpDetailStatus != ''">
                            {{cpOnlineStatus}} （{{cpDetailStatus}} ）
                          </span>
                          <span v-else-if="cpOnlineStatus != '' && cpDetailStatus == ''">
                                  {{cpOnlineStatus}}
                                </span>
                          <span v-else-if="cpOnlineStatus == '' && cpDetailStatus != ''">
                                  {{cpDetailStatus}}
                                </span>
                          <span v-else></span>
                      </p>

                      <p>产品状态</p>
                  </div>
              </div>

              <div class="btn-group review-btn" v-if="auditstatus == '-1'">
                  <button class="btn btn-primary btn-middle"
                          @click="pass">通过</button>

                  <button class="btn-default btn btn-middle"
                          @click="noPass">拒绝</button>
              </div>

              <div class="review-mark item" v-else-if="auditstatus == '1'">
                  <img src="../../../assets/review-pass.png">
              </div>

              <div class="review-mark item" v-else-if="auditstatus == '0'">
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
                                        {{cProduct.productDesc}}
                                    </span>
                                    </div>
                                <div class="layout-row">
                                    <span class="row-left"> 产品状态：</span>
                                    <span class="row-right">
                                        {{cpOnlineStatus}}
                                    </span>
                                </div>
                                <div class="layout-row">
                                    <span class="row-left"> 生效方式：</span>
                                    <span class="row-right" v-if="cProduct.effectiveWay == '1'">
                                      立即生效
                                    </span>
                                    <span class="row-right" v-if="cProduct.effectiveWay == '2'">
                                      下周生效
                                    </span>
                                    <span class="row-right" v-if="cProduct.effectiveWay == '3'">
                                      下月生效
                                    </span>
                                </div>
                                <div class="layout-row">
                                    <span class="row-left"> 失效时间：</span>
                                    <span class="row-right">{{cProduct.invalidTime}}</span>
                                </div>

                                <div class="layout-row">
                                    <span class="row-left"> 业务归属地：</span>
                                    <span class="row-right">
                                        <span v-for="(item, index) in pdAttribution">
                                            {{item.pdAttribution.attributionName}}

                                            <span v-if="index != pdAttribution.length - 1">|</span>
                                        </span>
                                    </span>
                                </div>

                                <div class="layout-row">
                                    <span class="row-left"> 是否会员产品：</span>
                                    <span class="row-right" v-if="cProduct.isVip == '1'">是</span>
                                    <span class="row-right" v-else-if="cProduct.isVip == '0'">否</span>
                                </div>

                                <div class="layout-row">
                                    <span class="row-left"> 是否可以赠送：</span>
                                  <span class="row-right" v-if="cProduct.isGavin == '1'">是</span>
                                  <span class="row-right" v-else>否</span>
                                </div>

                                <div class="layout-row">
                                    <span class="row-left"> 创建用户：</span>
                                    <span class="row-right" v-if="cProduct.createUser != null">
                                        {{cProduct.createUser}}
                                    </span>
                                            <span class="row-right" v-else>
                                        Admin
                                    </span>
                                </div>

                                <div class="layout-row">
                                    <span class="row-left"> 限定发送提示短信省份：</span>
                                    <span class="row-right">{{cProduct.limitSmsAreas}}</span>
                                </div>

                                <div class="layout-row">
                                    <span class="row-left"> 到期提醒短信模板：</span>
                                    <span class="row-right">{{pdRemindSms}} </span>
                                </div>
                                <div class="layout-row">
                                    <span class="row-left">
                                        订购成功下发送推荐短信：
                                    </span>
                                    <span class="row-right">{{pdRecommendSms}}</span>
                                </div>

                                <div class="layout-row  no-pb">
                                    <div class="row-left"> 互斥产品：</div>

                                    <div class="row-right">
                                      <div v-for="mutexItem in mutex">
                                        <div>{{mutexItem.productName}} | {{mutexItem.productCode}}</div>
                                      </div>
                                    </div>
                                </div>
                        </div>

                    <div class="fl w-50">
                            <div class="layout-row">
                                    <span class="row-left"> 搜索关键字：</span>
                                    <span class="row-right">{{cProduct.searchKey}}</span>
                            </div>

                            <div class="layout-row">
                                    <span class="row-left"> 审批状态：</span>
                                    <span class="row-right">{{cpDetailStatus}}</span>
                            </div>
                            <div class="layout-row">
                                    <span class="row-left"> 生效时间：</span>
                                    <span class="row-right">{{cProduct.effectiveTime}}</span>
                            </div>

                            <!--<div class="layout-row">
                                    <span class="row-left"> 产品目录：</span>
                                    <span class="row-right">{{cProduct.catalogName}}</span>
                            </div>-->
                            <div class="layout-row">
                                <span class="row-left"> 是否体验产品：</span>
                                <span class="row-right" v-if="cProduct.isExperience == '1'">是</span>
                                <span class="row-right" v-else>否</span>
                            </div>

                            <div class="layout-row">
                                <span class="row-left"> 体验产品周期：</span>
                                <span class="row-left">
                                    <span class="row-right"
                                            v-if="cProduct.expCycleUnitNum == '-1'">永久有效</span>

                                    <span class="row-right" v-else>
                                        {{cProduct.expCycleUnitNum}}

                                        <span v-if="cProduct.expCycleUnit == '0'">天</span>

                                        <span v-else-if="cProduct.expCycleUnit == '1'">周</span>

                                        <span v-else-if="cProduct.expCycleUnit == '2'">月</span>

                                        <span v-else-if="cProduct.expCycleUnit == '3'">年</span>
                                    </span>
                                </span>
                            </div>
                            <div class="layout-row">
                                <span class="row-left"> 发送平台：</span>
                                <span class="row-right">{{cProduct.sendPlatform}}</span>
                            </div>
                            <div class="layout-row">
                                <span class="row-left"> 创建时间：</span>
                                <span class="row-right">{{cProduct.createTime}}</span>
                            </div>

                            <div class="layout-row">
                                <span class="row-left">订购成功下发提示短信：</span>
                                <span class="row-right">{{pdPromptSms}}</span>
                            </div>

                            <div class="layout-row">
                                <span class="row-left"> 到期提醒提前天数：</span>
                                <span class="row-right">{{cProduct.remindDays}}天</span>
                            </div>

                            <div class="layout-row">
                                <span class="row-left"> 依赖产品：</span>
                                <span class="row-right">
                                    <span v-for="dItem in depend">
                                        {{dItem.productName}} | {{dItem.productCode}}
                                    </span>
                                </span>
                            </div>

                            <div class="layout-row">
                                <span class="row-left"> CP/SP ID：</span>
                                <!--<span class="row-right">{{cpspList[0].pdCp.cpName}} | {{cpspList[0].pdCp.cpCode}}</span>-->
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
                        <div class="layout-row list payment-way-list">
                            <div class="row-left"> 支付方式 ：</div>

                            <div class="row-right">
                                <div v-for="pay in payTypeList">
                                <h4 v-if="pay.paytype == '0'">话费支付</h4>

                                <h4 v-else-if="pay.paytype == '1'">第三方支付</h4>

                                <div class="item">
                                    <span class="left"> 业务代码 ：</span>
                                    <span class="right">{{pay.serviceCode}}</span>
                                </div>

                                <div class="item">
                                    <span class="left"> 资费金额（分） ：</span>
                                  <span class="right" v-if="pay.feeType == '1'">包月</span>
                                  <span class="right" v-else-if="pay.feeType == '2'">点播</span>
                                </div>

                                <div class="item">
                                    <span class="left"> 资费类型 ：</span>
                                    <span class="right">{{pay.feeType}}</span>
                                </div>

                                <div class="item">
                                    <span class="left"> 是否重复订购 ：</span>
                                    <span class="right" v-if="pay.isReorder == '1'">是</span>
                                    <span class="right" v-else>否</span>
                                </div>

                                <div class="item">
                                    <span class="left"> 产品周期 ：</span>
                                    <span class="left"
                                          v-if="pay.cycleUnitNum == '-1'">永久有效</span>

                                    <span class="left" v-else>
                                        {{pay.cycleUnitNum}}

                                        <span v-if="pay.cycleUnit == '0'">天</span>

                                        <span v-else-if="pay.cycleUnit == '1'">周</span>

                                        <span v-else-if="pay.cycleUnit == '2'">月</span>

                                        <span v-else-if="pay.cycleUnit == '3'">年</span>
                                    </span>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="layout-row list billing-list">
                            <div class="row-left"> 计费策略 ：</div>

                            <div class="row-right">
                                <div class="scheme-item" v-for="(rightItem, index) in right">
                                    <!--<div v-if="rightItem.planCode != null">
                                        <h4>方案{{index+1}}</h4>

                                        <div class="item">
                                            <span class="left"> 资费ID ：</span>
                                            <span class="right">
                                                {{rightItem.pdFeePlan.planCode}}</span>
                                        </div>

                                        <div class="item">
                                            <span class="left"> 计划名称 ：</span>
                                            <span class="right">
                                            {{rightItem.pdFeePlan.planName}}</span>
                                        </div>

                                        <div class="item">
                                            <span class="left"> 计划说明 ：</span>
                                            <span class="right">
                                                {{rightItem.pdFeePlan.planDesc}}</span>
                                        </div>
                                    </div>-->
                                    <div>
                                        <h4>方案{{index+1}}</h4>

                                        <div class="item">
                                            <span class="left"
                                                  v-if="rightItem.pdFeePlan.isFree == '1'">
                                                  免费</span>

                                            <span class="left"
                                                  v-else-if="rightItem.pdFeePlan.isFree == '0'">
                                                      收费</span>
                                        </div>
                                        <div class="item">
                                            <span class="right">
                                                满足条件：

                                                <span v-for="pItem in rightItem.pdMatchList">
                                                    {{pItem.fieldName}}&nbsp;
                                                    {{pItem.operator}}&nbsp;
                                                    {{pItem.matchValues}}&nbsp;

                                                    <span v-if="rightItem.isAnd == '0'">
                                                        或者</span>
                                                    <span v-else-if="rightItem.isAnd == '1'">
                                                        并且</span>
                                                </span>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="fl w-50">
                        <div class="layout-row charges-list list">
                            <div class="row-left"> 资费计划 ：</div>

                            <div class="row-right">
                                <div class="item" v-for="(feePlanItem, index) in feePlanList">
                                    <div class="">{{feePlanItem.planCode}}</div>

                                    <hr/>

                                    <div class="">{{feePlanItem.planName}}</div>

                                    <hr/>

                                    <div class="">{{feePlanItem.planDesc}}</div>
                                </div>
                            </div>
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
                        <!-- <div class="layout-row">
                            <span class="row-left"> BOOS计费代码：</span>
                            <span class="row-right">
                                <span v-for="(channelItem, index) in channel">
                                    {{channelItem.channelCode}}

                                    <span v-if="index != channel.length-1">,</span>
                                </span>
                            </span>
                        </div> -->
                        <div class="layout-row">
                            <span class="row-left"> 渠道ID：</span>
                            <span class="row-right">
                                <span v-for="(channelItem, index) in channel">
                                    {{channelItem.id}} | {{channelItem.channelName}}

                                    <span v-if="index != channel.length-1">,</span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
          </div>
      </div>

      <modal name="reviewRejectModal" :width="380" :height="330">
          <t-modal-sub-container :title="'审批拒绝原因'" :name="'reviewRejectModal'">
              <v-review-reject-modal
                :modal-name="'reviewRejectModal'"
                v-on:rejectOpinionBus="getRejectOpinion">
              </v-review-reject-modal>
          </t-modal-sub-container>
      </modal>

      <modal name="auditDetailsConfirmModal"
             :width="390"
             :height="280"
             @before-close="beforeClose">

          <t-modal-sub-container
              :title="'是否确认审核'"
              :name="'auditDetailsConfirmModal'">

              <v-confirm-delete-modal
                :functionType="'auditDetailsPassConfirmInfo'"
                :confirmInfo="'是否审核通过该产品'">
              </v-confirm-delete-modal>

          </t-modal-sub-container>
      </modal>
  </div>
</template>

<script type="es6">
  import VConfirmPopoverModal from '@/components/confim-modal/confirm-popover-modal'
  import VOperateSuccessModal from '@/components/operate-modal/operate-success-modal'
  import VReviewRejectModal from '../components/review-reject-modal'
  import TModalSubContainer from "@/components/modal-sub-container"
  import VNolist from '@/components/no-list'
  import VConfirmDeleteModal from '@/components/confirm-delete-modal/confirm-delete-modal'

  export default {
      name: 'Review',
      components: {
          VReviewRejectModal,
          VConfirmPopoverModal,
          VOperateSuccessModal,
          TModalSubContainer,
          VNolist,
          VConfirmDeleteModal
      },
      data (){
          return {
              productCode: this.$route.params.productCode,
              auId: this.$route.params.auId,
              targetStatus: this.$route.params.targetStatus,
              auditstatus: '',
              cProduct: {},
              payTypeList: [],
              feePlanList: [],
              mutex: [],
              audit: [],
              right: [],
              depend: [],
              channel: {},
              postDataList: [],

              pdOnlineStatus: '', //产品状态
              pdDetailStatus: '', //审批状态
              pdAttribution: [], //业务归属地
              pdCataLog: [], //产品目录
              cpspList: [],  //CP/SP list,
              pdPromptSms: '', //订购成功下发提示短信 1
              pdRemindSms: '', //到期提醒短信模板 2
              pdRecommendSms: '', //推荐短信模板3

              auditOpinion: '',
              noPassPostDataList: [],
              pageSize: '',
              pageNum: ''
          }
      },
      created(){
          this.getAuditContractProduct(this.productCode, this.auId);

          //console.log("targetStatus: " + this.targetStatus);

          /**
           * 接收来自确认modal框的信息
           * */
          this.bus.$on('auditDetailsPassConfirmInfoBus', res => {
              let that = this;

              that.postDataList.push({
                  id: that.productCode,
                  statusId: that.statusId,
                  auditStatus: '1',
                  auditOpinion: '',
                  auditTime: that.utils.getNowDate(),
                  targetStatus: that.targetStatus,
                  auditPerson: 'admin',
                  cstModified: that.utils.getNowDate(),
                  detailStatus: '',
                  productCode: that.productCode,
                  productName: that.cProduct.productName
              });

              console.log("postDataList: " + JSON.stringify(this.postDataList));

              this.$modal.hide('auditDetailsConfirmModal');

              that.$http.post(this.api.updateAuditStatusList, that.postDataList).then(response => {
                  let res = response.body;

                  if (res.result.resultCode == '00000000') {
                      this.$root.toastText = '审批成功';
                      this.$root.toast = true;

                      setTimeout(function(){
                          that.getAuditContractProduct(that.productCode, that.auId);
                      },2000);

                  } else {
                      this.$root.toastText = '审批失败';
                      this.$root.toast = true;
                  }
              }, (response) => {
                  this.$root.toastText = '服务器错误';
                  this.$root.toast = true;
              })
          });
      },
      methods: {
          /**
           * 获取单品详情
           * @param productCode 产品 string
           * */
          getAuditContractProduct(productCode, auId) {
              this.$http.get(this.api.getAuditContractProduct,
                  {
                    params: {
                        productCode: productCode || '',
                        auditId: auId || '',
                        pageSize: this.pageSize || '1',
                        pageNum: this.pageNum || '5'
                    }
                  }).then(response => {

                  let res = response.body;

                  console.log("res: " + JSON.stringify(res));

                  if (res.result.resultCode == '00000000') {
                      //todo: 注意，返回的字段这里list小写
                      this.cProduct = res.data.contractMap.pdContractDetails[0];//基本信息

                      this.pdOnlineStatus = res.data.contractMap.pdContractAndStatus[0].pdStatus.onlineStatus;  //产品状态
                      this.pdDetailStatus = res.data.contractMap.pdContractAndStatus[0].pdStatus.detailStatus;  //审批状态

                      this.pdAttribution = res.data.contractMap.pdContractAndAttribution; //业务归属地

                      this.pdCataLog = res.data.contractMap.pdContractAndCataLog[0];//产品目录

                      this.audit = res.data.auditList; //审批列表信息

                      this.payTypeList = res.data.pdPayTypeList;//支付方式

                      this.mutex = res.data.contractMap.pdContractAndMutex;//互斥产品

                      this.feePlanList = res.data.pdFeePlanList;//资费计划

                      this.right = res.data.pdRightsList;//计费策略

                      this.pdPromptSms = res.data.contractMap.pdSSMOne;//提示短信

                      this.pdRemindSms = res.data.contractMap.pdSSMTwo;//到期提醒短信

                      this.pdRecommendSms = res.data.contractMap.pdSSMThree;//推荐短信

                      this.auditstatus = res.data.pdAuditDetails.auditStatus;

                      this.depend = res.data.contractMap.pdContractAndDepend;//依赖

                      this.channel = res.data.pdChannelList; //渠道

                      this.cpspList = res.data.contractMap.pdContractAndCpSp; //渠道
                  } else {

                  }
              })
          },

          getRejectOpinion(res) {
              let that = this;

              this.auditOpinion = res;

              that.noPassPostDataList.push({
                  id: that.productCode,
                  statusId: that.statusId,
                  auditStatus: '0',
                  auditOpinion: this.auditOpinion,
                  auditTime: that.utils.getNowDate(),
                  targetStatus: this.targetStatus,
                  auditPerson: 'admin',
                  cstModified: that.utils.getNowDate(),
                  detailStatus: ''
              });

              this.$modal.hide('reviewRejectModal');

              that.$http.post(this.api.updateAuditStatusList,that.noPassPostDataList).then(response => {
                  let res = response.body;

                  if (res.result.resultCode == '00000000') {
                      this.$root.toastText = '审批成功';
                      this.$root.toast = true;

                      setTimeout(function(){
                          that.getAuditContractProduct(that.productCode, that.auId);
                      },2000);
                  } else {
                      this.$root.toastText = '审批失败';
                      this.$root.toast = true;
                  }

                }, (response) => {
                    this.$root.toastText = '服务器错误';
                    this.$root.toast = true
              })
          },

          noPass() {
              this.$modal.show('reviewRejectModal');

              this.confirmInfo = "是否审核通过该产品";
          },

          pass() {
              //this.isHideConfim = false;

              //this.confirmInfo = "是否审核通过该产品";

              this.$modal.show('auditDetailsConfirmModal');
          },

          beforeClose() {}
      },
      computed: {
          /*合约产品的业务状态*/
          cpOnlineStatus() {
            let statusText = '';

            if(this.pdOnlineStatus == '0') {
              statusText = '草稿';
            } else if(this.pdOnlineStatus == '1') {
              statusText = '上线';
            } else if(this.pdOnlineStatus == '2') {
              statusText = '隐藏';
            } else if(this.pdOnlineStatus == '3') {
              statusText = '下线';
            } else if(this.pdOnlineStatus == '4') {
              statusText = '注销';
            } else if(this.pdOnlineStatus == '5') {
              statusText = '删除';
            }

            return statusText;
          },

          /*合约产品的审批状态*/
          cpDetailStatus() {
            let statusText = '';

            if(this.pdDetailStatus == '0') {

              statusText = '上线审批中';
            } else if(this.pdDetailStatus == '1') {

              statusText = '上线审批失败';
            } else if(this.pdDetailStatus == '2') {

              statusText = '隐藏审批中';
            } else if(this.pdDetailStatus == '3') {

              statusText = '隐藏审批失败';
            } else if(this.pdDetailStatus == '4') {

              statusText = '下线审批中';
            } else if(this.pdDetailStatus == '5') {

              statusText = '下线审批失败';
            } else if(this.pdDetailStatus == '6') {

              statusText = '注销审批中';
            } else if(this.pdDetailStatus == '7') {

              statusText = '注销审批失败';
            } else if(this.pdDetailStatus == '8') {

              statusText = '删除审批中';
            } else if(this.pdDetailStatus == '9') {

              statusText = '删除审批失败';
            } else if(this.pdDetailStatus == '10') {

              statusText = '变更审批中';
            } else if(this.pdDetailStatus == '11') {

              statusText = '变更审批失败';
            } else if(this.pdDetailStatus == '12') {

              statusText = '变更报备中';
            } else if(this.pdDetailStatus == '13') {

              statusText = '变更报备失败';
            } else if(this.pdDetailStatus == '14') {

              statusText = '下线报备中';
            } else if(this.pdDetailStatus == '15') {

              statusText = '下线报备失败';
            } else if(this.pdDetailStatus == '16') {

              statusText = '隐藏报备中';
            } else if(this.pdDetailStatus == '17') {

              statusText = '隐藏报备失败';
            } else if(this.pdDetailStatus == '18') {

              statusText = '上线报备中';
            } else if(this.pdDetailStatus == '19') {

              statusText = '上线报备失败';
            }

            return statusText;
          }
      },
      destroyed() {
          this.bus.$off('auditDetailsComfirmInfoBus');
          this.bus.$off('auditDetailsCancelInfoBus');
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
      position: relative;

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

          .no-asset-box {
              padding: 30px 0 10px;
          }
      }

      .product-manage-new-add {
          background: #ffffff;
          margin-top: 20px;
          padding-bottom: 30px;
          position: relative;

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

              .review-btn {
                  float: right;
                  margin-right: 40px;
                  margin-top: 10px;
              }

              .item {
                  float: left;
                  margin-left: 40px;
                  margin-top: 5px;

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
                  .row-left{
                      color: #666666;
                      width: 170px;
                  }

                  .row-right{
                      color: #333333;
                  }
              }
          }

          .base-info {
              margin-bottom: 38px;

              .info-wrap {
                  //font-size: 12px;
                  .layout-row.no-pb {
                      overflow: hidden;

                      .row-right {
                          float: left;
                          color:#333;
                          div {
                              margin-bottom: 10px;
                          }
                      }

                      .row-left {
                          float: left;
                          width: 170px;
                      }
                  }
              }
          }

          .charges-info {
              .list {
                  overflow: hidden;
                  font-size: 12px;

                  h4 {
                      font-weight: 600;
                  }

                  .row-left {
                      float: left;
                  }

                  .row-right {
                      float: left;
                      width: 370px;

                      .item {
                        margin: 5px 0;
                      }
                  }
              }

              .billing-list {
                  .scheme-item{
                      margin-bottom: 25px;
                  }
                  .scheme-item:last-child {
                      margin-bottom: 0;
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

              .payment-way-list {
                  .row-right {
                      >div {
                          margin-bottom: 15px;
                      }
                  }
              }

              .charges-list {
                  .row-right {
                      .item {
                          overflow: hidden;
                          margin-top: 0;
                          margin-bottom: 10px;

                          hr {
                              height: 10px;
                              width: 0;
                              float: left;
                              margin: 0 8px;
                          }

                          div {
                              float: left;
                          }
                      }
                  }
              }
          }
      }
  }
</style>
