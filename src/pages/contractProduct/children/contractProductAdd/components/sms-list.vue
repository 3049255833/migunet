<template>
    <div class="sms-list">
        <div class="list-modal-head">
            <div class="search-wrap">
                <input  @keyup.enter="getSmsTemplateList"
                        class="form-input vt-middle  w-150 radius-2 mr-6"
                        v-model="postData.search"
                        type="text"
                        onfocus="this.placeholder=''"
                        onblur="this.placeholder='关键信息搜索'"
                        placeholder="关键信息搜索">

                <div class="search vt-middle">
                    <i @click="getSmsTemplateList" class="icon pointer icon-search"></i>
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
                                <input type="radio" :value="index" v-model="smsRadio">
                                <span></span>
                            </label>
                        </td>
                        <td>
                            {{smsItem.id}}
                        </td>
                        <td>
                            {{smsItem.templateContent}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="btn-group btn-group-center">
            <div class="btn btn-primary btn-middle-100" v-if="smsRadio||smsRadio=='0'"  @click="confirm">确定</div>
            <div class="btn btn-primary btn-middle-100 unable" v-else>确定</div>
            <div class="btn btn-default btn-middle-100" @click="cancel">取消</div>
        </div>

        <div class="paging-wrap">
            <v-paging ref="pagingModule" :type="'simple'" :totalItem="totalItem" v-on:pagingBus="getPage"></v-paging>
        </div>
    </div>
</template>
<script >
    import VPaging from '@/components/paging'
    export default{
        name: 'SmsList',
        props: {
            modalName: String,
            smsType: String
        },
        data(){
            return {
                smsTemplateList: [
                    /*{
                        templateId: '1001',
                        templateContent: '您订购的彩信模板成功'
                    },
                    {
                      templateId: '1002',
                      templateContent: '您订购的动漫模板成功'
                    }*/
                ],
                selectPromptSmsItem: {},
                selectRecommendSmsItem: {},
                smsRadio:'',
                totalItem:'',
                search:'',
                postData:{
                    pageNum:'1',
                    pageSize:'5',
                    search:'',
                    smsType:this.smsType
                }
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
            getSmsTemplateList(e) {
                if (e && e.target) {
                    e.target.blur();
                    this.postData.pageNum='1';
                    this.$refs.pagingModule.current=1;
                    this.smsRadio='';
                }

                this.$http.get(this.api.findSmsByCondition,
                    {
                        params: this.postData,
                        showLoading:true
                    }).then(response => {

                    let res = response.body;


                    if (res.result.resultCode == '00000000') {

                        this.smsTemplateList = res.data;
                        this.totalItem=res.total;

                        console.log("smsTemplateList: " + JSON.stringify(this.smsTemplateList));

                    } else {

                    }
                })
            },

            confirm() {

                if(this.smsType === '1') {

                    this.bus.$emit('getSelectSms', this.smsTemplateList[parseInt(this.smsRadio)]);
                } else if(this.smsType === '2') {
                    this.bus.$emit('getSelectSms', this.smsTemplateList[parseInt(this.smsRadio)]);
                } else if(this.smsType === '3') {
                  this.bus.$emit('getSelectSms', this.smsTemplateList[parseInt(this.smsRadio)]);
                }


            },
            cancel() {
                this.$modal.hide(this.modalName);
            },

            getSmsInfo(id, content) {
                if(this.smsType === '1') {
                    this.selectPromptSmsItem.id = id;

                    this.selectPromptSmsItem.content = content;
                } else {

                    this.selectRecommendSmsItem.id = id;

                    this.selectRecommendSmsItem.content = content;
                }
            },

            /**
             * 获取分页信息
             * */
            getPage(res){
                this.postData.pageNum=res.pagingValue;
                this.postData.pageSize=res.pagingSize;
                this.smsRadio='';
                this.getSmsTemplateList();
            },
        },
        watch:{
            'smsRadio'(a){
            }
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .sms-list {
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

    .table-wrap {
        overflow-y: auto;
        max-height: 360px;
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
        position: absolute;
        bottom: 30px;
        left: 300px;

        .btn:nth-child(1) {
            margin-right: 20px;
        }
    }

</style>
