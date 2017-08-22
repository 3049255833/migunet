<template>
    <div class="operate-box">
        <div class="left">
            <div class="title">
                {{title}}
            </div>

            <div class="batch-lead-in-btn">
                批量导入
            </div>

            <div class="new-add-code-btn">
                新增代码
            </div>

            <div class="batch-delete-btn">
                批量删除
            </div>
        </div>

        <div class="right">
            <input type="text" placeholder="关键信息搜索" @keyup.enter="searchKeyWord" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OperateBox',
        props:['title'],
        components:{

        },
        methods:{
            search:function(){
                this.$emit('searchInfo',this.selected);
            },
            searchKeyWord:function(){
                // this.$store.dispatch('changeKeyWord',this.keyWord)
                // console.log(this.keyWord);
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
            line-height: 32px;
            display: inline-block;
            margin-right: 20px;
        }

        .left {
            float: left;

            .batch-lead-in-btn,
            .new-add-code-btn,
            .batch-delete-btn {
                display: inline-block;
                padding: 10px 15px;
                margin: 0 5px;
                border-radius: 4px;
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
