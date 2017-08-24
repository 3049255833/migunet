<template>
    <div class="add-business-code-container">

        <div class="form-wrap">
            <div class="form-row">
                <div class="row-left required">业务代码ID：</div>

                <div class="row-right">
                    <input class="form-input pointer w-200" type="text" placeholder="请输入"/>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">企业代码：</div>

                <div class="row-right">
                    <input class="form-input pointer w-200" type="text" placeholder="请输入"/>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">业务代码描述：</div>

                <div class="row-right">
                    <textarea class="textarea-module w-200" type="text"
                              placeholder="请输入"></textarea>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">对应费用（分）：</div>

                <div class="row-right">
                    <input class="form-input pointer w-200" type="text" placeholder="请选择"/>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">分成类型：</div>

                <div class="row-right">
                    <v-select-box w="200" selectTitle="分成类型" selectType="1"
                                  v-bind:options="['分成','分','成']"></v-select-box>
                </div>
            </div>

            <div class="form-row">
                <div class="row-left required">是否管理员专用：</div>

                <div class="row-right">
                    <v-select-box w="200" selectTitle="是否管理员专用" selectType="1"
                                  v-bind:options="['否','是']"></v-select-box>
                </div>
            </div>
        </div>

        <div class="btn-group btn-group-center">
            <div class="btn btn-primary btn-middle-100" @click="confirm">确定</div>
            <div class="btn btn-default btn-middle-100">取消</div>
        </div>
    </div>
</template>

<script>
    import Bus from './bus';
    import VSelectBox from '@/components/select-box'

    export default {
        name: 'AddBusinessCode',
        components: {
            VSelectBox
        },
        methods: {
            confirm() {
                var name = document.getElementById("name").value;

                Bus.$emit('addCatalog', name);
            }
        }
    }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
    $image-base-path: '../../../assets/';
    @mixin bg($URI, $w: null, $h: null, $x: top, $y: center, $repeat: no-repeat) {
        @if $w and $h {
            width: $w;
            height: $h;
        }
        background: url('#{$image-base-path}#{$URI}') $repeat $x $y;
        background-size: 100% 100%;
    }

    .add-business-code-container {
        font-size: 14px;
        color: #333333;
        box-sizing: border-box;

        .form-wrap {
            padding: 30px 80px 25px;

            .form-row {
                padding-bottom: 20px;
            }
            .row-left {
                width: 162px;
            }
            .row-right {

            }
        }

        .type-area {
            width: 700px;
            border: 1px solid #D6E1E5;
            border-radius: 4px;

            .item {
                padding: 16px 19px;

                &:nth-child(1) {
                    border-bottom: 1px solid #d6e1e5;
                }

                .item-head {
                    position: relative;
                }

                .form-wrap {
                    padding: 30px 76px 0;

                    .form-row {
                        padding-bottom: 15px;
                    }
                }
            }
        }

        .icon {
            &-close-round {
                position: absolute;
                right: 10px;
                top: 8px;
                display: inline-block;
                vertical-align: middle;
                width: 16px;
                height: 16px;
                background: url("#{$image-base-path}icon-close-round.png");
                background-size: 100%;
                cursor: pointer;
            }

            &-recommend {
                position: absolute;
                left: 110px;
                @include bg("icon-recommend.png", 57px, 26px);
            }
        }

        .btn-group {
            margin: 0 0 50px;
        }
    }
</style>
