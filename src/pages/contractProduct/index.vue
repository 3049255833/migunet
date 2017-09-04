<template>
    <div class="contract-product">
        <div class="table-wrapper">
            <v-table-operate-head title="合约产品管理" v-on:cSendOperateDataBus="getContractOperateData"></v-table-operate-head>

            <v-contract-product-table
                    :contractProductList="contractProductList">
            </v-contract-product-table>

            <v-paging :totalItem="totalItem" v-on:pagingBus="getPage"></v-paging>
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
                    keys:'',
                    onlineStatus:'',
                    detailStatus: '',
                    //productCatalog:1,
                    effectiveTime:'',
                    expireTime:'',
                    pageSize:'8',
                    pageNo:'1'
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
            this.bus.$on('sendDeleteContactProductInfo', res => {
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

                            for(var i = 0; i < res.contractProductList.list.length; i++) {
                                res.contractProductList.list[i].isShow = false;

                                res.contractProductList.list[i].isHideConfim = true;

                                res.contractProductList.list[i].operateType = "";
                            }

                            this.contractProductList = res.contractProductList.list;

                            this.totalItem= res.contractProductList.total;

                            //console.log("List: " + JSON.stringify(this.contractProductList));
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
                this.postData.keys = res.keys;
                this.postData.onlineStatus = res.onlineStatus;
                this.postData.detailStatus = res.detailStatus;
                //this.postData.productCatalog = res.productCatalog;
                this.postData.effectiveTime = res.effectiveTime;
                this.postData.expireTime = res.expireTime;

                console.log("postData: " + JSON.stringify(this.postData));

                this.getContractProductList();
            },

            /**
             * 获取分页信息
             * */
            getPage(res){
                this.postData.pageNo = res.pagingValue;
                this.postData.pageSize = res.pagingSize;
                this.getContractProductList();
            }
        },
        computed:{
            totalPage(){
                return this.totalItem
            }
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
