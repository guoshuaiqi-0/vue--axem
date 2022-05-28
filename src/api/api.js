import axios from 'axios';

var baseURL = '/api';

// 获取doken
const getConfig = function() {
	return {
		baseURL,
		headers: {
			authorization: window.sessionStorage.getItem('token')
		}
	}
}

/*
 * @ 获取验证码 
 */
export function getCaptchaApi() {
	return `${baseURL}/captcha?` + Math.random()
}
/*
 * @ 获取登录token 
 */
export function getLoginApi({
	payload = {}
}) {
	return axios.post('/user/login', payload, getConfig())
}
/*
 * @ 请求注册
 */
export function postRegisterApi({
	payload = {}
}) {
	return axios.post('/user/register', payload, getConfig())
}

/*
 * @ 获取用户信息
 */

export function getInfoApi(payload = {}) {
	return axios.post('/user/info', payload, getConfig())
}
/*
 * @ 退出登录
 */
export function getLogoutApi(payload = {}) {
	return axios.post('/user/logout', payload, getConfig())

}

// @查询获取题库列表
/**
 * var params = {
  @type:<number>,         // 必填项  题目类型  1：单选题  2：多选题  3：填空题  4：问答题   注：暂只支持单选；
  @pagination:<boolean>,  //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页; 
  @pageSize:<number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
  @pageNum:<number>,      //非必填  想获取第几页的数据  如果不传 默认是第1页；
} 	
 */

export function getQuestionListApi(params = {}) {
	return axios.post('/question/list', params, getConfig())
}

// 
/*/**
 * 删除接口
 * @param {*} params 
 */
export function getQuestionDeleteApi(params = {}) {
	console.log(params)
	return axios.post('/question/delete', params, getConfig())
}
/**
 * 	创建题库接口
 * @param { } params 
 */


export function getQuestionCreateApi(params = {}) {
	console.log(params)
	return axios.post('/question/create', params, getConfig())
}


/**
 * 	修改当前题目接口
 * @param { } params 
 */

export function getQuestionUpdateApi(params = {}) {
	console.log(params)
	return axios.post('/question/update', params, getConfig())
}

/**
 * 	获取个人信息接口
 * @param { } params 
 */

export function getUserInfoApi(params = {}) {
	return axios.post('/user/info', params, getConfig())
}
/**
 * 	修改个人信息接口
 * @param { } params 
 */

export function getUserInfoUpdateApi(params = {}) {
	return axios.post('/user/update', params, getConfig())
}


/**
 * 	查询我的记事薄列表
 * @param { } params 
 */

export function getDiaryListApi(params = {}) {
	return axios.post('/diary/list', params, getConfig())
}

/**
 * 	创建任务
 * @param { } params 
 */

export function creatTaskApi(params = {}) {
	return axios.post('/task/create', params, getConfig())
}

/**
 * 	发布任务
 * @param { } params 
 */

export function releaseTaskApi(params = {}) {
	return axios.post('/task/release', params, getConfig())
}


/**
 * 	查询用户信息列表
 * @param { } params 
 */

export function getUserList(params = {}) {
	return axios.post('/user/list', params, getConfig())
}


/**
 * 	查询任务列表
 * @param { } params 
 */

export function getListTaskApi(params = {}) {
	return axios.post('/task/list', params, getConfig())
}

/**
 * 	获取任务详情
 * @param { } params 
 */

export function getDetailTaskApi(params = {}) {
	return axios.post('/task/detail', params, getConfig())
}
