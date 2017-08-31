<template>
    <div class="product-code">
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
                               class="checkbox-module single">
                            <input type="checkbox" name="payType">
                            
                            <span @click="getProductList(index, item.pdContract.productCode, item.pdContract.productName)"></span>
                        </label>
                        
                        <label v-else class="radio-module single">
                            <input type="radio" name="payType">
                            
                            <span @click="getProductItem(item.pdContract.productCode, item.pdContract.productName)"></span>
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
    </div>
</template>
<script type="es6">
    export default{
        name: 'ProductSelectModal',
        props: ['productType','modalName','index'],

        data(){
            return {
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
                selectMutexProductList: [],
                selectRelyProductItem: {}
            }
        },
        mounted () {
            /**
             * 获取互斥和依赖产品列表
             * */
            this.getContractProductByStatus();
        },
        methods: {
            /**
             * 获取互斥和依赖产品列表
             * */
            getContractProductByStatus() {
                this.$http.get(this.api.getContractProductByStatus,
                    { params: {} }).then(response => {

                    let res = response.body;

                    //console.log("productList data1: " + JSON.stringify(res));

                    if (res.result.resultCode == '00000000') {

                        for(var i = 0; i < res.data.length; i++) {
                            res.data[i].active = false;
                        }

                        this.productList = res.data;

                        //console.log("productList data2: " + JSON.stringify(this.productList));
                    } else {

                    }
                });
            },

            confirm() {
                if(this.productType === '1') {

                    this.bus.$emit('productSelectStep2Bus', {index:this.index,data:this.selectMutexProductList});
                } else {

                    this.bus.$emit('productSelectStep2Bus', {index:this.index,data: this.selectRelyProductItem});
                }

                this.$modal.hide(this.modalName);
            },

            cancel() {
                this.$modal.hide(this.modalName);
            },

            getProductItem(id, content){
                this.selectRelyProductItem.productCode = id;

                this.selectRelyProductItem.content = content;

            },

            getProductList(index, productCode, content){
                let that = this;

                this.productList[index].active=!this.productList[index].active;

                if(this.productList[index].active) {
                    this.selectMutexProductList.push({
                        productCode:productCode,
                        content:content
                    });
                } else {

                    this.selectMutexProductList.forEach(function(item, cIndex){

                        if(item.productCode == productCode){

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
        padding: 30px;
        
        .table-wrap {
            max-height: 400px;
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
            position: absolute;
            bottom: 30px;
            left: 300px;
            
            .btn:nth-child(1) {
                margin-right: 20px;
            }
        }
    }
</style>
