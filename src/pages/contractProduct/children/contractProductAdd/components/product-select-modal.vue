<template>
    <div class="product-code">
        <div class="clearfix">
            <div class="item left">
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
                            <tr v-for="(item, index) in productList">
                                <td>
                                    <label v-if="productType==='互斥'"
                                           class="checkbox-module single">
                                        <input type="checkbox" name="payType">

                                        <span></span>
                                    </label>

                                    <label v-else class="radio-module single">
                                        <input type="radio" name="payType">

                                        <span></span>
                                    </label>
                                </td>

                                <td>{{item.product_id}}</td>

                                <td>{{item.product_name}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="btn-group btn-group-center">
            <div class="btn btn-primary btn-middle-100" @click="confrim">确定</div>
            <div class="btn btn-default btn-middle-100" @click="cancel">取消</div>
        </div>
    </div>
</template>
<script type="es6">
    export default{
        name: 'ProductSelectModal',
        props: {
            productType: String,
            modalName: String
        },
        data(){
            return {
                productList: []
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

                    console.log("productList data1: " + JSON.stringify(res));

                    if (res.result.resultCode == '00000000') {

                      this.productList = res.data;

                      console.log("productList data2: " + JSON.stringify(this.productList));
                    } else {

                    }
                });
            },

            confrim() {
                this.$modal.hide(this.modalName);
            },
            cancel() {
                this.$modal.hide(this.modalName);
            }
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .product-code {
        padding: 20px 0;

        .item {
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

        .btn-group {
            text-align: center;
            margin-top: 23px;

            .btn:nth-child(1) {
                margin-right: 20px;
            }
        }
    }
</style>
