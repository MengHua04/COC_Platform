import HTTP from './axiosInstance';
import * as API from './api';

export async function login(params) {
	return await HTTP.post(API.login, params);
}

export async function logout(params) {
	return await HTTP.post(API.logout, params);
}