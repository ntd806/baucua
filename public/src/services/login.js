import axios from 'axios';
import getUrl from 'Constants/url';

export function login(data) {
  return axios
    .post(getUrl('login'), data)
    .then((res) => res.data)
    .catch(() => {});
}
