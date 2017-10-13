<template>
  <div class="product-code">
      <div class="list-modal-head">
          <div class="search-wrap">
              <input @keyup.enter="getCpList"
                  class="form-input vt-middle  w-150 radius-2 mr-6"
                  v-model="postData.search"
                  type="text"
                  onfocus="this.placeholder=''"
                  onblur="this.placeholder='关键信息搜索'"
                  placeholder="关键信息搜索">

              <div class="search vt-middle">
                  <i @click="getCpList" class="icon pointer icon-search"></i>
              </div>
          </div>
      </div>

      <div class="table-wrap">
          <table class="table-module">
              <thead>
                  <tr>
                    <td>选择</td>
                    <td>CPID</td>
                    <td>CP名称</td>
                  </tr>
              </thead>

              <tbody>
                  <tr v-for="(item, index) in cpList">
                      <td>
                          <label class="checkbox-module">
                              <input type="checkbox" :value="index" v-model="cpCheckbox">
                              <span></span>
                          </label>
                      </td>

                      <td>{{item.cpCode}}</td>

                      <td>{{item.cpName}}</td>
                  </tr>
              </tbody>
          </table>
      </div>

      <div class="btn-group btn-group-center">
          <div class="btn btn-primary btn-middle-100" v-if="cpCheckbox||cpCheckbox=='0'"  @click="confirm">确定</div>
          <div class="btn btn-primary btn-middle-100 unable" v-else>确定</div>
          <div class="btn btn-default btn-middle-100" @click="cancel">取消</div>
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
      props: {
          //cpList: Array
      },
      components:{
        VPaging
      },
      data(){
          return {
              postData:{
                  pageNum:'1',
                  pageSize:'5',
                  search:''
              },
              totalItem: '',
              selectCpList: {},
              cpCheckbox: '',
              cpList: ''
          }
      },
      computed:{
          /*canSave(){
              return (this.selectCpList.length > 0);
          }*/
      },
      mounted(){
          /**
           * 获取CP列表
           * */
          this.getCpList();
      },
      methods: {
          confirm() {
              this.bus.$emit('selectCpSpListBus', this.cpspList[parseInt(this.cpCheckbox)]);

              //this.bus.$emit('getSelectSms', this.smsTemplateList[parseInt(this.smsRadio)]);
          },

          cancel() {
              this.$modal.hide('cpSPListModal');
          },

          /*获取cp*/
          getCpList() {
              this.$http.get(this.api.findPdCp,
                  {
                      params:{
                          search:this.postData.search,
                          pageNum:this.postData.pageNum,
                          pageSize:this.postData.pageSize
                      },
                      showLoading:true
                  }).then(response => {

                  let res = response.body;

                  if(res.result.resultCode=='00000000'){

                      this.cpList = res.data;

                      this.totalItem = res.total;

                      //console.log("res: " + JSON.stringify(res));

                  } else {

                      console.log("res: " + JSON.stringify(res));
                  }
              });
          },

          /*/!*获取选中的列表*!/
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
          },*/

          /**
           * 获取分页信息
           * */
          getPage(res){
              this.postData.pageNum=res.pagingValue;
              this.postData.pageSize=res.pagingSize;
              //this.cpspListCheckbox=[];
              this.getCpList();
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
