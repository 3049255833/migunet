<template>
    <div class="sms-template-setting-container">
        <v-table-operate-head ref="smsTemplateHead" title="短信模板设置" v-on:smsTFlagBus="changeSmsTFlag" v-on:smsTbatchDeleteBus="smsTbatchDelete" v-on:searchKeyWordBus="searchKeyWordBus">
        </v-table-operate-head>

        <v-sms-template-table ref="smsTemplateTable" :smsTemplateList="smsTemplateList" :smsTFlag="smsTFlag"></v-sms-template-table>

        <v-paging ref="pagingModule" :totalItem="totalItem" v-on:pagingBus="getPage"></v-paging>

        <modal name="updateSmsTemplateModal" :width="600" :height="500" @before-close="beforeClose">
            <t-modal-sub-container :title="modalTitle" :name="'updateSmsTemplateModal'">
                <v-update-sms-template-modal
                    :modal-name="'updateSmsTemplateModal'"
                    :passModal="passModal"
                    v-on:sendSaveSuccessBus="sendSaveSuccess"
                    v-on:sendEditBus="sendEdit"
                    :cmd="cmd">
                </v-update-sms-template-modal>
            </t-modal-sub-container>
        </modal>

        <modal name="confirmBatchDeleteSmsTModal"
            :width="390"
            :height="200"
            @before-close="beforeClose">

            <t-modal-sub-container
                :title="'是否确认删除？'"
                :name="'confirmBatchDeleteSmsTModal'">

                <v-confirm-delete-modal
                    :functionType="'batchDeleteSmsTemplateConfirmInfo'"
                    :confirmInfo="confirmInfo">
                </v-confirm-delete-modal>

            </t-modal-sub-container>
        </modal>

        <!-- 操作结果modal start -->
        <modal name="addResultMsg" :adaptive="true" :draggable="true" :width="200" :height="80">
            <v-toast :name="'addResultMsg'">{{addResultMsg}}</v-toast>
        </modal>

        <!-- 批量导入modal zqy-->
        <modal name="batchUploadFailList" :width="800" :height="500" @before-close="beforeClose">

            <!-- <t-modal-sub-container :title="modalTitle" :name="'batchUploadFailList'"> -->

            <v-batch-upload-fail-list
                :batchUploadfailData="batchUploadfailData">
            </v-batch-upload-fail-list>

            <!-- </t-modal-sub-container> -->
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
import VConfirmDeleteModal from '@/components/confirm-delete-modal/confirm-delete-modal'
import VBatchUploadFailList from '@/pages/smsTemplateSetting/components/batch-upload-fail-list'

