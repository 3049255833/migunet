<template>
    <div class="table-wrap">
        <table class="table-module">
            <thead>
            <tr>
                <th class="td-pl-68">产品名称</th>
                <th>产品ID</th>
                <th>业务状态</th>
                <th>审批状态</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(cProduct,index) in contractProductList">
                    <td>
                        <div class="limit-text-length name"
                             :title="cProduct.productName">{{cProduct.productName}}
                        </div>
                    </td>

                    <td>
                        <div class="limit-text-length code"
                             :title="cProduct.productCode">{{cProduct.productCode}}
                        </div>
                    </td>

                    <td v-if="cProduct.onlineStatus == 0">
                        草稿
                    </td>

                    <td v-else-if="cProduct.onlineStatus == 1">
                        上线
                    </td>
                    <td v-else-if="cProduct.onlineStatus == 2">
                        隐藏
                    </td>
                    <td v-else-if="cProduct.onlineStatus == 3">
                        下线
                    </td>
                    <td v-else-if="cProduct.onlineStatus == 4">
                        注销
                    </td>
                    <!--<td v-else-if="cProduct.onlineStatus == 5">
                        删除
                    </td>-->
                    <td v-else></td>

                    <td v-if="cProduct.detailStatus == 1">
                        上线审批中
                    </td>
                    <td v-else-if="cProduct.detailStatus == 2">
                        上线审批失败
                    </td>
                    <td v-else-if="cProduct.detailStatus == 3">
                        新增报备中
                    </td>
                    <td v-else-if="cProduct.detailStatus == 4">
                        新增报备失败
                    </td>
                    <td v-else-if="cProduct.detailStatus == 5">
                        变更审批中
                    </td>
                    <td v-else-if="cProduct.detailStatus == 6">
                        变更审批失败
                    </td>
                    <td v-else-if="cProduct.detailStatus == 7">
                        变更报备中
                    </td>
                    <td v-else-if="cProduct.detailStatus == '8'">
                        变更报备失败
                    </td>
                    <td v-else></td>

                    <td>
                        <div class="operate-list clearfix" v-if="cProduct.onlineStatus == '0'">
                            <div @click="showContractProductDetail(cProduct.id)"
                                 class="mr-30 pointer cl-blue">
                                详情
                            </div>

                            <div class="mr-30 pointer cl-blue"
                                 v-if="cProduct.detailStatus == '2' ||
                                 cProduct.detailStatus == '4'">
                                变更信息
                            </div>

                            <div class="mr-30 pointer cl-blue revocation" @click="revocation(index)"
                                 v-if="cProduct.detailStatus == '1'">撤销

                                <v-confirm-popover-modal
                                  :confirmInfo="cProduct.operateType"
                                  :isHideConfim="cProduct.isHideConfim"
                                  :index="index">
                                </v-confirm-popover-modal>
                            </div>
                        </div>

                        <div class="operate-list clearfix"
                             v-else-if="cProduct.onlineStatus == '1'">

                            <div @click="showContractProductDetail(cProduct.productCode)"
                                 class="mr-30 pointer cl-blue">
                              详情
                            </div>

                            <div class="mr-30 pointer cl-blue"
                                 v-if="cProduct.detailStatus == '6' ||
                                 cProduct.detailStatus == '8' ||
                                 cProduct.detailStatus == null">
                                  变更信息
                            </div>

                            <div class="mr-30 pointer cl-blue revocation"
                                 @click="revocation(index)"
                                 v-if="cProduct.detailStatus == '5'">撤销

                                <v-confirm-popover-modal
                                    :confirmInfo="cProduct.operateType"
                                    :isHideConfim="cProduct.isHideConfim"
                                    :index="index">
                                </v-confirm-popover-modal>
                            </div>

                            <div class="pointer mr-30 cl-blue more"
                                 :class="{'active':cProduct.isShow}"
                                 @click.stop="showSelect(index)"
                                 v-if="cProduct.detailStatus == '6' ||
                                        cProduct.detailStatus == null ||
                                        cProduct.detailStatus == '8'">
                                更多
                                <i class="icon icon-arrow-down-blue"></i>

                                <v-confirm-popover-modal
                                  :confirmInfo="cProduct.operateType"
                                  :isHideConfim="cProduct.isHideConfim"
                                  :index="index">
                                </v-confirm-popover-modal>

                                <div class="option-mask" :class="{opMask: cProduct.isShow}">
                                    <div class="option-item"
                                          @click="offline(index)"
                                          v-if="cProduct.detailStatus == '6' ||
                                                cProduct.detailStatus == null ||
                                                cProduct.detailStatus == '8'">下线</div>

                                    <div class="option-item" @click="hide(index)"
                                           v-if="cProduct.detailStatus == '6' ||
                                                cProduct.detailStatus == null ||
                                                cProduct.detailStatus == '8'">隐藏</div>

                                    <div class="option-item" @click="logout(index)"
                                         v-if="cProduct.detailStatus == '6' ||
                                                cProduct.detailStatus == null ||
                                                cProduct.detailStatus == '8'">注销</div>

                                    <!--<div class="option-item" @click="revocation(index)"
                                         v-if="cProduct.detailStatus == '5'">撤销</div>-->
                                </div>
                            </div>
                        </div>

                        <div class="operate-list clearfix"
                             v-else-if="cProduct.onlineStatus == '3'">

                            <div @click="showContractProductDetail(cProduct.productCode)"
                                 class="mr-30 pointer cl-blue">
                                详情
                            </div>

                            <div class="mr-30 pointer cl-blue"
                                 v-if="cProduct.detailStatus == null ||
                                        cProduct.detailStatus == '6' ||
                                        cProduct.detailStatus == '8'">
                                变更信息
                            </div>

                            <div class="pointer mr-30 cl-blue more"
                                 :class="{'active':cProduct.isShow}"
                                 @click.stop="showSelect(index)"
                                 v-if="cProduct.detailStatus == null ||
                                        cProduct.detailStatus == '6' ||
                                        cProduct.detailStatus == '8' ||
                                        cProduct.detailStatus == '5'">
                                更多
                                <i class="icon icon-arrow-down-blue"></i>

                                <v-confirm-popover-modal
                                  :confirmInfo="cProduct.operateType"
                                  :isHideConfim="cProduct.isHideConfim"
                                  :index="index">
                                </v-confirm-popover-modal>

                                <div class="option-mask" :class="{opMask: cProduct.isShow}">
                                    <div class="option-item" @click="online(index)"
                                       v-if="cProduct.detailStatus == null ||
                                            cProduct.detailStatus == '6' ||
                                            cProduct.detailStatus == '8'">上线</div>

                                    <div class="option-item" @click="offline(index)"
                                          v-if="cProduct.detailStatus == '5'">下线</div>

                                    <div class="option-item" @click="hide(index)"
                                          v-if="cProduct.detailStatus == null ||
                                                cProduct.detailStatus == '5' ||
                                                cProduct.detailStatus == '6' ||
                                                cProduct.detailStatus == '8'">隐藏</div>

                                    <div class="option-item" @click="logout(index)"
                                          v-if="cProduct.detailStatus == null ||
                                          cProduct.detailStatus == '5' ||
                                          cProduct.detailStatus == '6' ||
                                          cProduct.detailStatus == '8'">注销</div>

                                    <div class="option-item" @click="revocation(index)"
                                          v-if="cProduct.detailStatus == '5'">撤销</div>
                                </div>
                            </div>
                        </div>

                        <div class="operate-list clearfix"
                             v-else-if="cProduct.onlineStatus == '2'">

                            <div @click="showContractProductDetail(cProduct.productCode)"
                                 class="mr-30 pointer cl-blue">
                              详情
                            </div>

                            <div class="mr-30 pointer cl-blue"
                                 v-if="cProduct.detailStatus == null ||
                                 cProduct.detailStatus == '6' ||
                                 cProduct.detailStatus == '8'">
                              变更信息
                            </div>

                            <div class="mr-30 pointer cl-blue revocation"
                                 @click="revocation(index)"
                                 v-if="cProduct.detailStatus == '5'">撤销

                                <v-confirm-popover-modal
                                    :confirmInfo="cProduct.operateType"
                                    :isHideConfim="cProduct.isHideConfim"
                                    :index="index">
                                </v-confirm-popover-modal>
                            </div>

                            <div class="pointer mr-30 cl-blue more"
                                 :class="{'active':cProduct.isShow}"
                                 @click.stop="showSelect(index)"
                                 v-if="cProduct.detailStatus == null ||
                                        cProduct.detailStatus == '6' ||
                                        cProduct.detailStatus == '8'">
                                  更多
                                 <i class="icon icon-arrow-down-blue"></i>

                                 <v-confirm-popover-modal
                                    :confirmInfo="cProduct.operateType"
                                    :isHideConfim="cProduct.isHideConfim"
                                    :index="index">
                                 </v-confirm-popover-modal>

                                <div class="option-mask" :class="{opMask: cProduct.isShow}">
                                    <div class="option-item" @click="online(index)"
                                         v-if="cProduct.detailStatus == null ||
                                         cProduct.detailStatus == '6' ||
                                         cProduct.detailStatus == '8'">上线</div>

                                    <div class="option-item" @click="offline(index)"
                                         v-if="cProduct.detailStatus == null ||
                                         cProduct.detailStatus == '6' ||
                                         cProduct.detailStatus == '8'">下线</div>

                                    <div class="option-item" @click="logout(index)"
                                         v-if="cProduct.detailStatus == null ||
                                         cProduct.detailStatus == '6' ||
                                         cProduct.detailStatus == '8'">注销</div>

                                    <!--<div class="option-item" @click="revocation(index)"
                                         v-if="cProduct.detailStatus == '5'">撤销</div>-->
                                </div>
                            </div>
                        </div>

                        <div class="operate-list clearfix"
                             v-else-if="cProduct.onlineStatus == '4'">

                            <div @click="showContractProductDetail(cProduct.productCode)"
                                 class="mr-30 pointer cl-blue">
                              详情
                            </div>

                            <div class="mr-30 pointer cl-blue delete"
                                 @click="deleteBtn(index,cProduct.id,cProduct.detailStatus)"
                                v-if="cProduct.detailStatus == null">删除

                                <v-confirm-popover-modal
                                  :confirmInfo="cProduct.operateType"
                                  :isHideConfim="cProduct.isHideConfim"
                                  :index="index">
                                </v-confirm-popover-modal>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="contractProductList.length <= 0" class="no-asset-box">
            <!-- <img src="../../../assets/no-asset-show.png"> -->
            <v-nolist :text="'暂无数据'"></v-nolist>
        </div>

        <v-operate-success-modal
            :isHideOperateModal="isHideOperateModal"
            :operateInfo="operateInfo">
        </v-operate-success-modal>
    </div>
