import HTTP from './axiosInstance';
import * as API from './api';

export async function getChat(params) {
	return await HTTP.post(API.getChat, params);
}