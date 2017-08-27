<template>
    <div class="sms-list">
        <div class="list-modal-head">
            <div class="search-wrap">
                <input class="form-input  w-150 radius-2 mr-6" type="text" placeholder="关键信息搜索">
                <div class="search vt-middle">
                    <i class="icon icon-search"></i>
                </div>
            </div>
        </div>
        <div class="table-wrap">
            <table class="table-module">
                <thead>
                    <tr>
                        <td width="15%">选择</td>
                        <td width="20%">模板ID</td>
                        <td>模板内容</td>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(smsItem, index) in smsTemplateList">
                        <td>
                            <label class="radio-module">
                                <input type="radio" name="smsItem.templateName">
                                <span></span>
                            </label>
                        </td>
                        <td>
                            {{smsItem.templateId}}
                        </td>
                        <td>
                            {{smsItem.templateContent}}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="btn-group btn-group-center">
                <div class="btn btn-primary btn-middle-100">确定</div>
                <div class="btn btn-default btn-middle-100">取消</div>
            </div>

            <div class="paging-wrap">
                <v-paging :type="'simple'"></v-paging>
            </div>
        </div>
    </div>
</template>
<script>
    import VPaging from '@/components/paging'
    export default{
        name: 'ComicRecommendSmsList',
        data(){
            return {
                smsTemplateList: []
            }
        },
        components:{
            VPaging
        },
        mounted () {
            /**
             * 获取短信模板列表
             * */
            this.getSmsTemplateList();
        },
        methods: {
            /**
             * 获取短信模板列表
             * */
            getSmsTemplateList() {
                this.$http.get(this.api.getSmsTemplateList,
                    { params: {} }).then(response => {

                    let res = response.body;

                    if (res.result.resultCode == '00000000') {

                        this.smsTemplateList = res.data;

                        //console.log("data3: " + JSON.stringify(this.smsTemplateList));
                    } else {

                    }
                })
            }
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .sms-list {
        position: relative;
        padding: 13px 30px 31px;
        .list-modal-head {
            padding-bottom: 13px;
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
        .paging-wrap{
            position: absolute;
            bottom: 32px;
            right: 20px;
        }
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
                padding: 0 28px;
                &:nth-child(1) {
                    padding-left: 37px;
                }
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
                padding: 18px 28px;
                &:nth-child(1) {
                    padding-left: 37px;
                }
            }
        }
        td {
            text-align: left;
        }
    }
    
    .btn-group {
        text-align: center;
        margin-top: 23px;
        .btn:nth-child(1) {
            margin-right: 20px;
        }
    }
    
</style>