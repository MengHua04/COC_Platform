import HTTP from './axiosInstance';
import * as API from './api';

export async function getSkills(params) {
	return await HTTP.get(API.getSkills, params);
}

export async function getPersonSkills(params) {
	return await HTTP.get(API.getPersonSkills, params);
}