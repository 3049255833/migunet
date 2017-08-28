<template>
    <div class="single-product">
        <div class="table-wrapper">
            <v-table-operate-head hideBtn="true" title="单品管理"></v-table-operate-head>
            <v-single-product-table :productList="productList"></v-single-product-table>
            <v-paging :totalItem="totalItem"></v-paging>
        </div>
    </div>
</template>
<script>
    import VSingleProductTable from '@/pages/singleProduct/components/single-product-table.vue'
    import VPaging from '@/components/paging'
    import VTableOperateHead from '@/pages/singleProduct/components/table-operate-head'
    export default {
        name: 'Home',
        data(){
            return{
                formData:{},
                productList:[],
                operateHeadData:{},
                postData:{
                    keys:'',
                    status:'0',
                    approveStatus:'0',
                    pageSize:'8',
                    pageNumber:'1',
                    effectiveTime:'',
                    expireTime:''
                },
                totalItem:''
            }
        },
        components: {
            VSingleProductTable,
            VTableOperateHead,
            VPaging
        },
        mounted(){},
        created(){
            /**
             * 初始请求
             * */
            this.getSingleProductList();
            /**
             * 接收来自操作头部的信息
             * */
            this.bus.$on('sendOperateDataBus', res => {
                this.postData.keys=res.keys;
                this.postData.status=res.status;
                this.postData.approveStatus=res.approveStatus;
                this.postData.effectiveTime=res.effectiveTime;
                this.postData.expireTime=res.expireTime;
                /*console.log(this.postData);*/
                this.getSingleProductList();
            });
            /**
             * 接收分页信息
             * */
            this.bus.$on('pagingBus', res => {
                this.postData.pageNumber=res.pagingValue;
                this.postData.pageSize=res.pagingSize;

                this.getSingleProductList();
            });
        },
        
        methods: {
            /**
             * 获取单品产品列表
             * keys 搜索关键字 string
             * status 产品状态 string
             * approveStatus 审批状态 string
             * pageSize 每页条数 string
             * pageNumber 页码数 string
             * effectiveTime 生效时间 string
             * expireTime 失效时间 string
             * */
            getSingleProductList(){
                this.$http.get(this.api.getSingleProductList,
                    {
                        params:{
                            keys:this.postData.keys||'',
                            status:this.postData.status||'',
                            approveStatus:this.postData.approveStatus||'',
                            pageSize:this.postData.pageSize||'',
                            pageNumber:this.postData.pageNumber||'',
                            effectiveTime:this.postData.effectiveTime||'',
                            expireTime:this.postData.expireTime||''
                        }
                    }).then(response => {
                    let res = response.body;
                    if(res.result.resultCode=='00000000'){
                        //todo: 注意，返回的字段这里list小写
                        this.productList=res.productlist;
                        this.totalItem=res.totalItem;
                    }else{
                        
                    }
                })
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
