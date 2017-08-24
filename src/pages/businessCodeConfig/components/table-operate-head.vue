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
            <input type="text" placeholder="关键信息搜索" @keyup.enter="searchKeyWord"/>
        </div>

        <modal name="addBusinessCodeModal" :width="600" :height="560" @before-close="beforeClose">
            <t-modal-sub-container :title="'新增业务代码'" :name="'addBusinessCodeModal'">
                <v-add-business-code-modal></v-add-business-code-modal>
            </t-modal-sub-container>
        </modal>
    </div>
</template>
<script>
    import VAddBusinessCodeModal from './add-business-code-modal'
    import TModalSubContainer from "@/components/modal-sub-container"

    export default {
        name: 'OperateBox',
        props: ['title'],
        components: {
            VAddBusinessCodeModal,
            TModalSubContainer
        },
        methods: {
            search: function () {
                this.$emit('searchInfo', this.selected);
            },
            searchKeyWord: function () {
                // this.$store.dispatch('changeKeyWord',this.keyWord)
                // console.log(this.keyWord);
            },
            addBusinessCode() {
                this.$modal.show('addBusinessCodeModal');
            },
            beforeClose() {

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
