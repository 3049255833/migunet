<template>
    <div class="batch-upload-fail-list-container">
        <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
            </div>
        </div>

        <div class="operate-list clearfix">
            <div class="left">
                <i></i>
                {{errorInfo}}
            </div>

            <div class="right">
                <button type="button" class="btn" @click="fail">失败数据</button>

                <button type="button" class="btn" @click="repeat">重复数据</button>
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
                        <th>操作</th>
                    </tr>
                </thead>

                <tbody v-if="errorCode == '2'">
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

                <tbody v-else-if="errorCode == '3'">
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
            </table>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          errorCode: String,
          wrongList: Array,
          repeatList: Array
      },
      methods: {
          fail() {

          },
          repeat() {

          }
      }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .batch-upload-fail-list-container {
      .upload-error-list {

      }
  }
</style>
