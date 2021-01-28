import axios from 'axios';
import Cookies from 'js-cookie';

export default function request({ isRequestToken, ...params }) {
  let headers = {};
  if (isRequestToken) headers.x_authorization = Cookies.get('accessToken');
  return axios({ ...params, headers });
}
