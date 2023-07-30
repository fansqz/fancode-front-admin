import request from '@/utils/request';
import { toFormData } from '@/utils/format';

enum API {
  //获取角色列表
  LIST_ROLE_URL = '/manage/role/list',
  // 角色相关url
  ROLE_URL = '/manage/role',
}

// 获取角色列表
export const reqRoleList = (data: any) => {
  return request.get<any, any>(API.LIST_ROLE_URL, {
    params: data,
  });
};

// 创建角色
export const reqInsertRole = (data: any) => {
  return request.post<any, any>(API.ROLE_URL, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 修改角色
export const reqUpdateRole = (data: any): Promise<any> => {
  return request.put(API.ROLE_URL, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 删除角色
export const reqDeleteRole = (id: number) => {
  return request.delete<any, any>(API.ROLE_URL + '/' + id);
};
