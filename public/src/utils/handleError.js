import { notification } from 'antd';

export const handleError = (description) => {
  notification.error({ description });
};
