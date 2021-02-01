import axios from 'axios';
import Cookies from 'js-cookie';

export default function request({ isRequestToken, ...params }) {
  let headers = {};
  const accesstoken = Cookies.get('accessToken');
  if (isRequestToken) headers.accesstoken = accesstoken;
  return axios({ ...params, headers });
}
