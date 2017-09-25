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
                    <td v-else></td>

                    <td v-if="cProduct.detailStatus == '0'">
                        上线审批中
                    </td>
                    <td v-else-if="cProduct.detailStatus == '1'">
                        上线审批失败
                    </td>
                    <td v-else-if="cProduct.detailStatus == '2'">
                        隐藏审批中
                    </td>
                    <td v-else-if="cProduct.detailStatus == '3'">
                        隐藏审批失败
                    </td>
                    <td v-else-if="cProduct.detailStatus == '4'">
                        下线审批中
                    </td>
                    <td v-else-if="cProduct.detailStatus == '5'">
                        下线审批失败
                    </td>
                    <td v-else-if="cProduct.detailStatus == '6'">
                        注销审批中
                    </td>
                    <td v-else-if="cProduct.detailStatus == '7'">
                        注销审批失败
                    </td>
                    <td v-else-if="cProduct.detailStatus == '8'">
                        删除审批中
                    </td>
                    <td v-else-if="cProduct.detailStatus == '9'">
                        删除审批失败
                    </td>
                    <td v-else-if="cProduct.detailStatus == '10'">
                        变更审批中
                    </td>
                    <td v-else-if="cProduct.detailStatus == '11'">
                        变更审批失败
                    </td>
                    <td v-else-if="cProduct.detailStatus == '12'">
                        变更报备中
                    </td>
                    <td v-else-if="cProduct.detailStatus == '13'">
                        变更报备失败
                    </td>
                    <td v-else-if="cProduct.detailStatus == '14'">
                        下线报备中
                    </td>
                    <td v-else-if="cProduct.detailStatus == '15'">
                        下线报备失败
                    </td>
                    <td v-else-if="cProduct.detailStatus == '16'">
                        隐藏报备中
                    </td>
                    <td v-else-if="cProduct.detailStatus == '17'">
                        隐藏报备失败
                    </td>
                    <td v-else-if="cProduct.detailStatus == '18'">
                        上线报备中
                    </td>
                    <td v-else-if="cProduct.detailStatus == '19'">
                        上线报备失败
                    </td>
                    <td v-else></td>

                    <td>
                        <!--业务状态为草稿的时候-->
                        <div class="operate-list clearfix" v-if="cProduct.onlineStatus == '0'">
                            <div @click="showContractProductDetail(cProduct.productCode)"
                                 class="mr-30 pointer cl-blue">
                                详情
                            </div>

                            <div class="mr-30 pointer cl-blue"
                                 @click="changeInfo(cProduct)"
                                 v-if="cProduct.detailStatus == null ||
                                        cProduct.detailStatus == '1' ||
                                        cProduct.detailStatus == '19'">
                                变更信息
                            </div>

                            <div class="mr-30 pointer cl-blue revocation"
                                 @click="revocation(index)"
                                 v-if="cProduct.detailStatus == '0'">撤销</div>

                            <div class="pointer mr-30 cl-blue more"
                                 :class="{'active':cProduct.isShow}"
                                 @click.stop="showSelect(index)"
                                 v-if="cProduct.detailStatus == null ||
                                          cProduct.detailStatus == '1' ||
                                          cProduct.detailStatus == '19'">
                                 更多
                                 <i class="icon icon-arrow-down-blue"></i>

                                <div class="option-mask" :class="{opMask: cProduct.isShow}">
                                    <div class="option-item"
                                         @click="online(index)"
                                         v-if="cProduct.detailStatus == null ||
                                                  cProduct.detailStatus == '1' ||
                                                  cProduct.detailStatus == '19'">上线</div>

                                    <div class="option-item"
                                         @click="deleteBtn(cProduct.productCode,cProduct.detailStatus)"
                                         v-if="cProduct.detailStatus == null ||
                                                  cProduct.detailStatus == '1' ||
                                                  cProduct.detailStatus == '19'">删除</div>
                                </div>
                            </div>
                        </div>

                        <div class="operate-list clearfix"
                             v-else-if="cProduct.onlineStatus == '1'">

                            <div @click="showContractProductDetail(cProduct.productCode)"
                                 class="mr-30 pointer cl-blue">
                              详情
                            </div>

                            <div class="mr-30 pointer cl-blue"
                                 @click="changeInfo(cProduct)"
                                 v-if="cProduct.detailStatus == null ||
                                        cProduct.detailStatus == '11' ||
                                        cProduct.detailStatus == '3' ||
                                        cProduct.detailStatus == '5' ||
                                        cProduct.detailStatus == '13' ||
                                        cProduct.detailStatus == '15'">
                                  变更信息
                            </div>

                            <div class="mr-30 pointer cl-blue revocation"
                                 @click="revocation(index)"
                                 v-if="cProduct.detailStatus == '10' ||
                                         cProduct.detailStatus == '2' ||
                                         cProduct.detailStatus == '4'">撤销</div>

                            <div class="pointer mr-30 cl-blue more"
                                 :class="{'active':cProduct.isShow}"
                                 @click.stop="showSelect(index)"
                                 v-if="cProduct.detailStatus == null ||
                                        cProduct.detailStatus == '11' ||
                                        cProduct.detailStatus == '3' ||
                                        cProduct.detailStatus == '5' ||
                                        cProduct.detailStatus == '13' ||
                                        cProduct.detailStatus == '15'">
                                更多
                                <i class="icon icon-arrow-down-blue"></i>

                                <div class="option-mask" :class="{opMask: cProduct.isShow}">
                                    <div class="option-item"
                                          @click="offline(cProduct.productCode,cProduct.detailStatus)"
                                          v-if="cProduct.detailStatus == null ||
                                                  cProduct.detailStatus == '11' ||
                                                  cProduct.detailStatus == '3' ||
                                                  cProduct.detailStatus == '5' ||
                                                  cProduct.detailStatus == '13' ||
                                                  cProduct.detailStatus == '15'">下线</div>

                                    <div class="option-item" @click="hide(index)"
                                           v-if="cProduct.detailStatus == null ||
                                                  cProduct.detailStatus == '11' ||
                                                  cProduct.detailStatus == '3' ||
                                                  cProduct.detailStatus == '5' ||
                                                  cProduct.detailStatus == '13' ||
                                                  cProduct.detailStatus == '15'">隐藏</div>
                                </div>
                            </div>
                        </div>

                        <div class="operate-list clearfix"
                             v-else-if="cProduct.onlineStatus == '3'">

                            <div @click="showContractProductDetail(cProduct.productCode)"
                                 class="mr-30 pointer cl-blue">
                                详情
                            </div>

                            <div class="mr-30 pointer cl-blue revocation"
                                 @click="revocation(index)"
                                 v-if="cProduct.detailStatus == '10' ||
                                           cProduct.detailStatus == '2' ||
                                           cProduct.detailStatus == '0' ||
                                           cProduct.detailStatus == '6'">撤销</div>

                            <div class="mr-30 pointer cl-blue"
                                 @click="changeInfo(cProduct)"
                                 v-if="cProduct.detailStatus == null ||
                                        cProduct.detailStatus == '11' ||
                                        cProduct.detailStatus == '3' ||
                                        cProduct.detailStatus == '1' ||
                                        cProduct.detailStatus == '7' ||
                                        cProduct.detailStatus == '13' ||
                                        cProduct.detailStatus == '19' ||
                                        cProduct.detailStatus == '17'">
                                变更信息
                            </div>

                            <div class="pointer mr-30 cl-blue more"
                                 :class="{'active':cProduct.isShow}"
                                 @click.stop="showSelect(index)"
                                 v-if="cProduct.detailStatus == null ||
                                        cProduct.detailStatus == '11' ||
                                        cProduct.detailStatus == '3' ||
                                        cProduct.detailStatus == '1' ||
                                        cProduct.detailStatus == '7' ||
                                        cProduct.detailStatus == '13' ||
                                        cProduct.detailStatus == '19' ||
                                        cProduct.detailStatus == '17'">
                                更多
                                <i class="icon icon-arrow-down-blue"></i>

                                <div class="option-mask" :class="{opMask: cProduct.isShow}">
                                    <div class="option-item" @click="online(index)"
                                       v-if="cProduct.detailStatus == null ||
                                                cProduct.detailStatus == '11' ||
                                                cProduct.detailStatus == '3' ||
                                                cProduct.detailStatus == '1' ||
                                                cProduct.detailStatus == '7' ||
                                                cProduct.detailStatus == '13' ||
                                                cProduct.detailStatus == '19' ||
                                                cProduct.detailStatus == '17'">上线</div>

                                    <div class="option-item" @click="hide(index)"
                                          v-if="cProduct.detailStatus == null ||
                                                  cProduct.detailStatus == '11' ||
                                                  cProduct.detailStatus == '3' ||
                                                  cProduct.detailStatus == '1' ||
                                                  cProduct.detailStatus == '7' ||
                                                  cProduct.detailStatus == '13' ||
                                                  cProduct.detailStatus == '19' ||
                                                  cProduct.detailStatus == '17'">隐藏</div>

                                    <div class="option-item" @click="logout(index)"
                                          v-if="cProduct.detailStatus == null ||
                                                  cProduct.detailStatus == '11' ||
                                                  cProduct.detailStatus == '3' ||
                                                  cProduct.detailStatus == '1' ||
                                                  cProduct.detailStatus == '7' ||
                                                  cProduct.detailStatus == '13' ||
                                                  cProduct.detailStatus == '19' ||
                                                  cProduct.detailStatus == '17'">注销</div>
                                </div>
                            </div>
                        </div>

                        <div class="operate-list clearfix"
                             v-else-if="cProduct.onlineStatus == '2'">

                            <div @click="showContractProductDetail(cProduct.productCode)"
                                 class="mr-30 pointer cl-blue">
                              详情
                            </div>

                            <div class="mr-30 pointer cl-blue revocation"
                                 @click="revocation(index)"
                                 v-if="cProduct.detailStatus == '10' ||
                                             cProduct.detailStatus == '4' ||
                                             cProduct.detailStatus == '0'">撤销</div>

                            <div class="mr-30 pointer cl-blue"
                                 @click="changeInfo(cProduct)"
                                 v-if="cProduct.detailStatus == null ||
                                        cProduct.detailStatus == '11' ||
                                        cProduct.detailStatus == '5' ||
                                        cProduct.detailStatus == '1' ||
                                        cProduct.detailStatus == '13' ||
                                        cProduct.detailStatus == '15'">
                              变更信息
                            </div>

                            <div class="pointer mr-30 cl-blue more"
                                 :class="{'active':cProduct.isShow}"
                                 @click.stop="showSelect(index)"
                                 v-if="cProduct.detailStatus == null ||
                                        cProduct.detailStatus == '11' ||
                                        cProduct.detailStatus == '5' ||
                                        cProduct.detailStatus == '1' ||
                                        cProduct.detailStatus == '13' ||
                                        cProduct.detailStatus == '15'">
                                  更多
                                 <i class="icon icon-arrow-down-blue"></i>

                                <div class="option-mask" :class="{opMask: cProduct.isShow}">
                                    <div class="option-item" @click="online(index)"
                                         v-if="cProduct.detailStatus == null ||
                                                  cProduct.detailStatus == '11' ||
                                                  cProduct.detailStatus == '5' ||
                                                  cProduct.detailStatus == '1' ||
                                                  cProduct.detailStatus == '13' ||
                                                  cProduct.detailStatus == '15'">上线</div>

                                    <div class="option-item" @click="offline(cProduct.productCode,cProduct.detailStatus)"
                                         v-if="cProduct.detailStatus == null ||
                                                  cProduct.detailStatus == '11' ||
                                                  cProduct.detailStatus == '5' ||
                                                  cProduct.detailStatus == '1' ||
                                                  cProduct.detailStatus == '13' ||
                                                  cProduct.detailStatus == '15'">下线</div>
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
                                  @click="deleteBtn(cProduct.productCode, cProduct.detailStatus)"
                                  v-if="cProduct.detailStatus == null || cProduct.detailStatus == '9'">删除
                            </div>

                            <div class="mr-30 pointer cl-blue revocation"
                                 @click="revocation(index)"
                                 v-if="cProduct.detailStatus == '8'">撤销</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="contractProductList.length <= 0" class="no-asset-box">
            <!-- <img src="../../../assets/no-asset-show.png"> -->
            <v-nolist :text="'暂无数据'"></v-nolist>
        </div>

        <modal name="contractProductListConfirmModal" :width="390" :height="200" @before-close="beforeClose">
            <t-modal-sub-container
                :title="modalTitle"
                :name="'contractProductListConfirmModal'">

                <v-confirm-delete-modal
                    :functionType="'contractProductListConfirmModal'"
                    :confirmInfo="confirmInfo">
                </v-confirm-delete-modal>

            </t-modal-sub-container>
        </modal>
    </div>
