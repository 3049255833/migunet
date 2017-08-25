<template>
    <div class="contract-product">
        <div class="table-wrapper">
            <v-table-operate-head title="合约产品管理"></v-table-operate-head>

            <v-contract-product-table :contractProductList="contractProductList"></v-contract-product-table>
            <v-Paging :maxPage="'30'"></v-Paging>
        </div>
    </div>
</template>

<script>
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
                    keys:'',
                    status:1,
                    approveStatus: '',
                    productCatalog:1,
                    effectivetime:'',
                    expiretime:'',
                    pageSize:'8',
                    pageNumber:'1'
                }
            }
        },
        created(){
            /**
             * 初始请求
             * */
            this.getContractProductList();

            /**
             * 接收来自操作头部的信息
             * */
            this.bus.$on('sendOperateDataBus', res => {
                this.postData.keys = res.keys;
                this.postData.status = res.status;
                this.postData.productCatalog = res.productCatalog;
                this.postData.effectivetime = res.effectivetime;
                this.postData.expiretime = res.expiretime;

                console.log("postData: " + JSON.stringify(this.postData));

                this.getContractProductList();
            });

            /**
             * 接收分页信息
             * */
            this.bus.$on('pagingBus', res => {
                this.postData.pageNumber = res.pagingValue;
                this.postData.pageSize = res.pagingSize;

                console.log("postData: " + JSON.stringify(this.postData));

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
                this.$http.get(this.api.getContractProductList,
                    {
                        params:{
                            keys:this.postData.keys||'',
                            status:this.postData.status||'',
                            productCatalog:this.postData.approveStatus||'',
                            effectivetime:this.postData.effectivetime||'',
                            expiretime:this.postData.expiretime||'',
                            pageSize:this.postData.pageSize||'',
                            pageNumber:this.postData.pageNumber||''
                        }
                    }).then(response => {

                    let res = response.body;

                    if(res.result.resultCode=='00000000'){
                        //todo: 注意，返回的字段这里list小写

                        //console.log("contractProductList2: " + JSON.stringify(res.contractProductList));

                        this.contractProductList = res.contractProductList;
                    } else {

                        console.log("res: " + JSON.stringify(res));
                    }
                })
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


    .table-wrapper {
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
