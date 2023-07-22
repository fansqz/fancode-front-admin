import request from '@/utils/request';
import type { loginForm,loginResponseData } from './type';

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/get/info',
}

// 暴露请求函数
export const reqLogin = (data: loginForm): Promise<loginResponseData> => {
  const formdata = new FormData();
  formdata.append('number', data.number);
  formdata.append('password', data.password);
  return request({
    method: 'post',
    url: API.LOGIN_URL,
    data: formdata,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 获取用户信息
export const reqUserInfo = () => request.get(API.USERINFO_URL);
