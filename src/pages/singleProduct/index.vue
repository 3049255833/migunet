<template>
    <div class="single-product">
        <div class="table-wrapper">
            <v-table-operate-head hideBtn="true"
                                  v-on:sendSingleOperateDataBus="getSingleOperateData"
                                  title="单品管理" ></v-table-operate-head>
            <v-single-product-table :productList="productList"></v-single-product-table>
            <v-paging ref="pagingModule" :totalItem="totalItem" v-on:pagingBus="getPage"></v-paging>
        </div>
    </div>
</template>
<script type="es6" >
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
                    onlineStatus:'',
                    detailStatus:'',
                    pageSize:'5',
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
                        enableTime:this.postData.effectiveTime||'',
                        disableTime:this.postData.expireTime||''
                    },
                    showLoading:true
                }).then(response => {
                    let res = response.body;

                    console.log("Single: " + JSON.stringify(res));

                    if(res.result.resultCode=='00000000'){
                        //todo: 注意，返回的字段这里list小写
                        res.pageInfo.list.forEach(function(item){
                            switch (parseInt(item.onlineStatus)){
                                case 0:
                                    item.onlineStatus='草稿';
                                    break;
                                case 1:
                                    item.onlineStatus='上线';
                                    break;
                                case 2:
                                    item.onlineStatus='隐藏';
                                    break;
                                case 3:
                                    item.onlineStatus='下线';
                                    break;
                                case 4:
                                    item.onlineStatus='注销';
                                    break;
                            }
                            switch (parseInt(item.detailStatus)){
                                /*case 0:
                                  //item.detailStatus='上线审批中';
                                  break;
                                case 1:
                                  //item.detailStatus='上线审批失败';
                                  break;
                                case 2:
                                  //item.detailStatus='隐藏审批中';
                                  break;
                                case 3:
                                  //item.detailStatus='隐藏审批失败';
                                  break;
                                case 4:
                                  //item.detailStatus='下线审批中';
                                  break;
                                case 5:
                                  //item.detailStatus='下线审批失败';
                                  break;
                                case 6:
                                  //item.detailStatus='注销审批中';
                                  break;
                                case 7:
                                  //item.detailStatus='注销审批失败';
                                  break;
                                case 8:
                                  //item.detailStatus='删除审批中';
                                  break;
                                case 9:
                                  //item.detailStatus='删除审批失败';
                                  break;
                                case 10:
                                  //item.detailStatus='变更审批中';
                                  break;
                                case 11:
                                  //item.detailStatus='变更审批失败';
                                  break;*/
                                case 12:
                                  item.detailStatus='变更报备中';
                                  break;
                                case 13:
                                  item.detailStatus='变更报备失败';
                                  break;
                                /*case 14:
                                  //item.detailStatus='下线报备中';
                                  break;
                                case 15:
                                  //item.detailStatus='下线报备失败';
                                  break;
                                case 16:
                                  //item.detailStatus='隐藏报备中';
                                  break;
                                case 17:
                                  //item.detailStatus='隐藏报备失败';
                                  break;*/
                                case 18:
                                  item.detailStatus='新增报备中';
                                  break;
                                case 19:
                                  item.detailStatus='新增报备失败';
                                  break;
                            }
                        });

                        this.productList=res.pageInfo.list;
                        this.totalItem=res.pageInfo.total;

                        console.log("productList: " + JSON.stringify(this.productList));


                    }else{;

                    }
                });
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
                this.postData.pageNum='1';
                this.$refs.pagingModule.current=1;

                if(res.startTime != '' || res.endTime != '') {

                    let effectiveTime = this.postData.effectiveTime;
                    let expireTime = this.postData.expireTime;

                    effectiveTime = parseInt(effectiveTime.split('-').join(''));

                    expireTime = parseInt(expireTime.split('-').join(''));

                    if(expireTime < effectiveTime){

                        this.$root.toastText = '生效时间必须早于失效时间';

                        this.$root.toast = true;
                    }else{

                        this.getSingleProductList();
                    }

                } else {
                    this.getSingleProductList();
                }

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
