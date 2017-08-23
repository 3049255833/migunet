<template>
    <div class="single-product">
        <div class="table-wrapper">
            <v-table-operate-head hideBtn="true" title="单品管理"></v-table-operate-head>
            <v-single-product-table :productList="productList"></v-single-product-table>
            <v-paging></v-paging>
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
                productList:[]
            }
        },
        components: {
            VSingleProductTable,
            VTableOperateHead,
            VPaging
        },
        mounted(){

        },
        created(){
            //初始请求
            this.getSingleProductList()
        },
        methods: {
            /**
             * 获取单品产品列表
             * @param keys 搜索关键字 string
             * @param status 产品状态 string
             * @param approveStatus 审批状态 string
             * @param pageSize 每页条数 string
             * @param pageNumber 页码数 string
             * @param effectivetime 生效时间 string
             * @param expiretime 失效时间 string
             * */
            getSingleProductList(keys, status, approveStatus, pageSize, pageNumber, effectivetime, expiretime){
                this.$http.get(this.api.getSingleProductList,
                    {
                        params:{
                            keys:keys||'',
                            status:status||'',
                            approveStatus:approveStatus||'',
                            pageSize:pageSize||'',
                            pageNumber:pageNumber||'',
                            effectivetime:effectivetime||'',
                            expiretime:expiretime||''
                        }
                    }).then(response => {
                    let res = response.body;
                    if(res.result.resultCode=='00000000'){
                        //todo: 注意，返回的字段这里list小写
                        this.productList=res.productlist;
                        console.log(this.productList)
                    }else{
                        
                    }
                })
            }
        },
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
