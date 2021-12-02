import request from './axios';
import getUrl from 'Constants/url';

export function register(data) {
  return request({ isRequestToken: false, method: 'post', url: getUrl('register'), data })
    .then((res) => res.data)
    .catch(() => {});
}
