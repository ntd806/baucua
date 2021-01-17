import axios from 'axios';
import getUrl from 'Constants/url';

export function getProfile() {
  return axios
    .get(getUrl('profile'))
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