</template>
<script>
    import VPaging from '@/components/paging'
    import VConfirmPopoverModal from '@/components/confim-modal/confirm-popover-modal'
    import VOperateSuccessModal from '@/components/operate-modal/operate-success-modal'
    import VNolist from '@/components/no-list'
    import TModalSubContainer from "@/components/modal-sub-container"
    import VConfirmDeleteModal from '@/components/confirm-delete-modal/confirm-delete-modal'

    export default {
        name: 'ContractProductTable',
        props: {
            contractProductList: Array
        },
        data() {
            return{
                count: 0,
                modalTitle: '',      //确认信息modal的title
                confirmInfo: '',      //modal的确认信息
                postData: {         //给下线，删除，注销，上线等功能使用
                    cpCode: '',
                    status: ''
                }
            }
        },
        components: {
            VPaging,
            VConfirmPopoverModal,
            VOperateSuccessModal,
            VNolist,
            VConfirmDeleteModal,
            TModalSubContainer
        },
        computed: {

        },
        methods: {
            beforeClose(){},

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
                //this.contractProductList[index].operateType = "是否注销该产品";


            },

            offline(cpCode, detailStatus) {
                this.postData.cpCode = cpCode;

                this.postData.status = detailStatus;

                this.modalTitle = '是否确认下线？';

                this.confirmInfo = '审批通过后，产品下线成功';

                this.$modal.show('contractProductListConfirmModal');

                console.log("offline cpCode: " + this.postData.cpCode);
                console.log("offline status: " + this.postData.status);
            },

            online(index) {},

            hide(index) {},

            revocation(index) {},

            deleteBtn(cpCode, detailStatus) {

                this.postData.cpCode = cpCode;

                this.postData.status = detailStatus;

                this.modalTitle = '是否确认删除？';

                this.confirmInfo = '删除后产品不可恢复';

                this.$modal.show('contractProductListConfirmModal');

                console.log("cpCode: " + this.postData.cpCode);
                console.log("status: " + this.postData.status);
            },

            changeInfo(itemObj) {
                //this.$router.push({ 'name': 'ContractProductUpdate'});
            }
        },
        mounted(){
            this.documentHideOption();
        },
        created(){
            /**
             * 接收来自确认modal框的信息
             * */
            this.bus.$on('contractProductListConfirmModalBus', res => {
                let that = this;

                if(this.modalTitle == "是否确认删除") {

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

                            this.bus.$emit('sendDeleteContractProductSuccessInfoBus');
                        } else {
                            that.$root.toastText = '删除失败';
                            that.$root.toast = true;
                        }
                    });
                } else if(this.modalTitle == '是否确认下线') {
                    this.$http.get(this.api.updateProductState,
                        {
                            params:{
                                contractProductId:this.willDeleteID,
                                onlineStatus:'1',
                                detailStatus:this.willDeleteDetailSatus
                            }
                        }).then(response => {

                        let res = response.body;

                        console.log("res: " + JSON.stringify(res));

                        if(res.resultMessage =='成功'){

                            that.$root.toastText = '下线成功';
                            that.$root.toast = true;

                            this.bus.$emit('sendOfflineContractProductSuccessInfoBus');
                        } else {
                            that.$root.toastText = '下线失败';
                            that.$root.toast = true;
                        }
                    });
                }
            });
        },
        destroyed(){
            this.bus.$off('contractProductListConfirmModalBus');
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
