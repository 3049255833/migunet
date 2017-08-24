<template>
    <table>
        <thead>
            <tr>
                <th class="first">选择</th>
                <th class="sencod">目录列表</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(item, index) in items">
                <td class="first">
                    <label class="checkbox-module">
                        <input type="checkbox">
                        <span></span>
                    </label>
                </td>

                <td class="sencod">
                    <div class="content">{{item.message}}</div>

                    <div class="search-wrap hide">
                        <input v-model="item.message" class="form-input  w-200 radius-2 mr-6" type="text" placeholder="请输入">
                        <div class="search vt-middle" @click="confirm">
                            确认
                        </div>
                    </div>
                </td>

                <td class="operation">
                    <div class="edit icon icon-edit-gray" @click="editBtn"></div>

                    <div class="delete icon icon-del-gray" @click="deleteBtn(index)"></div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import VSearch from '@/components/search'
    import VPaging from '@/components/paging'
    import Bus from './bus'

    export default {
        name: 'Table',
        components: {
            VSearch,
            VPaging
        },
        data () {
            return {
                items: [
                    {
                        message: "漫画类型1"
                    },
                    {
                        message: "漫画类型2"
                    },
                    {
                        message: "漫画类型3"
                    },
                    {
                        message: "漫画类型4"
                    }
                ],
            }
        },
        methods: {
            editBtn(event) {
                event.currentTarget.parentNode.parentNode.children[1].children[0].style.display="none";

                event.currentTarget.parentNode.parentNode.children[1].children[1].style.display="block";
            },

            deleteBtn(index) {
                this.items.splice(index, 1);
            },

            confirm(event) {
                event.currentTarget.parentNode.style.display="none";

                event.currentTarget.parentNode.parentNode.children[0].style.display="block";
            }
        },
        created() {
            Bus.$on('addCatalog', target => {
                this.items.push({message: target});
            });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
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
            background: #46BAFE;
            color: #fff;
            cursor: pointer;
        }
    }

    table {
        width: 100%;

        thead tr {
            background-color: #f2f8ff;

            th {
                padding: 22px 0;
                font-size: 14px;
                color: #4a4a4a;
                text-align: left;
            }

            .first {
                width: 19%;
                padding-left: 70px;
            }
        }

        tbody {

            tr {
                border-bottom: 1px solid #ddd;

                &:hover {
                    background-color: #f7f7f7;

                    .operation {
                        .edit, .delete {
                            visibility: visible;
                        }
                    }
                }

                td {
                    padding: 15px 0;
                }

                .first {
                    padding-left: 70px;
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
