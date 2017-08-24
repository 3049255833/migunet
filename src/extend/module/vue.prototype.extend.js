/**
 * Created by 郑欣烁 on 2017/8/24.
 * 增添vue实例的一些方法
 */

let extend={
    /**
     * 获取下拉框的值
     * @param str string
     * @param obj Object 填入当前vue实例
     */
    getSelectOption(str,obj){
        return new Promise((resolve, reject) => {
            obj.bus.$on('selectBoxBus', res => {
                if (res.selectBoxName == str) {
                    resolve(res)
                }
            });
        });
    },
    /**
     * 获取date组件的值
     * @param str string
     * @param obj Object 填入当前vue实例
     */
    getDate(str,obj){
        return new Promise((resolve, reject) => {
            obj.bus.$on('dateBus', res => {
                if (res.dateName == str) {
                    resolve(res)
                }
            });
        });
    }
};



export default extend

