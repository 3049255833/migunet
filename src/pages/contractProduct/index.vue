<template>
    <div class="contract-product">
        <div class="table-wrapper">
            <v-table-operate-head title="合约产品管理" v-on:cSendOperateDataBus="getContractOperateData"></v-table-operate-head>

            <v-contract-product-table
                    :contractProductList="contractProductList">
            </v-contract-product-table>

            <v-paging ref="pagingModule"
                      :totalItem="totalItem"
                      v-on:pagingBus="getPage"></v-paging>
        </div>
    </div>
</template>

<script >
    import VContractProductTable from './components/contract-product-table'
    import VTableOperateHead from '@/pages/contractProduct/components/table-operate-head'
    import VPaging from '@/components/paging'

    export default {
        name: 'ContractProduct',
        components: {
            VContractProductTable,
            VTableOperateHead,
            VPaging
        },
        data() {
            return{
                contractProductList:[],
                postData:{
                    value:'',
                    onlineStatus :'',
                    detailStatus : '',
                    //productCatalog:1,
                    startTime :'',
                    endTime :'',
                    pageSize:'5',
                    pageNum:'1'
                },
                totalItem:''
            }
        },
        created(){
            /**
             * 初始请求
             * */
            this.getContractProductList();

            /**
             * 接收来自删除的信息
             * */
            this.bus.$on('sendDeleteContractProductSuccessInfoBus', res => {
                this.getContractProductList();
            });

            /**
             * 接收来自下线的信息
             * */
            this.bus.$on('sendOfflineContractProductSuccessInfoBus', res => {
                this.getContractProductList();
            });
        },
        methods: {
            /**
             * 获取单品产品列表
             * @param obj object , 为获取列表传入的数据
             * keys 搜索关键字 string
             * status 产品状态 string
             * productCatalog 产品目录 string
             * effectivetime 生效时间 string
             * expiretime 失效时间 string
             * pageSize 每页条数 string
             * pageNumber 页码数 string
             * */
            getContractProductList(){
                this.$http.post(this.api.getContractProductList, this.postData ,{showLoading:true}).then(
                    response => {
                        let res = response.body;

                        if(res.result.resultCode=='00000000'){

                            for(var i = 0; i < res.data.length; i++) {
                                res.data[i].isShow = false;
                            }

                            this.contractProductList = res.data;

                            this.totalItem= res.total;

                            console.log("getContractProductList: " + JSON.stringify(this.contractProductList));
                        } else {

                            console.log("res: " + JSON.stringify(res));
                        }
                    }
                );
            },

            /**
             * 获取来自头部的信息
             * */
            getContractOperateData(res){
                this.postData.value = res.value;
                this.postData.onlineStatus = res.onlineStatus;
                this.postData.detailStatus = res.detailStatus;
                //this.postData.productCatalog = res.productCatalog;
                this.postData.startTime = res.startTime;
                this.postData.endTime = res.endTime;

                this.postData.pageNum='1';
                this.$refs.pagingModule.current=1;

                console.log("res1111: " + JSON.stringify(res));

                this.getContractProductList();
            },

            /**
             * 获取分页信息
             * */
            getPage(res){
                this.postData.pageNum = res.pagingValue;
                this.postData.pageSize = res.pagingSize;
                this.getContractProductList();
            }
        },
        computed:{
            totalPage(){
                return this.totalItem
            }
        },
        destroyed(){
            this.bus.$off('sendDeleteContractProductSuccessInfoBus');
            this.bus.$off('sendOfflineContractProductSuccessInfoBus');
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .table-wrapper {
        position: relative;
    }

    .main-wrapper:after {
        content: '';
        display: block;
        clear: both;
    }


    .contract-product{
        background-color: white;
        padding-bottom: 50px;
    }
</style>
