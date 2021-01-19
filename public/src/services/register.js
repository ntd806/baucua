import axios from 'axios';
import getUrl from 'Constants/url';

export function register(data) {
  return axios
    .post(getUrl('register'), data)
    .then((res) => res.data)
    .catch(() => {});
}
