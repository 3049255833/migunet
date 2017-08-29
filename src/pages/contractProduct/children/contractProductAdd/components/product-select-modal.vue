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
                          <tr>
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

                              <td>A13000</td>

                              <td>全职高手</td>
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
<script>
    export default{
        name: 'ProductSelectModal',
        props: {
            productType: String
        },
        methods: {
            confrim() {

            },
            cancel() {

            }
        },
        mounted () {
            console.log("Type: " + this.productType);
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
