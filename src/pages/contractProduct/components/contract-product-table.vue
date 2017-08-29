<template>
    <div class="table-wrap">
        <table class="table-module">
            <thead>
            <tr>
                <th class="td-pl-68">产品名称</th>
                <th>产品ID</th>
                <th>CP／TP ID</th>
                <th>资费(分)</th>
                <th>业务状态</th>
                <th>审批状态</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(cProduct,index) in contractProductList">
                <td> {{cProduct.contractName}}</td>
                <td> {{cProduct.id}}</td>
                <td> {{cProduct.cpCode}}</td>
                <td> {{cProduct.fee}}</td>

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
                <td v-else-if="cProduct.onlineStatus == 5">
                    删除
                </td>

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
                <td v-else-if="cProduct.detailStatus === '8'">
                    变更报备失败
                </td>
                <td v-else></td>

                <td>
                    <div class="operate-list clearfix" v-if="cProduct.onlineStatus === '0'">
                        <div @click="showContractProductDetail(cProduct.id)"
                             class="mr-30 pointer cl-blue">
                            详情
                        </div>

                        <div class="mr-30 pointer cl-blue"
                             v-if="cProduct.detailStatus === '2' ||
                             cProduct.detailStatus === '4'">
                            变更信息
                        </div>

                        <v-confirm-modal
                                :operateType="cProduct.operateType"
                                :isHideConfim="cProduct.isHideConfim"
                                :index="index">
                        </v-confirm-modal>

                        <div class="pointer mr-30 cl-blue"
                             :class="{'active':cProduct.isShow}"
                             @click.stop="showSelect(index)"
                             v-if="cProduct.detailStatus === '1'">
                            更多
                            <i class="icon icon-arrow-down-blue"></i>
                        </div>

                        <div class="option-mask" :class="{opMask: cProduct.isShow}">
                          <div class="option-item" @click="revocation(index)"
                               v-if="cProduct.detailStatus === '1'">撤销</div>
                        </div>
                    </div>

                    <div class="operate-list clearfix"
                         v-else-if="cProduct.onlineStatus === '1'">

                        <div @click="showContractProductDetail(cProduct.id)"
                             class="mr-30 pointer cl-blue">
                          详情
                        </div>

                        <div class="mr-30 pointer cl-blue"
                             v-if="cProduct.detailStatus === '6' ||
                             cProduct.detailStatus == '8' ||
                             cProduct.detailStatus == ''">
                              变更信息
                        </div>

                        <v-confirm-modal
                            :operateType="cProduct.operateType"
                            :isHideConfim="cProduct.isHideConfim"
                            :index="index"
                        >
                        </v-confirm-modal>

                        <div class="pointer mr-30 cl-blue"
                             :class="{'active':cProduct.isShow}"
                             @click.stop="showSelect(index)"
                             v-if="cProduct.detailStatus !== '7'">
                            更多
                            <i class="icon icon-arrow-down-blue"></i>
                        </div>

                        <div class="option-mask" :class="{opMask: cProduct.isShow}">
                            <div class="option-item" @click="revocation(index)"
                                  v-if="cProduct.detailStatus === '6' ||
                                        cProduct.detailStatus == '' ||
                                        cProduct.detailStatus === '8'">下线</div>

                            <div class="option-item" @click="revocation(index)"
                                   v-if="cProduct.detailStatus === '6' ||
                                        cProduct.detailStatus == '' ||
                                        cProduct.detailStatus === '8'">隐藏</div>

                            <div class="option-item" @click="revocation(index)"
                                 v-if="cProduct.detailStatus === '6' ||
                                        cProduct.detailStatus == '' ||
                                        cProduct.detailStatus === '8'">注销</div>

                            <div class="option-item" @click="revocation(index)"
                                 v-if="cProduct.detailStatus === '5'">撤销</div>
                        </div>
                    </div>

                    <div class="operate-list clearfix"
                         v-else-if="cProduct.onlineStatus === '3'">

                        <div @click="showContractProductDetail(cProduct.id)"
                             class="mr-30 pointer cl-blue">
                            详情
                        </div>

                        <div class="mr-30 pointer cl-blue"
                             v-if="cProduct.detailStatus === '' ||
                                    cProduct.detailStatus === '6' ||
                                    cProduct.detailStatus === '8'">
                            变更信息
                        </div>

                        <v-confirm-modal
                            :operateType="cProduct.operateType"
                            :isHideConfim="cProduct.isHideConfim"
                            :index="index"
                        >
                        </v-confirm-modal>

                        <div class="pointer mr-30 cl-blue"
                             :class="{'active':cProduct.isShow}"
                             @click.stop="showSelect(index)"
                             v-if="cProduct.detailStatus !== '7'">
                            更多
                            <i class="icon icon-arrow-down-blue"></i>
                        </div>

                        <div class="option-mask" :class="{opMask: cProduct.isShow}">
                            <div class="option-item" @click="revocation(index)"
                               v-if="cProduct.detailStatus === '' ||
                                    cProduct.detailStatus === '6' ||
                                    cProduct.detailStatus === '8'">上线</div>

                            <div class="option-item" @click="revocation(index)"
                                  v-if="cProduct.detailStatus === '5'">下线</div>

                            <div class="option-item" @click="revocation(index)"
                                  v-if="cProduct.detailStatus === '' ||
                                        cProduct.detailStatus === '5' ||
                                        cProduct.detailStatus === '6' ||
                                        cProduct.detailStatus === '8'">隐藏</div>

                          <div class="option-item" @click="revocation(index)"
                                  v-if="cProduct.detailStatus === '' ||
                                  cProduct.detailStatus === '5' ||
                                  cProduct.detailStatus === '6' ||
                                  cProduct.detailStatus === '8'">注销</div>

                          <div class="option-item" @click="revocation(index)"
                                  v-if="cProduct.detailStatus === '5'">撤销</div>
                        </div>
                    </div>

                    <div class="operate-list clearfix"
                         v-else-if="cProduct.onlineStatus === '2'">

                        <div @click="showContractProductDetail(cProduct.id)"
                             class="mr-30 pointer cl-blue">
                          详情
                        </div>

                        <div class="mr-30 pointer cl-blue"
                             v-if="cProduct.detailStatus === '' ||
                             cProduct.detailStatus === '6' ||
                             cProduct.detailStatus === '8'">
                          变更信息
                        </div>

                        <v-confirm-modal
                          :operateType="cProduct.operateType"
                          :isHideConfim="cProduct.isHideConfim"
                          :index="index"
                        >
                        </v-confirm-modal>

                        <div class="pointer mr-30 cl-blue"
                             :class="{'active':cProduct.isShow}"
                             @click.stop="showSelect(index)"
                             v-if="cProduct.detailStatus !== '7'">
                          更多
                          <i class="icon icon-arrow-down-blue"></i>
                        </div>

                        <div class="option-mask" :class="{opMask: cProduct.isShow}">
                          <div class="option-item" @click="revocation(index)"
                               v-if="cProduct.detailStatus === '' ||
                               cProduct.detailStatus === '6' ||
                               cProduct.detailStatus === '8'">上线</div>

                          <div class="option-item" @click="revocation(index)"
                               v-if="cProduct.detailStatus === '' ||
                               cProduct.detailStatus === '6' ||
                               cProduct.detailStatus === '8'">下线</div>

                          <div class="option-item" @click="revocation(index)"
                               v-if="">隐藏</div>

                          <div class="option-item" @click="revocation(index)"
                               v-if="cProduct.detailStatus === '' ||
                               cProduct.detailStatus === '6' ||
                               cProduct.detailStatus === '8'">注销</div>

                          <div class="option-item" @click="revocation(index)"
                               v-if="cProduct.detailStatus === '5'">撤销</div>
                        </div>
                    </div>

                    <div class="operate-list clearfix"
                         v-else-if="cProduct.onlineStatus === '4'">

                        <div @click="showContractProductDetail(cProduct.id)"
                             class="mr-30 pointer cl-blue">
                          详情
                        </div>

                        <v-confirm-modal
                          :operateType="cProduct.operateType"
                          :isHideConfim="cProduct.isHideConfim"
                          :index="index"
                        >
                        </v-confirm-modal>

                        <div class="pointer mr-30 cl-blue"
                             :class="{'active':cProduct.isShow}"
                             @click.stop="showSelect(index)"
                             v-if="">
                          更多
                          <i class="icon icon-arrow-down-blue"></i>
                        </div>

                        <div class="option-mask" :class="{opMask: cProduct.isShow}">
                            <div class="option-item" @click="revocation(index)"
                                 v-if="cProduct.detailStatus === ''">删除</div>
                        </div>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>

        <v-operate-success-modal
            :isHideOperateModal="isHideOperateModal"
            :type="type"
        >
        </v-operate-success-modal>
    </div>
