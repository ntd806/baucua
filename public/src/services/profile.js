import axios from 'axios';

export function getProfile() {
  return axios
    .get('https://5ffdb3f7d9ddad0017f6867b.mockapi.io/profile')
    .then((res) => res.data)
    .catch(() => {});
}

export function getTransactionH() {
  return axios
    .get('https://5ffdb3f7d9ddad0017f6867b.mockapi.io/transaction')
    .then((res) => res.data)
    .catch(() => {});
}

export function getGameH() {
  return axios
    .get('https://5ffdb3f7d9ddad0017f6867b.mockapi.io/game')
    .then((res) => res.data)
    .catch(() => {});
}
