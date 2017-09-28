<template>
    <div class="my-backlog">
        <v-table-operate-head hideBtn="true"
                              ref="myBacklogHead"
                              v-on:sendAuditDataBus="getAuditOperateData"
                              v-on:auditFlagBus="changeAuditFlag"
                              v-on:passBus="auditOperate"
                              title="我的待办"></v-table-operate-head>

        <v-my-backlog-table ref="myBacklogTable"
                            :auditFlag="auditFlag"
                            v-on:oneKeyPassBus="oneKeyPassReception"
                            :contractAuditList="contractAuditList"></v-my-backlog-table>

        <v-paging ref="pagingModule" :totalItem="totalItem" v-on:pagingBus="getPage"></v-paging>

        <!--填入拒绝原因-->
        <modal name="reviewRejectModal" :width="450" :height="310">
            <t-modal-sub-container :title="'审批拒绝原因'" :name="'reviewRejectModal'">
                <v-review-reject-modal :modalName="'reviewRejectModal'"
                                       v-on:rejectOpinionBus="getAuditOpinion"
                                       :selectType="'single'"></v-review-reject-modal>
            </t-modal-sub-container>
        </modal>

        <modal name="myBackLogComfirmModal" :width="390" :height="200" @before-close="beforeClose">
            <t-modal-sub-container
                :title="'是否确认一键通过？'"
                :name="'myBackLogComfirmModal'">

                <v-confirm-delete-modal
                  :functionType="'myBackLogOneKeyPassComfirmInfo'"
                  :confirmInfo="'确认后，系统默认全部审批通过！'">
                </v-confirm-delete-modal>
            </t-modal-sub-container>
        </modal>
    </div>
