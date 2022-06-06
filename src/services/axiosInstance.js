import axios from 'axios';
import { notification } from 'antd';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useNavigate } from 'react-router-dom';
import errorCode from './errorCode';
import Local from '../utils/storage';

if (!window.Promise) {
	window.Promise = Promise;
}

NProgress.configure({
	minimum: 0.1,
	easing: 'ease',
	speed: 800,
	showSpinner: false
});

axios.interceptors.request.use(
	(config) => {
		NProgress.start();
		config.headers = {
			...config.headers,
			token: Local.getLocal('token'),
		};
		return config;
	},
	(err) => {
		NProgress.done();
		return Promise.reject(err);
	}
);

// http response 拦截器
axios.interceptors.response.use(
	function (response) {
		NProgress.done();
		if (!response.data.success) {
			notification.error({
				message: '错误',
				description: response.data.msg
			});
			return Promise.reject(response);
		} else {
			return Promise.reject(response);
		}
	},
	(err) => {
		NProgress.done();
		if (err && err.response) {
			err.message =
				errorCode[err.response.status] ||
				err.response.data.data ||
				err.response.data.error;
		} else {
			err.message = '连接服务器失败!';
		}
		if (err.response.status === 401) {
			Local.removeLocal('token');
			const navigate = useNavigate()
			navigate('/login');
			window.location.reload();
		} else {
			notification.error({
				message: '错误',
				description: err.message
			});
		}

		return Promise.reject(err);
	}
);

/**
 * _get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} option [请求配置]
 * @param {String} method [请求方法]
 */
function _get(url, params = {}, option = {}, method = 'GET') {
	return new Promise((resolve, reject) => {
		const { restUrl, data } = restfulAPI(url, params);
		let options = {
			url: restUrl,
			params: data,
			method,
			...option
		};
		axios(options)
			.then((res) => {
				resolve(res.data.data);
			})
			.catch((err) => {
				reject(err.data);
			});
	});
}

function _delete(url, params = {}, option = {}) {
	return _get(url, params, option, 'DELETE');
}

/**
 * _post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} option [请求配置]
 * @param {String} method [请求方法]
 */
function _post(url, params = {}, option = {}, method = 'POST') {
	return new Promise((resolve, reject) => {
		const { restUrl, data } = restfulAPI(url, params);
		let options = {
			url: restUrl,
			data: data,
			method,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			...option
		};
		axios(options)
			.then((res) => {
				resolve(res.data.data);
			})
			.catch((err) => {
				reject(err.data);
			});
	});
}

function _put(url, params = {}, option = {}) {
	return _post(url, params, option, 'PUT');
}

const restfulAPI = function (url, formData) {
	const newFormData = Array.isArray(formData)
		? [...formData]
		: { ...formData };
	if (!url) throw new Error('url不能为空');
	if (url.indexOf('{') === -1 || !formData)
		return { restUrl: url, data: newFormData };
	let restfulArray = url.split('/');
	const result = restfulArray.map((item) => {
		if (item.indexOf('{') !== -1) {
			const key = item.substring(1, item.length - 1);
			// delete newFormData[key];
			return formData[key] || '';
		}
		return item;
	});
	return { restUrl: result.join('/'), data: newFormData };
};

export default {
	get: _get,
	delete: _delete,
	post: _post,
	put: _put,
	restfulAPI: restfulAPI
};
