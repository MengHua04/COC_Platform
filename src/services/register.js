import HTTP from './axiosInstance';
import * as API from './api';

export async function register(params) {
	return await HTTP.post(API.register, params);
}