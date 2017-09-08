<template>
    <div class="product-code">
        <div class="list-modal-head">
            <div class="search-wrap">
                <input  @keyup.enter="findContractByCondition" class="form-input vt-middle  w-150 radius-2 mr-6" v-model="postData.search" type="text"  placeholder="关键信息搜索">
                <div class="search vt-middle">
                    <i @click="findContractByCondition" class="icon pointer icon-search"></i>
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
                            <div v-if="productType==='1'"
                                   class="checkbox-module single">
                                <input type="checkbox"  @click="getProductList(index, item.productCode, item.productName,item.id)" :value="index" v-model="productCheckbox" >

                                <span></span>
                            </div>

                            <label v-else class="radio-module single"
                                   @click="getProductItem(item.productCode, item.productName)">
                                <input type="radio" :value="index" v-model="productRadio">

                                <span ></span>
                            </label>
                        </td>

                        <td>{{item.productCode}}</td>

                        <td>{{item.productName}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="btn-group btn-group-center">
            <div class="btn btn-primary btn-middle-100" v-if ='canSave' @click="confirm">确定</div>
            <div class="btn btn-primary btn-middle-100 unable" v-else="" @click="confirm">确定</div>
            <div class="btn btn-default btn-middle-100" @click="cancel">取消</div>
        </div>
        <div class="paging-wrap">
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
                    pageNum:'1',
                    pageSize:'8',
                    search:'',
                },
                totalItem:'',
                selectMutexProductList: [],
                selectRelyProductItem: {},
                _productList:{}
            }
        },
        computed:{
            canSave(){
                if(this.productType==1){
                    return (this.selectMutexProductList.length>0);
                }else{
                    return true
                }
            }
        },
        mounted(){
            /**
             * 获取互斥和依赖产品列表
             * */
            this.findContractByCondition();
            
           
        },
        methods: {
            /**
             * 获取互斥和依赖产品列表
             * */
            findContractByCondition(e) {
                let that=this;
                if (e && e.target) {
                    e.target.blur();
                    this.postData.pageNum='1';
                    this.$refs.pagingModule.current=1;
                    this.smsRadio='';
                }

                this.$http.get(this.api.findContractByCondition,
                    { params: this.postData,showLoading:true }).then(response => {

                    let res = response.body;
                    
                    if (res.result.resultCode == '00000000') {
                        that.productCheckbox=[];
                        
                        //todo:
                        for(var i = 0; i < res.data.length; i++) {
                            res.data[i].active = false;
                        }
                        
                        if(res.data){
                            res.data.forEach(function(item,index){
                                that.selectMutexProductList.forEach(function(subItem,subIndex){
                                    if(item.id==subItem.id){
                                        item.active=true;
                                        that.productCheckbox.push(index);
                                    }
                                })
                            })
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
             * */
            getPage(res){
                this.postData.pageNum=res.pagingValue;
                this.postData.pageSize=res.pagingSize;
                this.productCheckbox=[];
                this.productRadio='';
                this.findContractByCondition();
            },

            getProductItem(productCode, content){
                this.selectRelyProductItem.productCode = productCode;

                this.selectRelyProductItem.content = content;
               
            },

            getProductList(index, productCode, content,id){
                let that = this;
                console.log(this.productList[index].active)
                
                this.productList[index].active=!this.productList[index].active;

                if(this.productList[index].active) {
                    console.log(1)
                    this.selectMutexProductList.push({
                        productCode:productCode,
                        content:content,
                        id:id
                    });
                } else {
                    console.log(2)
                    this.selectMutexProductList.forEach(function(item, cIndex){

                        if(item.id == id){

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
            max-height: 350px;
            overflow-y: auto;
            .checkbox-module{
                cursor: default;
                input[type='checkbox']{
                    width: 20px;
                    height: 20px;
                    top: 0;
                    cursor: pointer;
                }
            }
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
            position: absolute;
            bottom: 30px;
            left: 300px;

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
