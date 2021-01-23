import axios from 'axios';
import getUrl from '../constants/url';

export function getMembers(params) {
  return axios
    .get(getUrl('members'), { params })
    .then((res) => res.data)
    .catch(() => {});
}

export function getConversionRate() {
  return axios
    .get(getUrl('getConversionRate'))
    .then((res) => res.data)
    .catch(() => {});
}

export function topUp(data) {
  return axios
    .post(getUrl('topUp'), data)
    .then((res) => res.data)
    .catch(() => {});
}

export function blockUser(data) {
  return axios
    .post(getUrl('blockUser'), data)
    .then((res) => res.data)
    .catch(() => {});
}
