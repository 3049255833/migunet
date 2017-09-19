<template>
    <div class="sms-template-setting-container">
        <v-table-operate-head
            title="短信模板设置"
            v-on:smsTFlagBus="changeSmsTFlag"
            v-on:smsTbatchDeleteBus="smsTbatchDelete"
            v-on:searchKeyWordBus="searchKeyWordBus">
        </v-table-operate-head>

        <v-sms-template-table
          ref="smsTemplateTable"
          :smsTemplateList="smsTemplateList"
          :smsTFlag="smsTFlag"></v-sms-template-table>

        <v-paging ref="pagingModule" :totalItem="totalItem" v-on:pagingBus="getPage"></v-paging>

        <modal name="updateSmsTemplateModal" :width="600" :height="580" @before-close="beforeClose">
            <t-modal-sub-container :title="modalTitle" :name="'updateSmsTemplateModal'">
                <v-update-sms-template-modal
                  :modal-name="'updateSmsTemplateModal'"
                  :passModal="passModal"
                  v-on:sendSaveSuccess="sendSaveSuccess"
                  :cmd="cmd">
                </v-update-sms-template-modal>
            </t-modal-sub-container>
        </modal>

        <!-- 操作结果modal start -->
        <modal name="addResultMsg" :adaptive="true" :draggable="true" :width="200" :height="80">
            <v-toast :name="'addResultMsg'">{{addResultMsg}}</v-toast>
        </modal>
    </div>
</template>

