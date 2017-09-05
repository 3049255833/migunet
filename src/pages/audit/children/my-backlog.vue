<template>
    <div class="my-backlog">
        <v-table-operate-head hideBtn="true"
                              v-on:sendAuditDataBus="getAuditOperateData"
                              title="我的待办"></v-table-operate-head>
        <v-my-backlog-table :contractAuditList="contractAuditList"></v-my-backlog-table>
        <v-paging :totalItem="totalItem" v-on:pagingBus="getPage"></v-paging>
    </div>
</template>
<script>
    import VMyBacklogTable from '@/pages/audit/components/my-backlog-table.vue'
    import VPaging from '@/components/paging'
    import VTableOperateHead from '@/pages/audit/components/table-operate-head'
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
                totalItem: ''
            }
        },
        components: {
            VMyBacklogTable,
            VTableOperateHead,
            VPaging
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
                    auditStatus:'-1'
                }, {showLoading: true}).then(response => {
                    let res = response.body;
                    if (res.result.resultCode == '00000000') {
                        this.contractAuditList = res.productAuditList.list;
                        this.totalItem = res.productAuditList.total;
                        this.contractAuditList.forEach(function(item){
                            switch (parseInt(item.auditStatus)){
                                case 0:
                                    item.auditStatus='拒绝';
                                    break;
                                case 1:
                                    item.auditStatus='通过';
                                    break;
                                case -1:
                                    item.auditStatus='待审批';
                                    break;
                            }
                            switch (parseInt(item.targetStatus)){
                                case 0:
                                    item.targetStatus='发布';
                                    break;
                                case 1:
                                    item.targetStatus='修改';
                                    break;
                                case 2:
                                    item.targetStatus='定价变更';
                                    break;
                                case 3:
                                    item.targetStatus='下线';
                                    break;
                                case 4:
                                    item.targetStatus='恢复上线';
                                    break;
                            }
                        });
                      
                    } else {
                        this.contractAuditList = []
                    }
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
             * 接收来自操作投
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
