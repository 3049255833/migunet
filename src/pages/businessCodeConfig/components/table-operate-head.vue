<template>
    <div class="operate-box">
        <div class="left">
            <div class="title">
                {{title}}
            </div>

            <input @change="upload"
                   type="file"
                   class="pointer"
                   id="upload"
                   name="file"/>

            <button class="btn btn-import-module mr-10">批量导入</button>

            <button class="btn btn-add-module-white mr-10" @click="addBusinessCode">新增代码</button>
            <button class="btn btn-import-module mr-10 batch-delete">批量删除</button>

            <a class="btn btn-download mr-10"
               href="static/templates/business_code_tmplate.xls"
               download="业务代码模板信息">模板下载</a>
        </div>

        <div class="right">
            <input type="text"
                   placeholder="关键信息搜索"
                   onfocus="this.placeholder=''"
                   onblur="this.placeholder='关键信息搜索'"
                   @keyup.enter="searchKeyWord"
                   v-model="operateData.keys"/>

            <div class="search-icon" @click="searchKeyWord"></div>
        </div>

        <v-progress-bar
          :isHide="isHideProgressBar"
          :percent="percent"
          :count="count"
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
                isHide: true,
                uploadErrorInfo: '',
                percent: '',
                progressStyle: {
                    width: '10'
                },
                operateData: {
                    keys: ''  //关键字
                },
                isHideProgressBar: true,
                uploadValue: {},
                count: ''
            }
        },
        methods: {
            addBusinessCode() {
                this.bus.$emit('sendAddBusinessCodeTitle');
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

                //console.log("点击了我" + this.uploadValue);

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

                    this.$http.post(this.api.batchAddBossInfo, formData).then(response => {
                        let res = response.body;

                        console.log("upload res: " + JSON.stringify(res));

                        if(res.resultCode=='1'){ //成功
                            this.count = res.resultMessage;
                            this.percent = '100';
                            this.progressStyle.width = '100';
                            this.isHideProgressBar = false;

                            setTimeout(function () {
                                that.isHideProgressBar = true;

                                that.bus.$emit('sendBatchUploadBusinessCodeSuccessBus');
                            }, 2000);

                        } else if(res.resultCode=='2') { //部分失败
                            //this.bus.$emit('sendBatchAddBossInfo', '上传失败');

                            that.bus.$emit('sendUploadWrongInfoBus', res);

                        } else if(res.resultCode=='3') { //部分重复导入

                            that.bus.$emit('sendUploadRepeatInfoBus', res);

                        } else if(res.resultCode=='4') { //其他异常

                            that.$root.toastText = res.resultMessage;
                            that.$root.toast = true;

                        } else if(res.resultCode=='5') { //部分失败，部分重复

                            console.log("error 5: " + JSON.stringify(res));

                            that.bus.$emit('sendUploadWrongRepeatInfoBus', res);
                        }
                    });
                } else {

                  //this.bus.$emit('sendBatchAddBossInfo', '上传格式错误');

                    that.$root.toastText = '上传格式错误';
                    that.$root.toast = true;
                }

                document.getElementById("upload").value = '';
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .batch-delete {
        display: none;
    }

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