</template>
<script type="es6" >
    import VMyBacklogTable from '@/pages/audit/components/my-backlog-table.vue'
    import VPaging from '@/components/paging'
    import VTableOperateHead from '@/pages/audit/components/table-operate-head'
    import VReviewRejectModal from '@/pages/audit/components/review-reject-modal'
    import TModalSubContainer from "@/components/modal-sub-container";
    import VConfirmDeleteModal from '@/components/confirm-delete-modal/confirm-delete-modal'

    export default {
        name: 'MyBacklog',
        data(){
            return {
                formData: {},
                contractAuditList: [],
                operateHeadData: {},
                postData: {
                    searchKey: '',
                    onlineStatus: '',
                    pageSize: '5',
                    pageNum: '1'
                },
                totalItem: '',
                auditFlag: false,
                postDataList: [],
                confirmInfo: ''
            }
        },
        components: {
            VMyBacklogTable,
            VTableOperateHead,
            VPaging,
            VReviewRejectModal,
            TModalSubContainer,
            VConfirmDeleteModal
        },
        mounted(){
        },
        created(){
            /**
             * 初始请求
             * */
            this.getContractAuditList();

            /*接受一键通过确认信息*/
            this.bus.$on('contractProductListConfirmInfoBus', res => {

                let that = this;

                this.$http.post(this.api.onekeyAudit, {showLoading:true}).then(response => {
                    let res = response.body;

                    if (res.result.resultCode == '00000000') {
                        this.$root.toastText = '审批成功';
                        this.$root.toast = true;

                        this.$modal.hide('myBackLogComfirmModal');

                        setTimeout(function(){
                            that.getContractAuditList();
                        },2000);
                    } else {
                        this.$root.toastText = '审批失败';
                        this.$root.toast = true;
                    }
                }, (response) => {
                    this.$root.toastText = '服务器错误';
                    this.$root.toast = true;
                });
            });
        },

        methods: {
            oneKeyPassReception(){
                this.$modal.show('myBackLogComfirmModal');
            },

            beforeClose() {},

            /**
             * 获取我的代办列表
             * */
            getContractAuditList(){

                this.$http.post(this.api.getAuditList, {
                    cpCode: this.postData.searchKey || '',
                    targetStatus: this.postData.onlineStatus || '',
                    pageSize: this.postData.pageSize || '',
                    pageNum: this.postData.pageNum || '',
                    auditStatus: '-1'
                }, {showLoading: true}).then(response => {
                    let res = response.body;

                    if (res.result.resultCode == '00000000') {

                        this.contractAuditList = res.data;

                        this.totalItem = res.total;

                        this.contractAuditList.forEach(function (item) {
                            item.auditStatusNum = item.auditStatus;
                            item.targetStatusNum = item.targetStatus;
                            switch (parseInt(item.auditStatus)) {
                                case 0:
                                    item.auditStatus = '拒绝';
                                    break;
                                case 1:
                                    item.auditStatus = '通过';
                                    break;
                                case -1:
                                    item.auditStatus = '待审批';
                                    break;
                            }
                            switch (parseInt(item.targetStatus)) {
                                case 1:
                                    item.targetStatus = '上线审批';
                                    break;
                                case 2:
                                    item.targetStatus = '隐藏审批';
                                    break;
                                case 3:
                                    item.targetStatus = '下线审批';
                                    break;
                                case 4:
                                    item.targetStatus = '注销审批';
                                    break;
                                case 5:
                                    item.targetStatus = '删除审批';
                                    break;
                                case 6:
                                    item.targetStatus = '变更审批';
                                    break;
                            }
                        });
                        this.$refs.myBacklogTable.auditCheckbox=[];

                        console.log("getContractAuditList:" + JSON.stringify(this.contractAuditList));

                    } else {
                        this.contractAuditList = [];
                        this.$refs.myBacklogTable.auditCheckbox=[];
                    }
                })
            },

            changeAuditFlag(res){
                this.auditFlag = res;
            },

            auditOperate(res){
                let that = this;
                if (res) {
                    //同意审批
                    this.postDataList = [];
                    let _indexList = this.$refs.myBacklogTable.auditCheckbox;
                    console.log(_indexList)
                    if (_indexList.length > 0) {
                        _indexList.forEach(function (index) {
                            index=parseInt(index);
                            that.postDataList.push({
                                id: that.contractAuditList[index].productId,
                                statusId: that.contractAuditList[index].statusId,
                                auditStatus: res ? '1' : '0',
                                auditOpinion: res ? '' : '不同意',
                                auditTime: that.utils.getNowDate(),
                                targetStatus: that.contractAuditList[index].targetStatusNum,
                                auditPerson: 'admin',
                                cstModified: that.utils.getNowDate(),
                                detailStatus: '',
                                productCode:that.contractAuditList[index].productCode,
                                productName:that.contractAuditList[index].productName
                            });
                        });

                        console.log("updateAuditStatusList: " + JSON.stringify(this.postDataList));

                        that.$http.post(this.api.updateAuditStatusList, that.postDataList).then(response=> {
                            let res = response.body;
                            if (res.result.resultCode == '00000000') {
                                this.$root.toastText = '审批成功';
                                this.$root.toast = true;
                            } else {
                                this.$root.toastText = '审批失败';
                                this.$root.toast = true;
                            }
                            this.$refs.myBacklogHead.auditFlag=false;
                            this.auditFlag=false;
                            this.postData.pageNum='1';
                            this.$refs.pagingModule.current=1;
                            this.$refs.myBacklogTable.auditCheckbox=[];
                            this.$refs.myBacklogTable.ifAuditAll=[]
                            this.getContractAuditList();
                        }, (response) => {
                            this.$root.toastText = '服务器错误';
                            this.$root.toast = true
                        })
                    }
                } else {
                    //不同意
                    this.postDataList = [];
                    let _indexList = this.$refs.myBacklogTable.auditCheckbox;
                    if (_indexList.length > 0) {
                        this.$modal.show('reviewRejectModal');
                        _indexList.forEach(function (index) {
                            //list
                            that.postDataList.push({
                                id: that.contractAuditList[index].productId,
                                statusId: that.contractAuditList[index].statusId,
                                auditStatus: res ? '1' : '0',
                                auditOpinion: res ? '' : '不同意',
                                auditTime: that.utils.getNowDate(),
                                targetStatus: that.contractAuditList[index].targetStatusNum,
                                auditPerson: 'admin',
                                cstModified: that.utils.getNowDate(),
                                detailStatus: that.contractAuditList[index].targetStatusNum + '2',
                                productCode:that.contractAuditList[index].productCode,
                                productName:that.contractAuditList[index].productName
                            });
                        });
                    }
                }
            },

            getAuditOpinion(res){
                let that = this;
                this.postDataList.forEach(function (item) {
                    item.auditOpinion = res;
                });
                that.$http.post(this.api.updateAuditStatusList, that.postDataList).then(response => {
                    let res = response.body;
                    if (res.result.resultCode == '00000000') {
                        this.$root.toastText = '审批成功';
                        this.$root.toast = true;
                    } else {
                        this.$root.toastText = '审批失败';
                        this.$root.toast = true;
                    }
                    this.$refs.myBacklogHead.auditFlag=false;
                    this.auditFlag=false;
                    this.postData.pageNum='1';
                    this.$refs.pagingModule.current=1;
                    this.$refs.myBacklogTable.auditCheckbox=[];
                    this.$refs.myBacklogTable.ifAuditAll=[];
                    this.$modal.hide('reviewRejectModal');
                    this.getContractAuditList();
                }, (response) => {
                    this.$root.toastText = '服务器错误';
                    this.$root.toast = true
                })
            },

            /**
             * 获取分页信息
             * */
            getPage(res){
                this.postData.pageNum = res.pagingValue;
                this.postData.pageSize = res.pagingSize;
                this.getContractAuditList();
            },

            /**
             * 接收来自头部的信息
             * */
            getAuditOperateData(res){
                this.postData.searchKey = res.searchKey;
                this.postData.onlineStatus = res.onlineStatus;
                this.postData.detailStatus = res.detailStatus;
                this.postData.pageNum='1';
                this.$refs.pagingModule.current=1;

                this.getContractAuditList();
            }
        },
        computed: {
            totalPage(){
                return this.totalItem
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    .main-wrapper {
        background: #f4f4f4;
    }

    .nav-wrapper {
        float: left;
    }

    .table-wrapper {
    }

    .main-wrapper:after {
        content: '';
        display: block;
        clear: both;
    }

    .date-wrapper {

    }

    .single-product {
        background-color: white;
        padding-bottom: 50px;
    }

    input {

    }
</style>
