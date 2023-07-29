import request from '@/utils/request';
import { toFormData } from '@/utils/format';

// 地址
enum API {
  GET_MENU_TREE = '/manage/menu/tree',
  MENU_URL = '/manage/menu',
}

// 获取menu
export const reqGetMenu = (id: number) => {
  return request.get<any, any>(API.MENU_URL + `/+${id}`);
};

// 添加menu
export const reqInsertMenu = (menu: any): Promise<any> => {
  return request({
    method: 'post',
    url: API.MENU_URL,
    data: toFormData(menu),
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 修改menu
export const reqUpdateMenu = (menu: any): Promise<any> => {
  return request({
    method: 'put',
    url: API.MENU_URL,
    data: toFormData(menu),
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 删除menu
export const reqDeleteMenu = (id: number) => {
  return request.delete<any, any>(API.MENU_URL + '/' + id);
};

// 获取menu树
export const reqGetMenuTree = (): any => {
  return request.get<any, any>(API.GET_MENU_TREE);
};
