<template>
    <div class="audit">
       <router-view></router-view>
    </div>
</template>
<script >
    export default {
        name: 'Audit',
        data(){
            return{
                formData:{},
                productList:[],
                operateHeadData:{},
                postData:{
                    searchKey:'',
                    onlineStatus:'',
                    detailStatus:'',
                    pageSize:'8',
                    pageNum:'1',
                    effectiveTime:'',
                    expireTime:''
                },
                totalItem:''
            }
        },
        components: {
        },
        mounted(){},
        created(){},

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
                        res.data.list.forEach(function(item){
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
                                case 5:
                                    item.onlineStatus='删除';
                                    break
                            }
                            switch (parseInt(item.detailStatus)){
                                case 3:
                                    item.detailStatus='上线报备中';
                                    break;
                                case 4:
                                    item.detailStatus='上线报备失败';
                                    break;
                                case 7:
                                    item.detailStatus='变更报备中';
                                    break;
                                case 8:
                                    item.detailStatus='变更报备失败';
                                    break;
                                case 9:
                                    item.detailStatus='下线报备中';
                                    break;
                                case 10:
                                    item.detailStatus='下线报备失败';
                                    break;
                            }
                        });

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



    .main-wrapper:after {
        content: '';
        display: block;
        clear: both;
    }



    .audit{
        background-color: white;
        padding-bottom: 50px;
    }

    input {

    }
</style>
