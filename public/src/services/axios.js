import axios from 'axios';
import Cookies from 'js-cookie';
import _ from 'lodash';

const instance = axios.create();
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (_.get(error, 'response.status') === 401) {
      Cookies.remove('accessToken');
      Cookies.remove('userId');
      Cookies.remove('isLogin');
      Cookies.remove('refreshToken');
      Cookies.remove('image');
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export default function request({ isRequestToken, ...params }) {
  let headers = {};
  const accesstoken = Cookies.get('accessToken');
  if (isRequestToken) headers.accesstoken = accesstoken;

  return instance({ ...params, headers });
}
