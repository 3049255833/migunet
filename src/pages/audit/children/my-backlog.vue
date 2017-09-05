<template>
    <div class="my-backlog">
        <v-table-operate-head hideBtn="true"
                              v-on:sendAuditDataBus="getAuditOperateData"
                              v-on:auditFlagBus="changeAuditFlag"
                              v-on:passBus="auditOperate"
                              title="我的待办"></v-table-operate-head>
        <v-my-backlog-table ref="myBacklogTable" :auditFlag="auditFlag"
                            :contractAuditList="contractAuditList"></v-my-backlog-table>
        <v-paging :totalItem="totalItem" v-on:pagingBus="getPage"></v-paging>
        
        <!--填入拒绝原因-->
        <modal name="reviewRejectModal" :width="450" :height="310" >
            <t-modal-sub-container :title="'审批拒绝原因'" :name="'reviewRejectModal'">
                <v-review-reject-modal :modalName="'reviewRejectModal'"
                                       v-on:rejectOpinionBus="getAuditOpinion"
                                       :selectType="'single'"></v-review-reject-modal>
            </t-modal-sub-container>
        </modal>
    </div>
</template>
<script>
    import VMyBacklogTable from '@/pages/audit/components/my-backlog-table.vue'
    import VPaging from '@/components/paging'
    import VTableOperateHead from '@/pages/audit/components/table-operate-head'
    import VReviewRejectModal from '@/pages/audit/components/review-reject-modal'
    import TModalSubContainer from "@/components/modal-sub-container";
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
                    pageSize: '8',
                    pageNum: '1'
                },
                totalItem: '',
                auditFlag: false,
                postDataList: []
            }
        },
        components: {
            VMyBacklogTable,
            VTableOperateHead,
            VPaging,
            VReviewRejectModal,
            TModalSubContainer
        },
        mounted(){
        },
        created(){
            /**
             * 初始请求
             * */
            this.getContractAuditList();
        },

        methods: {
            /**
             * 获取我的代办列表
             * */
            getContractAuditList(){
                this.$http.post(this.api.getContractAuditList, {
                    keys: this.postData.searchKey || '',
                    onlineStatus: this.postData.onlineStatus || '',
                    pageSize: this.postData.pageSize || '',
                    pageNo: this.postData.pageNum || '',
                    auditStatus: '-1'
                }, {showLoading: true}).then(response => {
                    let res = response.body;
                    if (res.result.resultCode == '00000000') {
                        this.contractAuditList = res.productAuditList.list;
                        this.totalItem = res.productAuditList.total;
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
                                case 0:
                                    item.targetStatus = '发布';
                                    break;
                                case 1:
                                    item.targetStatus = '修改';
                                    break;
                                case 2:
                                    item.targetStatus = '定价变更';
                                    break;
                                case 3:
                                    item.targetStatus = '下线';
                                    break;
                                case 4:
                                    item.targetStatus = '恢复上线';
                                    break;
                            }
                        });

                    } else {
                        this.contractAuditList = []
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
                    this.postDataList=[];
                    let _indexList = this.$refs.myBacklogTable.auditCheckbox;
                    if (_indexList.length > 0) {
                        _indexList.forEach(function (index) {
                            //list
                            that.postDataList.push({
                                id: that.contractAuditList[index].id,
                                productCode: that.contractAuditList[index].productCode,
                                auditStatus: res ? '1' : '0',
                                auditOpinion: res ? '' : '不同意',
                                auditTime: that.utils.getNowDate(),
                                targetStatus: that.contractAuditList[index].targetStatusNum,
                                auditPerson: 'admin',
                                updateTime: that.utils.getNowDate()
                            });
                        })
                    }
                    console.log(this.postDataList)
                }else{
                    //不同意
                    this.postDataList=[];
                    let _indexList = this.$refs.myBacklogTable.auditCheckbox;
                    if (_indexList.length > 0) {
                        this.$modal.show('reviewRejectModal');
                        _indexList.forEach(function (index) {
                            //list
                            that.postDataList.push({
                                id: that.contractAuditList[index].id,
                                productCode: that.contractAuditList[index].productCode,
                                auditStatus: res ? '1' : '0',
                                auditOpinion: res ? '' : '不同意',
                                auditTime: that.utils.getNowDate(),
                                targetStatus: that.contractAuditList[index].targetStatusNum,
                                auditPerson: 'admin',
                                updateTime: that.utils.getNowDate()
                            });
                        });
                    }
                }
            },

            getAuditOpinion(res){
                let that=this;
                this.postDataList.forEach(function(item){
                    item.auditOpinion=res;
                });
                console.log(this.postDataList)
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
