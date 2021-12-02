import request from './axios';
import getUrl from 'Constants/url';

export function login(data) {
  return request({ isRequestToken: false, method: 'post', url: getUrl('login'), data })
    .then((res) => res.data)
    .catch(() => {});
}
