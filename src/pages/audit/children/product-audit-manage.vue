<template>
    <div class="my-backlog">
        <v-manage-table-operate-head hideBtn="true"
                                     v-on:sendAuditDataBus="getAuditOperateData"
                              title="产品审批管理"></v-manage-table-operate-head>
        <v-product-audit-manage-table :contractAuditList="contractAuditList"></v-product-audit-manage-table>
        <v-paging ref="pagingModule" :totalItem="totalItem" v-on:pagingBus="getPage"></v-paging>
    </div>
</template>
<script type="es6">
    import VProductAuditManageTable from '@/pages/audit/components/product-audit-manage-table.vue'
    import VPaging from '@/components/paging'
    import VManageTableOperateHead from '@/pages/audit/components/manage-table-operate-head'
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
                    auditStatus:'',
                    pageSize: '5',
                    pageNum: '1'
                },
                totalItem: ''
            }
        },
        components: {
            VProductAuditManageTable,
            VManageTableOperateHead,
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
             * 获取产品审批管理列表
             * */
            getContractAuditList(){
                this.$http.post(this.api.getAuditList, {
                    cpCode: this.postData.searchKey || '',
                    targetStatus: this.postData.onlineStatus || '',
                    pageSize: this.postData.pageSize || '',
                    pageNum: this.postData.pageNum || '',
                    auditStatus: this.postData.auditStatus || '',
                }, {showLoading: true}).then(response => {
                    let res = response.body;
                    if (res.result.resultCode == '00000000') {
                        this.contractAuditList = res.data;

                        this.totalItem = res.total;

                        this.contractAuditList.forEach(function(item){
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
                this.postData.auditStatus = res.auditStatus;

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
