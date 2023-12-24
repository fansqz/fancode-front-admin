import request from '@/utils/request';
import { toFormData } from '@/utils/format';

// 地址
enum API {
  PROBLEM_CASE_URL = '/manage/problem/case',
  PROBLEM_CASE_NAME_URL = '/manage/problem/case/name',
}

// 获取题目用例
export const reqProblemCase = (id: string): Promise<any> => {
  return request.get(API.PROBLEM_CASE_URL + `/${id}`);
};

// 添加题目用例
export const reqInsertProblemCase = (problemCase: any): Promise<any> => {
  return request.post(API.PROBLEM_CASE_URL, toFormData(problemCase), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 修改用例
export const reqUpdateProblemCase = (problemCase: any): Promise<any> => {
  return request.put(API.PROBLEM_CASE_URL, toFormData(problemCase), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 删除用例
export const reqDeleteProblemCase = (id: string): Promise<any> => {
  return request.delete(API.PROBLEM_CASE_URL + `/${id}`);
};

// 获取题目用例列表
export const reqProblemCaseList = (data: any): Promise<any> => {
  return request.get(API.PROBLEM_CASE_URL + '/list', {
    params: data,
  });
};

// 检测题目用例名称是否重复
export const reqCheckProblemCaseName = (name: string, problemID: string): Promise<any> => {
  return request.get(API.PROBLEM_CASE_NAME_URL + '/check', {
    params: {
      name: name,
      problemID: problemID,
    },
  });
};

// 获取一个新的用例名称
export const reqGenerateNewProblemCaseName = (problemID: string): Promise<any> => {
  return request.get(API.PROBLEM_CASE_NAME_URL + '/new', {
    params: {
      problemID: problemID,
    },
  });
};
