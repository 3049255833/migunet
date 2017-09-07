<template>
    <div class="product-code">
        <div class="list-modal-head">
            <div class="search-wrap">
                <input  @keyup.enter="findContractBySearch" class="form-input vt-middle  w-150 radius-2 mr-6" v-model="postData.search" type="text"  placeholder="关键信息搜索">
                <div class="search vt-middle">
                    <i @click="findContractBySearch" class="icon pointer icon-search"></i>
                </div>
            </div>
        </div>
        <div class="table-wrap">
            <table class="table-module">
                <thead>
                    <tr>
                        <td>选择</td>
                        <td>产品编码</td>
                        <td>产品名称</td>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in productList">
                        <td>
                            <label v-if="productType==='1'"
                                   @click="getProductList(index, item.pdContract.productCode, item.pdContract.productName)"
                                   class="checkbox-module single">
                                <input type="checkbox" :value="index" v-model="productCheckbox">

                                <span></span>
                            </label>

                            <label v-else class="radio-module single"
                                   @click="getProductItem(item.pdContract.productCode, item.pdContract.productName)">
                                <input type="radio" :value="index" v-model="productRadio">

                                <span ></span>
                            </label>
                        </td>
    
                        <td>{{item.pdContract.productCode}}</td>
                        <td>{{item.pdContract.productName}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="btn-group btn-group-center">
            <div class="btn btn-primary btn-middle-100" @click="confirm">确定</div>
            <div class="btn btn-default btn-middle-100" @click="cancel">取消</div>
        </div>
        <div class="paging-wrap" >
            <v-paging ref="pagingModule" :type="'simple'" :totalItem="totalItem" v-on:pagingBus="getPage"></v-paging>
        </div>
    </div>
</template>

<script>
    import VPaging from '@/components/paging'
    export default{
        name: 'ProductSelectModal',
        props: ['productType','modalName','index'],
        components:{
            VPaging
        },
        data(){
            return {
                productCheckbox:[],
                productRadio:'',
                productList: [
                    /*{
                        productId: '1001',
                        productName: '2017最热漫画合集',
                        active: false
                    },
                    {
                        productId: '1002',
                        productName: '2018最热漫画合集',
                        active: false
                    }*/
                ],
                postData:{
                  /*  pageNum:'1',
                    pageSize:'8',*/
                    search:'',
                },
                totalItem:'',
                selectMutexProductList: [],
                selectRelyProductItem: {},
                _productList:{}
            }
        },
        mounted () {
            /**
             * 获取互斥和依赖产品列表
             * */
            this.findContractBySearch();
            
           
        },
        methods: {
            /**
             * 获取互斥和依赖产品列表
             * */
            findContractBySearch(e) {
                if (e && e.target) {
                    e.target.blur();
                    //todo:分页的
                  /*  this.postData.pageNum='1';
                    this.$refs.pagingModule.current=1;*/
                   
                }

                this.$http.get(this.api.findContractBySearch,
                    { params: this.postData,showLoading:true }).then(response => {

                    let res = response.body;


                    this.selectMutexProductList=[];
                    this.selectRelyProductItem=[];
                    this.productCheckbox=[];
                    this.productRadio='';
                    
                    if (res.result.resultCode == '00000000') {

                        //todo:
                        for(var i = 0; i < res.data.length; i++) {
                            res.data[i].active = false;
                        }
                        
                        //todo:

                        this.productList = res.data;
                        
                        this.totalItem=res.total;
                        
                    } else {

                        
                    }
                });
            },

            confirm() {
                if(this.productType === '1') {
                    
                    this.bus.$emit('getSelectProduct', {index:this.index,data:this.selectMutexProductList});
                } else {
                    
                    this.bus.$emit('getSelectProduct', {index:this.index,data: this.selectRelyProductItem});
                }

                this.$modal.hide(this.modalName);
            },

            cancel() {
                this.$modal.hide(this.modalName);
            },

            /**
             * 获取分页信息
             * todo:暂时隐藏
             * */
            getPage(res){
                this.postData.pageNum=res.pagingValue;
                this.postData.pageSize=res.pagingSize;
                this.productCheckbox=[];
                this.productRadio='';
                this.findContractBySearch();
            },

            getProductItem(productCode, content){
                this.selectRelyProductItem.productCode = productCode;

                this.selectRelyProductItem.content = content;
               
            },

            getProductList(index, productCode, content){
                let that = this;

                this.productList[index].active=!this.productList[index].active;

              /*  this.selectMutexProductList.forEach(function(item,index){
                    
                });*/
                
                if(this.productList[index].active) {
                    this.selectMutexProductList.push({
                        productCode:productCode,
                        content:content
                    });
                } else {

                    this.selectMutexProductList.forEach(function(item, cIndex){

                        if(item.id == productCode){

                            that.selectMutexProductList.splice(cIndex, 1);

                            return;
                        }
                    })


                }
                //console.log("mutex：" + JSON.stringify(this.mutexProductList));
            }
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .product-code {
        padding: 13px 30px 31px;
        
        .list-modal-head {
            padding-bottom: 13px;
            .search {
                display: inline-block;
                width: 34px;
                height: 34px;
                line-height: 34px;
                text-align: center;
                border-radius: 3px;
                background: #46BAFE;
            }
        }
        
        .table-wrap {
            min-height: 350px;
            max-height: 350px;
            overflow-y: auto;
        }

        .sub-title {
            position: relative;
            color: #333333;
            font-size: 14px;
            padding-bottom: 23px;
            padding-left: 5px;

            .search-wrap {
                margin-left: 140px;
                position: absolute;
                top: -8px;
                right: 0;
            }

            .search {
                display: inline-block;
                width: 34px;
                height: 34px;
                line-height: 34px;
                text-align: center;
                border-radius: 3px;
                background: #46BAFE;
            }
        }

        .btn-group {
            text-align: center;
            margin-top: 33px;

            .btn:nth-child(1) {
                margin-right: 20px;
            }
        }
    
        .paging-wrap{
            position: absolute;
            bottom: 32px;
            right: 20px;
        }
    }
</style>
