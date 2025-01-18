import request from '@/utils/request';
import { toFormData } from '@/utils/format';

enum API {
  //题目相关url
  PROBLEM_URL = '/manage/problem',
  //获取题目列表
  LIST_PROBLEM_URL = '/manage/problem/list',
  // 设置题目可用
  UPDATE_PROBLEM_ENABLE = '/manage/problem/enable',
}

// 获取题目列表
export const reqProblemList = (data: any): Promise<any> => {
  return request.get(API.LIST_PROBLEM_URL, {
    params: data,
  });
};

// 创建题目
export const reqInsertProblem = (data: any): Promise<any> => {
  return request.post(API.PROBLEM_URL, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 根据id获取题目信息
export const reqGetProblem = (id: string): Promise<any> => {
  return request.get(API.PROBLEM_URL + '/' + id);
};

// 修改题目
export const reqUpdateProblem = (data: any): Promise<any> => {
  return request.put(API.PROBLEM_URL, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 删除题目
export const reqDeleteProblem = (id: string): Promise<any> => {
  return request.delete(API.PROBLEM_URL + '/' + id);
};

// 设置题目可用
export const reqUpdateProblemEnable = (id: number, enable: string): Promise<any> => {
  return request.post(
    API.UPDATE_PROBLEM_ENABLE,
    toFormData({
      problemID: id,
      enable: enable,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

// 上传题库图标
export const reqUploadProblemFile = (data: any): Promise<any> => {
  return request.post(`${API.PROBLEM_URL}/file/upload`, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
