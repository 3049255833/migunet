<template>
    <div class="sms-list">
        <div class="table-wrap">
            <table class="table-module">
                <thead>
                <tr>
                    <td width="15%">选择</td>
                    <td width="20%">渠道Id</td>
                    <td>渠道名称</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in channelIdList" @click="">
                    <td>
                        <label class="checkbox-module checkbox-single">
                            <input type="checkbox" :value="index" v-model="channelIdCheckbox">
                            <span></span>
                        </label>
                    </td>
                    <td>{{item.id}}</td>
                    <td>{{item.channelName}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="btn-group btn-group-center">
            <div v-if="ifHasData" class="btn btn-primary btn-middle-100" @click="saveData">确定</div>
            <div v-else class="btn unable btn-primary btn-middle-100">确定</div>
            <div class="btn btn-default btn-middle-100">取消</div>
        </div>
        <div class="paging-wrap">
            <v-paging :type="'simple'"></v-paging>
        </div>
    </div>
</template>
<script>
    import VPaging from '@/components/paging'
    export default{
        name: 'BusinessCodeModal',
        props: {modalName: String},
        data(){
            return {
                channelIdList: [{
                    id: '12345678',
                    channelName: '中国移动',
                }, {
                    id: '12345678',
                    channelName: '中国移动',
                }],


                channelIdData: [],

                channelIdCheckbox: []
            }
        },
        components: {
            VPaging
        },
        methods: {
            getChannelIdList(){
                /*this.$http.get(this.api.getBusinessCodeList, {params: {}}).then(response => {
                 let res = response.body;
                 if (res.result.resultCode == '00000000') {
                 //todo:
                 this.businessCodeList = res.data;
                 } else {
                 
                 }
                 
                 })*/
            },

        

            /**
             * 保存数据
             * */
            saveData(){
                let that=this;
                that.channelIdCheckbox.forEach(function (item, index) {
                    that.channelIdData.push({
                        channelId:that.channelIdList[item].id,
                        channelName:that.channelIdList[item].channelName
                    })
                });
                this.bus.$emit('channelIdBus', this.channelIdData);
                this.$modal.hide(this.modalName);
            }
        },
        watch:{
           
        },
        computed: {
            ifHasData(){
                return this.channelIdCheckbox.length > 0;
            }
        },
        mounted(){
            this.getChannelIdList();
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .sms-list {
        position: relative;
        padding: 13px 30px 31px;
        .paging-wrap {
            position: absolute;
            bottom: 32px;
            right: 20px;
        }
    }
    
    .table-wrap {
        height: 400px;
        overflow-y: scroll;
    }
    
    .table-module {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        thead {
            tr {
                width: 100%;
                height: 56px;
                line-height: 56px;
                background: #F2F8FF;
            }
            td {
                color: #6d7684;
                padding: 0 10px;
                
            }
        }
        tbody {
            tr {
                border-bottom: 1px solid #EEEEEE;
                background: white;
                &:hover {
                    background: #f7f7f7;
                }
            }
            td {
                color: #6d7684;
                padding: 18px 10px;
            }
        }
        td {
            text-align: left;
            &:nth-child(1) {
                padding-left: 20px !important;
            }
        }
        tr {
           
        }
    }
    
    .btn-group {
        text-align: center;
        margin-top: 33px;
        .btn:nth-child(1) {
            margin-right: 20px;
        }
    }
</style>