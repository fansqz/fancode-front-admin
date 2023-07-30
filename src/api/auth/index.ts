import request from '@/utils/request';
import type { loginForm, loginResponseData, userResponseData } from './type';
import { toFormData } from 'axios';

enum API {
  LOGIN_URL = '/auth/login',
  USERINFO_URL = '/auth/get/info',
}

// 暴露请求函数
export const reqLogin = (data: loginForm): Promise<loginResponseData> => {
  return request.post(API.LOGIN_URL, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 获取用户信息
export const reqUserInfo = (): Promise<userResponseData> => {
  return request.get(API.USERINFO_URL);
};
