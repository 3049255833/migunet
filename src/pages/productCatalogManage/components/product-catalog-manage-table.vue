<template>
  <div>
      <table class="table-module">
          <thead>
              <tr>
                  <th class="pl-75" v-if="pCatalogFlag">
                      <label class="checkbox-module checkbox-single">
                          <input type="checkbox" :value="1" v-model="willDeleteAll">
                          <span></span>
                      </label>
                      全选
                  </th>
                  <th class="product-catalog-id">产品目录ID</th>
                  <th class="">产品目录名称</th>
                  <th></th>
              </tr>
          </thead>

          <tbody>
              <tr v-for="(item, index) in productCatalogList">
                  <td v-if="pCatalogFlag" class="pl-75">
                      <label class="checkbox-module checkbox-single">
                          <input type="checkbox" :value="index" v-model="pcmCheckbox">
                          <span></span>
                      </label>
                  </td>

                  <td class="product-catalog-id">
                      <div class="id limit-text-length">{{item.id}}</div>
                  </td>

                  <td class="catalog-name">
                      <div class="content limit-text-length"
                           :title="item.message">{{item.message}}</div>

                      <div class="search-wrap hide">
                          <input v-model="item.message"
                                 class="form-input w-200 radius-2 mr-6"
                                 type="text" placeholder="请输入">

                          <div class="btn btn-primary btn-middle"
                               @click="confirm">确定</div>

                          <div class="btn btn-default btn-middle" @click="cancel">取消</div>
                      </div>
                  </td>

                  <td class="operation">
                      <div class="edit icon icon-edit-gray" @click="editBtn"></div>

                      <div class="delete icon icon-del-gray" @click="deleteBtn(index)"></div>
                  </td>
              </tr>
          </tbody>
      </table>

      <div v-if="productCatalogList.length <= 0" class="no-asset-box">
         <!--<img src="../../../assets/no-asset-show.png">-->
          <v-nolist :text="'暂无数据'"></v-nolist>
      </div>
  </div>
</template>

<script>
    import VPaging from '@/components/paging'
    import VNolist from '@/components/no-list'

    export default {
        name: 'ProductCatalogManageTable',
        props: {
            pCatalogFlag: Boolean,
            productCatalogList: Array
        },
        components: {
            VPaging,
            VNolist
        },
        data () {
            return {
                willDeleteId: '',
                willDeleteAll:[],
                pcmCheckbox: []
            }
        },
        watch:{
            //监听全选
            'willDeleteAll'(a, b){
                if(a.length > 0){
                    let _length = this.productCatalogList.length;

                    for(let i = 0; i < _length; i++){

                      this.pcmCheckbox.push(i);
                    }
                } else {

                    this.pcmCheckbox=[];
                }
            }
        },
        methods: {
            editBtn(event) {
                event.currentTarget.parentNode.parentNode.children[1].children[0].style.display="none";

                event.currentTarget.parentNode.parentNode.children[1].children[1].style.display="block";
            },

            deleteBtn(index) {
                this.willDeleteId = index;

                this.$modal.show('confirmDeleteModal');
            },

            confirm(event) {
                event.currentTarget.parentNode.style.display="none";

                event.currentTarget.parentNode.parentNode.children[0].style.display="block";
            },

            cancel() {
                event.currentTarget.parentNode.style.display="none";

                event.currentTarget.parentNode.parentNode.children[0].style.display="block";
            }
        },
        created() {
            this.bus.$on('addCatalog', res => {
                this.productCatalogManageList.push({message: res});
            });

            /*接收确认删除产品目录信息*/
            this.bus.$on('productCatalogManageConfirmBus', res => {

                this.productCatalogManageList.splice(this.willDeleteId, 1);

                this.$modal.hide('confirmDeleteModal');
            });
        },
        destroyed() {
            this.bus.$off('addCatalog');
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    .no-asset-box {
        text-align: center;
        margin-top: 85px;
    }

    .search-wrap {
        display: none;

        input {
            border-radius: 4px;
            font-size: 12px;
            height: 34px;
            padding: 0 10px;
            line-height: 32px;
            color: #333333;
            border: 1px solid #D6E1E5 !important;
            vertical-align: middle;
        }

        .search {
            display: inline-block;
            width: 80px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            border-radius: 3px;
            //background: #46BAFE;
            color: #fff;
            cursor: pointer;
        }
    }

    table {
        .product-catalog-id {
            padding-left: 70px !important;
            width: 300px;
        }

        .pl-75 {
            width: 100px;
        }

        tbody {

            tr {
                border-bottom: 1px solid #ddd;

                .catalog-name {
                    width: 453px;

                    .limit-text-length {
                        max-width: 453px;
                    }
                }

                &:hover {
                    background-color: #f7f7f7;

                    .operation {
                        .edit, .delete {
                            visibility: visible;
                        }
                    }
                }

                td {
                    //padding: 15px 0;
                }

                .operation {
                    .edit, .delete {
                        visibility: hidden;
                    }
                }
            }
        }
    }
</style>
