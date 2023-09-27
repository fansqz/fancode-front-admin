import request from '@/utils/request';
import { toFormData } from '@/utils/format';

enum API {
  //题库相关url
  BANK_URL = '/manage/problemBank',
  //获取题库列表
  LIST_BANK_URL = '/manage/problemBank/list',
}

// 获取题库列表
export const reqProblemList = (data: any): Promise<any> => {
  return request.get<any, any>(API.LIST_BANK_URL, {
    params: data,
  });
};

// 创建题库
export const reqCreateProblem = (): Promise<any> => {
  return request.post<any, any>(API.LIST_BANK_URL);
};

// 根据id获取题库信息
export const reqGetProblem = (id: string): Promise<any> => {
  return request.get<any, any>(API.LIST_BANK_URL + '/' + id);
};

// 修改题库
export const reqUpdateProblem = (data: any): Promise<any> => {
  return request.put(API.LIST_BANK_URL, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 删除题库
export const reqDeleteProblem = (id: number, forceDelete: boolean): Promise<any> => {
  return request.delete(API.LIST_BANK_URL + '/' + id + '/' + forceDelete);
};
