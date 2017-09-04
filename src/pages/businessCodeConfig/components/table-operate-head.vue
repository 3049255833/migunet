<template>
    <div class="operate-box">
        <div class="left">
            <div class="title">
                {{title}}
            </div>

            <input @change="upload" type="file" class="pointer" id="upload" name="file"/>

            <button class="btn btn-import-module mr-10">批量导入</button>

            <button class="btn btn-add-module-white mr-10" @click="addBusinessCode">新增代码</button>
            <button class="btn btn-import-module mr-10 batch-delete">批量删除</button>
        </div>

        <div class="right">
            <input type="text"
                   placeholder="关键信息搜索"
                   @keyup.enter="searchKeyWord"
                   v-model="operateData.keys"/>
        </div>

        <v-progress-bar
          :isHide="isHide"
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
                isHide: true,
                uploadErrorInfo: '',
                percent: '',
                progressStyle: {
                    width: '10'
                },
                operateData: {
                    keys: ''  //关键字
                }
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

                let files = document.getElementById('upload').files;

                let fileTypeValid = files[0].name.lastIndexOf('.xls') > -1 || files[0].name.lastIndexOf('.xlsx') > -1 || files[0].name.lastIndexOf('.csv') > -1;

                //console.log("fileTypeValid: " + fileTypeValid);

                if (fileTypeValid) {
                    let formData = new FormData();

                    formData.append('file', files[0]);

                    this.uploadErrorInfo = '';

                    this.isHide = false;

                    //console.log("info: " + this.uploadErrorInfo);

                    this.$http.post(this.api.batchAddBossInfo, formData, {
                        progress: (e) => {
                            if (e.lengthComputable) {

                                //console.log("e: " + JSON.stringify(e));

                                var percent = Math.floor(e.loaded / e.total*100);

                                if(percent < 100) {
                                    this.percent = percent;
                                    this.progressStyle.width = percent;

                                    //console.log("uploading: " + '已上传: ' + percent + '%');
                                }
                                if(percent >= 100) {
                                    this.percent = '100';
                                    this.progressStyle.width = '100';

                                    //console.log("upload success: " + '文件上传完毕');

                                    setTimeout(function () {
                                      that.isHide = true;

                                      that.bus.$emit('sendBatchAddBossInfo');
                                    }, 2000);

                                }
                            }
                        }
                    });
                } else {
                    this.isHide = false;

                    this.uploadErrorInfo = '上传格式错误！';

                    setTimeout(function () {
                        that.isHide = true;
                    }, 2000);
                }
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