</template>
<script>
    import VSearch from '@/components/search'
    import VPaging from '@/components/paging'
    import VConfirmModal from './confirm-modal'
    import VOperateSuccessModal from './operate-success'
    import axios from 'axios'

    export default {
        name: 'ContractProductTable',
        props: {
            contractProductList: Array
        },
        data() {
            return{
                count: 0,
                isHideOperateModal: true,
                type: ''
            }
        },
        components: {
            VSearch,
            VPaging,
            VConfirmModal,
            VOperateSuccessModal
        },
        computed: {},
        methods: {
            showContractProductDetail(id){
                this.$router.push({'name': 'ContractProductDetail',params: {'id': id}});
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

                    if (that.count || that.count === 0) {

                        that.contractProductList[that.count].isShow = false;
                    }
                });
            },

            logout(index) {
                this.contractProductList[index].isHideConfim = false;

                this.contractProductList[index].operateType = "注销";
            },

            offline(index) {
                this.contractProductList[index].isHideConfim = false;

                this.contractProductList[index].operateType = "下线";
            },

            hide(index) {
                this.contractProductList[index].isHideConfim = false;

                this.contractProductList[index].operateType = "隐藏";
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

                this.type = this.contractProductList[res].operateType;

                this.isHideOperateModal = false;

                let that = this;

                setTimeout(function () {

                    that.isHideOperateModal = true;

                }, 3000);
            });

            /**
             * 接收来自取消modal框的信息
             * */
            this.bus.$on('sendCancelInfo', res => {
              this.contractProductList[res].isHideConfim = true;
            });
        },
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
        }
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
        margin-left: 125px;

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
