import { notification } from 'antd';
import _ from 'lodash';

export const handleError = (description) => {
  notification.error({ description });
};

export const handleResponse = (res, callback) => {
  if (_.get(res, 'success')) {
    if (callback) callback(_.get(res, 'result'));
  } else {
    handleError(_.get(res, 'message'));
  }
};
