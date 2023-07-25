import request from '@/utils/request';
import { toFormData } from '@/utils/format';
import { ProblemGetResponseData, ProblemCreateResponseData, ProblemListResponseData } from './type';
import { ProblemUpdateRequestData, ProblemUpdateResponseData } from './type';

enum API {
  //获取题目列表
  LIST_PROBLEM_URL = '/problem/list/',
  //创建题目
  CREATE_PROBLEM_URL = '/problem/insert',
  //获取题目
  GET_PROBLEM_URL = '/problem/get',
  // 更新题目
  UPDATE_PROBLEM_URL = '/problem/update',
}

// 获取题目列表
export const reqProblemList = (page: number, limit: number) => {
  return request.get<any, ProblemListResponseData>(API.LIST_PROBLEM_URL + `${page}/+${limit}`);
};

// 创建题目
export const createProblem = () => {
  return request.post<any, ProblemCreateResponseData>(API.CREATE_PROBLEM_URL);
};

// 根据id获取题目信息
export const getProblem = (id: string) => {
  return request.get<any, ProblemGetResponseData>(API.GET_PROBLEM_URL + '/' + id);
};

// 修改题目
export const updateProblem = (
  data: ProblemUpdateRequestData,
): Promise<ProblemUpdateResponseData> => {
  return request({
    method: 'put',
    url: API.UPDATE_PROBLEM_URL,
    data: toFormData(data),
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
