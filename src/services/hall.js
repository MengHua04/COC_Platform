import HTTP from './axiosInstance';
import * as API from './api';

export async function roomDelete(params) {
	return await HTTP.get(API.roomDelete, params);
}

export async function roomExit(params) {
	return await HTTP.get(API.roomExit, params);
}

export async function roomJoin(params) {
	return await HTTP.get(API.roomJoin, params);
}

export async function roomList(params) {
	return await HTTP.get(API.roomList, params);
}

export async function roomCreate(params) {
	return await HTTP.post(API.roomCreate, params);
}

export async function roomUpdate(params) {
	return await HTTP.post(API.roomUpdate, params);
}