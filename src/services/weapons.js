import HTTP from './axiosInstance';
import * as API from './api';

export async function getWeapons(params) {
	return await HTTP.get(API.getWeapons, params);
}

export async function getPersonWeapons(params) {
	return await HTTP.get(API.getPersonWeapons, params);
}