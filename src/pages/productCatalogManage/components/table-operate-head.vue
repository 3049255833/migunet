<template>
    <div class="table-operate-head">
        <div class="left">
            <div class="title">
                {{title}}
            </div>

            <div class="new-add-code-btn">
                <i class="icon icon-add-blue"></i>

                新增目录
            </div>

            <div class="batch-delete-btn">
                <i class="icon icon-del-blue"></i>

                批量删除
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OperateBox',
        props:['title'],
        components:{

        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .table-operate-head {
        overflow: hidden;
        padding: 13px 20px;

        .title {
            font-size: 14px;
            color: #292c31;
            line-height: 32px;
            display: inline-block;
            margin-right: 20px;
        }

        .left {
            float: left;

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

            .batch-delete-btn,
            .new-add-code-btn {
                border: 1px solid #46BAFE;
                color: #46BAFE
            }

            .new-add-code-btn {
                background-color: #46bafe;
                color: #fff;
            }
        }
    }
</style>