<script type="es6">
    import VSmsTemplateTable from '@/pages/smsTemplateSetting/components/sms-template-table'
    import VTableOperateHead from '@/pages/smsTemplateSetting/components/table-operate-head'
    import VPaging from '@/components/paging'
    import VUpdateSmsTemplateModal from './components/update-sms-template-modal'
    import TModalSubContainer from "@/components/modal-sub-container"
    import VToast from '@/components/toast'

    export default{
        name: 'SmsTemplateSetting',
        components:{
            VSmsTemplateTable,
            VTableOperateHead,
            VPaging,
            VUpdateSmsTemplateModal,
            TModalSubContainer,
            VToast
        },
        data () {
            return {
                smsTemplateList: [
                    {
                        id:"1001",
                        smsType:"推荐短信模板",
                        smsName:"短信01",
                        smsDesc:"短信01描述",
                        templateContent:"短信01内容",
                        isHideConfim: true
                    },
                    {
                        id:"1002",
                        smsType:"推荐短信模板",
                        smsName:"短信02",
                        smsDesc:"短信02描述",
                        templateContent:"短信02内容",
                        isHideConfim: true
                    },
                    {
                        id:"1003",
                        smsType:"推荐短信模板",
                        smsName:"短信03",
                        smsDesc:"短信03描述",
                        templateContent:"短信03内容",
                        isHideConfim: true
                    }
                ],
                passModal: {},
                cmd: '',
                modalTitle: '新增短信模板',
                postData:{
                    keys:'',
                    pageSize:'3',
                    pageNo:'1'
                },
                totalItem:'',
                addResultMsg:'',
                smsTFlag: false,
            }
        },
        created() {
            this.getFindSmsTemplate();

            /*
            * 接收来自添加modal的title*/
            this.bus.$on('addSmsTemPlateBus', res => {
                this.cmd = 'add';

                this.modalTitle = '新增短信模板';

                this.$modal.show('updateSmsTemplateModal');
            });

            /**
             * 接收来自编辑的信息
             * */
            this.bus.$on('editSmsTemplateBus', res => {
                this.passModal = res;

                this.cmd = 'edit';

                this.modalTitle = '修改短信模板';

                this.$modal.show('updateSmsTemplateModal');
            });

            /**
             * 接收来自删除的信息
             * */
            this.bus.$on('sendDeleteInfo', res => {
                this.getBossInfo();
            });

            /**
             * 接收来自批量导入的信息
             * */
            this.bus.$on('sendBatchAddBossSuccessInfo', res => {
                this.getFindSmsTemplate();
            });

            this.bus.$on('sendBatchAddBossInfo', res => {
                let that = this;

                this.addResultMsg = res;

                this.$modal.show('addResultMsg');
            });
        },
        methods: {
            changeSmsTFlag(res){
                this.smsTFlag = res;
            },

            smsTbatchDelete(res) {
                let that = this;

                if (res) {
                    //同意审批
                    this.postDataList = [];

                    let _indexList = this.$refs.smsTemplateTable.smsTCheckbox;

                    console.log("_indexList: " + _indexList);

                    if (_indexList.length > 0) {
                        _indexList.forEach(function (index) {
                            index=parseInt(index);
                            that.postDataList.push({
                                id: that.smsTemplateList[index].id,
                                smsName: that.smsTemplateList[index].smsName
                            });
                        });

                        console.log("postDataList: " + JSON.stringify(that.postDataList));

                        that.$http.post(this.api.deleteSmsTemplate, that.postDataList).then(response=> {
                            let res = response.body;

                            if (res.result.resultCode == '00000000') {
                                this.$root.toastText = '删除成功';
                                this.$root.toast = true;
                            } else {
                                this.$root.toastText = '删除失败';
                                this.$root.toast = true;
                            }

                            /*this.$refs.myBacklogHead.auditFlag=false;
                            this.auditFlag=false;
                            this.postData.pageNum='1';
                            this.$refs.pagingModule.current=1;
                            this.$refs.myBacklogTable.auditCheckbox=[];
                            this.$refs.myBacklogTable.ifAuditAll=[]
                            this.getContractAuditList();*/
                        }, (response) => {
                            this.$root.toastText = '服务器错误';
                            this.$root.toast = true
                        })
                    }
                } else {

                }
            },

            /**
             * 接收来自头部搜索
             * */
            searchKeyWordBus(res) {
                this.postData.keys = res.keys;

                this.postData.pageNo='1';
                this.$refs.pagingModule.current=1;

                console.log("postData search: " + JSON.stringify(this.postData));

                this.getBossInfo();
            },

            /**
             * 获取短信模板列表
             * */
            getFindSmsTemplate(){
                this.$http.post(this.api.findSmsTemplate, this.postData, {showLoading:true}).then(
                    response => {
                        let res = response.body;

                        console.log("res: " + JSON.stringify(res));

                        if(res.result.resultCode=='00000000'){

                            for(var i = 0; i < res.service.list.length; i++) {

                                res.data[i].isHideConfim = true;
                            }

                            this.smsTemplateList = res.data;

                            console.log("smsTemplateList: " + JSON.stringify(this.smsTemplateList));
                        } else {

                            console.log("res: " + JSON.stringify(res));
                        }
                    }
                );
            },

            beforeClose() {},

            /**
             * 获取分页信息
             * */
            getPage(res){
                this.postData.pageNo = res.pagingValue;
                this.postData.pageSize = res.pagingSize;

                this.getBossInfo();
            },

            /**
             * 接收来自保存的信息
             * */
            sendSaveSuccess(res) {

                let that = this;

                this.addResultMsg = res;

                that.$modal.show('addResultMsg');

                setTimeout(function(){
                    that.getBossInfo();
                },2500);
            }
        },
        computed:{
            totalPage(){
                return this.totalItem;
            }
        },
        destroyed() {
            this.bus.$off('addSmsTemPlateBus');
            this.bus.$off('editSmsTemplateBus');
            this.bus.$off('sendDeleteInfo');
            this.bus.$off('sendBatchAddBossInfo');
        }
    }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
    $image-base-path: '../../assets/';
    @mixin bg($URI, $w: null, $h: null, $x: top, $y: center, $repeat: no-repeat) {
        @if $w and $h {
            width: $w;
            height: $h;
        }
        background: url('#{$image-base-path}#{$URI}') $repeat $x $y;
        background-size: 100% 100%;
    }

    .sms-template-setting-container {
        background-color: #fff;
        position: relative;

        .pageNum {
            margin: 0;
            padding: 25px 0;
        }
    }
</style>
