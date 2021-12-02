import Cookies from 'js-cookie';

export const validateLogin = () => Boolean(Cookies.get('isLogin'));

export const validateAdmin = () => Boolean(Cookies.get('refreshToken'));