export default {
    name: 'SmsTemplateSetting',
    components: {
        VSmsTemplateTable,
        VTableOperateHead,
        VPaging,
        VUpdateSmsTemplateModal,
        TModalSubContainer,
        VToast,
        VConfirmDeleteModal,
        VBatchUploadFailList
    },
    data() {
        return {
            smsTemplateList: [
                /*{
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
                }*/
            ],
            /*wrongList: [
                {
                  id: "1001",
                  smsName: "推荐短信模板",
                  smsType: "短信01",
                  smsDesc: "短信01描述",
                  templateContent: "恭喜您业务已开通"
                },
                {
                  id: "1001",
                  smsName: "推荐短信模板",
                  smsType: "短信01",
                  smsDesc: "短信01描述",
                  templateContent: "恭喜您业务已开通"
                }
            ],
            repeatList: [
                {
                    id: "10012",
                    smsName: "推荐短信模板",
                    smsType: "订购成功短信模板",
                    smsDesc: "短信01描述",
                    templateContent: "恭喜您业务已开通"
                },
                {
                    id: "10012",
                    smsName: "推荐短信模板",
                    smsType: "订购成功短信模板",
                    smsDesc: "短信01描述",
                    templateContent: "恭喜您业务已开通"
                },
                {
                    id: "10012",
                    smsName: "推荐短信模板",
                    smsType: "订购成功短信模板",
                    smsDesc: "短信01描述",
                    templateContent: "恭喜您业务已开通"
                }
            ],*/
            passModal: {},
            cmd: '', //1: 添加; 2: 编辑
            modalTitle: '新增短信模板',
            postData: {
                search: '',
                pageSize: '5',
                pageNum: '1'
            },
            totalItem: '',
            addResultMsg: '',
            smsTFlag: false,
            postDataList: [],
            confirmInfo: '',
            batchUploadfailData: {}
        }
    },
    created() {
        this.getFindSmsTemplate();

        /*
        * 接收添加短信模板modal信息title*/
        this.bus.$on('addSmsTemPlateBus', res => {
            this.cmd = '1';

            this.modalTitle = '新增短信模板';

            this.$modal.show('updateSmsTemplateModal');
        });

        /**
         * 接收更新短信模板modal信息
         * */
        this.bus.$on('editSmsTemplateBus', res => {
            this.passModal = res;

            this.cmd = '2';

            this.modalTitle = '修改短信模板';

            this.$modal.show('updateSmsTemplateModal');
        });

        /**
         * 接收来自批量删除短信模板确认modal框的信息
         * */
        this.bus.$on('batchDeleteSmsTemplateConfirmBus', res => {
            let that = this;

            this.$modal.hide('confirmBatchDeleteSmsTModal');

            console.log("postData: " + JSON.stringify(this.postData));

            this.$http.post(this.api.deleteSmsTemplate, this.postDataList).then(response => {
                let res = response.body;

                if (res.result.resultCode == '00000000') {
                    this.$root.toastText = '删除成功';
                    this.$root.toast = true;
                } else {
                    this.$root.toastText = '删除失败';
                    this.$root.toast = true;
                }

                this.$refs.smsTemplateHead.smsTFlag = false;
                this.smsTFlag = false;
                this.postData.pageNum = '1';
                this.$refs.pagingModule.current = 1;
                this.$refs.smsTemplateTable.smsTCheckbox = [];
                this.$refs.smsTemplateTable.ifSmsTAll = [];

                setTimeout(function() {
                    that.getFindSmsTemplate();
                }, 2500);

            }, (response) => {
                this.$root.toastText = '服务器错误';
                this.$root.toast = true
            })
        });

        /**
         * 接收删除单个短信模板成功信息
         * */
        this.bus.$on('sendDeleteSingleSmsTemplateSuccessInfo', res => {
            let that = this;

            setTimeout(function() {
                that.getFindSmsTemplate();
            }, 2500);
        });

        /** 接收批量导入成功的信息 */
        this.bus.$on('sendBatchUploadSmsTemplateSuccessBus', res => {
            this.getFindSmsTemplate();
        });

        /** 接收批量导入部分失败的数据 */
        this.bus.$on('sendUploadWrongInfoBus', res => {

            this.batchUploadfailData = res;

            this.$modal.show('batchUploadFailList');

            this.getFindSmsTemplate();
        });

        /** 接收批量导入部分重复的数据 */
        this.bus.$on('sendUploadRepeatInfoBus', res => {

            this.batchUploadfailData = res;

            this.$modal.show('batchUploadFailList');

            this.getFindSmsTemplate();
        });

        /** 接收批量导入部分失败和重复的数据 */
        this.bus.$on('sendUploadWrongRepeatInfoBus', res => {

            this.batchUploadfailData = res;

            console.log("batchUploadfailData 5: " + JSON.stringify(this.batchUploadfailData));

            this.$modal.show('batchUploadFailList');

            this.getFindSmsTemplate();
        });
    },
    methods: {
        changeSmsTFlag(res) {
            this.smsTFlag = res;
        },

        /*批量删除短信模板*/
        smsTbatchDelete(res) {
            let that = this;

            if (res) {
                this.postDataList = [];

                let _indexList = this.$refs.smsTemplateTable.smsTCheckbox;

                if (_indexList.length > 0) {
                    _indexList.forEach(function(index) {
                        index = parseInt(index);
                        that.postDataList.push({
                            id: that.smsTemplateList[index].id
                        });
                    });

                    //console.log("Delete sms list: " + JSON.stringify(that.postDataList));

                    this.$http.post(this.api.judgeSmsTemplate,this.postDataList).then(response => {

                        let res = response.body;

                        if(res.result.resultCode=='00000002'){

                          that.confirmInfo = '是否确认删除？删除后，短信模板与合约产品关系解除，不可恢复！';

                        } else if (res.result.resultCode=='00000000') {

                          that.confirmInfo = '是否确认删除？删除后，不可恢复！'
                        } else {//查询失败resultCode： 00000001;

                          that.confirmInfo = '是否确认删除？删除后，不可恢复！';
                        }
                    });

                    this.$modal.show('confirmBatchDeleteSmsTModal');
                }
            }
        },

        /**
         * 接收来自头部搜索
         * */
        searchKeyWordBus(res) {
            this.postData.search = res.keys;

            this.postData.pageNum = '1';
            this.$refs.pagingModule.current = 1;

            console.log("postData search: " + JSON.stringify(this.postData));

            this.getFindSmsTemplate();
        },

        /**
         * 获取短信模板列表
         * */
        getFindSmsTemplate() {

            this.$http.get(this.api.findSmsTemplate, {
                params: this.postData,
                showLoading: true
            }).then(
                response => {
                    let res = response.body;

                    if (res.result.resultCode == '00000000') {

                        this.smsTemplateList = res.data;

                        this.totalItem = res.total;

                        //console.log("smsTemplateList: " + JSON.stringify(this.smsTemplateList));
                    } else {

                        console.log("res: " + JSON.stringify(res));
                    }
                }
                );
        },

        beforeClose() { },

        /**
         * 获取分页信息
         * */
        getPage(res) {
            this.postData.pageNum = res.pagingValue;
            this.postData.pageSize = res.pagingSize;

            this.getFindSmsTemplate();
        },

        /**
         * 接收来自保存的信息
         * */
        sendSaveSuccess() {
            let that = this;

            setTimeout(function() {
                that.getFindSmsTemplate();
            }, 2500);
        },

        /*接受编辑短信模板*/
        sendEdit() {
            let that = this;

            setTimeout(function() {
                that.getFindSmsTemplate();
            }, 2500);
        }
    },
    computed: {
        totalPage() {
            return this.totalItem;
        }
    },
    destroyed() {
        this.bus.$off('addSmsTemPlateBus');
        this.bus.$off('editSmsTemplateBus');
        this.bus.$off('sendDeleteSingleSmsTemplateSuccessInfo');
        this.bus.$off('sendBatchUploadSmsTemplateSuccessBus');

        this.bus.$off('sendUploadWrongRepeatInfoBus');
        this.bus.$off('sendUploadRepeatInfoBus');
        this.bus.$off('sendUploadWrongInfoBus');

        this.$off('sendSaveSuccess');
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
