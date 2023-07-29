import request from '@/utils/request';
import { toFormData } from '@/utils/format';

// 地址
enum API {
  GET_API_TREE = '/manage/api/tree',
  API_URL = '/manage/api',
}

// 获取api
export const reqGetApi = (id: number) => {
  return request.get<any, any>(API.API_URL + `/+${id}`);
};

// 添加api
export const reqInsertApi = (api: any): Promise<any> => {
  return request({
    method: 'post',
    url: API.API_URL,
    data: toFormData(api),
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 修改api
export const reqUpdateApi = (api: any): Promise<any> => {
  return request({
    method: 'put',
    url: API.API_URL,
    data: toFormData(api),
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 删除api
export const reqDeleteApi = (id: number) => {
  return request.delete<any, any>(API.API_URL + '/' + id);
};

// 获取api树
export const reqGetApiTree = (): any => {
  return request.get<any, any>(API.GET_API_TREE);
};
