<template>
    <div class="batch-upload-fail-list-container">
        <div class="operate-list clearfix">
            <div class="left" v-if="errorCode == '2' || errorCode == '3'">
                <span class="blue" v-show="errorCode == '2'">部分数据导入失败</span>
                <span class="blue" v-show="errorCode == '3'">重复数据系统默认忽略！</span>
            </div>

            <div class="left" v-if="errorCode == '5'">
                <span class="blue" v-show="toggleCode == '0'">部分数据导入失败</span>
                <span class="blue" v-show="toggleCode == '1'">部分数据重复导入，系统已忽略！</span>
            </div>

            <div class="right" v-if="errorCode == '5'">
                <button class="btn"
                        v-for="(item,index) in tabsParam"
                        @click="toggleTabs(index)"
                        :class="{active:(index == toggleCode)}">{{item}}</button>
            </div>
        </div>

        <table class="table-list">
            <thead>
                <tr>
                    <th style="width: 100px; padding-left: 20px">业务代码</th>
                    <th style="width: 100px">企业代码</th>
                    <th style="width: 130px">业务代码名称</th>
                    <th style="width: 130px">业务代码描述</th>
                    <th style="width: 80px">分成类型</th>
                    <th style="width: 80px">资费金额</th>
                    <th style="width: 100px">自否管理员专用</th>
                    <th style="width: 100px">自否二次确认</th>
                </tr>
            </thead>
        </table>

        <div class="clearfix upload-error-list">
            <table class="table-list">

                <tbody v-show="errorCode == '2' || toggleCode == '0'">
                    <tr v-for="(item, index) in wrongList">
                        <td style="width: 100px; padding-left: 20px">
                            <div class="l-app-name limit-text-length id"
                               :title="item.serviceCode">{{item.serviceCode}}</div>
                        </td>

                        <td style="width: 100px"><div class="limit-text-length code"
                                 :title="item.companyCode">{{item.companyCode}}</div></td>

                        <td style="width: 130px"><div class="limit-text-length name"
                                 :title="item.serviceName">{{item.serviceName}}</div></td>

                        <td style="width: 130px"><div class="limit-text-length des"
                               :title="item.serviceDesc">{{item.serviceDesc}}</div></td>

                        <td style="width: 80px" v-if="item.sharingType == '0'">分成</td>
                        <td style="width: 80px" v-else-if="item.sharingType == '1'">买断</td>
                        <td style="width: 80px" v-else>
                          <div class="limit-text-length"
                               style="max-width: 80px"
                               :title="item.sharingType">{{item.sharingType}}</div></td>

                        <td style="width: 80px">{{item.feeAmount}}</td>

                        <td style="width: 100px" v-if="item.isManager == '1'">是</td>
                        <td style="width: 100px" v-else>否</td>

                        <td style="width: 100px" v-if="item.secondConfirm == '1'">是</td>
                        <td style="width: 100px" v-else>否</td>
                    </tr>
                </tbody>

                <tbody v-show="errorCode == '3' || toggleCode == '1'">
                    <tr v-for="(item, index) in repeatList">
                        <td style="width: 100px; padding-left: 20px">
                            <div class="l-app-name limit-text-length id"
                               :title="item.serviceCode">{{item.serviceCode}}</div>
                        </td>

                        <td style="width: 100px"><div class="limit-text-length code"
                                 :title="item.companyCode">{{item.companyCode}}</div></td>

                        <td style="width: 130px"><div class="limit-text-length name"
                                 :title="item.serviceName">{{item.serviceName}}</div></td>

                        <td style="width: 130px"><div class="limit-text-length des"
                               :title="item.serviceDesc">{{item.serviceDesc}}</div></td>

                        <td style="width: 80px" v-if="item.sharingType == '0'">分成</td>
                        <td style="width: 80px" v-else-if="item.sharingType == '1'">买断</td>
                        <td style="width: 80px" v-else>
                            <div class="limit-text-length"
                                 style="max-width: 80px"
                               :title="item.sharingType">{{item.sharingType}}</div></td>
                        </td>

                        <td style="width: 80px">{{item.feeAmount}}</td>

                        <td style="width: 100px" v-if="item.isManager == '1'">是</td>
                        <td style="width: 100px" v-else>否</td>

                        <td style="width: 100px" v-if="item.secondConfirm == '1'">是</td>
                        <td style="width: 100px" v-else>否</td>
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

  .table-list {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;

      .limit-text-length {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          color: #333;
          line-height: 18px;
      }

      thead {
          tr {
              width: 100%;
              height: 56px;
              line-height: 56px;
              background: #F2F8FF;
              text-align: left;
              th {
                  color: #6d7684;
                  //padding: 0 20px;
              }
          }
      }

      tbody {
          tr {
              border-bottom: 1px solid #EEEEEE;
              background: white;

              td {
                  color: #333;
                  padding: 18px 0px;
              }
          }
      }
  }

  .batch-upload-fail-list-container {
      padding:0 20px;

      .upload-error-list {
          max-height: 280px;
          overflow-y: auto;

          .des, .name {
              max-width: 100px;
          }

          .id, .code {
              max-width: 80px;
          }
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
