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

export function lockUser(data) {
  return axios
    .post(getUrl('lockUser'), data)
    .then((res) => res.data)
    .catch(() => {});
}

export function getSetting(params) {
  return axios
    .get(getUrl('settings'), { params })
    .then((res) => res.data)
    .catch(() => {});
}

export function updateSetting(body) {
  return axios
    .post(getUrl('updateSetting'), body)
    .then((res) => res.data)
    .catch(() => {});
}
