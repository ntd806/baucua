import request from './axios';
import getUrl from 'Constants/url';

export function getProfile(params) {
  return request({ isRequestToken: true, method: 'get', url: getUrl('profile'), params })
    .then((res) => res.data)
    .catch(() => {});
}

export function getTransactionH(params) {
  return request({ isRequestToken: true, method: 'get', url: getUrl('transactionHistory'), params })
    .then((res) => res.data)
    .catch(() => {});
}

export function getGameH(params) {
  return request({ isRequestToken: true, method: 'get', url: getUrl('gameHistory'), params })
    .then((res) => res.data)
    .catch(() => {});
}

export function editProfile(data) {
  return request({ isRequestToken: true, method: 'post', url: getUrl('editProfile'), data })
    .then((res) => res.data)
    .catch(() => {});
}
