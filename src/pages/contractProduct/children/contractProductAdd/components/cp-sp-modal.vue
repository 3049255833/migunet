<template>
  <div class="product-code">
      <div class="list-modal-head">
          <div class="search-wrap">
              <input @keyup.enter="getCpSpList"
                  class="form-input vt-middle  w-150 radius-2 mr-6"
                  v-model="postData.search"
                  type="text"
                  onfocus="this.placeholder=''"
                  onblur="this.placeholder='关键信息搜索'"
                  placeholder="关键信息搜索">

              <div class="search vt-middle">
                  <i @click="getCpSpList" class="icon pointer icon-search"></i>
              </div>
          </div>
      </div>

      <div class="table-wrap">
          <table class="table-module">
              <thead>
                  <tr>
                    <td>选择</td>
                    <td>企业代码</td>
                    <td>企业名称</td>
                  </tr>
              </thead>

              <tbody>
                  <tr v-for="(item, index) in cpspList">

                      <td>
                          <div class="checkbox-module single">
                              <input type="checkbox"
                                     :value="index"
                                     @click="getChooseList(index, item.code, item.name,item.id)"
                                     v-model="cpspListCheckbox" >
                              <span></span>
                          </div>
                      </td>

                      <td>{{item.code}}</td>

                      <td>{{item.name}}</td>
                  </tr>
              </tbody>
          </table>
      </div>

      <div class="btn-group btn-group-center">
          <div class="btn btn-primary btn-middle-100"
               v-if ='canSave'
               @click="confirm">确定</div>

          <div class="btn btn-primary btn-middle-100 unable"
               v-else>确定</div>

          <div class="btn btn-default btn-middle-100"
               @click="cancel">取消</div>
      </div>

      <div class="paging-wrap">

          <v-paging ref="pagingModule"
              :type="'simple'"
              :totalItem="totalItem"
              v-on:pagingBus="getPage"></v-paging>
      </div>
  </div>
</template>

<script>
  import VPaging from '@/components/paging'
  export default{
      name: 'ProductSelectModal',
      props: ['productType','modalName','index'],
      components:{
        VPaging
      },
      data(){
          return {
              cpspListCheckbox:[],
              cpspList: [
                  {
                      id: '1001',
                      code: '2001',
                      name: '南京大于好塘广告公司'
                  },
                  {
                      id: '1002',
                      code: '2002',
                      name: '南京大于好塘广告公司'
                  },
                  {
                      id: '1003',
                      code: '2003',
                      name: '南京大于好塘广告公司'
                  }
              ],
              postData:{
                  pageNum:'1',
                  pageSize:'5',
                  search:''
              },
              totalItem: '',
              selectCpSpList: []
          }
      },
      computed:{
          canSave(){
              return (this.selectCpSpList.length > 0);
          }
      },
      mounted(){
          /**
           * 获取互斥和依赖产品列表
           * */
          this.getCpSpList();
      },
      methods: {
          confirm() {
              this.$modal.hide('cpSPListModal');
          },

          cancel() {
              this.$modal.hide('cpSPListModal');
          },

          /*获取cp/sp*/
          getCpSpList() {},

          /*获取选中的列表*/
          getChooseList(index, code, content, id){
              let that = this;

              this.cpspList[index].active=!this.cpspList[index].active;

              if(this.cpspList[index].active) {

                  this.selectCpSpList.push({
                      code:code,
                      content:content,
                      id:id
                  });
              } else {
                  this.selectCpSpList.forEach(function(item, cIndex){

                      if(item.id == id) {

                          that.selectCpSpList.splice(cIndex, 1);

                          return;
                      }
                  })
              }
              console.log("selectCpSpList：" + JSON.stringify(this.selectCpSpList));
          },

          /**
           * 获取分页信息
           * */
          getPage(res){
              this.postData.pageNum=res.pagingValue;
              this.postData.pageSize=res.pagingSize;
              this.cpspListCheckbox=[];
              this.getCpSpList();
          }
      }
  }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
  .product-code {
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

    .table-wrap {
      max-height: 350px;
      overflow-y: auto;
      .checkbox-module{
        cursor: default;
        input[type='checkbox']{
          width: 20px;
          height: 20px;
          top: 0;
          cursor: pointer;
        }
      }
    }

    .sub-title {
      position: relative;
      color: #333333;
      font-size: 14px;
      padding-bottom: 23px;
      padding-left: 5px;

      .search-wrap {
        margin-left: 140px;
        position: absolute;
        top: -8px;
        right: 0;
      }

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

    .btn-group {
      text-align: center;
      position: absolute;
      bottom: 30px;
      left: 300px;

      .btn:nth-child(1) {
        margin-right: 20px;
      }
    }

    .paging-wrap{
      position: absolute;
      bottom: 32px;
      right: 20px;
    }
  }
</style>
