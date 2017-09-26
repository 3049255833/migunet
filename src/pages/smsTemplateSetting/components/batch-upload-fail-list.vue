<template>
    <div class="batch-upload-fail-list-container">
        <div class="operate-list clearfix">
            <div class="left" v-if="errorCode == '2' || errorCode == '3'">
                <span class="blue" v-show="errorCode == '2'">部分数据导入失败</span>
                <span class="blue" v-show="errorCode == '3'">重复数据系统默认忽略！</span>
            </div>

            <div class="left" v-if="errorCode == '5'">
                <span class="blue" v-show="toggleCode == '0'">部分数据导入失败</span>
                <span class="blue" v-show="toggleCode == '1'">重复数据系统默认忽略！</span>
            </div>

            <div class="right" v-if="errorCode == '5'">
                <!--<button type="button" class="btn fail" @click="fail">失败数据</button>

                <button type="button" class="btn" @click="repeat">重复数据</button>-->

                <button class="btn"
                        v-for="(item,index) in tabsParam"
                        @click="toggleTabs(index)"
                        :class="{active:(index == toggleCode)}">{{item}}</button>
            </div>
        </div>

        <div class="clearfix upload-error-list">
            <table class="table-module">
                <thead>
                    <tr>
                        <th>短信模板名称</th>
                        <th>模板类型</th>
                        <th>短信模板描述</th>
                        <th>短信模板内容</th>
                    </tr>
                </thead>

                <tbody v-show="errorCode == '2' || toggleCode == '0'">
                    <tr v-for="(item, index) in wrongList">
                        <td><div class="limit-text-length code"
                                 :title="item.companyCode">{{item.smsName}}</div></td>

                        <td v-if="item.smsType == '1'">订购成功短信模板</td>

                        <td v-else-if="item.smsType == '2'">到期提醒短信模板</td>

                        <td v-else-if="item.smsType == '3'">推荐短信模板</td>

                        <td v-else></td>

                        <td><div class="limit-text-length des"
                                 :title="item.serviceDesc">{{item.smsDesc}}</div></td>

                        <td><div class="limit-text-length content"
                                 :title="item.serviceName">{{item.templateContent}}</div></td>
                    </tr>
                </tbody>

                <tbody v-show="errorCode == '3' || toggleCode == '1'">
                    <tr v-for="(item, index) in repeatList">
                        <td><div class="limit-text-length code"
                                 :title="item.companyCode">{{item.smsName}}</div></td>

                        <td v-if="item.smsType == '1'">订购成功短信模板</td>

                        <td v-else-if="item.smsType == '2'">到期提醒短信模板</td>

                        <td v-else-if="item.smsType == '3'">推荐短信模板</td>

                        <td v-else></td>

                        <td><div class="limit-text-length des"
                                 :title="item.serviceDesc">{{item.smsDesc}}</div></td>

                        <td><div class="limit-text-length content"
                                 :title="item.serviceName">{{item.templateContent}}</div></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="submit-btn">
            <button class="btn" @click="close">确定</button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          batchUploadfailData: Object
      },
      data(){
          return {
              tabsParam:["失败数据","重复数据"],
              errorCode: this.batchUploadfailData.resultCode,
              wrongList: this.batchUploadfailData.wrongList,
              repeatList: this.batchUploadfailData.repeatList,
              toggleCode: '0'
          }
      },
      methods: {
          fail() {

          },
          repeat() {

          },
          close() {
              this.$modal.hide('batchUploadFailList');
          },
          toggleTabs(index) {
              this.toggleCode = index;
          }
      }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  $blue:#46bafe;

  .batch-upload-fail-list-container {
      padding:0 30px;

      .upload-error-list {

      }
  }

  .v--modal-box{
      padding:20px!important;
  }

  .operate-list{
      height:60px;
      line-height: 60px;
      margin-top: 15px;

      .left{
          float: left;
          background: url(../error-icon.png) no-repeat left center;
          padding-left: 20px;

          .blue{
              color:$blue;
          }
      }

      .right{
          float: right;
      }

      .btn{
          width:88px;
          height: 35px;
          border:1px solid $blue;
          color: $blue;
          background: none;
          margin-left: 10px;
          font-size: 12px;

          &.active{
              background: $blue;
              color: #fff;
          }
      }
  }
  .submit-btn{
      text-align: center;

      button{
        margin:30px 0;
        width: 100px;
        height:35px;
        color:#fff;
        background-color: $blue;
      }
  }
</style>
