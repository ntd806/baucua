import axios from 'axios';
import _ from 'lodash';
import { notification } from 'antd';

export function register(params) {
  return axios
    .post('https://run.mocky.io/v3/2a3e786d-e4c7-402b-9387-40c611286f74', params)
    .then((res) => res.data)
    .catch((err) => {
      notification.error({
        description: _.get(err, 'response.data'),
      });
    });
}
