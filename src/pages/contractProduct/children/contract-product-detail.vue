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
                      <td>审批拒绝原因</td>
                  </tr>
              </thead>

              <tbody>
                  <tr v-for="(item, index) in audit">
                      <td>{{item.createTime}}</td>
                      <td>{{item.createUser}}</td>

                      <td v-if="item.targetStatus == '0'">
                          发布
                      </td>
                      <td v-else-if="item.targetStatus == '1'">
                          修改
                      </td>
                      <td v-else-if="item.targetStatus == '2'">
                          定价变更
                      </td>
                      <td v-else-if="item.targetStatus == '3'">
                          下线
                      </td>
                      <td v-else-if="item.targetStatus == '4'">
                          恢复上线
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
                              <span class="cl-fail-pass vt-middle">不通过</span>
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
                      <p :title="cProduct.productName">
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
                      <p :title="cProduct.productCode"> {{cProduct.productCode}}</p>
                      <p>产品ID</p>
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

              <div class="btn-group review-btn">
                  <button class="btn-primary btn btn-middle"
                          v-if="changeInfoT">{{changeInfoT}}</button>

                  <button class="btn btn-default btn-middle"
                          @click="offline"
                          v-if="offlineT">{{offlineT}}</button>

                  <button class="btn-default btn btn-middle"
                          v-if="onlineT">{{onlineT}}</button>

                  <button class="btn-default btn btn-middle"
                          v-if="revocationT">{{revocationT}}</button>

                  <button class="btn-default btn btn-middle"
                          @click="deleteCP"
                          v-if="deleteT && this.cProduct.onlineStatus == '4'">{{deleteT}}</button>

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
                          <span class="row-left"> 业务状态：</span>
                          <span class="row-right"></span>
                      </div>

                      <div class="layout-row">
                          <span class="row-left"> 生效方式：</span>
                          <span class="row-right">
                            <!--{{cProduct.effectiveTime}}-->
                          </span>
                      </div>

                      <div class="layout-row">
                          <span class="row-left"> 失效时间：</span>
                          <span class="row-right">{{cProduct.expireTime}}</span>
                      </div>

                      <div class="layout-row">
                          <span class="row-left"> 业务归属地：</span>
                          <span class="row-right">
                              <span v-for="aItem in cProduct.attributionName">
                                  {{aItem}}
                              </span>
                          </span>
                      </div>

                      <div class="layout-row">
                          <span class="row-left"> 是否会员产品：</span>
                          <span class="row-right" v-if="cProduct.isVip == '1'">是</span>
                          <span class="row-right" v-else>否</span>
                      </div>

                      <div class="layout-row">
                        <span class="row-left"> 是否可以赠送：</span>
                        <span class="row-right" v-if="true">是</span>
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
                          <span class="row-left"> 限制发送提示短信省份：</span>
                          <span class="row-right">
                            {{cProduct.limitSmsAreas}}
                          </span>
                      </div>

                      <div class="layout-row">
                        <span class="row-left"> 到期提醒短信模板：</span>
                        <span class="row-right">

                        </span>
                      </div>

                      <div class="layout-row">
                          <span class="row-left">
                              订购成功下发推荐短信：
                          </span>
                          <span class="row-right"></span>
                      </div>

                      <div class="layout-row  no-pb">
                          <div class="row-left"> 互斥产品：</div>

                          <div class="row-right">
                              <div v-for="mutexItem in mutex">
                                  <div>{{mutexItem.name}} | {{mutexItem.id}}</div>
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
                          <span class="row-right"></span>
                      </div>

                      <div class="layout-row">
                          <span class="row-left"> 生效时间：</span>
                          <span class="row-right">{{cProduct.effectiveTime}}</span>
                      </div>

                      <div class="layout-row">
                          <span class="row-left"> 产品目录：</span>
                          <span class="row-right">{{cProduct.catalogName}}</span>
                      </div>

                      <div class="layout-row">
                          <span class="row-left"> 是否体检产品：</span>
                          <span class="row-right" v-if="cProduct.isExperience == '1'">是</span>
                          <span class="row-right" v-else>否</span>
                      </div>

                      <!--<div class="layout-row">
                          <span class="row-left"> 是否重复订购：</span>
                          <span class="right" v-if="cProduct.isReorder == '1'">是</span>
                          <span class="right" v-else>否</span>
                      </div>-->

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
                        <span class="row-right"></span>
                      </div>

                      <div class="layout-row">
                          <span class="row-left"> 创建时间：</span>
                          <span class="row-right">{{cProduct.createTime}}</span>
                      </div>

                      <div class="layout-row">
                          <span class="row-left">订购成功下发提示短信</span>
                          <span class="row-right"></span>
                      </div>

                      <div class="layout-row">
                        <span class="row-left">到期提醒提前天数</span>
                        <span class="row-right"></span>
                      </div>

                      <div class="layout-row">
                          <span class="row-left"> 依赖产品：</span>
                          <span class="row-right">
                              <span v-for="dItem in depend">
                                  {{dItem.name}} | {{dItem.id}}
                              </span>
                          </span>
                      </div>

                      <div class="layout-row  no-pb">
                        <div class="row-left"> CP/SP ID：</div>

                        <div class="row-right">
                          <div v-for="mutexItem in mutex">
                            <div>{{mutexItem.name}} | {{mutexItem.id}} 假数据</div>
                          </div>
                        </div>
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
                              <h4>话费支付</h4>

                              <div class="item">
                                  <span class="left"> 业务代码 ：</span>
                                  <span class="right">{{pay.serviceCode}}</span>
                              </div>

                              <div class="item">
                                  <span class="left"> 资费金额（分） ：</span>
                                  <span class="right">{{pay.price}}</span>
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

                                  <span v-if="pay.feeType == '0'">天</span>

                                  <span v-else-if="pay.feeType == '1'">周</span>

                                  <span v-else-if="pay.feeType == '2'">月</span>

                                  <span v-else-if="pay.feeType == '3'">年</span>
                                </span>
                              </div>
                          </div>
                          </div>
                      </div>

                      <div class="layout-row list billing-list">
                          <div class="row-left"> 计费策略 ：</div>

                          <div class="row-right">
                              <div class="scheme-item" v-for="(rightItem, index) in right">
                                  <div v-if="rightItem.planCode != null">
                                      <h4>方案{{index + 1}}</h4>

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
                                  </div>
                                  <div v-else>
                                      <h4>方案{{index + 1}}</h4>

                                      <div class="item">
                                          <span class="left">免费</span>
                                      </div>
                                      <div class="item">
                                          <span class="right">
                                              满足条件：

                                              <span v-for="pItem in rightItem.pdMatchList">
                                                  {{pItem.fieldName}}{{pItem.operator}}
                                                  {{pItem.matchValues}}

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
                      <div class="layout-row">
                          <span class="row-left"> 渠道ID：</span>
                          <span class="row-right">
                              <span v-for="(channelItem, index) in channel">
                                  {{channelItem.id}} | {{channelItem.channelCode}}

                                  <span v-if="index != channel.length-1">,</span>
                              </span>
                          </span>
                      </div>
                  </div>
              </div>
          </div>

          <div class="button-box">
              <button class="btn-default btn btn-middle"
                      v-if="hideT">{{hideT}}</button>

              <button class="btn-default btn btn-middle"
                      v-if="logoutT">{{logoutT}}</button>

              <button class="btn-default btn btn-middle"
                      @click="deleteCP"
                      v-if="deleteT && this.cProduct.onlineStatus == '0'">{{deleteT}}</button>
          </div>
      </div>

      <modal name="reviewRejectModal" :width="380" :height="300">
          <t-modal-sub-container :title="'审批拒绝原因'" :name="'reviewRejectModal'">
              <v-review-reject-modal
                  :modal-name="'reviewRejectModal'">
              </v-review-reject-modal>
          </t-modal-sub-container>
      </modal>

      <modal name="contractProductDetailsConfirmModal" :width="390" :height="200" @before-close="beforeClose">
          <t-modal-sub-container
              :title="modalTitle"
              :name="'contractProductDetailsConfirmModal'">

              <v-confirm-delete-modal
                :functionType="'contractProductDetailsConfirmInfo'"
                :confirmInfo="confirmInfo">
              </v-confirm-delete-modal>

          </t-modal-sub-container>
      </modal>
  </div>
