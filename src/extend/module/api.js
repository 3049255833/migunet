/**
 * Created By xuzhaohui on 2017/8/18
 *
 * api统一处理
 *
 */

let path = location.hostname === 'localhost' 
			? location.origin+'/'
			: location.origin + '/index.php/';


let api = {
	/*login: 'login/index',  // action:smtLogin 短信验证码登录; action:accountLogin 通行证登录, action:logout 退出登录
	department: 'department/index', //action:subList 获取部门列表; action:curContacts 获取部门联系人列表
	item: 'item/index', // action: delete 批量删除联系人; // action: update 修改资料
	itemGet: 'item/get',
	upload: 'io/upload/index',
	register: 'register/index',
	user: 'user/index',
	enterprise: 'enterprise/index',
	contactLevelConfig: 'contactLevelConfig/index',
	privilege: 'privilege/index'  //action: "roleNewList" 查询当前企业下角色列表*/
};

for (let key in api) {
	api[key] = path + api[key];
}



export default api;