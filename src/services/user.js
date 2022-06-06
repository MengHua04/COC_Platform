import HTTP from './axiosInstance';
import * as API from './api';

export async function getUsers(params) {
	return await HTTP.get(API.getUsers, params);
}

export async function passwordChange(params) {
	return await HTTP.get(API.passwordChange, params);
}

export async function userinfoUpdate(params) {
	return await HTTP.post(API.userinfoUpdate, params);
}

export async function deleteUser(params) {
	return await HTTP.get(API.deleteUser, params);
}