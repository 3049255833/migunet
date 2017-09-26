<template>
    <div class="batch-upload-fail-list-container">
        <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
            </div>
        </div>

        <div class="operate-list clearfix">
            <div class="left">
                <span class="blue" v-show="errorCode == 0">部分数据导入失败</span>
                <span class="blue" v-show="errorCode == 1">重复数据系统默认忽略！</span>
                <!-- zqy -->
                <!-- {{errorInfo}} -->
            </div>

            <div class="right">
                <!-- <button type="button" class="btn fail" @click="fail">失败数据</button>

                <button type="button" class="btn" @click="repeat">重复数据</button> -->
                <button class="btn" v-for="(item,index) in tabsParam" @click="toggleTabs(index)" :class="{active:(index == errorCode)}">{{item}}</button>
            </div>
        </div>

        <div class="clearfix upload-error-list">
            <table class="table-module">
                <thead>
                    <tr>
                        <th>短信模板ID</th>
                        <th>短信模板名称</th>
                        <th>模板类型</th>
                        <th>短信模板描述</th>
                        <th>短信模板内容</th>
                        <!-- <th>操作</th> -->
                    </tr>
                </thead>

                <!-- <tbody v-if="errorCode == '2'"> -->
                <tbody v-show="errorCode == 0">
                    <tr v-for="(item, index) in wrongList">
                        <td><div class="l-app-name limit-text-length id"
                                  :title="item.serviceCode">{{item.id}}</div>
                        </td>

                        <td><div class="limit-text-length code"
                                 :title="item.companyCode">{{item.smsName}}</div></td>

                        <td><div class="limit-text-length type"
                                 :title="item.serviceCode">{{item.smsType}}</div>
                        </td>

                        <td><div class="limit-text-length des"
                                 :title="item.serviceDesc">{{item.smsDesc}}</div></td>

                        <td><div class="limit-text-length content"
                                 :title="item.serviceName">{{item.templateContent}}</div></td>
                    </tr>
                </tbody>
                <!-- </tbody> -->

                <!-- <tbody v-else-if="errorCode == '3'"> -->
                <tbody v-show="errorCode == 1">
                    <tr v-for="(item, index) in repeatList">
                        <td><div class="l-app-name limit-text-length id"
                                 :title="item.serviceCode">{{item.id}}</div>
                        </td>

                        <td><div class="limit-text-length code"
                                 :title="item.companyCode">{{item.smsName}}</div></td>

                        <td><div class="limit-text-length type"
                                 :title="item.serviceCode">{{item.smsType}}</div>
                        </td>

                        <td><div class="limit-text-length des"
                                 :title="item.serviceDesc">{{item.smsDesc}}</div></td>

                        <td><div class="limit-text-length content"
                                 :title="item.serviceName">{{item.templateContent}}</div></td>
                    </tr>
                </tbody>
                <!-- </tbody> -->
            </table>
        </div>
        <div class="submit-btn">
            <button class="btn" @click="close">确定</button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
      data(){
          return {
              tabsParam:["失败数据","重复数据"],
              errorCode:0
          }
      },
      props: {
        //   errorCode: String,
          wrongList: Array,
          repeatList: Array
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
              this.errorCode=index;
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
