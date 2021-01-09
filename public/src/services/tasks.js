import axios from 'axios';
import _ from 'lodash';
import { BASE_URL } from 'Src/constants/url';
import { notification } from 'antd';

export function getTasks(params) {
  return axios
    .get(`${BASE_URL}/tasks`, { params })
    .then((res) => res.data)
    .catch((err) => {
      notification.error({
        description: _.get(err, 'response.data'),
      });
    });
}

export function updateTaskStatus(status, id) {
  return axios
    .patch(`${BASE_URL}/tasks/${id}/status`, { status })
    .then((res) => res.data)
    .catch((err) => {
      notification.error({
        description: _.get(err, 'response.data'),
      });
    });
}

export function updateTask(data, id) {
  return axios
    .patch(`${BASE_URL}/tasks/${id}`, data)
    .then((res) => res.data)
    .catch((err) => {
      notification.error({
        description: _.get(err, 'response.data'),
      });
    });
}

export function deleteTask(id) {
  return axios
    .delete(`${BASE_URL}/tasks/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      notification.error({
        description: _.get(err, 'response.data'),
      });
    });
}

export function addNewTask(task) {
  return axios
    .post(`${BASE_URL}/tasks`, task)
    .then((res) => res.data)
    .catch((err) => {
      notification.error({
        description: _.get(err, 'response.data'),
      });
    });
}
