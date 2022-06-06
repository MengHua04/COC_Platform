import HTTP from './axiosInstance';
import * as API from './api';

export async function cardAssign(params) {
	return await HTTP.get(API.cardAssign, params);
}

export async function cardImport(params) {
	return await HTTP.get(API.cardImport, params);
}

export async function cardImportList(params) {
	return await HTTP.get(API.cardImportList, params);
}

export async function roomUsers(params) {
	return await HTTP.get(API.roomUsers, params);
}