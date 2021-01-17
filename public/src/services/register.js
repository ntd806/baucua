import axios from 'axios';

export function register(params) {
  return axios
    .post('https://5ffdb3f7d9ddad0017f6867b.mockapi.io/login', params)
    .then((res) => res.data)
    .catch(() => {});
}