</template>

<script type="es6">
    import VConfirmPopoverModal from '@/components/confim-modal/confirm-popover-modal'
    import VOperateSuccessModal from '@/components/operate-modal/operate-success-modal'
    import VNolist from '@/components/no-list'
    import TModalSubContainer from "@/components/modal-sub-container"
    import VConfirmDeleteModal from '@/components/confirm-delete-modal/confirm-delete-modal'

    export default {
        name: 'Review',
        components: {
            VConfirmPopoverModal,
            VOperateSuccessModal,
            VNolist,
            TModalSubContainer,
            VConfirmDeleteModal
        },
        data (){
            return {
                productCode: this.$route.params.productCode,
                cProduct: {},
                auditstatus: '',
                payTypeList: [],
                feePlanList: [],
                mutex: [],
                audit: [],
                right: [],
                depend: [],
                channel: {},
                confirmInfo: '',
                modalTitle: '',
                postData: {         //给下线，删除，注销，上线等功能使用
                    cpCode: '',
                    onlineStatus: '',
                    detailStatus: ''
                }
            }
        },
        created(){
            this.getContractProductDetail(this.productCode);

            /* 接收来自确认modal框的信息 */
            this.bus.$on('contractProductDetailsConfirmModalBus', res => {
                let that = this;

                if(this.modalTitle == "是否确认删除？") {

                    that.$modal.hide("contractProductDetailsConfirmModal");

                    this.$http.get(this.api.updateProductState,
                        {
                            params:{
                                cpCode:this.postData.cpCode,
                                onlineStatus:this.postData.onlineStatus,
                                detailStatus:'8'
                            }
                        }).then(response => {

                        let res = response.body;

                        console.log("res: " + JSON.stringify(res));

                        if(res.resultMessage =='成功'){

                            that.$root.toastText = '删除成功';
                            that.$root.toast = true;

                            setTimeout(function(){
                                that.getContractProductDetail(that.productCode);
                            },2500);

                        } else {
                            that.$root.toastText = '删除失败';
                            that.$root.toast = true;
                        }
                    });
                } else if(this.modalTitle == '是否确认下线？') {

                    that.$modal.hide("contractProductDetailsConfirmModal");

                    this.$http.get(this.api.updateProductState,
                        {
                            params:{
                                cpCode:this.postData.cpCode,
                                onlineStatus:this.postData.onlineStatus,
                                detailStatus:'4'
                            }
                        }).then(response => {

                        let res = response.body;

                        console.log("res: " + JSON.stringify(res));

                        if(res.resultMessage =='成功'){

                            that.$root.toastText = '下线成功';
                            that.$root.toast = true;

                            setTimeout(function(){
                                that.getContractProductDetail(that.productCode);
                            },2500);
                        } else {
                            that.$root.toastText = '下线失败';
                            that.$root.toast = true;
                        }
                    });
                }

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
                            productCode: productCode || '',
                            id: ''
                        }
                    }).then(response => {

                        let res = response.body;

                        console.log("getContractProductDetail: " + JSON.stringify(res));

                        if (res.result.resultCode == '00000000') {
                            //todo: 注意，返回的字段这里list小写
                            this.cProduct = res.contractProduct;

                            this.audit = res.audit;

                            this.payTypeList = res.payTypeList;

                            this.mutex = res.mutex;

                            this.feePlanList = res.feePlanList;

                            this.right = res.right;

                            this.auditstatus = res.auditstatus;

                            this.depend = res.depend;

                            this.channel = res.channel;
                            //console.log("res: " + JSON.stringify(this.paytypes));

                            //console.log("product: " + JSON.stringify(this.product));

                        } else {

                        }
                })
            },

            beforeClose(){},

            offline(cpCode, onlineStatus, detailStatus) {
                this.modalTitle = '是否确认下线？';

                this.postData.cpCode = cpCode;
                this.postData.onlineStatus = onlineStatus;
                this.postData.detailStatus = detailStatus;

                let that = this;

                this.$http.get(this.api.queryCpDepend,
                    {
                        params:{
                            cpCode: cpCode
                        }
                    }).then(response => {

                    let res = response.body;

                    console.log("res: " + JSON.stringify(res));

                    if(res.resultMessage =='1'){

                        that.confirmInfo = '此产品已被其他产品依赖，是否同时解除依赖关系';

                    } else {
                        that.confirmInfo = '审批通过后，产品下线成功';
                    }
                });

                this.$modal.show('contractProductDetailsConfirmModal');
            },

            deleteCP() {
                this.modalTitle = '是否确认删除？';

                this.confirmInfo = '删除后产品不可恢复';

                this.$modal.show('contractProductDetailsConfirmModal');
            },

            revocation() {},

            hide() {},

            logout() {},

            changeInfo() {
                //变更信息
            }
        },
        computed: {
            /*合约产品的业务状态*/
            cpOnlineStatus() {
                let statusText = '';

                if(this.cProduct.onlineStatus == '0') {
                    statusText = '草稿';
                } else if(this.cProduct.onlineStatus == '1') {
                    statusText = '上线';
                } else if(this.cProduct.onlineStatus == '2') {
                    statusText = '隐藏';
                } else if(this.cProduct.onlineStatus == '3') {
                    statusText = '下线';
                } else if(this.cProduct.onlineStatus == '4') {
                    statusText = '注销';
                } else if(this.cProduct.onlineStatus == '5') {
                    statusText = '删除';
                }

                return statusText;
            },

            /*合约产品的审批状态*/
            cpDetailStatus() {
                let statusText = '';

                if(this.cProduct.detailStatus == '0') {

                    statusText = '上线审批中';
                } else if(this.cProduct.detailStatus == '1') {

                    statusText = '上线审批失败';
                } else if(this.cProduct.detailStatus == '2') {

                    statusText = '隐藏审批中';
                } else if(this.cProduct.detailStatus == '3') {

                    statusText = '隐藏审批失败';
                } else if(this.cProduct.detailStatus == '4') {

                    statusText = '下线审批中';
                } else if(this.cProduct.detailStatus == '5') {

                    statusText = '下线审批失败';
                } else if(this.cProduct.detailStatus == '6') {

                    statusText = '注销审批中';
                } else if(this.cProduct.detailStatus == '7') {

                    statusText = '注销审批失败';
                } else if(this.cProduct.detailStatus == '8') {

                    statusText = '删除审批中';
                } else if(this.cProduct.detailStatus == '9') {

                    statusText = '删除审批失败';
                } else if(this.cProduct.detailStatus == '10') {

                    statusText = '变更审批中';
                } else if(this.cProduct.detailStatus == '11') {

                    statusText = '变更审批失败';
                } else if(this.cProduct.detailStatus == '12') {

                    statusText = '变更报备中';
                } else if(this.cProduct.detailStatus == '13') {

                    statusText = '变更报备失败';
                } else if(this.cProduct.detailStatus == '14') {

                    statusText = '下线报备中';
                } else if(this.cProduct.detailStatus == '15') {

                    statusText = '下线报备失败';
                } else if(this.cProduct.detailStatus == '16') {

                    statusText = '隐藏报备中';
                } else if(this.cProduct.detailStatus == '17') {

                    statusText = '隐藏报备失败';
                } else if(this.cProduct.detailStatus == '18') {

                    statusText = '上线报备中';
                } else if(this.cProduct.detailStatus == '19') {

                    statusText = '上线报备失败';
                }

                return statusText;
            },

            /*
            *注销
            * onlineStatus: 3 下线 && detailStatus：null
            * onlineStatus: 3 下线 && detailStatus：11
            * onlineStatus: 3 下线 && detailStatus：03
            * onlineStatus: 3 下线 && detailStatus：01
            * onlineStatus: 3 下线 && detailStatus：07
            * onlineStatus: 3 下线 && detailStatus：13
            * onlineStatus: 3 下线 && detailStatus：19
            * onlineStatus: 3 下线 && detailStatus：17
            * */
            logoutT() {
              if((this.cProduct.onlineStatus == '3' &&
                    (this.cProduct.detailStatus == null ||
                    this.cProduct.detailStatus == '11' ||
                    this.cProduct.detailStatus == '3' ||
                    this.cProduct.detailStatus == '1' ||
                    this.cProduct.detailStatus == '7' ||
                    this.cProduct.detailStatus == '13' ||
                    this.cProduct.detailStatus == '19' ||
                    this.cProduct.detailStatus == '17')) ) {

                  return '注销';
              }
            },

            /*
             *下线
             * onlineStatus: 1 上线 && detailStatus：null
             * onlineStatus: 1 上线 && detailStatus：11
             * onlineStatus: 1 上线 && detailStatus：03
             * onlineStatus: 1 上线 && detailStatus：05
             * onlineStatus: 1 上线 && detailStatus：13
             * onlineStatus: 1 上线 && detailStatus：15
             *
             * onlineStatus: 2 隐藏 && detailStatus：null
             * onlineStatus: 2 隐藏 && detailStatus：11
             * onlineStatus: 2 隐藏 && detailStatus：05
             * onlineStatus: 2 隐藏 && detailStatus：01
             * onlineStatus: 2 隐藏 && detailStatus：13
             * onlineStatus: 2 隐藏 && detailStatus：15
             * */
            offlineT() {
                if((this.cProduct.onlineStatus == '1' &&
                      (this.cProduct.detailStatus == null ||
                      this.cProduct.detailStatus == '11' ||
                      this.cProduct.detailStatus == '3' ||
                      this.cProduct.detailStatus == '5' ||
                      this.cProduct.detailStatus == '13' ||
                      this.cProduct.detailStatus == '15')) ||
                  (this.cProduct.onlineStatus == '2' &&
                      (this.cProduct.detailStatus == null ||
                      this.cProduct.detailStatus == '11' ||
                      this.cProduct.detailStatus == '5' ||
                      this.cProduct.detailStatus == '1' ||
                      this.cProduct.detailStatus == '13' ||
                      this.cProduct.detailStatus == '15'))) {

                  return '下线';
                }
            },

            /*
             *上线
             *
             * onlineStatus: 0 草稿 && detailStatus：null
             * onlineStatus: 0 草稿 && detailStatus：01
             * onlineStatus: 0 草稿 && detailStatus：19
             *
             * onlineStatus: 3 下线 && detailStatus：null
             * onlineStatus: 3 下线 && detailStatus：11
             * onlineStatus: 3 下线 && detailStatus：03
             * onlineStatus: 3 下线 && detailStatus：01
             * onlineStatus: 3 下线 && detailStatus：07
             * onlineStatus: 3 下线 && detailStatus：13
             * onlineStatus: 3 下线 && detailStatus：19
             * onlineStatus: 3 下线 && detailStatus：17
             *
             * onlineStatus: 2 隐藏 && detailStatus：null
             * onlineStatus: 2 隐藏 && detailStatus：11
             * onlineStatus: 2 隐藏 && detailStatus：05
             * onlineStatus: 2 隐藏 && detailStatus：01
             * onlineStatus: 2 隐藏 && detailStatus：13
             * onlineStatus: 2 隐藏 && detailStatus：15
             * */
            onlineT() {
                if((this.cProduct.onlineStatus == '3' &&
                      (this.cProduct.detailStatus == null ||
                      this.cProduct.detailStatus == '11' ||
                      this.cProduct.detailStatus == '3' ||
                      this.cProduct.detailStatus == '1' ||
                      this.cProduct.detailStatus == '7' ||
                      this.cProduct.detailStatus == '13' ||
                      this.cProduct.detailStatus == '19' ||
                      this.cProduct.detailStatus == '19')) ||
                (this.cProduct.onlineStatus == '2' &&
                    (this.cProduct.detailStatus == null ||
                    this.cProduct.detailStatus == '11' ||
                    this.cProduct.detailStatus == '5' ||
                    this.cProduct.detailStatus == '1' ||
                    this.cProduct.detailStatus == '13' ||
                    this.cProduct.detailStatus == '15')) ||
                (this.cProduct.onlineStatus == '0' &&
                    (this.cProduct.detailStatus == null ||
                    this.cProduct.detailStatus == '1' ||
                    this.cProduct.detailStatus == '19'))) {

                    return '上线';
                }
            },

            /*隐藏*
            * onlineStatus: 1 上线 && detailStatus：null
            * onlineStatus: 1 上线 && detailStatus：11
            * onlineStatus: 1 上线 && detailStatus：03
            * onlineStatus: 1 上线 && detailStatus：05
            * onlineStatus: 1 上线 && detailStatus：15
            * onlineStatus: 1 上线 && detailStatus：13
            *
            * onlineStatus: 3 下线 && detailStatus：null
            * onlineStatus: 3 下线 && detailStatus：11
            * onlineStatus: 3 下线 && detailStatus：03
            * onlineStatus: 3 下线 && detailStatus：01
            * onlineStatus: 3 下线 && detailStatus：07
            * onlineStatus: 3 下线 && detailStatus：13
            * onlineStatus: 3 下线 && detailStatus：19
            * onlineStatus: 3 下线 && detailStatus：17
            * */
            hideT() {
                if((this.cProduct.onlineStatus == '1' &&
                      (this.cProduct.detailStatus == null ||
                      this.cProduct.detailStatus == '11' ||
                      this.cProduct.detailStatus == '3' ||
                      this.cProduct.detailStatus == '5' ||
                      this.cProduct.detailStatus == '15' ||
                      this.cProduct.detailStatus == '13')) ||
                (this.cProduct.onlineStatus == '3' &&
                    (this.cProduct.detailStatus == null ||
                    this.cProduct.detailStatus == '11' ||
                    this.cProduct.detailStatus == '3' ||
                    this.cProduct.detailStatus == '1' ||
                    this.cProduct.detailStatus == '7' ||
                    this.cProduct.detailStatus == '13' ||
                    this.cProduct.detailStatus == '19' ||
                    this.cProduct.detailStatus == '17'))) {

                    return '隐藏';
                }
            },

            /*
            * 撤销
            * onlineStatus: 0 草稿; detailStatus：00
            *
            * onlineStatus: 1 上线; detailStatus：10
            * onlineStatus: 1 上线; detailStatus：02
            * onlineStatus: 1 上线; detailStatus：04
            *
            * onlineStatus: 3 下线; detailStatus：10
            * onlineStatus: 3 下线; detailStatus：02
            * onlineStatus: 3 下线; detailStatus：00
            * onlineStatus: 3 下线; detailStatus：06
            *
            * onlineStatus: 2 隐藏; detailStatus：10
            * onlineStatus: 2 隐藏; detailStatus：04
            * onlineStatus: 2 隐藏; detailStatus：00
            *
            * onlineStatus: 4 注销; detailStatus：08
            *
            * */
            revocationT() {
              if((this.cProduct.onlineStatus == '0' && this.cProduct.detailStatus == '0') ||
                (this.cProduct.onlineStatus == '4' && this.cProduct.detailStatus == '8') ||
                (this.cProduct.onlineStatus == '1' &&
                    (this.cProduct.detailStatus == '10' ||
                    this.cProduct.detailStatus == '2' ||
                    this.cProduct.detailStatus == '4')) ||
                (this.cProduct.onlineStatus == '2' &&
                    (this.cProduct.detailStatus == '10' ||
                    this.cProduct.detailStatus == '4' ||
                    this.cProduct.detailStatus == '0'))) {

                  return '撤销';
              }
            },

            /**删除
             * onlineStatus: 0 草稿; detailStatus：null
             * onlineStatus: 0 草稿; detailStatus：01
             * onlineStatus: 0 草稿; detailStatus：19
             *
             * onlineStatus: 4 注销; detailStatus：null
             * onlineStatus: 4 注销; detailStatus：09
             * */
            deleteT() {
              if((this.cProduct.onlineStatus == '0' &&
                    (this.cProduct.detailStatus == null ||
                    this.cProduct.detailStatus == '1' ||
                    this.cProduct.detailStatus == '19')) ||
                (this.cProduct.onlineStatus == '4' && (
                    this.cProduct.detailStatus == null ||
                    this.cProduct.detailStatus == '9'))) {

                  return '删除';
              }
            },

            /**变更信息
             * onlineStatus: 0 草稿; detailStatus：null
             * onlineStatus: 0 草稿; detailStatus：01
             * onlineStatus: 0 草稿; detailStatus：19
             *
             * onlineStatus: 1 上线; detailStatus：null
             * onlineStatus: 1 上线; detailStatus：11
             * onlineStatus: 1 上线; detailStatus：03
             * onlineStatus: 1 上线; detailStatus：05
             * onlineStatus: 1 上线; detailStatus：13
             * onlineStatus: 1 上线; detailStatus：15
             *
             * onlineStatus: 3 下线; detailStatus：null
             * onlineStatus: 3 下线; detailStatus：11
             * onlineStatus: 3 下线; detailStatus：03
             * onlineStatus: 3 下线; detailStatus：01
             * onlineStatus: 3 下线; detailStatus：07
             * onlineStatus: 3 下线; detailStatus：13
             * onlineStatus: 3 下线; detailStatus：19
             * onlineStatus: 3 下线; detailStatus：17
             *
             * onlineStatus: 2 隐藏; detailStatus：null
             * onlineStatus: 2 隐藏; detailStatus：11
             * onlineStatus: 2 隐藏; detailStatus：05
             * onlineStatus: 2 隐藏; detailStatus：01
             * onlineStatus: 2 隐藏; detailStatus：13
             * onlineStatus: 2 隐藏; detailStatus：15
             * */
            changeInfoT() {
              if((this.cProduct.onlineStatus == '0' &&
                    (this.cProduct.detailStatus == null ||
                    this.cProduct.detailStatus == '1' ||
                    this.cProduct.detailStatus == '19')) ||
                (this.cProduct.onlineStatus == '1' && (
                    this.cProduct.detailStatus == null ||
                    this.cProduct.detailStatus == '11' ||
                    this.cProduct.detailStatus == '3' ||
                    this.cProduct.detailStatus == '5' ||
                    this.cProduct.detailStatus == '13' ||
                    this.cProduct.detailStatus == '15')) ||
                (this.cProduct.onlineStatus == '3' && (
                    this.cProduct.detailStatus == null ||
                    this.cProduct.detailStatus == '11' ||
                    this.cProduct.detailStatus == '3' ||
                    this.cProduct.detailStatus == '1' ||
                    this.cProduct.detailStatus == '7' ||
                    this.cProduct.detailStatus == '13' ||
                    this.cProduct.detailStatus == '19' ||
                    this.cProduct.detailStatus == '17')) ||
                (this.cProduct.onlineStatus == '2' && (
                    this.cProduct.detailStatus == null ||
                    this.cProduct.detailStatus == '11' ||
                    this.cProduct.detailStatus == '5' ||
                    this.cProduct.detailStatus == '1' ||
                    this.cProduct.detailStatus == '13' ||
                    this.cProduct.detailStatus == '15'))) {

                return '变更信息';
              }
            }
        },
        destroyed() {
          this.bus.$off('contractProductDetailsConfirmInfoBus');
          this.bus.$off('contractProductDetailsCancelInfoBus');
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

                      &.status {
                          max-width: 210px;
                          width: auto;
                      }

                      p {
                          width: 100%;
                          overflow: hidden;
                          white-space: nowrap;
                          text-overflow: ellipsis;
                      }

                      p:nth-child(1) {
                          margin-bottom: 11px;
                          font-size: 18px;
                          color: #6d7684;

                          span {
                              font-size: 18px;
                              color: #6d7684;
                          }
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
                      width: 145px;
                  }

                  .row-right{
                      color: #333333;
                  }
              }
          }

          .base-info {
              margin-bottom: 38px;

              .info-wrap {
                  .layout-row.no-pb {
                    overflow: hidden;

                    .row-right {
                        float: left;

                        div {
                            margin-bottom: 10px;
                        }
                    }

                    .row-left {
                        float: left;
                        width: 149px;
                    }

                  }
              }
          }

          .charges-info {
              .list {
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

                      .item {
                        margin: 5px 0;
                      }
                  }
              }

              .billing-list {
                  .scheme-item:last-child {
                      margin-top: 25px;
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

          .button-box {
              text-align: right;
              margin-right: 20px;

              button {
                  margin-right: 20px;
              }
          }
      }
  }
</style>
