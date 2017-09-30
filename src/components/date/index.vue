<template>
    <div class="date-wrapper">
        <div class="flex">
            <div>
                <input v-if="defaultText=='生效时间'"
                       style="position:relative"
                       type="text"
                       @click="openByDrop($event)"
                       placeholder="生效时间"
                       v-model="calendar3.display"
                       readonly>
                <input v-else-if="defaultText=='失效时间'" style="position:relative"
                       type="text"
                       @click="openByDrop($event)"
                       placeholder="失效时间"
                       v-model="calendar3.display"
                       readonly>
                <input v-else style="position:relative"
                       type="text"
                       @click="openByDrop($event)"
                       placeholder="选择时间"
                       v-model="calendar3.display"
                       readonly>
            </div>
        </div>
        <transition name="fade">

            <div class="calendar-dropdown"
                 :style="{'left':(calendar3.left-460)+'px','top':(calendar3.top-80)+'px'}"
                 v-if="calendar3.show">

                <calendar :zero="calendar3.zero"
                          :lunar="calendar3.lunar"
                          :value="calendar3.value"
                          :begin="calendar3.begin"
                          :end="calendar3.end"
                          :type="'data'"
                          @select="calendar3.select"></calendar>
            </div>

        </transition>
    </div>

</template>

<script type="es6">
    import calendar from '../common/calendar.vue'
    export default {
        name: 'PickDate',
        props:['defaultText','startTime','dateName'],
        components:{
            calendar
        },
        data(){
            return {
                calendar3:{
                    display:'',
                    show:false,
                    zero:true,
                    // value:[2018,2,16], //默认日期
                    lunar:false, //显示农历
                    select:(value)=>{
                        this.calendar3.show=false;
                        this.calendar3.value=value;
                        this.calendar3.display=value.join("-");
                        if(this.startTime=='true'){
                            // this.$store.dispatch('changeStartTime',this.calendar3.value.join("-"));
                        }
                        if(this.startTime=='false')
                        {
                            // this.$store.dispatch('changeEndTime',this.calendar3.value.join("-"));
                        }
                    }
                }
            }
        },
        methods:{

            openByDrop(e){
                this.calendar3.show=true;
                this.calendar3.left=e.target.offsetLeft+199;
                this.calendar3.top=e.target.offsetTop+120;

                e.stopPropagation();
                window.setTimeout(()=>{
                    document.addEventListener("click",(e)=>{
                        this.calendar3.show=false;
                        document.removeEventListener("click",()=>{},false);
                    },false);
                },1000)
            },

            sendDate(){
            }

        },
        watch:{
            /**
             * 监听选择的日期
             * */
            'calendar3.display' (a, b) {
                this.bus.$emit('dateBus',{
                    dateName:this.dateName,
                    dateValue:this.calendar3.display
                })
            },
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">

    .date-wrapper{
        width: 100%;
        position: relative;
        &.error{
            input{
                color: #f84545 !important;
                border: 1px solid #f84545 !important;;
                box-shadow: 0 0 3px 2px #f84545 !important;;
                &:hover{
                    box-shadow: 0 0 3px 2px #f84545 !important;;
                }
            }
        }

    }
    input{
        cursor: pointer;
        &::-webkit-input-placeholder {
            color: #D6E1E5;
        }
        &:-moz-placeholder  {
            color: #D6E1E5;
        }
        &::-moz-placeholder  {
            color: #D6E1E5;
        }
        &:-ms-input-placeholder  {
            color: #D6E1E5;
        }
    }
    .flex{
        /*width:150px;*/
        width: 100%;
    }
    .flex>div{
        /*padding:20px;*/
        /*width:150px;*/
        width: 100%;
        /*min-width:300px;*/
        /*border: 1px solid #eee;*/
        /*border-radius: 2px;*/
        position: relative;
    }
    .flex>div>span{
        position: absolute;
        left:0px;
        top:0px;
        padding:2px 10px;
        font-size:10px;
        border-radius:0 0 2px 0;
        background:#ea6151;
        color:#fff;
    }
    .flex>div>input{
        box-sizing: border-box;
        font-size: 12px !important;
        width:100%;
        border-radius: 4px;
        border:1px solid #dedede;
        background:url('../../assets/calendar.png') no-repeat 95% 7px;
        padding-left: 10px;
        color:#666;
        height: 34px;
        line-height: 34px;
    }

    /*transition*/
    .fade-enter-active,
    .fade-leave-active {
        transition: all .5s ease-in-out;
    }
    .fade-enter,.fade-leave-active{
        opacity: 0;
        transform: translateY(-10px);

    }

    /*下拉框*/
    .calendar-dropdown{
        background: #fff;
        position: absolute;
        left:0;
        top:0;
        padding:20px;
        border: 1px solid #eee;
        border-radius: 2px;
        z-index: 2;
    }
    .calendar-dropdown:before {
        position: absolute;
        left:30px;
        top: -10px;
        content: "";
        border:5px solid rgba(0, 0, 0, 0);
        border-bottom-color: #DEDEDE;
    }
    .calendar-dropdown:after {
        position: absolute;
        left:30px;
        top: -9px;
        content: "";
        border:5px solid rgba(0, 0, 0, 0);
        border-bottom-color: #fff;
    }

    /*弹出框*/
    .calendar-dialog{
        position: absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
    }

    .calendar-dialog-mask{
        background:rgba(255,255,255,.5);
        width:100%;
        height:100%;
    }

    .calendar-dialog-body{
        background: #fff;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        padding:20px;
        border: 1px solid #eee;
        border-radius: 2px;
    }

</style>
