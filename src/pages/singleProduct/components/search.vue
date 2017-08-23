<template>
    <div>
        
        <div class="l-content-head">
            <div class="vue-left">
                <div class="l-title">
                    {{title}}
                </div>
                <div class="btn-add" @click="addContractProduct" v-bind:class="{addBtn:hideBtn}">
                    <i class="icon icon-add-white"></i>新增产品
                </div>
            </div>
            <div class="vue-right">
                <div class="l-space input-wrapper input-wrapper1">
                    <input type="text" placeholder="关键信息搜索" v-model="keyWord" @keyup.enter="searchKeyWord" />
                </div>
                <div class="l-space l-content-right">
                    <v-Select selectType="1" :w="70"  selectTitle="草稿" v-bind:options="['1','2','3']"></v-Select>
                </div>
                <div class="l-space l-content-right">
                    <v-Select selectType="1"  :w="90" selectTitle="上线审批" v-bind:options="['上线报备中','上线报备失败','变更报备中']"></v-Select>
                </div>
                <div class="l-space l-content-right">
                    <v-Select selectType="1" :w="130" selectTitle="产品目录1" v-bind:options="['1','2','3']"></v-Select>
                </div>
                <div class="date-container">
                    <v-date defaultText="生效时间" startTime="true"></v-date>
                </div>
                <div class="date-container">
                    <v-date defaultText="失效时间" startTime="false"></v-date>
                </div>
            </div>
            
            <!-- <div class="l-space input-wrapper">
              <input type="text" placeholder="请输入名称" />
            </div>
            <div class="l-space input-wrapper">
              <input type="text" placeholder="请输入CP/TP ID" />
            </div> -->
            <!-- <div class="l-content-right l-content-w">
              <select v-model="selected.selectedItem2" name="StateSelect6" id="StateSelect6" class="StateSelect StateSelect5">
                <option value="1">待报备</option>
                <option value="2">已上线</option>
                <option value="3">变更待审批</option>
              </select>
            </div> -->
            <!-- <div class="tb-reset l-content-w tb-search" v-on:click="search">查询</div>
            <div class="tb-reset l-content-w">收起</div> -->
        </div>
    
    </div>

</template>

<script>
    import VDate from '@/components/date'
    import vSelect from '@/components/select'

    export default {
        name: 'hello',
        props:['hideBtn','title'],
        components:{
            VDate,
            vSelect
        },
        data () {
            return {
                selected:{
                    selectedItem1:'待报备',
                    selectedItem2:'1'
                },
                isShow:false,
                keyWord:''

            }
        },
        methods:{
            search:function(){
                this.$emit('searchInfo',this.selected);
            },
            searchKeyWord:function(){
                // this.$store.dispatch('changeKeyWord',this.keyWord)
                // console.log(this.keyWord);
            },
            
            /**
             * 新增产品
             * */
            addContractProduct(){
                location.hash='/home/contract_product_add'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    .l-title{
        float: left;
        font-size: 14px;
        color: #292c31;
        line-height: 32px;
    }
    .l-content-head {
        clear: both;
        display: block;
        padding:10px 20px;
    }
    .l-content-head:after{
        content: '';
        display: block;
        clear: both;
    }
    .l-content-head:after{
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
    .l-content-right{
        height: 32px;
    }
    .l-content-right select{
        width: 150px;
        height: 32px;
        background: #ffffff;
        padding-left:5px;
        font-size: 12px;
        color: #0c0a0b;
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
        box-sizing:border-box;
        border-radius: 5px;
    }
    /*.tb-reset:hover{
      
    }*/
    .tb-search{
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
    .input-wrapper{
        float: left;
    }
    .input-wrapper input{
        width: 150px;
        height: 32px;
        padding-left: 5px;
        box-sizing:border-box;
        border:solid 1px #d6e1e5;
    }
    .input-wrapper input::-webkit-input-placeholder{
        color: #d6e1e5;
    }
    
    .input-wrapper1 input{
        background: url('../../../assets/search.png') no-repeat 95% 50%;
    }
    .l-space{
        margin-right: 20px;
    }
    .date-wrapper{
        float: left;
        margin-right: 20px;
    }
    .btn-add{
        float: left;
        width: 80px;
        height: 32px;
        padding-left: 6px;
        margin-left: 30px;
        line-height: 32px;
        background-color: #46BAFE;
        color: white;
        border-radius: 4px;
        .icon-add-white{
            margin-right: 6px;
        }
    }
    .vue-left{
        float: left;
    }
    .vue-right{
        float: right;
    }
    .date-container{
        width:150px;
        position:relative;
        float: left;
    &+.date-container{
          margin-left:20px;
      }
    }
    .addBtn{
        display: none;
    }
    
   
    input{
        border-radius: 4px;
        &:focus{
            box-shadow: 0 0 3px 2px #EEFAFF;
        }
    }
</style>

