import HTTP from './axiosInstance';
import * as API from './api';

export async function cardGet(params) {
	return await HTTP.post(API.cardGet, params);
}

export async function cardDelete(params) {
	return await HTTP.get(API.cardDelete, params);
}

export async function cardCreate(params) {
	return await HTTP.post(API.cardCreate, params);
}

export async function cardUpdate(params) {
	return await HTTP.post(API.cardUpdate, params);
}