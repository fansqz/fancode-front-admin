import request from '@/utils/request';
import { toFormData } from '@/utils/format';

enum API {
  //题库相关url
  BANK_URL = '/manage/problemBank',
  //获取题库列表
  LIST_BANK_URL = '/manage/problemBank/list',
  // 题库图标
  BANK_ICON_URL = '/manage/problemBank/icon',
}

// 上传题库图标
export const reqUploadProblemBankIcon = (data: any): Promise<any> => {
  return request.post(API.BANK_ICON_URL, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 获取题库列表
export const reqProblemBankList = (data: any): Promise<any> => {
  return request.get<any, any>(API.LIST_BANK_URL, {
    params: data,
  });
};

// 创建题库
export const reqInsertProblemBank = (data: any): Promise<any> => {
  return request.post(API.BANK_URL, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 修改题库
export const reqUpdateProblemBank = (data: any): Promise<any> => {
  return request.put(API.BANK_URL, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 根据id获取题库信息
export const reqGetProblemBank = (id: string): Promise<any> => {
  return request.get<any, any>(API.BANK_URL + '/' + id);
};

// 删除题库
export const reqDeleteProblemBank = (id: string, forceDelete: boolean): Promise<any> => {
  return request.delete(API.BANK_URL + '/' + id + '/' + forceDelete);
};
