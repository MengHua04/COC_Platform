import HTTP from './axiosInstance';
import * as API from './api';

export async function getOccupations(params) {
	return await HTTP.get(API.getOccupations, params);
}