</template>
<script>
    import VSearch from '@/components/search'
    import VPaging from '@/components/paging'
    import VConfirmPopoverModal from '@/components/confim-modal/confirm-popover-modal'
    import VOperateSuccessModal from '@/components/operate-modal/operate-success-modal'
    import VNolist from '@/components/no-list'

    export default {
        name: 'ContractProductTable',
        props: {
            contractProductList: Array
        },
        data() {
            return{
                count: 0,
                isHideOperateModal: true,
                operateInfo: '',
                willDeleteID: '',
                willDeleteDetailSatus: ''
            }
        },
        components: {
            VSearch,
            VPaging,
            VConfirmPopoverModal,
            VOperateSuccessModal,
            VNolist
        },
        computed: {

        },
        methods: {
            showContractProductDetail(productCode){
                this.$router.push({'name': 'ContractProductDetail',params: {'productCode': productCode}});
            },

            showSelect(index){

                if(this.contractProductList[this.count].isShow) {

                    this.contractProductList[this.count].isShow = false;

                    if(index !== this.count) {
                        this.contractProductList[index].isShow = !this.contractProductList[index].isShow;
                    }

                } else {
                    this.contractProductList[index].isShow = !this.contractProductList[index].isShow;
                }

                this.count = index;
            },

            documentHideOption(){
                let that = this;

                document.addEventListener('click', function () {

                    if (that.contractProductList[that.count]) {

                        that.contractProductList[that.count].isShow = false;
                    }
                });
            },

            logout(index) {
                this.contractProductList[index].isHideConfim = false;

                this.contractProductList[index].operateType = "是否注销该产品";
            },

            offline(index) {
                this.contractProductList[index].isHideConfim = false;

                this.contractProductList[index].operateType = "是否下线该产品";
            },

            online(index) {
                this.contractProductList[index].isHideConfim = false;

                this.contractProductList[index].operateType = "是否上线该产品";
            },

            hide(index) {
                this.contractProductList[index].isHideConfim = false;

                this.contractProductList[index].operateType = "是否隐藏该产品";
            },

            revocation(index) {
                this.contractProductList[index].isHideConfim = false;

                this.contractProductList[index].operateType = "是否撤销该产品";
            },

            deleteBtn(index, id, detailStatus) {
                this.contractProductList[index].isHideConfim = false;

                this.contractProductList[index].operateType = "是否删除该产品";

                this.willDeleteID = id;

                this.willDeleteDetailSatus = detailStatus;

                //console.log("contractProductId: " + id + ', onlineStatus: ' + onlineStatus + ", detailStatus: " + detailStatus);
            }
        },
        mounted(){
            this.documentHideOption();
        },
        created(){
            /**
             * 接收来自确认modal框的信息
             * */
            this.bus.$on('sendConfirmInfo', res => {
                this.contractProductList[res].isHideConfim = true;

                let that = this;

                console.log("111： " + this.contractProductList[res].operateType);

                if(this.contractProductList[res].operateType == "是否删除该产品") {
                    console.log("id: " + this.willDeleteID);

                    console.log("willDeleteDetailSatus: " + this.willDeleteDetailSatus);

                    this.$http.get(this.api.updateProductState,
                        {
                            params:{
                                contractProductId:this.willDeleteID,
                                onlineStatus:'5',
                                detailStatus:this.willDeleteDetailSatus
                            }
                        }).then(response => {

                        let res = response.body;

                        console.log("res: " + JSON.stringify(res));

                        if(res.resultMessage =='成功'){

                            that.$root.toastText = '删除成功';
                            that.$root.toast = true;

                            this.bus.$emit('sendDeleteContactProductInfo');
                        } else {
                            that.$root.toastText = '删除失败';
                            that.$root.toast = true;

                            console.log("Error res: " + JSON.stringify(res));
                        }
                    });
                }
            });

            /**
             * 接收来自取消modal框的信息
             * */
            this.bus.$on('sendCancelInfo', res => {
                this.contractProductList[res].isHideConfim = true;
            });
        },
        destroyed(){
            this.bus.$off('sendConfirmInfo');
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    .table-wrap {
        td:nth-child(1) {
            padding-left: 68px !important;
        }
        th:nth-child(1) {
            padding-left: 68px !important;
        }

        td {
            position: relative;

            .name, .code {
                max-width: 200px;
            }

            .more {
                position: relative;
            }

            .confirm-modal-container {
                top: -43px;
                right: -70px;

                &:before {
                    right: 95px;
                }
            }

            .revocation,
            .delete {
                position: relative;

                .confirm-modal-container {
                    top: -43px;
                    right: -90px;
                }
            }
        }
    }

    .no-asset-box {
        text-align: center;
        margin-top: 85px;
    }

    .pointer {
        float: left;
    }

    .option-mask {
        box-sizing: border-box;
        position: absolute;
        border: solid 1px #d6e1e5;
        margin-top: 12px;
        border-radius: 3px;
        display: none;
        z-index: 88;
        background: #ffffff;
        width: 80px;
        margin-left: -5px;

        &.opMask {
            display: block;
        }

        &:before {
            position: absolute;
            right: 30px;
            top: -11px;
            content: "";
            border: 5px solid rgba(0, 0, 0, 0);
            border-bottom-color: #d6e1e5;
        }

        &:after {
            position: absolute;
            right: 30px;
            top: -10px;
            content: "";
            border: 5px solid rgba(0, 0, 0, 0);
            border-bottom-color: #fff;
        }

        .option-item {
            font-size: 12px;
            padding-left: 10px;
            color: #0c0a0b;
            line-height: 34px;
            cursor: pointer;
            padding-right: 10px;
            text-align: center;

            &:hover {
                color: #ffffff;
                background: #46bafe;
            }
        }
    }
</style>
