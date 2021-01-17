import axios from 'axios';
import getUrl from '../constants/url';

export function getMembers(params) {
  return axios
    .get(getUrl('members'), params)
    .then((res) => res.data)
    .catch(() => {});
}
