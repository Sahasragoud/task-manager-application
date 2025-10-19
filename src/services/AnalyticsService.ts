import API from './api';

export const getAnalytics = () => {return API.get('admin/analytics')};
//export const getTaskAnlytics = () => {return API.get('api/admin/analytics')};
//export const getUserAnlytics = () => {return API.get('api/admin/analytics')};