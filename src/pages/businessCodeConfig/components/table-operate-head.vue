<template>
    <div class="operate-box">
        <div class="left">
            <div class="title">
                {{title}}
            </div>
            <button class="btn btn-import-module mr-10">批量导入</button>
            <button class="btn btn-add-module-white mr-10" @click="addBusinessCode">新增代码</button>
            <button class="btn btn-import-module mr-10">批量删除</button>
        </div>

        <div class="right">
            <input type="text"
                   placeholder="关键信息搜索"
                   @keyup.enter="searchKeyWord"
                   v-model="operateData.keys"
            />
        </div>
    </div>
</template>
<script>
    export default {
        name: 'OperateBox',
        props: ['title'],
        data() {
            return {
                operateData: {
                    keys: ''  //关键字
                }
            }
        },
        methods: {
            addBusinessCode() {
                this.$modal.show('addBusinessCodeModal');
            },
            /**
             * 触发事件，将封装的数据传给index
             * 该组件内可以调用该方法传数据
             * */
            searchKeyWord(e){
                if (e&&e.target){
                    e.target.blur();
                }

                this.bus.$emit('searchKeyWordBus',this.operateData);
            }
        }
    }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
    .operate-box {
        overflow: hidden;
        padding: 13px 20px;

        .title {
            font-size: 14px;
            color: #292c31;
            line-height: 34px;
            display: inline-block;
            margin-right: 24px;
            vertical-align: middle;
        }

        .left {
            float: left;
            font-size: 0;

            .batch-lead-in-btn,
            .new-add-code-btn,
            .batch-delete-btn {
                display: inline-block;
                padding: 8px 10px;
                margin: 0 5px;
                border-radius: 4px;
                cursor: pointer;

                i {
                    vertical-align: sub;
                }
            }

            .batch-lead-in-btn {
                background-color: #46BAFE;
                color: #fff;
            }

            .batch-delete-btn,
            .new-add-code-btn {
                border: 1px solid #46BAFE;
                color: #46BAFE
            }
        }

        .right {
            float: right;

            input {
                width: 150px;
                height: 32px;
                padding-left: 5px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                border: solid 1px #d6e1e5;
                background: url('../../../assets/search.png') no-repeat 95% 50%;
            }
        }
    }
</style>
