<template>
    <div class="operate-box">
        <div class="left">
            <div class="title">
                {{title}}
            </div>

            <button v-if="smsTFlag&&$root.ajaxLock"
                    @click="batchDelete"
                    class="btn btn-middle-88 ml-24 mr-10 btn-primary">删除</button>

            <button @click="cancelAudit"
                    v-if="smsTFlag"
                    class="btn btn-default mr-10 btn-middle-88">取消</button>

            <input @change="upload" v-if="!smsTFlag"
                   type="file" class="ml-24 pointer" id="upload" name="file"/>

            <button v-if="!smsTFlag"
                    class="btn ml-24 btn-import-module mr-10">批量导入</button>

            <button v-if="!smsTFlag"
                    @click="smsTAll"
                    class="btn btn-batch-delete-white batch-delete mr-10">批量删除</button>

            <button class="btn btn-add-module-white mr-10"
                    v-if="!smsTFlag"
                    @click="addSmsTemplate">新增短信模板</button>

            <button v-if="!smsTFlag" class="btn btn-download mr-10">模板下载</button>

        </div>

        <div class="right">
            <input type="text"
                   placeholder="关键信息搜索"
                   @keyup.enter="searchKeyWord"
                   v-model="operateData.keys"/>

            <div class="search-icon" @click="searchKeyWord"></div>
        </div>

        <v-progress-bar
          :isHide="isHideProgressBar"
          :percent="percent"
          :progressStyle="progressStyle.width"
          :uploadErrorInfo="uploadErrorInfo"></v-progress-bar>

    </div>
</template>
<script>
    import VProgressBar from './progress-bar'

    export default {
        name: 'OperateBox',
        props: ['title'],
        components:{
            VProgressBar
        },
        data() {
            return {
                isHideProgressBar: true,
                uploadErrorInfo: '',
                percent: '',
                progressStyle: {
                    width: '10'
                },
                operateData: {
                    keys: ''  //关键字
                },
                smsTFlag: false,
                allData: []
            }
        },
        methods: {
            addSmsTemplate() {
                this.bus.$emit('addSmsTemPlateBus');
            },

            /**
             * 触发事件，将封装的数据传给index
             * 该组件内可以调用该方法传数据
             * */
            searchKeyWord(e){
                if (e&&e.target){
                    e.target.blur();
                }

                this.$emit('searchKeyWordBus',this.operateData);
            },

            upload() {
                let that = this;

                let files = document.getElementById('upload').files;

                let fileTypeValid;

                if(files[0]) {

                    fileTypeValid = files[0].name.lastIndexOf('.xls') > -1 || files[0].name.lastIndexOf('.xlsx') > -1 || files[0].name.lastIndexOf('.csv') > -1;
                } else {
                    return false;
                }

                console.log("fileTypeValid: " + fileTypeValid);

                if (fileTypeValid) {
                    let formData = new FormData();

                    formData.append('file', files[0]);

                    this.$http.post(this.api.uploadSmsTemplate, formData).then(
                        response => {
                            let res = response.body;

                            console.log("upload res: " + JSON.stringify(res));

                            if(res.resultCode=='1'){ //成功
                                this.isHideProgressBar = false;
                                this.percent = '100';
                                this.progressStyle.width = '100';

                                setTimeout(function () {
                                    that.isHideProgressBar = true;

                                    that.bus.$emit('sendBatchUploadSmsTemplateSuccessBus');
                                }, 2000);

                            } else if(res.resultCode=='2') { //部分失败
                                //this.bus.$emit('sendBatchAddBossInfo', '上传失败');

                                that.bus.$emit('sendUploadWrongInfoBus', res.wrongList);

                            } else if(res.resultCode=='3') { //部分重复导入

                                that.bus.$emit('sendUploadRepeatInfoBus', res.repeatList);

                            } else if(res.resultCode=='4') { //其他异常

                                that.$root.toastText = res.resultMessage;
                                that.$root.toast = true;

                            } else if(res.resultCode=='5') { //部分失败，部分重复

                                that.allData.push(res.repeatList);

                                that.bus.$emit('sendUploadWrongRepeatInfoBus', res.repeatList);
                            }
                        }
                    );
                } else {

                    //this.bus.$emit('sendBatchAddBossInfo', '上传格式错误');

                    that.$root.toastText = '上传格式错误';
                    that.$root.toast = true;
                }
            },

            smsTAll(){
                this.smsTFlag = true;
                this.$emit('smsTFlagBus', this.smsTFlag);
            },

            cancelAudit(){
                this.smsTFlag = false;
                this.$emit('smsTFlagBus', this.smsTFlag);
            },

            batchDelete(){
                this.$emit('smsTbatchDeleteBus', true);
            },
            maskShow(){
                this.$modal.show('batchUploadFailList');
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    #upload {
        width: 88px;
        height: 33px;
        background: red;
        position: absolute;
        left: 128px;
        top: 14px;
        opacity: 0;

        &:hover {
            background-color: #1D9AD2;
        }
    }

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

            .btn-add-module-white {
                width: auto;
                padding: 0 5px;
            }
        }

        .right {
            float: right;
            overflow: hidden;

            input {
                width: 150px;
                height: 32px;
                padding-left: 5px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                border: solid 1px #d6e1e5;
                float: left;
                padding-right: 30px;
            }

            .search-icon {
                background: url('../../../assets/search.png') no-repeat 95% 50%;
                float: left;
                width: 15px;
                height: 15px;
                margin-left: -25px;
                margin-top: 8px;
                cursor: pointer;
            }
        }
    }
</style>
