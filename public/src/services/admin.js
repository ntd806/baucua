import request from './axios';
import getUrl from '../constants/url';

export function getMembers(params) {
  return request({ isRequestToken: true, method: 'get', url: getUrl('members'), params })
    .then((res) => res.data)
    .catch(() => {});
}

export function getConversionRate() {
  return request({ isRequestToken: true, method: 'get', url: getUrl('getConversionRate') })
    .then((res) => res.data)
    .catch(() => {});
}

export function topUp(data) {
  return request({ isRequestToken: true, method: 'post', url: getUrl('topUp'), data })
    .then((res) => res.data)
    .catch(() => {});
}

export function lockUser(data) {
  return request({ isRequestToken: true, method: 'post', url: getUrl('lockUser'), data })
    .then((res) => res.data)
    .catch(() => {});
}

export function getSetting(params) {
  return request({ isRequestToken: true, method: 'get', url: getUrl('settings'), params })
    .then((res) => res.data)
    .catch(() => {});
}

export function updateSetting(data) {
  return request({ isRequestToken: true, method: 'post', url: getUrl('updateSetting'), data })
    .then((res) => res.data)
    .catch(() => {});
}

export function getUsersHistory(params) {
  return request({ isRequestToken: true, method: 'get', url: getUrl('getUsersHistory'), params })
    .then((res) => res.data)
    .catch(() => {});
}

export function login(data) {
  return request({ isRequestToken: false, method: 'post', url: getUrl('adminLogin'), data })
    .then((res) => res.data)
    .catch(() => {});
}
