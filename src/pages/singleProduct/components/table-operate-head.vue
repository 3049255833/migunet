<template>
    <div class="table-operate-head">
        <div class="l-content-head">
            <div class="vue-left">
                <div class="l-title">
                    {{title}}
                </div>
            </div>
            <div class="vue-right">
                <div class="l-space input-wrapper input-wrapper1">
                    <input type="text" class="form-input" placeholder="关键信息搜索" v-model="keyWord" @keyup.enter="searchKeyWord"/>
                </div>
                <div class="l-space l-content-right">
                    <v-select-box selectType="1" :w="130" selectTitle="待报备" v-bind:options="['1','2','3']"></v-select-box>
                </div>
                <div class="date-container mr-10">
                    <v-date defaultText="生效时间" startTime="true"></v-date>
                </div>
                <div class="date-container">
                    <v-date defaultText="失效时间" startTime="false"></v-date>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import VDate from '@/components/date'
    import VSelectBox from '@/components/select-box'

    export default {
        name: 'hello',
        props: ['hideBtn', 'title'],
        components: {
            VDate,
            VSelectBox
        },
        data () {
            return {
                selected: {
                    selectedItem1: '待报备',
                    selectedItem2: '1'
                },
                isShow: false,
                keyWord: ''

            }
        },
        methods: {
            search: function () {
                this.$emit('searchInfo', this.selected);
            },
            searchKeyWord: function () {
                // this.$store.dispatch('changeKeyWord',this.keyWord)
                // console.log(this.keyWord);
            },

            /**
             * 新增产品
             * */
            addContractProduct(){
                location.hash = '/contract_product_add'
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    .l-title {
        float: left;
        font-size: 14px;
        color: #292c31;
        line-height: 34px;
    }
    
    .l-content-head {
        clear: both;
        display: block;
        padding: 13px 20px;
    }
    
    .l-content-head:after {
        content: '';
        display: block;
        clear: both;
    }
    
    .l-content-head:after {
        content: '';
        display: block;
        clear: both;
    }
    
    .l-content-left {
        float: left;
        font-size: 14px;
        color: #666;
        width: 90px;
        height: 40px;
        line-height: 43px;
    }
    
    .l-content-left2 {
        width: auto;
        margin-right: 20px;
        height: 30px;
        line-height: 34px;
    }
    
    .StateSelect {
        height: 40px;
        background: #fcf9f9;
        border: 1px solid #e1e1e1;
        color: #999;
        font-size: 14px;
    }
    
    .StateSelect4 {
        width: 176px;
        height: 30px;
    }
    
    .l-content-right, .tb-reset {
        float: left;
        
    }
    
    .l-content-right {
        height: 34px;
    }
    
   
    
    .tb-reset {
        font-size: 14px;
        color: #46bafe;
        width: 74px;
        height: 32px;
        background: #fff;
        line-height: 32px;
        border: 1px solid #46bafe;
        cursor: default;
        box-sizing: border-box;
        border-radius: 5px;
    }
    
    /*.tb-reset:hover{
      
    }*/
    .tb-search {
        background: #46bafe;
        color: #ffffff;
    }
    
    .l-content-w {
        margin-right: 20px;
    }
    
    .NewTable2 td, .dialog-ctn, .l-content-button, .nl-table, .tb-reset {
        text-align: center;
    }
    
    .StateSelect5 {
        width: 124px;
        height: 30px;
    }
    
    .input-wrapper {
        float: left;
    }
    
    .input-wrapper input {
        width: 150px;
        height: 34px;
        padding-left: 5px;
        box-sizing: border-box;
        border: solid 1px #d6e1e5;
    }
    
    .input-wrapper input::-webkit-input-placeholder {
        color: #d6e1e5;
    }
    
    .input-wrapper1 input {
        background: url('../../../assets/search.png') no-repeat 95% 50%;
    }
    
    .l-space {
        margin-right: 10px;
    }
    
    .date-wrapper {
        float: left;
        margin-right: 10px;
    }
    
    .btn-add {
        float: left;
        width: 80px;
        height: 32px;
        padding-left: 6px;
        margin-left: 30px;
        line-height: 32px;
        background-color: #46BAFE;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        .icon-add-white {
            margin-right: 6px;
            background-size: 100% 100%;
        }
    }
    
    .vue-left {
        float: left;
    }
    
    .vue-right {
        float: right;
    }
    
    .date-container {
        position: relative;
        float: left;
        & + .date-container { }
    }
    
    .addBtn {
        display: none;
    }
    
    input {
        border-radius: 4px;
        &:focus {
            box-shadow: 0 0 3px 2px #EEFAFF;
        }
    }
</style>
