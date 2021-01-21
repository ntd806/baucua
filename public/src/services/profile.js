import axios from 'axios';
import getUrl from 'Constants/url';

export function getProfile(params) {
  return axios
    .get(getUrl('profile'), { params })
    .then((res) => res.data)
    .catch(() => {});
}

export function getTransactionH() {
  return axios
    .get(getUrl('transactionHistory'))
    .then((res) => res.data)
    .catch(() => {});
}

export function getGameH() {
  return axios
    .get(getUrl('gameHistory'))
    .then((res) => res.data)
    .catch(() => {});
}

export function editProfile(data) {
  return axios
    .post(getUrl('editProfile'), data)
    .then((res) => res.data)
    .catch(() => {});
}
