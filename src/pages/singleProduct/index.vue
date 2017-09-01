<template>
    <div class="single-product">
        <div class="table-wrapper">
            <v-table-operate-head hideBtn="true"
                                  v-on:sendSingleOperateDataBus="getSingleOperateData"
                                  title="单品管理" ></v-table-operate-head>
            <v-single-product-table :productList="productList"></v-single-product-table>
            <v-paging :totalItem="totalItem" v-on:pagingBus="getPage"></v-paging>
        </div>
    </div>
</template>
<script >
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
                    searchKey:'',
                    onlineStatus:'0',
                    detailStatus:'0',
                    pageSize:'8',
                    pageNum:'1',
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
          /*  /!**
             * 接收来自操作头部的信息
             * *!/
            this.$on('sendSingleOperateDataBus', res => {
                this.postData.searchKey=res.searchKey;
                this.postData.onlineStatus=res.onlineStatus;
                this.postData.detailStatus=res.detailStatus;
                this.postData.effectiveTime=res.effectiveTime;
                this.postData.expireTime=res.expireTime;
                this.getSingleProductList();
            });*/
         
        },
        
        methods: {
            /**
             * 获取单品产品列表
             * searchKey 搜索关键字 string
             * status 产品状态 string
             * detailStatus 审批状态 string
             * pageSize 每页条数 string
             * pageNum 页码数 string
             * effectiveTime 生效时间 string
             * expireTime 失效时间 string
             * */
            getSingleProductList(){
                this.$http.get(this.api.getSingleProductList, {
                    params:{
                        searchKey:this.postData.searchKey||'',
                        onlineStatus:this.postData.onlineStatus||'',
                        detailStatus:this.postData.detailStatus||'',
                        pageSize:this.postData.pageSize||'',
                        pageNum:this.postData.pageNum||'',
                        effectiveTime:this.postData.effectiveTime||'',
                        expireTime:this.postData.expireTime||''
                    },
                    showLoading:true
                }).then(response => {
                    let res = response.body;
                    if(res.result.resultCode=='00000000'){
                        //todo: 注意，返回的字段这里list小写
                        this.productList=res.data.list;
                        this.totalItem=res.data.total;
                    }else{
                        
                    }
                })
            },
            
            /**
             * 获取分页信息
             * */
            getPage(res){
                this.postData.pageNum=res.pagingValue;
                this.postData.pageSize=res.pagingSize;
                this.getSingleProductList();
            },
            
            /**
             * 接收来自操作投
             * */
            getSingleOperateData(res){
                this.postData.searchKey=res.searchKey;
                this.postData.onlineStatus=res.onlineStatus;
                this.postData.detailStatus=res.detailStatus;
                this.postData.effectiveTime=res.effectiveTime;
                this.postData.expireTime=res.expireTime;
                this.getSingleProductList();
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
