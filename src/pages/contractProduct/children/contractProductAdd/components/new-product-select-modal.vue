<template>
    <div class="product-code">
        <div class="clearfix">
            <div class="item left">
                <div class="sub-title">已选</div>
                <div class="table-wrap">
                    <table class="table-module">
                        <thead>
                        <tr>
                            <td>选择</td>
                            <td>产品id</td>
                            <td>产品名称</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <label class="checkbox-module single">
                                    <input type="checkbox" name="payType">
                                    <span></span>
                                </label>
                            </td>
                            <td>A13000</td>
                            <td>全职高手</td>
                        </tr>
                        <tr>
                            <td>
                                <label class="checkbox-module single">
                                    <input type="checkbox" name="payType">
                                    <span></span>
                                </label>
                            </td>
                            <td>A13000</td>
                            <td>全职高手</td>
                        </tr>
                        <tr>
                            <td>
                                <label class="checkbox-module single">
                                    <input type="checkbox" name="payType">
                                    <span></span>
                                </label>
                            </td>
                            <td>A13000</td>
                            <td>全职高手</td>
                        </tr>
                        <tr>
                            <td>
                                <label class="checkbox-module single">
                                    <input type="checkbox" name="payType">
                                    <span></span>
                                </label>
                            </td>
                            <td>A13000</td>
                            <td>全职高手</td>
                        </tr>
                        <tr>
                            <td>
                                <label class="checkbox-module single">
                                    <input type="checkbox" name="payType">
                                    <span></span>
                                </label>
                            </td>
                            <td>A13000</td>
                            <td>全职高手</td>
                        </tr>
                        <tr>
                            <td>
                                <label class="checkbox-module single">
                                    <input type="checkbox" name="payType">
                                    <span></span>
                                </label>
                            </td>
                            <td>A13000</td>
                            <td>全职高手</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="item right">
                <div class="sub-title">未选
                    <div class="search-wrap  ">
                        <input class="form-input  w-150 radius-2 mr-6" type="text" placeholder="关键信息搜索">
                        <div class="search vt-middle">
                            <i class="icon icon-search"></i>
                        </div>
                    </div>
                </div>
                <div class="table-wrap">
                    <table class="table-module">
                        <thead>
                        <tr>
                            <td>选择</td>
                            <td>产品id</td>
                            <td>产品名称</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <label class="checkbox-module single">
                                    <input type="checkbox" name="payType">
                                    <span></span>
                                </label>
                            </td>
                            <td>A13000</td>
                            <td>全职高手</td>
                        </tr>
                        <tr>
                            <td>
                                <label class="checkbox-module single">
                                    <input type="checkbox" name="payType">
                                    <span></span>
                                </label>
                            </td>
                            <td>A13000</td>
                            <td>全职高手</td>
                        </tr>
                        <tr>
                            <td>
                                <label class="checkbox-module single">
                                    <input type="checkbox" name="payType">
                                    <span></span>
                                </label>
                            </td>
                            <td>A13000</td>
                            <td>全职高手</td>
                        </tr>
                        <tr>
                            <td>
                                <label class="checkbox-module single">
                                    <input type="checkbox" name="payType">
                                    <span></span>
                                </label>
                            </td>
                            <td>A13000</td>
                            <td>全职高手</td>
                        </tr>
                        <tr>
                            <td>
                                <label class="checkbox-module single">
                                    <input type="checkbox" name="payType">
                                    <span></span>
                                </label>
                            </td>
                            <td>A13000</td>
                            <td>全职高手</td>
                        </tr>
                        <tr>
                            <td>
                                <label class="checkbox-module single">
                                    <input type="checkbox" name="payType">
                                    <span></span>
                                </label>
                            </td>
                            <td>A13000</td>
                            <td>全职高手</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="table-wrap" v-if="false">
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
                            <input :value="index" v-model="productCheckbox" type="checkbox">
                            <span></span>
                        </label>
                    </td>
                    <td>{{item.pdContract.productCode}}</td>
                    <td>{{item.pdContract.productName}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="btn-group btn-group-center">
            <div class="btn btn-primary btn-middle-100" v-if="canSave" @click="confirm">确定</div>
            <div class="btn btn-primary btn-middle-100 unable" v-else>确定</div>
            <div class="btn btn-default btn-middle-100" @click="cancel">取消</div>
        </div>
    </div>
</template>
<script type="es6">
    export default{
        name: 'ProductSelectModal',
        props: ['productType', 'modalName', 'index'],

        data(){
            return {
                productCheckbox: [],
                productRadio: '',
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
                search:'',
                selectMutexProductList: [],
                selectRelyProductItem: {}
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
                }
                this.$http.get(this.api.findContractBySearch,
                    {
                        params: {
                            search:this.search
                        },
                        showLoading:true
                    }).then(response => {

                    let res = response.body;


                    if (res.result.resultCode == '00000000') {

                        for (var i = 0; i < res.data.length; i++) {
                            res.data[i].active = false;
                        }

                        this.productList = res.data;
                        this.productCheckbox=[];

                    } else {
                        this.productCheckbox=[];
                    }
                });
            },

            confirm() {
                let that = this;

                let _data = [];

                this.productCheckbox.forEach(function (item) {
                    _data.push({
                        productCode: that.productList[item].pdContract.productCode,
                        content: that.productList[item].pdContract.productName
                    })
                });

                this.bus.$emit('productSelectStep2Bus', {index: this.index, data: _data});

                this.$modal.hide(this.modalName);
            },

            cancel() {
                this.$modal.hide(this.modalName);
            }
            
            /* findContractBySearch(){
             this.$http.get(this.api.findContractBySearch,
             {
             params: {
             
             }}).then(response => {
             
             let res = response.body;
             
             
             if (res.result.resultCode == '00000000') {
             
             for (var i = 0; i < res.data.length; i++) {
             res.data[i].active = false;
             }
             
             this.productList = res.data;
             
             
             } else {
             a
             }
             });
             }
             */

        },
        computed: {
            canSave(){
                return this.productCheckbox.length > 0
            }
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .product-code {
        padding: 20px 0;
    
        .item {
            float: left;
            display: inline-block;
            width: 50%;
            border-right: 1px dashed #EEEEEE;
            padding: 0 30px 8px;
            min-height: 390px;
            &:last-child {
                border: 0;
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
    }
</style>
